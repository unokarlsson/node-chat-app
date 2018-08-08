const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

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
let users = new Users();

io.on('connection',(socket) => {
    console.log('New user connected!');

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name is required!');
        }

        // Make sure that there are unique user names.
        if(users.getUserByName(params.name)) {
            return callback(`Name ${params.name} already taken!`);
        }

        // To leave use socket.join(params.room);
        // To send messages to a specific group use
        // io.to(<group>).emit(...); vs // io.emit(...);
        // socket.broadcast.to(<gorup>).emit(...); vs // socket.boadcast.emit(...);
        // socket.emit(...) targets a specific user.

        // Make sure that room names don't depend on upper/lower case.
        const userRoom = params.room.toLowerCase();
        console.log(`userRoom = ${userRoom}`);

        socket.join(userRoom);

        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,userRoom);
        io.to(userRoom).emit('updateUserList',users.getUserList(userRoom));

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined!`));    
        callback();
    });

    socket.on('createMessage',(message,callback) => {
        // console.log('Create message',message);
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
    });

    
    socket.on('createLocationMessage',(coords) => {
        let user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
        
    });

    socket.on('disconnect',() =>{
        console.log('User was disconnected!');
        let user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
        }
    });
});

app.use(express.static(publicPath));


server.listen(port,() => {
    console.log(`Server up on port ${port}`);
})