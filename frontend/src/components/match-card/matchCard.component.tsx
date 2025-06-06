import { useContext } from 'react';

import { getMatchActions } from '../../utils/matchActions';
import { MatchType, UserType } from '../../types/types';
import { getCharacterImage, getRankImage } from '../../utils/getImages';

import { Button } from '../button/button.component';

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
        <div className="vs-container">
          <div className="player player-one">
            <div className="player-one-info match-info">
              <div className="rank-center">
                <img
                  className="rank-img img"
                  src={getRankImage(2)}
                  alt="Player 1 rank"
                />
              </div>
              <p className="hosted-by">Hosted by {match.playerOneCfn}</p>
            </div>
            <img
              className="char-img img"
              src={getCharacterImage(match.characterOneId)}
              alt="char1 img"
            />
          </div>

          <div className="vs-text">
            <span>VS</span>
          </div>

          <div className="player player-two">
            <img
              className="char-img img"
              src={getCharacterImage(match.characterTwoId!)}
              alt=""
            />
            <div className="min-max-rank match-info">
              <p>
                Min Rank
                <br />
                <img
                  src={getRankImage(match.minRank.id)}
                  alt=""
                  className="rank-img min-rank-img"
                />
              </p>
              <p>
                <img
                  src={getRankImage(match.maxRank.id)}
                  alt={match.maxRank.id.toString()}
                  className="rank-img max-rank-img"
                />
                <br />
                Max Rank
              </p>
            </div>
          </div>
        </div>

        <div className="bottom-row">
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
          <span className="custom-room-id">
            {canViewCustomRoomId() ? (
              <span>Custom Room ID: {match.customRoomId}</span>
            ) : null}
          </span>
        </div>
      </div>
    </>
  );
};
