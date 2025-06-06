import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/Navigation.component';
import { Lobby } from './routes/lobby/lobby.component';
import { CreateMatchForm } from './components/create-match-form/createMatchForm.component';
import { User } from './routes/user/user.component';

// import { socket } from './sockets/index';
import { useSocketListeners } from './hooks/useSocketListeners';

function App() {
  useSocketListeners();

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/create" element={<CreateMatchForm />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
