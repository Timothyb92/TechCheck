import { Socket } from 'socket.io';

import {
  createMatch,
  updateMatch,
  getAllOpenMatches,
} from '../services/matchServices';

export const matchSocket = (socket: Socket) => {
  socket.on('create match', async (matchData) => {
    try {
      const newMatch = await createMatch(matchData);

      socket.emit('match created', newMatch);
    } catch (err) {
      console.error(`Error creating match: ${err}`);
    }
  });

  socket.on('update match', async (matchData) => {
    try {
      const updatedMatch = await updateMatch(matchData.id, matchData);

      switch (updatedMatch.status) {
        case 'open':
          socket.emit('match reopened', updatedMatch);
          break;

        case 'pending':
          socket.emit('applied to match', updatedMatch);
          break;

        case 'matched':
          socket.emit('match started', updatedMatch);
          break;

        case 'cancelled':
          socket.emit('match cancelled', updatedMatch);
          break;

        case 'completed':
          socket.emit('match completed', updatedMatch);
          break;
      }
      socket.emit('match updated', updatedMatch);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('connect', async () => {
    try {
      const ongoingMatches = await getAllOpenMatches();

      socket.emit('open matches fetch', ongoingMatches);
    } catch (err) {
      console.error(err);
    }
  });
};
