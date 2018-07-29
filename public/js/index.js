// Makes a request to the server to open a connection
let socket = io();
socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect',function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage',function(message) {
    console.log('New message',message);
    const listItem = jQuery('<li></li>');
    listItem.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(listItem);
});

// socket.emit('createMessage',{   
//     from: 'Frank',
//     text: 'Hi from Frank'
// }, function(message) {
//     console.log('Got it:',message);
// });

jQuery('#message-form').on('submit',function (event) {
    event.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function (messge) {

    });
});