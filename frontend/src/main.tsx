// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.context.tsx';
import { MatchesProvider } from './contexts/matches.context.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <MatchesProvider>
        <App />
      </MatchesProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
);
