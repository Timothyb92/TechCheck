import { useContext } from 'react';

// import { socket } from '../../sockets';
import { getAvailableActions } from '../../utils/matchActions';
// import { emitUpdateMatch } from '../../sockets/clientMatchSockets';

import { MatchType, UserType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

import { AuthContext } from '../../contexts/auth.context';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  const { user } = useContext(AuthContext);

  // const handleApply = () => {
  //   if (!user) return;
  //   match.status = 'pending';
  //   emitUpdateMatch(user, match);
  // };

  const actions = getAvailableActions(match, user as UserType);

  //TODO Update button section to use matchActionButton
  return (
    <>
      <div
        className={`match-card status-${match.status} ${
          user && match.status === 'pending' && match.playerOneId === user.id
            ? 'notice'
            : ''
        }
        ${
          user && match.status === 'pending' && match.playerTwoId === user.id
            ? 'applied'
            : ''
        }`}
      >
        <CharacterImage characterId={match.characterOneId} />
        <p>Hosted by {match.playerOneCfn}</p>
        <div className="matchup-container">
          <Bubble className="matchup-bubble">Ryu</Bubble> VS{' '}
          <Bubble className="matchup-bubble">Any</Bubble>
        </div>
        <div className="button-container">
          {actions?.map((action, index) => {
            return (
              <Button
                key={index}
                onClick={action.onClick}
                className={action.style}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};
