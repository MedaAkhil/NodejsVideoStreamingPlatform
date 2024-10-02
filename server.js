const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A device connected');

    socket.on('stream', (data) => {
        console.log('Streaming data size:', data.length);

        socket.broadcast.emit('stream', data);
    });

    socket.on('disconnect', () => {
        console.log('A device disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
