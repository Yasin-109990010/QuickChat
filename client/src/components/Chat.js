import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('User');
  const [room, setRoom] = useState('general');
  const [roomInput, setRoomInput] = useState('general');

  useEffect(() => {
    const handleMessage = ({ author, message, timestamp }) => {
      setChat((prev) => [...prev, { author, message, timestamp }]);
    };
    socket.on('chatMessage', handleMessage);
    return () => {
      socket.off('chatMessage', handleMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', room);
    setChat([]);
  }, [room]);

  const sendChat = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('chatMessage', { room, author: username || 'User', message });
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>QuickChat – {room} Room</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          style={{ width: '40%', padding: '.5rem', marginRight: '.5rem' }}
        />
        <input
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder="Room"
          style={{ width: '30%', padding: '.5rem', marginRight: '.5rem' }}
        />
        <button
          type="button"
          onClick={() => setRoom(roomInput || 'general')}
          style={{ padding: '.5rem 1rem' }}
        >
          Join
        </button>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          height: '300px',
          overflowY: 'auto',
          marginBottom: '1rem'
        }}
      >
        {chat.map((c, i) => (
          <div key={i}>
            <strong>{c.author}</strong>
            {` [${new Date(c.timestamp).toLocaleTimeString()}]: ${c.message}`}
          </div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          style={{ width: '80%', padding: '.5rem' }}
        />
        <button type="submit" style={{ padding: '.5rem 1rem' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
