const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
var Moniker = require('moniker');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);
io.on('connection', client => {
    client.nickname = Moniker.choose();
    client.broadcast.emit('connection-msg', client.nickname);
    client.emit('connection-msg', client.nickname);
    client.on('client-msg', data => {
        const payload = {
            message: data.message,
            nickname: client.nickname,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', () => {
        client.broadcast.emit('disconnection-msg', client.nickname);
    })
});

server.listen(5555);
