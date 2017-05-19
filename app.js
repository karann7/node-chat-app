//NPM dependcies
const express     = require('express'),
      http        = require('http'),
      socketIO    = require('socket.io'),
      app         = express(),
      path        = require('path');  
// local dependencies
const port        = process.env.PORT || 3000,
    isRealString  = require('./utils/validation.js'),
      publicPath  = path.join(__dirname, '/public'),
      {Users}     = require('./utils/users'),
      {generateMessage, generateLocationMessage} = require('./utils/message.js');
//the express app gets passed in the http method
//the http method then gets passed into the socket.io
var users       = new Users();
const server      = http.createServer(app);
const io          = socketIO(server);
//serving public folder
app.use(express.static(publicPath));
// All the events must be included in the io.on block
io.on('connection', (socket)=>{
  //all the socket code has to be placed inside io.on block.
  console.log('new user connected');
  socket.on('join', (params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    // join a specific room
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave to leave the room
    //sends welcome message upon page entry
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  //sends  message to everyone but the current socket.
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' has joined'));
      callback();
    });
  //takes a incoming message, and sends it to other connected sockets
    socket.on('createMessage', (message, callback)=>{
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
     callback();
    });
    //for sending location I made a separate function rather than injecting inline
    socket.on('createLocationMessage', (coords)=>{
      var user = users.getUser(socket.id);
      if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }
    });
    
    //sending a message to the server on user disconnect
    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        if(user){
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage(user.name, user.name + ' has left.'));
        }
    }); 
  //io.on close brace vvvv
});
//server listen
server.listen(port, ()=>{
      console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});