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
});

socket.emit('createMessage', {
  from: 'Karan',
  text: 'heheheheh'
}, function(data){
  console.log('Delivered!' + " "+ data);
});