import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAuth: () => set({ accessToken: null }),
      isAuthenticated: () => Boolean(get().accessToken),
    }),
    { name: 'deep-voice-auth' }
  )
);
