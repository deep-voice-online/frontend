import { LogOut } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAuthLogout } from '@/features/auth-by-email';
import { useAuthStore } from '@/entities/session';

export function HomePage() {
  const clearAuth = useAuthStore((s: { clearAuth: () => void }) => s.clearAuth);
  const { mutate: logout } = useAuthLogout();

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        clearAuth();
      },
      onSettled: () => {
        clearAuth();
      },
    });
  }

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <header className="border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Deep Voice</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" aria-hidden />
          Выйти
        </Button>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-foreground">
            Главный экран
          </h2>
          <p className="text-muted-foreground mt-2">
            Заглушка — здесь будет интерфейс для загрузки и транскрибации
            аудио.
          </p>
        </div>
      </main>
    </div>
  );
}
