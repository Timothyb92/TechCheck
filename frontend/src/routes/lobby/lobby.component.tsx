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

  const hasSettingSelected = !!(
    user?.rankId &&
    user.cfnName &&
    user.mainCharacterId
  );

  return (
    <>
      <div className="lobby-container">
        <div className="cta">
          <p>
            TechCheck helps Street Fighter 6 players connect based on rank and
            main character, so you can practice specific match-ups and improve
            faster.
          </p>
          <p>
            Choose your main, set your rank, and find the right sparring partner
            in seconds.
          </p>
        </div>
        <h1 className="arcade-glow">Lobby</h1>
        {user && hasSettingSelected ? (
          <Link to="/create">
            <Button
              className={`arcade-button ${
                !user.canApplyJoin ? 'disabled open-match-disabled' : ''
              }`}
            >
              Create Match
            </Button>
          </Link>
        ) : (
          <Button className="arcade-button disabled login-disabled">
            Create Match
          </Button>
        )}
        <div className="lobby-section">
          <h2 className="lobby-section-title">Open Matches</h2>
          <MatchList matches={openMatches} />
        </div>
        <div className="lobby-section">
          <h2 className="lobby-section-title">Active Matches</h2>
          <MatchList matches={ongoingMatches} />
        </div>
      </div>
    </>
  );
};
