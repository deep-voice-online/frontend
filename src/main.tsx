import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { setAuthTokenGetter } from '@/shared/api/graphql-client';
import { useAuthStore } from '@/entities/session';
import { AppProviders } from './app/providers';
import { AppRouter } from './app/router';

setAuthTokenGetter(() => useAuthStore.getState().accessToken);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
