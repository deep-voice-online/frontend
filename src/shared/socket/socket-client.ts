import { io, Socket } from 'socket.io-client';
import { env } from '@/shared/config';

export type TranscriptionReadyPayload = {
  text: string;
  receivedAt: string;
};

export type SocketEventHandler<T> = (data: T) => void;

let socketInstance: Socket | null = null;

export function createSocket(userId: string): Socket {
  if (socketInstance?.connected) {
    return socketInstance;
  }

  socketInstance = io(env.wsBaseUrl, {
    query: { userId },
    path: '/socket',
    transports: ['websocket'],
  });

  return socketInstance;
}

export function getSocket(): Socket | null {
  return socketInstance;
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}
