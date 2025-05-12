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

    const handleMatchApply = (match: MatchType) => {
      setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    };

    const handleMatchReopen = (match: MatchType) => {
      setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    };

    const handleStartMatch = (match: MatchType) => {
      setMatches((prev) => prev.map((m) => (m.id === match.id ? match : m)));
    };

    socket.on('match created', handleMatchCreated);
    socket.on('applied to match', handleMatchApply);
    socket.on('reopen match', handleMatchReopen);
    socket.on('match started', handleStartMatch);

    return () => {
      socket.off('match created', handleMatchCreated);
      socket.off('apply to match', handleMatchApply);
      socket.off('reopen match', handleMatchReopen);
      socket.off('match started', handleStartMatch);
    };
  }, [setMatches, user]);
};
