import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let socketReady = false;
let readyPromiseResolve: (() => void) | null = null;

const readyPromise = new Promise<void>((resolve) => {
  readyPromiseResolve = resolve;
});

export const initializeSocket = (token?: string) => {
  if (socket) socket.disconnect();

  socket = io(import.meta.env.VITE_BASE_URL, {
    auth: token ? { token } : undefined,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
    socketReady = true;
    readyPromiseResolve?.();
  });

  return socket;
};

export const getSocket = () => {
  if (!socket || !socketReady) {
    throw new Error('Socket not initialized');
  }
  return socket;
};

export const onSocketReady = () => readyPromise;
