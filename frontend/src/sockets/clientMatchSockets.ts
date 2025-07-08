import { getSocket } from '.';

import { MatchType, UserType } from '../types/types';

export const emitCreateMatch = (
  user: UserType,
  passcode: string,
  characterTwoId: number,
  minRankId: number,
  maxRankId: number
) => {
  const socket = getSocket();
  const match = {
    playerOneId: user.id,
    passcode,
    characterTwoId,
    minRankId,
    maxRankId,
    player1: { rankId: user.rankId },
  };
  try {
    socket.emit('create match', match);
  } catch (err) {
    console.error(err);
  }
};

export const emitUpdateMatch = (user: UserType, match: MatchType) => {
  const socket = getSocket();

  switch (match.status) {
    case 'pending':
      if (!user.cfnName || !match.playerTwo) return;
      match.playerTwo.id = user.id;
      break;

    case 'cancelled':
      break;
  }
  socket.emit('update match', match);
};

export const emitCancelMatch = (matchData: MatchType) => {
  const socket = getSocket();
  socket.emit('cancel match', matchData);
};

export const emitApplyToMatch = (match: MatchType) => {
  const socket = getSocket();
  if (!match) return;
  socket.emit('apply to match', match);
};

export const emitReopenMatch = (match: MatchType) => {
  const socket = getSocket();
  if (!match) return;
  socket.emit('reopen match', match);
};

export const emitDeclineMatchApplication = (matchData: MatchType) => {
  const socket = getSocket();
  socket.emit('decline match application', matchData);
};

export const emitStartMatch = (matchData: MatchType) => {
  const socket = getSocket();
  socket.emit('start match', matchData);
};

export const emitBlockUser = (match: MatchType) => {
  const socket = getSocket();
  emitDeclineMatchApplication(match);
  socket.emit('block user', match);
};

export const emitCloseMatch = (matchData: MatchType) => {
  const socket = getSocket();
  socket.emit('close match', matchData);
};
