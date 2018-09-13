const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {createMessage, createLocationMessage} = require('./helpers/message.js');
const {isValidString} = require('./helpers/isValidString');
var { users } = require('./data/users.js');
users.start();

const public = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(public));

io.on('connection', socket => {
  socket.on('userJoined', (user, callback) => {

    if (!isValidString(user.name) || !isValidString(user.room)) {
      callback('Please enter a valid name and room');
    } else {

      //Joining the room is neccessary for listenning, not for emmitting
      socket.join(user.room)
      users.addUser(socket.id, user);
      
      io.to(user.room).emit('usersUpdated', users.inRoom(user.room))

      socket.emit('newMessage', createMessage('Admin', 'Welcome to the chat room !!!'))
  
      socket.broadcast.to(user.room).emit('newMessage', createMessage(user.name, 'has joined the room'));
    }
  })  

  socket.on('disconnect', () => {
    io.to(users.getUsers()[socket.id].room).emit('newMessage', createMessage(users.getUsers()[socket.id].name, 'has left the room'));

    io.to(users.getUsers()[socket.id].room).emit('usersUpdated', users.inRoom(users.getUsers()[socket.id].room))

    users.removeUser(socket.id);

    
  })

  socket.on('createMessage', (message, callback) => {
    
    if (isValidString(message)) {
      const newMessage = createMessage(users.getUsers()[socket.id].name, message);
  
      io.to(users.getUsers()[socket.id].room).emit('newMessage', newMessage)   
    } else {
      callback('Please enter a message');
    }
  });

  socket.on('sendLocation', (lat, long) => {
    io.to(users.getUsers()[socket.id].room).emit('sendLocationMessage', createLocationMessage('Admin', lat, long))
  })
})

server.listen(port, () => console.log(`server is up on port ${port}`));
