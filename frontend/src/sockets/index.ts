import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let socketReady = false;
let initialized = false;

export const initializeSocket = (token?: string) => {
  if (initialized && socket) {
    console.warn('InitializeSocket called more than once - skipping');
    return socket;
  }

  initialized = true;

  socket = io(import.meta.env.VITE_BASE_URL, {
    transports: ['websocket'],
    auth: token ? { token } : undefined,
  });

  if (!socket.hasListeners('connect')) {
    socket.on('connect', () => {
      socketReady = true;
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('🚫 getSocket failed');
    throw new Error('Socket not initialized');
  }
  return socket;
};

export const isSocketReady = () => socketReady;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    initialized = false;
  }
};
