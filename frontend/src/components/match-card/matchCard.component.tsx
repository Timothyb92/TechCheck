import { MatchType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

import { socket } from '../../sockets';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  // console.log(match);
  // console.log(
  //   `Socket ID: ${socket.id} \n Creator ID: ${match.creatorSocketId}`
  // );
  return (
    <>
      <div className="match-card">
        {/* Character pfp, passing character ID as prop */}
        {/* character bubble vs opponent character bubble */}
        {/* region bubble, rank bubble */}
        {/* join match button */}
        {/* Cancel match button IF USER CREATED IT */}
        <CharacterImage characterId={match.characterOneId} />
        <p>Hosted by {match.playerOneId}</p>
        <div className="matchup-container">
          <Bubble className="matchup-bubble">Ryu</Bubble> VS{' '}
          <Bubble className="matchup-bubble">Any</Bubble>
        </div>
        <Button>
          {match.creatorSocketId === socket.id ? (
            <span>Cancel Match</span>
          ) : (
            <span>Join Match</span>
          )}
        </Button>
      </div>
    </>
  );
};
