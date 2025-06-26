import { Routes, Route } from 'react-router-dom';

import { Navigation } from './routes/navigation/Navigation.component';
import { Lobby } from './routes/lobby/lobby.component';
import { CreateMatchForm } from './components/create-match-form/createMatchForm.component';
import { User } from './routes/user/user.component';
import { Footer } from './components/footer/footer.component';

import { useSocketListeners } from './hooks/useSocketListeners';

function App() {
  useSocketListeners();

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-[#242424] text-center text-white/90">
        <main className="flex w-full flex-grow flex-col items-center">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Lobby />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/create" element={<CreateMatchForm />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
