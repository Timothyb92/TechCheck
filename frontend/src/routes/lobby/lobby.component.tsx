import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MatchList } from '../../components/match-list/matchList.component';
import { Button } from '../../components/button/button.component';

import { MatchesContext } from '../../contexts/matches.context';

export const Lobby = () => {
  const { matches } = useContext(MatchesContext);

  const openMatches =
    matches.filter((match) => {
      if (!match.status) return;
      return ['open', 'pending'].includes(match.status);
    }) || [];

  const ongoingMatches =
    matches.filter((match) => {
      if (!match.status) return;
      return match.status === 'matched';
    }) || [];

  return (
    <>
      <div>
        <h1>Lobby</h1>
        <Link to="/create">
          <Button>Create Match</Button>
        </Link>
        <div>
          Open matches
          <MatchList matches={openMatches} />
        </div>
        <div>
          Ongoing matches
          <MatchList matches={ongoingMatches} />
        </div>
        <div>Player list</div>
      </div>
    </>
  );
};
