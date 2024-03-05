import express from 'express';
import http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

io.on('connection', (socket) => {
    console.log('A user connected');

    setTimeout(() => {
        socket.emit('messageFromServer', { data: 'Welcome to the socket.io server' });
    }, 1000);

    socket.on('messageFromClient', (dataFromClient) => {
        console.log("Got sms from client",dataFromClient.data);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
})



app.get('/aa', (req, res) => {
    res.send('Hello World');
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
})

expressServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})