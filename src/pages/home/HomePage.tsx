import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/widgets/app-header';
import { FileDropZone } from '@/features/upload-file';

export function HomePage() {
  const navigate = useNavigate();

  function handleUploadComplete() {
    navigate('/files');
  }

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl w-full mx-auto">
        <section>
          <h2 className="text-lg font-semibold mb-4">Загрузить аудио</h2>
          <FileDropZone onUploadComplete={handleUploadComplete} />
        </section>
      </main>
    </div>
  );
}
