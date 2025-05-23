import { Socket } from 'socket.io';

import { ServerSocket } from './index';

import {
  createMatch,
  updateMatch,
  getAllOpenMatches,
  getOneMatch,
} from '../services/matchServices';

import { getOneUser } from '../services/userServices';

export const matchSocket = (socket: Socket) => {
  const io = ServerSocket.getIO();

  socket.on('create match', async (match) => {
    try {
      const newMatch = await createMatch(match);

      io.emit('match created', newMatch);
    } catch (err) {
      console.error(`Error creating match: ${err}`);
    }
  });

  socket.on('cancel match', async (match) => {
    try {
      const cancelledMatch = await updateMatch(match.id, {
        ...match,
        status: 'cancelled',
      });
      io.emit('match cancelled', cancelledMatch);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('apply to match', async (match) => {
    try {
      const applicant = await getOneUser(socket.data.user.id);
      const updatedMatch = await updateMatch(match.id, {
        ...match,
        playerTwoId: applicant?.id,
        playerTwoCfn: applicant?.cfnName,
        applicantCharId: applicant?.mainCharacterId,
        status: 'pending',
      });
      io.emit('applied to match', updatedMatch);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('reopen match', async (match) => {
    try {
      const updatedMatch = await updateMatch(match.id, {
        ...match,
        playerTwoId: null,
        playerTwoCfn: null,
        status: 'open',
      });
      io.emit('match reopened', updatedMatch);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('start match', async (match) => {
    try {
      const matchToStart = await getOneMatch(match.id);
      const applicantCharId = matchToStart?.applicantCharId;

      if (!matchToStart) return new Error('No match to start');
      const updatedMatch = await updateMatch(matchToStart.id, {
        ...match,
        characterTwoId: applicantCharId,
        status: 'matched',
      });
      io.emit('match started', updatedMatch);
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
