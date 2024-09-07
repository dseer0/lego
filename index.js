const { app, BrowserWindow, screen, ipcMain } = require('electron')
const { exec } = require('child_process');
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
let doOnceFinger = false


const createTVApp = (x, y) => {
    const win = new BrowserWindow({
        width: 1080,
        height: 1920,
        x: x,
        y: y,
        kiosk: true,
        autoHideMenuBar: true,
        frame: false,
        fullscreen: true,
        alwaysOnTop: true,
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

    const primaryDisplay = screen.getPrimaryDisplay()



    const tv = createTVApp(0, 0)


    // setTimeout((() => {
    //     tv.webContents.send('coin')
    // }), 3000)


    // setTimeout(() => {
    //     tv.webContents.send('finger')
    // }, 10000)


    ipcMain.on('print', (event, name) => {
        const toPrint = name.name
        // 'lpr -o fit-to-page ' + toPrint,
        exec('lprm - && lpr -o fit-to-page ' + toPrint, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });


        console.log("PRINTING!!! " + toPrint)
    })



    tv.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(message + " " + sourceId + " (" + line + ")");
    });


    ekspres.get("/gotMoney", (req, res) => {
        if (!doOnce) {
            console.log('Got it!')
            tv.webContents.send('coin')
            doOnce = true
        }
        setTimeout(() => {
            doOnce = false
        }, 1500)

        return res.json({ "status": true })
    })

    ekspres.get("/sendFinger", (req, res) => {
        if (!doOnceFinger) {
            tv.webContents.send('finger')
            doOnceFinger = true
        }
        setTimeout(() => {
            doOnceFinger = false
        }, 1500)

        return res.json({ "status": true })
    })
})