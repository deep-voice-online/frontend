import { useEffect } from 'react';
import { getSocket } from './socket-client';
import type { SocketEventHandler } from './socket-client';

export function useSocketEvent<T>(event: string, handler: SocketEventHandler<T> | null) {
  useEffect(() => {
    if (!handler) return;

    const socket = getSocket();
    if (!socket) return;

    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}
