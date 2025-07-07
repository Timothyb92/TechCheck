import { useContext, useEffect } from 'react';
import { getSocket } from '../sockets/index';

import { MatchesContext } from '../contexts/matches.context';
import { AuthContext } from '../contexts/auth.context';

import { MatchType, UserType } from '../types/types';

export const useSocketListeners = () => {
  const { setMatches } = useContext(MatchesContext);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const socket = getSocket();

        const handleMatchCreated = (newMatch: MatchType) => {
          setMatches((prev) => [...prev, newMatch]);
        };

        const handleUpdateMatch = (match: MatchType) => {
          setMatches((prev) =>
            prev.map((m) => (m.id === match.id ? match : m))
          );
        };

        const handleReopenMatch = (match: MatchType) => {
          setMatches((prev) =>
            prev.map((m) => (m.id === match.id ? match : m))
          );
        };

        const handleUpdateUser = (updatedUser: Partial<UserType>) => {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, ...updatedUser };
          });
        };

        const handleCancelMatch = (match: MatchType) => {
          setMatches((prev) => prev.filter((m) => m.id !== match.id));
        };

        const handleBeforeUnload = () => {
          socket.emit('user disconnecting');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        socket.on('match created', handleMatchCreated);
        socket.on('applied to match', handleUpdateMatch);
        socket.on('match reopened', handleReopenMatch);
        socket.on('match started', handleUpdateMatch);
        socket.on('match cancelled', handleCancelMatch);
        socket.on('user updated', handleUpdateUser);

        clearInterval(interval);
      } catch (err) {
        console.warn('Socket not ready yet', err);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      try {
        const socket = getSocket();
        socket.off('match created');
        socket.off('applied to match');
        socket.off('match reopened');
        socket.off('match started');
        socket.off('match cancelled');
        socket.off('user updated');
        window.removeEventListener('beforeunload', () => {
          socket.emit('user disconnecting');
        });
      } catch {
        console.warn('Cleanup skipped: socket not ready yet');
      }
    };
  }, [setMatches, setUser]);
};
