import { Socket } from 'socket.io';
import fetch from 'node-fetch';

export const matchSocket = (socket: Socket) => {
  socket.on('create match', (data) => {
    const matchData = JSON.stringify(data);
    console.log(
      `Create match socket running in server. Match data: ${JSON.stringify(
        matchData
      )}`
    );
    fetch('http://localhost:8000/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: matchData,
    });
  });
};
