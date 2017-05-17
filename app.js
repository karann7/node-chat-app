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
      {generateMessage, generateLocationMessage} = require('./utils/message.js');
//the express app gets passed in the http method
//the http method then gets passed into the socket.io
const server      = http.createServer(app);
const io          = socketIO(server);
//serving public folder
app.use(express.static(publicPath));
// All the events must be included in the io.on block
io.on('connection', (socket)=>{
  console.log('new user connected');
//sends welcome message upon page entry
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

//sends  message to everyone but the current socket.
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('join', (params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }
    callback();
  });

//takes a incoming message, and sends it to other connected sockets
  socket.on('createMessage', (message, callback)=>{
  console.log(message);
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback();
  });
  
  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
  //sending a message to the server on user disconnect
  socket.on('disconnect', ()=>{
      console.log('User was disconnected');
  }); 
  //io.on close brace vvvv
});


//server listen
server.listen(port, ()=>{
      console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});