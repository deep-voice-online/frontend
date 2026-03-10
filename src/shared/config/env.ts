const apiUrl =
  (import.meta.env.VITE_API_URL || '').trim() || 'https://deep-voice.online/api';
export const wsBaseUrl =
  (import.meta.env.VITE_WS_URL || '').trim() ||
  'wss://deep-voice.online';

export const env = {
  apiUrl: apiUrl.replace(/\/?$/, ''),
  wsBaseUrl,
} as const;
