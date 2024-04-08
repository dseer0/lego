const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    finger: () => ipcRenderer.send('finger'),
    onCoin: (callback) => ipcRenderer.on('coin', (_event) => callback()),

})



