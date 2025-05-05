import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/Navigation.component';
import { Lobby } from './routes/lobby/lobby.component';

import { socket } from './sockets/index';
import { emitCreateMatch } from './sockets/clientMatchSockets';

socket.on('connect', () => {
  console.log('Connected from client: ' + socket.id);
});

const updateUser = () => {
  const user = {
    id: 1,
    mainCharacterId: 1,
    rankId: 20,
  };
  console.log('Update user running');
  socket.emit('update user', user);
};

socket.on('updated user', () => {
  console.log('updated user emit received on front end');
});

const createMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log(e);
  const matchData = {
    playerOneId: 2,
    characterOneId: 2,
    creatorSocketId: socket.id,
  };
  // console.log(matchData);
  emitCreateMatch(matchData);
};

const updateMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
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

const addMatch = (match: MatchData) => {
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

  // useEffect(() => {
  //   fetchTest().then((data) => setMessage(data));
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            index
            element={
              <Home
                message={message}
                createMatchListener={createMatchListener}
                updateMatchListener={updateMatchListener}
                updateUser={updateUser}
              />
            }
          />
          <Route path="/lobby" element={<Lobby />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
