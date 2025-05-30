import { Socket } from 'socket.io';

import { updateUser } from '../services/userServices';

export const userSocket = (socket: Socket) => {
  socket.on('update user', async (userData) => {
    if (!socket.data.user) {
      socket.emit('error', { message: 'Unauthorized ' });
      return;
    }
    try {
      const updatedUser = updateUser(userData.id, userData);

      socket.emit('updated user', updatedUser);
    } catch (err) {
      console.error(err);
    }
  });
};
