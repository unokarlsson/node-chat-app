// Makes a request to the server to open a connection
let socket = io();
socket.on('connect', function() {
    console.log('Connected to server!');

    socket.emit('createMessage',{
        frome: 'alexandra@karlsson.com',
        text: 'Hey, This is Uno.'
    })
});

socket.on('newMessage',function(message) {
    console.log('New message',message);
});


socket.on('disconnect',function() {
    console.log('Disconnected from server!');
});

