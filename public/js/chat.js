// Makes a request to the server to open a connection
let socket = io();

function scrollToBottom() {
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');

    const clientHeight  = messages.prop('clientHeight');
    const scrollTop     = messages.prop('scrollTop');
    const scrollHeight  = messages.prop('scrollHeight');
    const newMessageHeight  = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop +  newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect',function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage',function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();

    // let listItem = jQuery('<li></li>');
    // let anchar = jQuery('<a target="_blank">My current location</a>')
    // listItem.text(`${message.from} ${formattedTime}: `);
    // anchar.attr('href',message.url);
    // listItem.append(anchar);
    // jQuery('#messages').append(listItem);
});

jQuery('#message-form').on('submit',function (event) {
    event.preventDefault();

    let messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    },function (messge) {
        messageTextbox.val('');
    });
});

 const locationButton = jQuery('#send-location');
 locationButton.on('click',function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    locationButton.attr('disabled','disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(location) {
        // console.log(location);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    },function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!');
    });
});