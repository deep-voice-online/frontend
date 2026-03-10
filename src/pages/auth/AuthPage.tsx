import { LoginForm } from '@/features/auth-by-email';

export function AuthPage() {
  return (
    <div className="min-h-svh flex items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Deep Voice</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Транскрибатор с дополнительными возможностями
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
