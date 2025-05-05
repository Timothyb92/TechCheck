import { socket } from '.';

import { MatchType } from '../types/types';

export const emitCreateMatch = (matchData: MatchType) => {
  socket.emit('create match', matchData);
};

export const emitUpdateMatch = (matchData: MatchType) => {
  socket.emit('update match', matchData);
};

export const emitCancelMatch = (matchData: MatchType) => {
  socket.emit('cancel match', matchData);
};

export const emitApplyToMatch = (matchData: MatchType) => {
  socket.emit('apply to match', matchData);
};

export const emitDeclineMatchApplication = (matchData: MatchType) => {
  socket.emit('decline match application', matchData);
};

export const emitStartMatch = (matchData: MatchType) => {
  socket.emit('start match', matchData);
};

export const emitCloseMatch = (matchData: MatchType) => {
  socket.emit('close match', matchData);
};
