import { Link } from 'react-router-dom';

import { MatchList } from '../../components/match-list/matchList.component';
import { Button } from '../../components/button/button.component';

export const Lobby = () => {
  return (
    <>
      <div>
        <h1>Lobby</h1>
        <Link to="/create">
          <Button>Create Match</Button>
        </Link>
        <div>
          Ongoing matches
          <MatchList />
        </div>
        <div>Player list</div>
      </div>
    </>
  );
};
