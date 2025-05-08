import { useEffect, useState } from 'react';
import { http } from '../../api';

import { MatchList } from '../../components/match-list/matchList.component';

import { MatchType } from '../../types/types';

export const Lobby = () => {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await http.get<MatchType[]>('/matches');

        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <>
      <div>
        <h1>Lobby</h1>
        <div>
          Lobby
          <MatchList matches={matches}></MatchList>
          {/* Create Match button */}
          {/* All matches, open, in progres filter buttons */}
          {/* Open/active/online players count tags/bubbles */}
          {/* match list > match cards */}
        </div>
        <div>
          Player list
          {/* Online/in match sections player count */}
          {/* Player list > player cards */}
        </div>
      </div>
    </>
  );
};
