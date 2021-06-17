const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Browser } = require('./browser');
const io = new Server(server);
const port = process.env.PORT || 3001;
const browser = new Browser(600, 800, 'https://google.com');

io.on('connection', (socket) => {
    let sendScreenshotData = setInterval(async () => {
        const imageData = (await browser.screenshot()).toString('base64');
        io.emit('image', imageData);
    });

    socket.on('browser-viewport', async (viewport) => {
        await browser.setViewport(viewport.height, viewport.width);
    });

    socket.on('browser-input-mouse-position', async (mousePosition) => {
        await browser.setMousePosition(mousePosition.x, mousePosition.y);
    });

    socket.on('browser-input-mouse-click', async (mousePosition) => {
        await browser.mouseClick(mousePosition.x, mousePosition.y);
    });

    socket.on('browser-goback', async () => {
        await browser.goBack();
    });

    socket.on('browser-goforward', async () => {
        await browser.goForward();
    });

    socket.on('browser-reload', async () => {
        await browser.reload();
    });

    socket.on('browser-goto', async (url) => {
        await browser.goTo(url);
    });

    socket.on('browser-geturl', async () => {
        await browser.getUrl();
    });

    socket.on('disconnect', () => {
        clearInterval(sendScreenshotData);
    });

    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

