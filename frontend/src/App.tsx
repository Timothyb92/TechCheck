import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { fetchTest } from './api';

import './App.css';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('Connected from client: ' + socket.id);
});

const createMatchListener = (e: any) => {
  e.preventDefault();
  const matchData = {
    playerOneId: 2,
    characterOneId: 2,
  };
  console.log('create match socket event running');
  socket.emit('create match', matchData);
};

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTest().then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>{message || 'Loading...'}</h1>
      <a href="https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email">
        Login
      </a>
      <button onClick={createMatchListener}>Create match</button>
    </div>
  );
}

export default App;
