var nr = require('newrelic');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', nr.createWebTransaction('/ws/chat-custom', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    nr.endTransaction();
  }))

  socket.on('disconnect', nr.createWebTransaction('/ws/chat-disconnect-custom', function(){
    console.log('user disconnected');
    nr.endTransaction();
  }));
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});