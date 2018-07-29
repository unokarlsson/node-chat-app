const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

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

    // socket.emit('newMessage',{
    //     from: 'uno@karlsson.com',
    //     text: 'What is going on.',
    //     createdAt: Date.now()
    // });

    socket.on('createMessage',(message) => {
        console.log('Create message',message);
        message.creatdAt = Date.now(); // or new Date().getTime()
        io.emit('newMessage',message); 
    });



    socket.on('disconnect',() =>{
        console.log('User was disconnected!');
    });
});


app.use(express.static(publicPath));


server.listen(port,() => {
    console.log(`Server up on port ${port}`);
})