const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3001;

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

