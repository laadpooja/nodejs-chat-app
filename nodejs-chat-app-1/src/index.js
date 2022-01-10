const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./utils/users');

const {
  addRoom,
  removeRoom,
  getRoom,
  getRooms
} = require('./utils/rooms');

const {
  generateMessage,
  generateLocationMessage
} = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log("Connected to Websocket!");


  socket.on('getRooms', (callback) => {
    const rooms = getRooms();
    callback(rooms);
  })

  socket.on('join', (options, callback) => {
    const {
      error,
      user
    } = addUser({
      id: socket.id,
      ...options
    });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit('message', generateMessage('Admin', 'Welcome!', 'admin'));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`, 'admin'));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    let filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }
    const user = getUser(socket.id);
    io.to(user.room).emit('message', generateMessage(user.username, message, `avatar${user.avatar}`));
    callback();

  });

  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=`, coords, `avatar${user.avatar}`));
    callback();

  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `A ${user.username} has left!`, 'admin'));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }

  });

});

app.get('/', (req, res) => {
  const rooms = getRooms();
  console.log(rooms);
  res.sendFile(path.join(__dirname, '../public/view/index.html'), {
    rooms: rooms
  });
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is runnint on http://localhost:${PORT}`);
});