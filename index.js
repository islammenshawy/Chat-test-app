var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var newrelic = require('newrelic');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});