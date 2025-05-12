import { Routes, Route } from 'react-router-dom';
import { useState, useContext } from 'react';

import './App.css';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/Navigation.component';
import { Lobby } from './routes/lobby/lobby.component';
import { AuthContext } from './contexts/auth.context';

import { socket } from './sockets/index';
import { useMatchSocketListeners } from './hooks/useMatchSocketListeners';

const updateUser = () => {
  const user = {
    id: 1,
    mainCharacterId: 1,
    rankId: 20,
  };
  socket.emit('update user', user);
};

function App() {
  const { user } = useContext(AuthContext);

  useMatchSocketListeners();

  const createMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user || !user.cfnName) {
      return;
    }

    const matchData = {
      playerOneId: user.id,
      characterOneId: 2,
      creatorSocketId: socket.id,
      playerOneCfn: user.cfnName,
      playerTwoCfn: 'p2 cfn',
    };
    socket.emit('create match', matchData);
  };

  const updateMatchListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            index
            element={
              <Home
                message={''}
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
