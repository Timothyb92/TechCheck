import { useState, useEffect } from 'react';
import './App.css';
import { fetchTest } from './api';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTest().then((data) => setMessage(data));
  }, []);

  return <h1>{message || 'Loading...'}</h1>;
}

export default App;
