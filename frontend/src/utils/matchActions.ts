import { MatchType, UserType, MatchAction } from '../types/types';

import {
  emitApplyToMatch,
  // emitBlockUser,
  emitReopenMatch,
  emitCancelMatch,
  emitStartMatch,
} from '../sockets/clientMatchSockets';

export const getMatchActions = (match: MatchType, user: UserType) => {
  if (!match || !user || !user.rankId) return;

  const isCreator = match.playerOneId === user.id;
  const isApplicant = match.playerTwoId === user.id;
  const isParticipant =
    match.playerOneId === user.id || match.playerTwoId === user.id;
  const isOngoing = match.status === 'matched';
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
      // style: 'cancel-match',
      variant: 'cancel',
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
      // style: 'join-match',
      variant: 'join',
    });
  }

  if (isOpen && !isCreator && !isApplicant) {
    if (!user.canApplyJoin) {
      actions.push({
        label: 'Join Match',
        onClick: () => null,
        // style: 'join-match-disabled match-disabled',
        variant: 'disabled',
        tooltip: '⚠️ You already have an open match',
      });
    } else if (!characterMatch || !rankMatch) {
      actions.push({
        label: 'Join Match',
        onClick: () => null,
        // style: 'join-match-disabled char-rank-disabled',
        variant: 'join',
        tooltip:
          '⚠️ You do not meet the Character or Rank requirements for this match',
      });
    }
  }

  if (isPending && isApplicant) {
    actions.push({
      label: 'Cancel Join',
      onClick: () => emitReopenMatch(match),
      // style: 'cancel-join',
      variant: 'cancel',
    });
  }

  if (isPending && isCreator) {
    actions.push(
      {
        label: 'Accept',
        onClick: () => emitStartMatch(match),
        // style: 'accept-match',
        variant: 'accept',
      },
      {
        label: 'Decline',
        onClick: () => emitReopenMatch(match),
        // style: 'decline-match',
        variant: 'decline',
      }
      //! Future feature
      // {
      //   label: 'Block User',
      //   onClick: () => emitBlockUser(match),
      //   style: 'block-user',
      // }
    );
  }

  if (isParticipant && isOngoing) {
    actions.push({
      label: 'Complete Match',
      onClick: () => emitCancelMatch(match),
      // style: 'complete-match',
      variant: 'complete',
    });
  }

  return actions;
};
