import { Download, FileAudio, Loader2 } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useFileGetUserFiles } from '../api/use-file-get-user-files';
import { useFileDownloadLink } from '../api/use-file-download-link';
import { formatFileSize } from '../lib/format-file-size';
import { formatFileDate } from '../lib/format-date';

const DOWNLOADABLE_STATUSES = ['FILE_STATUS_UPLOADED', 'FILE_STATUS_READY'];

function FileRow({
  id,
  originalName,
  size,
  status,
  createdAt,
}: {
  id: string;
  originalName: string;
  size: number;
  status: string;
  createdAt: string;
}) {
  const { mutate: fetchDownloadLink, isPending } = useFileDownloadLink();

  function handleDownload() {
    fetchDownloadLink(id, {
      onSuccess: (data) => {
        const res = data as { fileInetDownloadLink?: { downloadUrl: string } };
        const url = res?.fileInetDownloadLink?.downloadUrl;
        if (url) {
          const a = document.createElement('a');
          a.href = url;
          a.download = originalName;
          a.target = '_blank';
          a.rel = 'noopener';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      },
    });
  }

  const canDownload = DOWNLOADABLE_STATUSES.includes(status);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <FileAudio className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
          <div className="min-w-0">
            <p className="font-medium truncate">{originalName}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(size)} · {formatFileDate(createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        <span
          className={
            status === 'FILE_STATUS_READY'
              ? 'text-green-600'
              : status === 'FILE_STATUS_FAILED'
                ? 'text-destructive'
                : ''
          }
        >
          {status.replace('FILE_STATUS_', '')}
        </span>
      </td>
      <td className="p-4 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          disabled={isPending || !canDownload}
          className="gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          ) : (
            <Download className="w-4 h-4" aria-hidden />
          )}
          Скачать
        </Button>
      </td>
    </tr>
  );
}

export function FileList() {
  const { data, isLoading, error } = useFileGetUserFiles();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" aria-hidden />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-[var(--color-destructive)] py-6">
        Ошибка загрузки списка файлов
      </p>
    );
  }

  const res = data as { fileGetUserFiles?: { files: Array<{ id: string; originalName: string; size: number; status: string; createdAt: string }> } } | undefined;
  const files = res?.fileGetUserFiles?.files ?? [];

  if (files.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileAudio className="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden />
        <p>Пока нет загруженных файлов</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Файл
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Статус
            </th>
            <th className="p-4" />
          </tr>
        </thead>
        <tbody>
          {files.map((file: { id: string; originalName: string; size: number; status: string; createdAt: string }) => (
            <FileRow
              key={file.id}
              id={file.id}
              originalName={file.originalName}
              size={file.size}
              status={file.status}
              createdAt={file.createdAt}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
