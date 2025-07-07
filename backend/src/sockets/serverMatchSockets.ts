import { Socket } from 'socket.io';

import { ServerSocket } from './index';

import {
  createMatch,
  updateMatch,
  getOneMatch,
  getAllOpenMatches,
  getActiveMatchesByUser,
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

  socket.on('user disconnecting', async () => {
    try {
      const userId = +socket.data?.user?.id;
      if (!userId) return;

      const match = await getActiveMatchesByUser(userId);
      if (!match) return;

      const isPlayerOne = +match.playerOneId === userId;
      const isPlayerTwo = match.playerTwoId && +match.playerTwoId === userId;

      if (isPlayerOne) {
        const cancelledMatch = await updateMatch(match.id, {
          ...match,
          status: 'cancelled',
        });

        if (match.playerTwoId) {
          const playerTwoSocketId =
            ServerSocket.instance.userIdToSocketId[match.playerTwoId];

          await updateUser(match.playerTwoId, { canApplyJoin: true });
          io.to(playerTwoSocketId).emit('user updated', { canApplyJoin: true });
        }

        await updateUser(userId, { canApplyJoin: true });

        io.to(socket.id).emit('user updated', { canApplyJoin: true });
        io.emit('match cancelled', cancelledMatch);
      }

      if (isPlayerTwo) {
        const isOngoingMatch = match.status === 'matched';
        const playerOneSocketId =
          ServerSocket.instance.userIdToSocketId[match.playerOneId];

        if (isOngoingMatch) {
          const updatedMatch = await updateMatch(match.id, {
            ...match,
            status: 'completed',
          });

          await updateUser(match.playerOneId, { canApplyJoin: true });

          io.to(playerOneSocketId).emit('user updated', { canApplyJoin: true });
          io.emit('match cancelled', updatedMatch);
        } else {
          const updatedMatch = await updateMatch(match.id, {
            ...match,
            playerTwoId: null,
            applicantCharId: match.characterTwoId,
            status: 'open',
          });

          io.emit('match reopened', updatedMatch);
        }

        await updateUser(userId, { canApplyJoin: true });

        const playerTwoSocketId =
          ServerSocket.instance.userIdToSocketId[userId];
        if (playerTwoSocketId) {
          io.to(playerTwoSocketId).emit('user updated', { canApplyJoin: true });
        }
      }
    } catch (err) {
      console.error('Error handling user disconnect:', err);
    }
  });

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

        const playerOneSocketId =
          ServerSocket.instance.userIdToSocketId[match.playerOneId];

        const applicantSocketId =
          ServerSocket.instance.userIdToSocketId[match.playerTwoId];

        if (applicantSocketId) {
          io.to(applicantSocketId).emit('user updated', { canApplyJoin: true });
        }

        io.to(playerOneSocketId).emit('user updated', { canApplyJoin: true });
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
        const playerTwoInput = {
          id: applicant?.id,
          rankId: applicant?.rankId,
          mainCharacterId: applicant?.mainCharacterId,
          cfnName: applicant?.cfnName,
          canApplyJoin: applicant?.canApplyJoin,
          locale: applicant?.locale,
          userCode: applicant?.userCode,
          Character: {
            id: applicant?.mainCharacterId,
          },
        };
        const updatedMatch = await updateMatch(match.id, {
          ...match,
          playerTwoId: applicant?.id,
          playerTwo: playerTwoInput,
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
          applicantCharId: null,
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
