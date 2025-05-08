import fetch from 'node-fetch';
import { Socket } from 'socket.io';

import {
  createMatch,
  updateMatch,
  getAllOpenMatches,
} from '../services/matchServices';

export const matchSocket = (socket: Socket) => {
  socket.on('create match', async (matchData) => {
    try {
      // const newMatch = await createMatch(matchData);
      const formattedMatch = JSON.stringify(matchData);
      const newMatch = await fetch('http://192.168.5.230:8000/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formattedMatch,
      });

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
