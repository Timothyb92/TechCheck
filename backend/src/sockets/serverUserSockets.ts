import { Socket } from 'socket.io';
import fetch from 'node-fetch';

export const userSocket = (socket: Socket) => {
  socket.on('update user', async (data) => {
    try {
      const userData = JSON.stringify(data);
      const response = await fetch(
        `http://localhost:8000/api/users/${data.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: userData,
        }
      );

      if (!response.ok) {
        console.error('Failed to update user');
        return;
      }

      const updatedUser = await response.json();
      socket.emit('updated user', updatedUser);
    } catch (err) {
      console.error(err);
    }
  });
};
