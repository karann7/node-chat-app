//requiring the socketio js file that comes built in socket.io framework
var socket = io();
//Socket.io events
socket.on('connect', function(){
  console.log('connected to server');
});
 
socket.on('disconnect', function(){
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message){
    var formatTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(message.from  + " " +formatTime+ ": " + message.text);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formatTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a  = $('<a target="_blank">My current location</a>');
  li.text(message.from + " " + formatTime + ": ");
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});


$('#message-form').on('submit', function(e){
  //prevents the form from refreshing the page and adding value to URL
  e.preventDefault(); 
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
    }, function(){
    messageTextbox.val(''); 
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Sorry Geolocation in your browser is not supported');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert('Unable to fetch your location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});