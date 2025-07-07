import { useContext } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="w-[95%] sm:w-[80%]">
        <div className="mb-6 text-[16px] sm:text-[20px]">
          <p className="py-8">
            TechCheck helps Street Fighter 6 players connect based on rank and
            main character so you can practice specific match-ups and improve
            faster. Choose your main, set your rank, and find the right sparring
            partner in seconds.
          </p>
          <p>
            Set up a custom room in game, and search your opponent's CFN name or
            User ID to invite them to your lobby.
          </p>
        </div>
        <h1 className="arcade-glow py-5">Lobby</h1>
        {user && hasSettingSelected ? (
          <Button
            className={`arcade-button mb-8 ${
              !user.canApplyJoin ? 'disabled open-match-disabled' : ''
            }`}
          >
            {user.canApplyJoin ? (
              <Link to="/create">Create Match</Link>
            ) : (
              <span>Create Match</span>
            )}
          </Button>
        ) : (
          <Button className="arcade-button disabled login-disabled mb-8">
            Create Match
          </Button>
        )}

        <div className="mb-10">
          <div className="relative inline-block">
            <h2 className="pb-2 text-3xl font-bold">Open Matches</h2>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white shadow-[0_0_4px_#8f00ff,0_0_8px_#8f00ff,0_0_16px_#8f00ff,0_0_24px_#8f00ff]"></div>
          </div>
          <MatchList matches={openMatches} />
        </div>

        <div className="mb-10">
          <div className="relative inline-block">
            <h2 className="pb-2 text-3xl font-bold">Active Matches</h2>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white shadow-[0_0_4px_#8f00ff,0_0_8px_#8f00ff,0_0_16px_#8f00ff,0_0_24px_#8f00ff]"></div>
          </div>
          <MatchList matches={ongoingMatches} />
        </div>
      </div>
    </>
  );
};
