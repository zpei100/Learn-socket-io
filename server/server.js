const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {createMessage, createLocationMessage} = require('./helpers/message.js');

const public = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(public));

io.on('connection', socket => {
  console.log('A new user is connected');

  socket.on('userJoined', () => {
    socket.emit('newMessage', createMessage('Admin', 'Welcome to the chat room !!!'))
    socket.broadcast.emit('anotherUserJoined');
  })  

  socket.on('createMessage', (message) => {
    const newMessage = createMessage('user', message);
    socket.broadcast.emit('newMessage', newMessage)   
  });

  socket.on('sendLocation', (lat, long) => {
    io.emit('sendLocationMessage', createLocationMessage('Admin', lat, long))
  })
})

server.listen(port, () => console.log(`server is up on port ${port}`));
