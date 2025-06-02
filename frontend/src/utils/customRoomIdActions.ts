import { MatchType, UserType } from '../types/types';

export const getCustomRoomActions = (match: MatchType, user: UserType) => {
  const isCreator = match.playerOneId === user.id;
  const isPlayerTwo = match.playerTwoId === user.id;
  const matchStarted = match.status === 'matched';
  // let canViewRoomId = false;
  // let canEditRoomid = false;

  // const isOpen = match.status === 'open';
  // const isPending = match.status === 'pending';
  // const hasMainCharacter = user.mainCharacterId;
  // const characterMatch =
  //   match.characterTwoId === user.mainCharacterId ||
  //   match.characterTwoId === 999;
  // const rankMatch =
  //   (user.rankId >= match.minRank.id || match.minRank.id === 1) &&
  //   (user.rankId <= match.maxRank.id || match.maxRank.id === 1);

  //!Check if user is creator, can view and edit if creator
  //!Check if user is P2 AND status is matched - P2 can view

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
