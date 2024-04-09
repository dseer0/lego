const express = require('express');
const http = require('http')
const cors = require('cors');
// const bodyParser = require('body-parser');

const port = 8999;
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());

function enableWebServer() {
    console.log("Enabling Web Server ....")
    server = app.listen(port, () => {
        console.log(`Web Server Enabled! Listening at port: ${port}`)
        // callback(null, true)
    });
}

enableWebServer();

app.get("/gotMoney", (req, res) => {
    console.log('Got it!')
    return res.json({ "status": true })
})