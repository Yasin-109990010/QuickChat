const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('chatMessage', ({ room, author, message }) => {
    const payload = { author, message, timestamp: new Date().toISOString() };
    io.to(room).emit('chatMessage', payload);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
