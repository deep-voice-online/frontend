import { useEffect, useState } from 'react';
import { createSocket } from './socket-client';

export function useSocket(userId: string | null) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) {
      setIsConnected(false);
      return;
    }

    const socket = createSocket(userId);
    setIsConnected(socket.connected);

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      setIsConnected(false);
    };
  }, [userId]);

  return { isConnected };
}
