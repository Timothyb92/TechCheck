import { MatchType, UserType, MatchAction } from '../types/types';

import {
  emitApplyToMatch,
  emitBlockUser,
  emitReopenMatch,
  emitCancelMatch,
  emitStartMatch,
} from '../sockets/clientMatchSockets';

export const getAvailableActions = (match: MatchType, user: UserType) => {
  if (!match || !user || !user.rankId) return;

  const isCreator = match.playerOneId === user.id;
  const isApplicant = match.playerTwoId === user.id;
  const isOpen = match.status === 'open';
  const isPending = match.status === 'pending';
  const hasMainCharacter = user.mainCharacterId;
  const characterMatch =
    match.characterTwoId === user.mainCharacterId ||
    match.characterTwoId === 999;
  const rankMatch =
    (user.rankId >= match.minRank.id || match.minRank.id === 1) &&
    (user.rankId <= match.maxRank.id || match.maxRank.id === 1);

  const actions: MatchAction[] = [];

  if (isOpen && isCreator) {
    actions.push({
      label: 'Cancel Match',
      onClick: () => emitCancelMatch(match),
      style: 'primary',
    });
  }

  if (
    isOpen &&
    !isCreator &&
    !isApplicant &&
    hasMainCharacter &&
    characterMatch &&
    rankMatch &&
    user.canApplyJoin
  ) {
    actions.push({
      label: 'Join Match',
      onClick: () => emitApplyToMatch(match),
      style: 'primary',
    });
  }

  if (isPending && isApplicant) {
    actions.push({
      label: 'Cancel Join',
      onClick: () => emitReopenMatch(match),
      style: 'applied',
    });
  }

  if (isPending && isCreator) {
    actions.push(
      {
        label: 'Decline',
        onClick: () => emitReopenMatch(match),
        style: 'decline',
      },
      {
        label: 'Accept',
        onClick: () => emitStartMatch(match),
        style: 'accept',
      },
      {
        label: 'Block User',
        onClick: () => emitBlockUser(match),
        style: 'decline',
      }
    );
  }

  return actions;
};
