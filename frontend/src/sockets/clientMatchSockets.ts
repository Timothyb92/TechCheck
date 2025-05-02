import { socket } from '.';

import { MatchType } from '../types/types';

export const emitCreateMatch = (matchData: MatchType) => {
  socket.emit('create match', matchData);
};
