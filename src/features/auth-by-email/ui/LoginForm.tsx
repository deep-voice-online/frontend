import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { useAuthLogin } from '../api/use-auth-login';
import { useAuthStore } from '@/entities/session';

export function LoginForm() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s: { setAccessToken: (t: string | null) => void }) => s.setAccessToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending, error } = useAuthLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          setAccessToken((data as { authLogin: { accessToken: string } }).authLogin.accessToken);
          navigate('/', { replace: true });
        },
      }
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Вход в Deep Voice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>
          {error ? (
            <p className="text-sm text-[var(--color-destructive)]" role="alert">
              {error.message}
            </p>
          ) : null}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
