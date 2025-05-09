import { Socket } from 'socket.io';

import { ServerSocket } from './index';

import {
  createMatch,
  updateMatch,
  getAllOpenMatches,
} from '../services/matchServices';

export const matchSocket = (socket: Socket) => {
  const io = ServerSocket.getIO();

  socket.on('create match', async (matchData) => {
    try {
      const newMatch = await createMatch(matchData);

      io.emit('match created', newMatch);
    } catch (err) {
      console.error(`Error creating match: ${err}`);
    }
  });

  socket.on('update match', async (matchData) => {
    console.log('Match data in socket:', matchData);
    try {
      const updatedMatch = await updateMatch(matchData.id, matchData);

      switch (updatedMatch.status) {
        case 'open':
          io.emit('match reopened', updatedMatch);
          break;

        case 'pending':
          io.emit('applied to match', updatedMatch);
          break;

        case 'matched':
          io.emit('match started', updatedMatch);
          break;

        case 'cancelled':
          io.emit('match cancelled', updatedMatch);
          break;

        case 'completed':
          io.emit('match completed', updatedMatch);
          break;
      }
      io.emit('match updated', updatedMatch);
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
