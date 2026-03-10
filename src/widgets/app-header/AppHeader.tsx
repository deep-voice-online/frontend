import { Link, useLocation } from 'react-router-dom';
import { LogOut, Mic2, FolderOpen } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAuthLogout } from '@/features/auth-by-email';
import { useAuthStore } from '@/entities/session';
import { cn } from '@/shared/lib';

export function AppHeader() {
  const location = useLocation();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { mutate: logout } = useAuthLogout();

  function handleLogout() {
    logout(undefined, {
      onSettled: () => clearAuth(),
    });
  }

  return (
    <header className="border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-semibold flex items-center gap-2">
          <Mic2 className="w-6 h-6" aria-hidden />
          Deep Voice
        </Link>
        <nav className="flex gap-1" aria-label="Основная навигация">
          <Link
            to="/"
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              location.pathname === '/'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            Загрузка
          </Link>
          <Link
            to="/files"
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2',
              location.pathname === '/files'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <FolderOpen className="w-4 h-4" aria-hidden />
            Мои файлы
          </Link>
        </nav>
      </div>
      <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
        <LogOut className="w-4 h-4" aria-hidden />
        Выйти
      </Button>
    </header>
  );
}
