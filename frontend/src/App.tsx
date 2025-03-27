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
  console.log(e);
  const matchData = {
    playerOneId: 2,
    characterOneId: 2,
  };
  socket.emit('create match', matchData);
};

document.body.addEventListener('click', function (e: any) {
  console.log(e.target);
});

const updateMatchListener = (e: any) => {
  e.preventDefault();
  // const {
  //   matchId,
  //   playerOneId,
  //   characterOneId,
  //   playerTwoId,
  //   characterTwoId,
  //   status,
  // } = e.target.attributes;
  const match = {
    id: 4,
    playerOneId: 1,
    characterOneId: 1,
    playerTwoId: 2,
    characterTwoId: 2,
    status: 'pending',
  };

  socket.emit('update match', match);
  return;
};

const addMatch = (match: any) => {
  const matchList = document.getElementById('matches');
  const newMatch = document.createElement('p');
  const applyButton = document.createElement('button');

  newMatch.setAttribute('matchId', match.id);
  newMatch.setAttribute('playerOneId', match.playerOneId);
  newMatch.setAttribute('characterOneId', match.characterOneId);
  newMatch.setAttribute('playerTwoId', match.playerTwoId);
  newMatch.setAttribute('characterTwoId', match.characterTwoId);
  newMatch.setAttribute('status', match.status);

  applyButton.innerHTML = `Apply to match`;
  newMatch.innerHTML = `Match ID: ${match.id}, Player 1 ID: ${match.playerOneId}, Status: ${match.status}`;

  matchList?.append(newMatch);
};

socket.on('new match', addMatch);

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
      <div id="matches"></div>
      <br />
      <button onClick={updateMatchListener}>Apply to join</button>
    </div>
  );
}

export default App;
