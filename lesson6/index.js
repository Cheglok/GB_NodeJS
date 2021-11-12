const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);
io.on('connection', socket => {
    // socket.nickname = Moniker.choose();
    // socket.broadcast.emit('connection-msg', socket.nickname);
    // socket.emit('connection-msg', socket.nickname);
    socket.on('newUser', function(name){
        socket.nickname = name;
        socket.broadcast.emit('connection-msg', socket.nickname);
        socket.emit('connection-msg', socket.nickname);
    });
    socket.on('client-msg', data => {
        const payload = {
            message: data.message,
            nickname: socket.nickname,
        };

        socket.broadcast.emit('server-msg', payload);
        socket.emit('server-msg', payload);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnection-msg', socket.nickname);
    })
});

server.listen(5555);
