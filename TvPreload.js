const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onCoin: (callback) => ipcRenderer.on('coin', (_event) => callback()),
    onFinger: (callback) => ipcRenderer.on('finger', (_event) => callback()),
    print: (name) => ipcRenderer.send('print', {name: name})

})



