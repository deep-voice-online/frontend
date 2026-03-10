import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { useAuthStore } from '@/entities/session';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  return accessToken ? <>{children}</> : <Navigate to="/auth" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  return !accessToken ? <>{children}</> : <Navigate to="/" replace />;
}

const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
