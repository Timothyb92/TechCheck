import { MatchType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

import { socket } from '../../sockets';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  //TODO Take in current user as argument | Needed to populate match data with user info (mainCharacter, cfnName, etc)

  const handleApply = () => {
    socket.emit('update match', {
      matchId: match.id,
      status: 'pending',
      playerTwoId: match.playerTwoId,
      characterTwoId: match.characterTwoId,
    });
  };

  return (
    <>
      <div className="match-card">
        {/* Character pfp, passing character ID as prop */}
        {/* character bubble vs opponent character bubble */}
        {/* region bubble, rank bubble */}
        {/* join match button */}
        {/* Cancel match button IF USER CREATED IT */}
        <CharacterImage characterId={match.characterOneId} />
        <p>Hosted by {match.playerOneCfn}</p>
        <div className="matchup-container">
          <Bubble className="matchup-bubble">Ryu</Bubble> VS{' '}
          <Bubble className="matchup-bubble">Any</Bubble>
        </div>
        {match.creatorSocketId === socket.id ? (
          <Button>Cancel Match</Button>
        ) : (
          <Button>Join Match</Button>
        )}
      </div>
    </>
  );
};
