import { MatchType, UserType } from '../types/types';

export const getCustomRoomActions = (match: MatchType, user: UserType) => {
  const isCreator = match.playerOne.id === user.id;
  const isPlayerTwo = match.playerTwo?.id === user.id;
  const matchStarted = match.status === 'matched';

  const customRoomActions = [];

  if (isCreator) {
    customRoomActions.push(
      {
        label: 'Edit',
        onClick: () => {},
      },
      {
        label: 'Copy',
        onClick: () => {},
      }
    );
  }

  if (isPlayerTwo && matchStarted) {
    customRoomActions.push({
      label: 'Copy',
      onClick: () => {},
    });
  }

  return customRoomActions;
};
