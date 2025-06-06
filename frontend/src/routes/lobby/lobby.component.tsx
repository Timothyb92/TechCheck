import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './lobby.styles.css';

import { MatchList } from '../../components/match-list/matchList.component';
import { Button } from '../../components/button/button.component';

import { MatchesContext } from '../../contexts/matches.context';
import { AuthContext } from '../../contexts/auth.context';

export const Lobby = () => {
  const { matches } = useContext(MatchesContext);
  const { user } = useContext(AuthContext);

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
      <div className="lobby-container">
        <h1 className="arcade-glow">Lobby</h1>
        {user ? (
          <Link to="/create">
            <Button className="arcade-button">Create Match</Button>
          </Link>
        ) : (
          <Button className="arcade-button disabled">Create Match</Button>
        )}
        <div>
          <span>Open Matches</span>
          <MatchList matches={openMatches} />
        </div>
        <div>
          <span>Active Matches</span>
          <MatchList matches={ongoingMatches} />
        </div>
        <div>Player list</div>
      </div>
    </>
  );
};
