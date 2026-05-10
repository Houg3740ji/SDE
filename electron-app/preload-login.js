const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('loginBridge', {
  success: (username, role) => ipcRenderer.send('login-success', { username, role }),
});
