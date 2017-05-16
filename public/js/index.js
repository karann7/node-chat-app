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
    console.log(JSON.stringify(message, undefined, 2));
    var li = $('<li></li>');
    li.text(message.from + ": " + message.text);
    $('#messages').append(li);
});



$('#message-form').on('submit', function(e){
  //prevents the form from refreshing the page and adding value to URL
  e.preventDefault(); 
socket.emit('createMessage', {
  from: 'User',
  text: $('[name=message]').val()
}, function(data){
  console.log('Delivered!' + " "+ data);
});
});