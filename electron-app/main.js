const { app, BrowserWindow, shell, Tray, Menu, Notification, ipcMain, nativeImage } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const APP_URL   = 'https://spd-houg.vercel.app';
const APP_NAME  = 'Scuffers OPS Brain';
const ICON_PATH = path.join(__dirname, 'assets', 'icon.png');

// ─── STATE ───────────────────────────────────────────────────────────────────
let mainWindow   = null;
let splashWindow = null;
let tray         = null;
let isQuitting   = false;

// ─── AUTO-UPDATER ────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  autoUpdater.autoDownload    = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', () => {
    if (mainWindow) mainWindow.webContents.send('update-available');
  });

  autoUpdater.on('update-downloaded', () => {
    if (mainWindow) mainWindow.webContents.send('update-downloaded');
    // Show native notification
    showNativeNotification(
      '🔄 Actualización lista',
      'Se instalará la próxima vez que cierres la aplicación.'
    );
  });

  autoUpdater.on('error', (err) => {
    console.error('Auto-updater error:', err.message);
  });

  // Check every 2 hours
  autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  }, 2 * 60 * 60 * 1000);
}

// ─── NATIVE NOTIFICATION ─────────────────────────────────────────────────────
function showNativeNotification(title, body) {
  if (!Notification.isSupported()) return;
  const icon = nativeImage.createFromPath(ICON_PATH);
  new Notification({ title, body, icon }).show();
}

// ─── TRAY ────────────────────────────────────────────────────────────────────
function createTray() {
  const icon = nativeImage.createFromPath(ICON_PATH).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip(APP_NAME);

  const menu = Menu.buildFromTemplate([
    { label: '📊 Abrir OPS Brain',  click: () => { mainWindow?.show(); mainWindow?.focus(); } },
    { type: 'separator' },
    { label: '🔄 Buscar actualizaciones', click: () => autoUpdater.checkForUpdatesAndNotify().catch(() => {}) },
    { type: 'separator' },
    { label: '❌ Salir', click: () => { isQuitting = true; app.quit(); } },
  ]);

  tray.setContextMenu(menu);
  tray.on('double-click', () => { mainWindow?.show(); mainWindow?.focus(); });
}

// ─── SPLASH ──────────────────────────────────────────────────────────────────
function createSplash() {
  splashWindow = new BrowserWindow({
    width: 420, height: 260,
    frame: false, transparent: true,
    alwaysOnTop: true, resizable: false,
    skipTaskbar: true,
    webPreferences: { contextIsolation: true },
  });
  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
  splashWindow.center();
}

// ─── MAIN WINDOW ─────────────────────────────────────────────────────────────
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440, height: 900,
    minWidth: 900, minHeight: 600,
    show: false,
    icon: ICON_PATH,
    title: APP_NAME,
    backgroundColor: '#0e1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });

  // Load the Vercel app
  mainWindow.loadURL(APP_URL);

  // Show main window once loaded, hide splash
  mainWindow.webContents.once('did-finish-load', () => {
    setTimeout(() => {
      splashWindow?.close();
      splashWindow = null;
      mainWindow.show();
      mainWindow.focus();
    }, 600); // brief pause so splash doesn't flash away instantly
  });

  // If load fails (offline), show anyway with a message
  mainWindow.webContents.on('did-fail-load', () => {
    splashWindow?.close();
    splashWindow = null;
    mainWindow.loadFile(path.join(__dirname, 'offline.html')).catch(() => {
      mainWindow.show();
    });
  });

  // Minimise to tray instead of closing
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      if (process.platform !== 'darwin') {
        showNativeNotification(APP_NAME, 'La app sigue corriendo en la bandeja del sistema.');
      }
    }
  });

  // Open external links in the default browser, not in the app
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Update window title with alert count from renderer
  ipcMain.on('set-badge', (_, count) => {
    if (count > 0) {
      mainWindow?.setTitle(`${APP_NAME} · ${count} alertas`);
      app.setBadgeCount?.(count); // macOS
    } else {
      mainWindow?.setTitle(APP_NAME);
      app.setBadgeCount?.(0);
    }
    // Update tray tooltip
    tray?.setToolTip(count > 0 ? `${APP_NAME} — ${count} alertas nuevas` : APP_NAME);
  });

  // Trigger native notification from renderer
  ipcMain.on('native-notify', (_, { title, body }) => {
    showNativeNotification(title, body);
  });
}

// ─── APP LIFECYCLE ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createSplash();
  createMainWindow();
  createTray();

  // Check for updates 3s after launch (give time to settle)
  setTimeout(() => setupAutoUpdater(), 3000);

  app.on('activate', () => {
    // macOS: re-open window when clicking dock icon
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    else mainWindow?.show();
  });
});

app.on('window-all-closed', () => {
  // On macOS, keep app alive in menu bar
  if (process.platform !== 'darwin') {
    // Don't quit — we have a tray icon
  }
});

app.on('before-quit', () => { isQuitting = true; });

// Security: prevent new windows from opening navigation
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (e, url) => {
    if (!url.startsWith(APP_URL) && !url.startsWith('https://spd-')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
});
