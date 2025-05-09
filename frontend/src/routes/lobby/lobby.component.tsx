import { MatchList } from '../../components/match-list/matchList.component';

export const Lobby = () => {
  return (
    <>
      <div>
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
