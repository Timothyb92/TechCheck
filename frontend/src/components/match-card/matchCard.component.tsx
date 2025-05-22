import { useContext } from 'react';

import { getAvailableActions } from '../../utils/matchActions';

import { MatchType, UserType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

import { AuthContext } from '../../contexts/auth.context';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  const { user } = useContext(AuthContext);

  const actions = getAvailableActions(match, user as UserType);

  //TODO Update button section to use matchActionButton
  if (match.status === 'cancelled' || match.status === 'completed') return;

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
        <p>Hosted by {match.playerOneCfn}</p>
        <div className="character-pic-container">
          <CharacterImage characterId={match.characterOneId} />
          <span>VERSUS</span>
          <CharacterImage characterId={match.characterTwoId!} />
        </div>
        <div className="matchup-container">
          <Bubble className="matchup-bubble">{match.characterOne.name}</Bubble>{' '}
          VS{' '}
          <Bubble className="matchup-bubble">
            {match.characterTwo?.name ?? 'Loading...'}
          </Bubble>
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
