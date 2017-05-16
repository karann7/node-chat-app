const express = require('express'),
      app     = express(),
      path    = require('path'),
      PORT    = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '/public');
//serving public folder
app.use(express.static(publicPath));

//server listen
app.listen(port, ()=>{
      console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});