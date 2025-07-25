//// client/src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', 'general');

    socket.on('chatMessage', ({ author, message, timestamp }) => {
      setChat(prev => [...prev, { author, message, timestamp }]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const sendChat = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('chatMessage', { room: 'general', author: 'User', message });
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>QuickChat – General Room</h2>
      <div
        ref={chatBoxRef}
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
            <span style={{ marginLeft: '.5rem', color: '#888', fontSize: '0.85em' }}>
              {new Date(c.timestamp).toLocaleTimeString()}
            </span>
            : {c.message}
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
