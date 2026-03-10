import { AppHeader } from '@/widgets/app-header';
import { FileDropZone } from '@/features/upload-file';
import { useTranscriptionSocket } from '@/features/transcription-socket';
import { TranscriptionPanel } from '@/widgets/transcription-panel';
import { useAuthStore } from '@/entities/session';

export function HomePage() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const userId = (() => {
    if (!accessToken) return null;
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      return payload.sub as string;
    } catch {
      return null;
    }
  })();

  const { transcription, clearTranscription, isConnected } =
    useTranscriptionSocket(userId);

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl w-full mx-auto flex flex-col gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Загрузить аудио</h2>
          <FileDropZone />
        </section>
        <TranscriptionPanel
          text={transcription}
          onClear={clearTranscription}
          isConnected={isConnected}
        />
      </main>
    </div>
  );
}
