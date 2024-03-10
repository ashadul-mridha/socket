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


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
})
// every socket tab conncect this
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

// only frontend team can connect using this namespace
const frontendNamespace = io.of('/frontend');
frontendNamespace.on('connection', (socket) => {
    socket.emit('welcome', 'Welcome to the frontend channel!');

    socket.on('messageFromClient', (data) => {
        console.log('Got message from client', data);
    })
})
app.get('/frontend', (req, res) => {
    res.sendFile(__dirname + '/client/frontend.html');
})

expressServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})