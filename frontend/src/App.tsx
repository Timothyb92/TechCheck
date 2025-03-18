import { useState, useEffect } from 'react';
import './App.css';
import { fetchTest } from './api';

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
    </div>
  );
}

export default App;
