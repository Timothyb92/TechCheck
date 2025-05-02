import { MatchType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

export const MatchCard = (match: MatchType) => {
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
        <Bubble>Ryu</Bubble> VS <Bubble>Any</Bubble>
        <Button>Join match</Button>
      </div>
    </>
  );
};
