const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer (the web app running in the BrowserWindow)
contextBridge.exposeInMainWorld('electronBridge', {
  // Update the taskbar title / tray tooltip with alert count
  setBadge: (count) => ipcRenderer.send('set-badge', count),

  // Trigger a native OS notification
  notify: (title, body) => ipcRenderer.send('native-notify', { title, body }),

  // Listen for auto-update events
  onUpdateAvailable:  (cb) => ipcRenderer.on('update-available',  () => cb()),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', () => cb()),

  // App info
  platform: process.platform,
  isElectron: true,
});
