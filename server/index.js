const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 4000;

io.on('connection', socket => {
  socket.on('joinRoom', room => {
    socket.join(room);
  });

  socket.on('chatMessage', ({ room, author, message }) => {
    const timestamp = new Date().toISOString();
    io.to(room).emit('chatMessage', { author, message, timestamp });
  });

  socket.on('disconnect', () => {
    // optional cleanup
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
