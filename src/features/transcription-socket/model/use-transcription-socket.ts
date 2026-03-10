import { useState, useCallback } from 'react';
import { useSocket, useSocketEvent } from '@/shared/socket';
import type { TranscriptionReadyPayload } from '@/shared/socket';

export function useTranscriptionSocket(userId: string | null) {
  const [transcription, setTranscription] = useState<string | null>(null);
  const { isConnected } = useSocket(userId);

  const handleTranscriptionReady = useCallback((data: TranscriptionReadyPayload) => {
    setTranscription((prev) => (prev ? `${prev}\n\n${data.text}` : data.text));
  }, []);

  useSocketEvent('transcription_ready', userId ? handleTranscriptionReady : null);

  const clearTranscription = useCallback(() => setTranscription(null), []);

  return { transcription, clearTranscription, isConnected };
}
