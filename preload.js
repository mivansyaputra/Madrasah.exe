const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('fenaceApp', { refocus: () => ipcRenderer.send('refocus') });
