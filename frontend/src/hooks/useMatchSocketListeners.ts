import { socket } from '../sockets/index';
import { useContext, useEffect } from 'react';

import { MatchesContext } from '../contexts/matches.context';
import { AuthContext } from '../contexts/auth.context';

import { MatchType, UserType } from '../types/types';

export const useMatchSocketListeners = () => {
  const { setMatches } = useContext(MatchesContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleMatchCreated = (newMatch: MatchType) => {
      setMatches((prev) => [...prev, newMatch]);
    };

    const handleUpdateMatch = (match: MatchType) => {
      setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    };

    const handleUpdateUser = (updatedUser: Partial<UserType>) => {
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...updatedUser,
        };
      });
    };

    socket.on('match created', handleMatchCreated);
    socket.on('applied to match', handleUpdateMatch);
    socket.on('match reopened', handleUpdateMatch);
    socket.on('match started', handleUpdateMatch);
    socket.on('match cancelled', handleUpdateMatch);
    socket.on('user updated', handleUpdateUser);

    return () => {
      socket.off('match created', handleMatchCreated);
      socket.off('apply to match', handleUpdateMatch);
      socket.off('match reopened', handleUpdateMatch);
      socket.off('match started', handleUpdateMatch);
      socket.off('match cancelled', handleUpdateMatch);
      socket.off('user updated', handleUpdateUser);
    };
  }, [setMatches, setUser, user]);
};
