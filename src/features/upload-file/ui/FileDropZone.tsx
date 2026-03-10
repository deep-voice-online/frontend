import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/shared/lib';
import { useFileUpload } from '../model/use-file-upload';

interface FileDropZoneProps {
  onUploadComplete?: (fileId: string) => void;
  onError?: (error: Error) => void;
  accept?: string;
  disabled?: boolean;
}

export function FileDropZone({
  onUploadComplete,
  onError,
  accept = 'audio/*',
  disabled = false,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useFileUpload();

  async function handleFile(file: File | null) {
    if (!file || disabled) return;

    setError(null);
    setIsUploading(true);

    try {
      const { fileId } = await uploadFile(file);
      onUploadComplete?.(fileId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка загрузки';
      setError(message);
      onError?.(err instanceof Error ? err : new Error(message));
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleClick() {
    if (!disabled && !isUploading) inputRef.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 lg:p-12 transition-colors min-h-[200px] flex flex-col items-center justify-center gap-3 cursor-pointer',
        'hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isDragging && 'border-primary bg-primary/5',
        (disabled || isUploading) && 'opacity-60 cursor-not-allowed pointer-events-none'
      )}
      aria-disabled={disabled || isUploading}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden
      />
      {isUploading ? (
        <p className="text-muted-foreground text-sm">Загрузка...</p>
      ) : (
        <>
          <Upload className="w-10 h-10 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium text-foreground">
            Перетащите файл сюда или нажмите для выбора
          </p>
          <p className="text-xs text-muted-foreground">
            Аудиофайлы: mp3, wav, m4a и др.
          </p>
        </>
      )}
      {error ? (
        <p className="text-sm text-[var(--color-destructive)] mt-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
