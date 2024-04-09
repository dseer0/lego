const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('node:path')
// var Gpio = require('onoff').Gpio;
// var pushButton = new Gpio(2, 'in', 'falling');

const express = require('express');
const http = require('http')
const cors = require('cors');

const port = 8999;
const ekspres = express();
ekspres.use(cors());

app.disableHardwareAcceleration()

function enableWebServer() {
    console.log("Enabling Web Server ....")
    server = ekspres.listen(port, () => {
        console.log(`Web Server Enabled! Listening at port: ${port}`)
        // callback(null, true)
    });
}

enableWebServer();

let doOnce = false


const createRaspApp = (x, y) => {
    const win = new BrowserWindow({
        width: 600,
        height: 1024,
        x: x,
        y: y,
        // kiosk: true,
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        // fullscreen: true,
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
        frame: false,
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

    // const primaryBounds = primaryDisplay.bounds
    // const secondBounds = secondDisplay.bounds


    const tv = createTVApp(600, 0)
    const rasp = createRaspApp(0, 0)
    // const rasp = createRaspApp(primaryBounds.x, primaryBounds.y) // for dev


    setTimeout((() => {
        tv.webContents.send('coin')
        rasp.webContents.send('coin')
    }), 3000)

    //na malym trwa losowanie
    //losowanie zakończone

    ipcMain.on('finger', (event) => {
        tv.webContents.send('finger')
    })



    tv.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(message + " " + sourceId + " (" + line + ")");
    });

    rasp.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(message + " " + sourceId + " (" + line + ")");
    });

    ekspres.get("/gotMoney", (req, res) => {
        if (!doOnce) {
            console.log('Got it!')
            tv.webContents.send('coin')
            rasp.webContents.send('coin')
            doOnce = true
        }
        setTimeout(() => {
            doOnce = false
        }, 1500)

        return res.json({ "status": true })
    })
})