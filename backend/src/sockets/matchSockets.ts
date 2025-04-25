import { Socket } from 'socket.io';
import fetch from 'node-fetch';

export const matchSocket = (socket: Socket) => {
  socket.on('create match', async (data) => {
    try {
      const matchData = JSON.stringify(data);
      const response = await fetch('http://localhost:8000/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: matchData,
      });

      if (!response.ok) {
        console.error(`Failed to create match`);
        return;
      }

      const newMatch = await response.json();

      socket.emit('new match', newMatch);
    } catch (err) {
      console.error(`Error creating match: ${err}`);
    }
  });

  socket.on('update match', async (data) => {
    try {
      const matchData = JSON.stringify(data);
      console.log(matchData);
      const response = await fetch(
        `http://localhost:8000/api/matches/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: matchData,
        }
      );

      if (!response.ok) {
        console.error(`Failed to update match`);
      }

      const updatedMatch = await response.json();

      socket.emit('match updated', updatedMatch);
    } catch (err) {
      console.error(err);
    }
  });
};
