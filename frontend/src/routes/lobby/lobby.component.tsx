import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GiCrossedSwords, GiBoxingGlove, GiJoystick } from 'react-icons/gi';

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
    <div className="flex w-[95%] flex-col items-center sm:w-[80%]">
      <div className="mb-4 max-w-2xl text-[16px] leading-relaxed text-white/80 sm:text-[18px]">
        <p className="py-8">
          TechCheck helps Street Fighter 6 players connect based on rank and
          main character so you can practice specific match-ups and improve
          faster. Choose your main, set your rank, and find the right
          sparring partner in seconds.
        </p>
        <p>
          Set up a custom room in game, and search your opponent's CFN name
          or User ID to invite them to your lobby.
        </p>
      </div>
      <h1 className="arcade-glow py-5">Lobby</h1>
      {user && hasSettingSelected ? (
        <Button
          className={`arcade-button mb-12 ${
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
        <Button className="arcade-button disabled login-disabled mb-12">
          Create Match
        </Button>
      )}

      <div className="mb-12 w-full">
        <div className="section-heading inline-flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <GiCrossedSwords className="text-[#cc66ff]" />
          Open Matches
        </div>
        <MatchList
          matches={openMatches}
          emptyIcon={<GiJoystick className="text-4xl text-[#cc66ff]/60" />}
          emptyMessage="No open matches right now. Create one and be the first challenger."
        />
      </div>

      <div className="mb-12 w-full">
        <div className="section-heading inline-flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <GiBoxingGlove className="text-[#cc66ff]" />
          Active Matches
        </div>
        <MatchList
          matches={ongoingMatches}
          emptyIcon={<GiJoystick className="text-4xl text-[#cc66ff]/60" />}
          emptyMessage="No active matches yet. Once you're matched up, it'll show here."
        />
      </div>
    </div>
  );
};
