import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://192.168.5.230:8000');
