import { AppHeader } from '@/widgets/app-header';
import { FileList } from '@/features/file-list';

export function FilesPage() {
  return (
    <div className="min-h-svh flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 p-4 lg:p-6 max-w-4xl w-full mx-auto">
        <section>
          <h2 className="text-lg font-semibold mb-4">Мои файлы</h2>
          <div className="rounded-lg border border-border bg-card">
            <FileList />
          </div>
        </section>
      </main>
    </div>
  );
}
