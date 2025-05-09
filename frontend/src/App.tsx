import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import './App.css';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/Navigation.component';
import { Lobby } from './routes/lobby/lobby.component';
import { AuthContext } from './contexts/auth.context';

import { socket } from './sockets/index';
import { emitCreateMatch } from './sockets/clientMatchSockets';
import { useMatchSocketListeners } from './hooks/useMatchSocketListeners';

socket.on('connect', () => {
  console.log('Connected from client: ' + socket.id);
});

const updateUser = () => {
  const user = {
    id: 1,
    mainCharacterId: 1,
    rankId: 20,
  };
  socket.emit('update user', user);
};

socket.on('updated user', () => {
  console.log('updated user emit received on front end');
});

// socket.on('match updated', (callback) => {
//   console.log('match updated emit received on front end: ', callback);
// });

// const addMatch = (match: MatchData) => {
//   const matchList = document.getElementById('matches');
//   const newMatch = document.createElement('p');
//   const applyButton = document.createElement('button');

//   newMatch.setAttribute('matchId', match.id);
//   newMatch.setAttribute('playerOneId', match.playerOneId);
//   newMatch.setAttribute('characterOneId', match.characterOneId);
//   newMatch.setAttribute('playerTwoId', match.playerTwoId);
//   newMatch.setAttribute('characterTwoId', match.characterTwoId);
//   newMatch.setAttribute('status', match.status);

//   applyButton.innerHTML = `Apply to match`;
//   newMatch.innerHTML = `Match ID: ${match.id}, Player 1 ID: ${match.playerOneId}, Status: ${match.status}`;

//   matchList?.append(newMatch);
// };

// socket.on('new match', addMatch);

function App() {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  useMatchSocketListeners();

  const createMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Create match button clicked');
    if (!user || !user.cfnName) {
      console.log('Short circuit in create match, no user or no cfn');
      return;
    }

    const matchData = {
      playerOneId: user.id,
      characterOneId: 2,
      creatorSocketId: socket.id,
      playerOneCfn: user.cfnName,
      playerTwoCfn: 'p2 cfn',
    };
    console.log(matchData);
    socket.emit('create match', matchData);
  };

  const updateMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e);
    console.log('Update match button clicked');
    const matchData = {
      id: 4,
      playerOneId: 1,
      characterOneId: 1,
      playerTwoId: 2,
      characterTwoId: 2,
      status: 'pending',
    };

    socket.emit('update match', matchData);
    return;
  };

  const applyToMatch = (e: React.MouseEvent<HTMLButtonElement>) => {};

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
