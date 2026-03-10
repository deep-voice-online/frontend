const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.deep-voice.online/';
export const wsBaseUrl =
  import.meta.env.VITE_WS_URL ??
  apiUrl.replace(/^https:\/\//, 'wss://').replace(/^http:\/\//, 'ws://').replace(/\/?$/, '');

export const env = {
  apiUrl: apiUrl.replace(/\/?$/, ''),
  wsBaseUrl,
} as const;
