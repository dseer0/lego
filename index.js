const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('node:path')
var Gpio = require('onoff').Gpio;
var pushButton = new Gpio(2, 'in', 'falling');

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
    }

    tv.webContents.send('coin')
    rasp.webContents.send('coin')

});

const createRaspApp = (x, y) => {
    const win = new BrowserWindow({
        width: 600,
        height: 1024,
        x: x,
        y: y,
        kiosk: true,
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'RaspPreload.js')
        }
    })

    win.loadFile('RaspApp.html')
    return win
}

const createTVApp = (x, y) => {
    const win = new BrowserWindow({
        width: 1080,
        height: 1920,
        x: x,
        y: y,
        // kiosk: true,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'TvPreload.js')
        }
    })

    win.loadFile('TvApp.html')
    return win
}

ipcMain.on('finger', (event) => {
    console.log("FINGER!!!")
})

app.whenReady().then(() => {
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    // const displays = screen.getAllDisplays()
    const primaryDisplay = screen.getPrimaryDisplay()
    const secondDisplay = screen.getAllDisplays().find(d => d.id != primaryDisplay.id)

    console.log(primaryDisplay)
    console.log(secondDisplay)

    const primaryBounds = primaryDisplay.bounds
    const secondBounds = secondDisplay.bounds


    const tv = createTVApp(600, 0)
    const rasp = createRaspApp(0, 0)
    // const rasp = createRaspApp(primaryBounds.x, primaryBounds.y) // for dev


    // setTimeout((() => {
    //     tv.webContents.send('coin')
    //     rasp.webContents.send('coin')
    // }), 3000)

    ipcMain.on('finger', (event) => {
        tv.webContents.send('finger')
    })



    tv.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(message + " " + sourceId + " (" + line + ")");
    });

    rasp.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(message + " " + sourceId + " (" + line + ")");
    });
})