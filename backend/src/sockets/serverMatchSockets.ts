import { Socket } from 'socket.io';

import { ServerSocket } from './index';

import {
  createMatch,
  updateMatch,
  getAllOpenMatches,
  getOneMatch,
} from '../services/matchServices';

import { getOneUser, updateUser } from '../services/userServices';

const requireAuth = (socket: Socket, cb: () => void) => {
  if (!socket.data.user) {
    socket.emit('error', { message: 'Unauthorized ' });
    return;
  }
  cb();
};

export const matchSocket = (socket: Socket) => {
  const io = ServerSocket.getIO();

  socket.on('create match', (match) => {
    requireAuth(socket, async () => {
      try {
        const user = await getOneUser(match.playerOneId);
        const newMatch = await createMatch(match);
        await updateUser(user!.id, { canApplyJoin: false });

        io.to(socket.id).emit('user updated', { canApplyJoin: false });
        io.emit('match created', newMatch);
      } catch (err) {
        console.error(`Error creating match: ${err}`);
      }
    });
  });

  socket.on('cancel match', (match) => {
    requireAuth(socket, async () => {
      try {
        const cancelledMatch = await updateMatch(match.id, {
          ...match,
          status: 'cancelled',
        });

        await updateUser(match.playerOneId, { canApplyJoin: true });

        const applicantSocketId =
          ServerSocket.instance.userIdToSocketId[match.playerTwoId];

        if (applicantSocketId) {
          io.to(applicantSocketId).emit('user updated', { canApplyJoin: true });
        }

        io.to(socket.id).emit('user updated', { canApplyJoin: true });
        io.emit('match cancelled', cancelledMatch);
      } catch (err) {
        console.error(err);
      }
    });
  });

  socket.on('apply to match', (match) => {
    requireAuth(socket, async () => {
      try {
        const applicant = await getOneUser(socket.data.user.id);
        const updatedMatch = await updateMatch(match.id, {
          ...match,
          playerTwoId: applicant?.id,
          playerTwoCfn: applicant?.cfnName,
          applicantCharId: applicant?.mainCharacterId,
          status: 'pending',
        });
        if (!applicant) return new Error('No applicant found');

        updateUser(applicant.id, {
          canApplyJoin: false,
        });

        io.to(socket.id).emit('user updated', { canApplyJoin: false });
        io.emit('applied to match', updatedMatch);
      } catch (err) {
        console.error(err);
      }
    });
  });

  socket.on('reopen match', (match) => {
    requireAuth(socket, async () => {
      try {
        const updatedMatch = await updateMatch(match.id, {
          ...match,
          playerTwoId: null,
          playerTwoCfn: null,
          status: 'open',
        });
        await updateUser(match.playerTwoId, {
          canApplyJoin: true,
        });

        const applicantSocketId =
          ServerSocket.instance.userIdToSocketId[match.playerTwoId];

        if (applicantSocketId) {
          io.to(applicantSocketId).emit('user updated', { canApplyJoin: true });
        }

        io.emit('match reopened', updatedMatch);
      } catch (err) {
        console.error(err);
      }
    });
  });

  socket.on('start match', (match) => {
    requireAuth(socket, async () => {
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
  });
};
