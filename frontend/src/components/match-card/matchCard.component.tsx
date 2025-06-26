import { useContext } from 'react';

import { getMatchActions } from '../../utils/matchActions';
import { MatchType, UserType } from '../../types/types';
import { getCharacterImage, getRankImage } from '../../utils/getImages';

import { Button } from '../button/button.component';

import { AuthContext } from '../../contexts/auth.context';

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
        className={`relative z-[1] my-2 flex w-full flex-col items-center justify-center rounded-sm border border-[#bb55ff] bg-gradient-to-r from-[#8f008f] via-[#2d0072] to-[#8f008f] px-0 py-4 text-white transition-shadow before:absolute before:inset-[-4px] before:rounded before:bg-[radial-gradient(ellipse_at_center,transparent_80%)] before:opacity-0 before:blur hover:shadow-[0_0_8px_#cc66ff,0_0_16px_#cc66ff,0_0_24px_#cc66ff] hover:before:opacity-100 sm:p-4 ${
          canViewCustomRoomId() && match.status === 'matched' ? 'alert' : ''
        } ${
          user && match.status === 'pending' && match.playerOneId === user.id
            ? 'notice'
            : ''
        } ${
          user && match.status === 'pending' && match.playerTwoId === user.id
            ? 'applied'
            : ''
        }`}
      >
        <div className="player-info mb-1 flex w-full flex-row items-center justify-between">
          <div className="flex w-1/3 flex-col items-center gap-2">
            <img
              className="h-10 sm:h-20"
              src={getCharacterImage(match.characterOneId)}
              alt="char1 img"
            />
            <p className="hosted-by">{match.playerOneCfn}</p>
          </div>

          <div className="flex w-1/3 flex-col items-center">
            <p className="arcade-glow">VS</p>
          </div>

          <div className="flex w-1/3 flex-col items-center gap-2">
            <img
              className="h-10 sm:h-20"
              src={
                match.applicantCharId
                  ? getCharacterImage(match.applicantCharId)
                  : getCharacterImage(match.characterTwoId!)
              }
              alt=""
            />
            <p
              className={`player-two-cfn ${
                !match.playerTwoCfn && 'text-gray-400'
              }`}
            >
              {match.playerTwoCfn ? match.playerTwoCfn : 'Waiting..'}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-1/3 flex-col items-center">
            <img
              className="h-8 sm:h-12"
              src={getRankImage(
                match.player1 && match.player1.rankId !== undefined
                  ? match.player1.rankId
                  : 50
              )}
              alt="Player 1 rank"
            />
          </div>

          <div className="flex w-1/3 flex-col items-center">
            {matchActions?.map((action, index) => {
              return (
                <Button
                  key={index}
                  onClick={action.onClick}
                  className={`${action.style} neon-button mb-2 cursor-pointer rounded-md py-1 font-semibold text-white sm:px-2`}
                  variant={action.variant}
                  tooltip={action.tooltip}
                >
                  {action.label}
                </Button>
              );
            })}
            <div className="custom-room-id">
              {canViewCustomRoomId() ? (
                <p className="custom-room-text">
                  Room ID: {match.customRoomId}
                </p>
              ) : null}
            </div>
          </div>

          <div className="felx-row flex w-1/3 justify-center gap-4">
            <div className="flex flex-col items-center text-white">
              <p>Min</p>
              <img
                src={getRankImage(match.minRank.id)}
                alt=""
                className="h-8 sm:h-12"
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-white">
              <p>Max</p>
              <img
                src={getRankImage(match.maxRank.id)}
                alt={match.maxRank.id.toString()}
                className="h-8 sm:h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
