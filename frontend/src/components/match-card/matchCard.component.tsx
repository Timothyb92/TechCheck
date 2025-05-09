import { useContext } from 'react';

import { MatchType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
// import { matchActionButton } from '../matchActionButton/matchActionButton';
import { CharacterImage } from '../character-image/characterImage.component';

import { socket } from '../../sockets';

import { AuthContext } from '../../contexts/auth.context';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  const { user } = useContext(AuthContext);

  const handleApply = () => {
    socket.emit('update match', {
      id: match.id,
      status: 'pending',
      playerTwoId: user?.id,
      characterTwoId: 3,
    });
  };

  //TODO Update button section to use matchActionButton
  return (
    <>
      <div className={`match-card status-${match.status}`}>
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
        {/* {!user ? null : matchActionButton(match, user)} */}
        {!user ? null : match.playerOneId === user.id ? (
          <Button>Cancel Match</Button>
        ) : (
          <Button onClick={handleApply}>Join Match</Button>
        )}
      </div>
    </>
  );
};
