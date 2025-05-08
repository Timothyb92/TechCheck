import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { matchSocket } from './serverMatchSockets';
import { userSocket } from './serverUserSockets';
import { JWT_SECRET } from '../config/env';

interface JwtPayload {
  id: number;
  cfnName?: string;
}

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string };

  constructor(server: HttpServer) {
    if (ServerSocket.instance) {
      throw new Error('ServerSocket has already been initialized');
    }

    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Missing socket token'));
      }

      try {
        const user = jwt.verify(token, JWT_SECRET!) as JwtPayload;
        socket.data.user = user;
        next();
      } catch (err) {
        console.error(err);
      }
    });

    this.io.on('connect', this.StartListeners);

    console.info('Socket IO started.');
  }

  StartListeners = (socket: Socket) => {
    console.info('New connection from ' + socket.id);

    matchSocket(socket);
    userSocket(socket);

    socket.on('handshake', () => {
      console.info('Handshake received from ' + socket.id);
    });

    socket.on('disconnect', () => {
      console.info('Disconnect received from ' + socket.id);
    });
  };
}
