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
