import { useContext } from 'react';

import { MatchList } from '../../components/match-list/matchList.component';
import { Button } from '../../components/button/button.component';
import { emitCreateMatch } from '../../sockets/clientMatchSockets';

import { AuthContext } from '../../contexts/auth.context';

import { UserType } from '../../types/types';

export const Lobby = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Button onClick={() => emitCreateMatch(user as UserType)}>
          Create Match
        </Button>
        <h1>Lobby</h1>
        <div>
          Ongoing matches
          <MatchList />
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
