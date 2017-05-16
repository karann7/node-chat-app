const express     = require('express'),
      http        = require('http'),
      socketIO    = require('socket.io'),
      app         = express(),
      path        = require('path'),
      port        = process.env.PORT || 3000,
      publicPath  = path.join(__dirname, '/public');

const server      = http.createServer(app);
const io          = socketIO(server);
//serving public folder
app.use(express.static(publicPath));

// Socket.io events
io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',{
        from: "@karann7",
        text: "Hello socketio",
        createAt: 456456
    });
    socket.on('createMessage', (message)=>{
    console.log('The message is : ', message);
    });
    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});


//server listen
server.listen(port, ()=>{
      console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});