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

socket.on('newLocationMessage',function(message) {
    const listItem = jQuery('<li></li>');
    const anchar = jQuery('<a target="_blank">My current location</a>')
    listItem.text(`${message.from}: `);
    anchar.attr('href',message.url);
    listItem.append(anchar);
    jQuery('#messages').append(listItem);
});

jQuery('#message-form').on('submit',function (event) {
    event.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function (messge) {

    });
});

 const locationButton = jQuery('#send-location');
 locationButton.on('click',function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    navigator.geolocation.getCurrentPosition(function(location) {
        console.log(location);
        socket.emit('createLocationMessage',{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    },function () {
        alert('Unable to fetch location!');
    });
});