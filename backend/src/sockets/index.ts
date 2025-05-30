import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
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

  static getIO(): Server {
    if (!ServerSocket.instance) {
      throw new Error('ServerSocket not yet initialized');
    }

    return ServerSocket.instance.io;
  }

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

      if (token) {
        try {
          const user = jwt.verify(token, JWT_SECRET!) as JwtPayload;
          socket.data.user = user;
          next();
        } catch (err) {
          console.warn(
            `Socket ID ${socket.id} invalid JWT token. Continuing without user`
          );
          next();
        }
      } else {
        next();
      }
    });

    this.io.on('connect', this.StartListeners);

    console.info('@@@@@@@@@@@@Socket IO started.@@@@@@@@@@@@@@@@@@');
  }

  StartListeners = (socket: Socket) => {
    socket.on('connect_error', (err) => {
      console.error(err);
    });
    console.info('New connection from ' + socket.id);

    matchSocket(socket);
    userSocket(socket);

    socket.on('disconnect', () => {
      console.info('Disconnect received from ' + socket.id);
    });
  };
}
