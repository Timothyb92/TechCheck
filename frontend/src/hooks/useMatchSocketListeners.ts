import { socket } from '../sockets/index';
import { useContext, useEffect } from 'react';

import { MatchesContext } from '../contexts/matches.context';
import { AuthContext } from '../contexts/auth.context';

import { MatchType } from '../types/types';

export const useMatchSocketListeners = () => {
  const { setMatches } = useContext(MatchesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleMatchCreated = (newMatch: MatchType) => {
      setMatches((prev) => [...prev, newMatch]);
    };

    // const handleMatchApply = (match: MatchType) => {
    //   setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    // };

    // const handleMatchReopen = (match: MatchType) => {
    //   setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    // };

    // const handleStartMatch = (match: MatchType) => {
    //   setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    // };

    const handleUpdateMatch = (match: MatchType) => {
      setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    };

    socket.on('match created', handleMatchCreated);
    socket.on('applied to match', handleUpdateMatch);
    socket.on('match reopened', handleUpdateMatch);
    socket.on('match started', handleUpdateMatch);
    socket.on('match cancelled', handleUpdateMatch);

    return () => {
      socket.off('match created', handleMatchCreated);
      socket.off('apply to match', handleUpdateMatch);
      socket.off('match reopened', handleUpdateMatch);
      socket.off('match started', handleUpdateMatch);
      socket.off('match cancelled', handleUpdateMatch);
    };
  }, [setMatches, user]);
};
