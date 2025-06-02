import { MatchType, UserType } from '../types/types';

export const getCustomRoomActions = (match: MatchType, user: UserType) => {
  const isCreator = match.playerOneId === user.id;
  const isPlayerTwo = match.playerTwoId === user.id;
  const matchStarted = match.status === 'matched';

  const customRoomActions = [];

  if (isCreator) {
    customRoomActions.push(
      {
        label: 'Edit',
        onClick: () => {
          console.log('edit');
        },
      },
      {
        label: 'Copy',
        onClick: () => {
          console.log('p1 copy');
        },
      }
    );
  }

  if (isPlayerTwo && matchStarted) {
    customRoomActions.push({
      label: 'Copy',
      onClick: () => {
        console.log('p2 copy');
      },
    });
  }

  return customRoomActions;
};
