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
      if (!user) return new Error('User not found');
      if (!user.cfnName) return new Error('User must have CFN name');

      const updatedMatch = {
        ...match,
        playerTwoId: user.id,
        playerOneCfn: user.cfnName,
        status: 'pending',
      };
      setMatches((prev) =>
        prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
      );
    };

    socket.on('match created', handleMatchCreated);
    socket.on('applied to match', handleMatchApply);

    return () => {
      socket.off('match created', handleMatchCreated);
      socket.off('apply to match', handleMatchApply);
    };
  }, [setMatches, user]);
};
