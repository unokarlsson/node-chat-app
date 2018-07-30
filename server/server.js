const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
// console.log('Old way          = ',__dirname + '/../public');
console.log('Using path.join  = ',publicPath);

const port = process.env.PORT || 3000;

let app     = express();
let server  = http.createServer(app);

// Setup socket.io on the server
// A socket.io client side lib is available at:
// http://localhost:3000/socket.io/socket.io.js
let io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New user connected!');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined!'));

    socket.on('createMessage',(message,callback) => {
        console.log('Create message',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
    });

    
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',() =>{
        console.log('User was disconnected!');
    });
});


app.use(express.static(publicPath));


server.listen(port,() => {
    console.log(`Server up on port ${port}`);
})