const { app, BrowserWindow, shell, Tray, Menu, Notification, ipcMain, nativeImage } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const APP_URL   = 'https://spd-houg.vercel.app';
const APP_NAME  = 'Scuffers OPS Brain';
const ICON_PATH = path.join(__dirname, 'assets', 'icon.png');

// ─── STATE ───────────────────────────────────────────────────────────────────
let mainWindow   = null;
let loginWindow  = null;
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
    showNativeNotification('🔄 Actualización lista', 'Se instalará al cerrar la aplicación.');
  });

  autoUpdater.on('error', (err) => console.error('Auto-updater error:', err.message));

  autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  setInterval(() => autoUpdater.checkForUpdatesAndNotify().catch(() => {}), 2 * 60 * 60 * 1000);
}

// ─── NATIVE NOTIFICATION ─────────────────────────────────────────────────────
function showNativeNotification(title, body) {
  if (!Notification.isSupported()) return;
  new Notification({ title, body, icon: nativeImage.createFromPath(ICON_PATH) }).show();
}

// ─── TRAY ────────────────────────────────────────────────────────────────────
function createTray() {
  const icon = nativeImage.createFromPath(ICON_PATH).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip(APP_NAME);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: '📊 Abrir OPS Brain',  click: () => { mainWindow?.show(); mainWindow?.focus(); } },
    { type: 'separator' },
    { label: '🔄 Buscar actualizaciones', click: () => autoUpdater.checkForUpdatesAndNotify().catch(() => {}) },
    { type: 'separator' },
    { label: '❌ Salir', click: () => { isQuitting = true; app.quit(); } },
  ]));
  tray.on('double-click', () => { mainWindow?.show(); mainWindow?.focus(); });
}

// ─── LOGIN WINDOW ─────────────────────────────────────────────────────────────
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 440, height: 520,
    frame: false, resizable: false,
    center: true,
    icon: ICON_PATH,
    title: APP_NAME,
    backgroundColor: '#0e1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload-login.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  loginWindow.loadFile(path.join(__dirname, 'login.html'));
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
function createMainWindow(username, role) {
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

  mainWindow.loadURL(APP_URL);

  // Once loaded, inject session into the page so it skips the login screen
  mainWindow.webContents.once('did-finish-load', () => {
    const session = JSON.stringify({ username, role });
    mainWindow.webContents.executeJavaScript(`
      try { sessionStorage.setItem('ops_session', ${JSON.stringify(session)}); } catch(e) {}
    `).catch(() => {});

    setTimeout(() => {
      splashWindow?.close();
      splashWindow = null;
      mainWindow.show();
      mainWindow.focus();
    }, 600);
  });

  mainWindow.webContents.on('did-fail-load', () => {
    splashWindow?.close();
    splashWindow = null;
    mainWindow.loadFile(path.join(__dirname, 'offline.html')).catch(() => mainWindow.show());
  });

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  ipcMain.on('set-badge', (_, count) => {
    mainWindow?.setTitle(count > 0 ? `${APP_NAME} · ${count} alertas` : APP_NAME);
    app.setBadgeCount?.(count > 0 ? count : 0);
    tray?.setToolTip(count > 0 ? `${APP_NAME} — ${count} alertas` : APP_NAME);
  });

  ipcMain.on('native-notify', (_, { title, body }) => showNativeNotification(title, body));
}

// ─── APP LIFECYCLE ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createLoginWindow();

  // When login succeeds, close login, show splash + main window
  ipcMain.once('login-success', (_, { username, role }) => {
    loginWindow?.close();
    loginWindow = null;
    createSplash();
    createMainWindow(username, role);
    createTray();
    setTimeout(() => setupAutoUpdater(), 3000);
  });

  app.on('activate', () => {
    if (mainWindow) mainWindow.show();
    else if (!loginWindow) createLoginWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform === 'darwin' && tray) return; // keep alive on mac
});

app.on('before-quit', () => { isQuitting = true; });

app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (e, url) => {
    if (!url.startsWith(APP_URL) && !url.startsWith('https://spd-') && !url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
});
