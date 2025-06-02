import { useContext } from 'react';

import { getMatchActions } from '../../utils/matchActions';

import { MatchType, UserType } from '../../types/types';

import { Bubble } from '../bubble/bubble.component';
import { Button } from '../button/button.component';
import { CharacterImage } from '../character-image/characterImage.component';

import { AuthContext } from '../../contexts/auth.context';

import './matchCard.styles.css';

export const MatchCard = (match: MatchType) => {
  const { user } = useContext(AuthContext);

  const matchActions = getMatchActions(match, user as UserType);

  const canViewCustomRoomId = () => {
    if (user?.id === match.playerOneId) {
      return true;
    } else if (user?.id === match.playerTwoId && match.status === 'matched') {
      return true;
    } else {
      return false;
    }
  };

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
        <div className="rank-container">
          <p>
            Min rank:{' '}
            <Bubble className="rank-bubble">{match.minRank.name}</Bubble>
          </p>
          <p>
            Max rank:{' '}
            <Bubble className="rank-bubble">{match.maxRank.name}</Bubble>
          </p>
        </div>
        <div className="custom-room-id-container">
          <p>
            {canViewCustomRoomId() ? (
              <span>Custom Room ID: {match.customRoomId}</span>
            ) : null}
          </p>
        </div>
        <div className="button-container">
          {matchActions?.map((action, index) => {
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
