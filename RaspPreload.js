const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    finger: () => ipcRenderer.send('finger'),
    onCoin: (callback) => ipcRenderer.on('coin', (_event) => callback()),
})



/*
- 2 ekrany
- animacja
- tlo z postaci usunac
- wylosowano postac 
- kiosk
- przy starcie uruchamianie

*/