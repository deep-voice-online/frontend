import { useRef, useState } from 'react';
import { Upload, FileAudio, X, Mic } from 'lucide-react';

type TranscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<TranscribeStatus>('idle');
  const [result, setResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStatus('idle');
    setResult('');
    setErrorMsg('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!file) return;

    setStatus('loading');
    setResult('');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://deep-voice.online/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      setResult(typeof data === 'string' ? data : (data.text ?? JSON.stringify(data)));
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Неизвестная ошибка');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Mic size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Deep Voice</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          {/* Title block */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Транскрибация аудио
            </h2>
            <p className="text-slate-400 text-base">
              Загрузите аудиофайл и получите текстовую расшифровку
            </p>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={[
              'relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer',
              'flex flex-col items-center justify-center gap-4 py-14 px-8',
              isDragging
                ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
                : file
                  ? 'border-indigo-600/50 bg-slate-800/60 cursor-default'
                  : 'border-slate-700 bg-slate-800/40 hover:border-indigo-600/70 hover:bg-slate-800/60',
            ].join(' ')}
          >
            <input
              ref={inputRef}
              type="file"
              accept="*/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {file ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
                  <FileAudio size={32} className="text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-lg break-all">{file.name}</p>
                  <p className="text-slate-500 text-sm mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} МБ
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                >
                  <X size={14} className="text-slate-300" />
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-slate-700/60 flex items-center justify-center">
                  <Upload size={28} className="text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-slate-300 font-medium">
                    Перетащите файл или{' '}
                    <span className="text-indigo-400 underline underline-offset-2">выберите</span>
                  </p>
                  <p className="text-slate-500 text-sm mt-1">MP3, WAV, OGG, FLAC, M4A и др.</p>
                </div>
              </>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!file || status === 'loading'}
            className={[
              'w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200',
              file && status !== 'loading'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed',
            ].join(' ')}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Транскрибирую…
              </span>
            ) : (
              'Транскрибировать'
            )}
          </button>

          {/* Result */}
          {status === 'success' && result && (
            <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Результат
              </p>
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{result}</p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && errorMsg && (
            <div className="rounded-2xl bg-red-950/40 border border-red-800/60 p-5">
              <p className="text-red-400 text-sm">{errorMsg}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-5">
        <p className="text-center text-slate-600 text-sm">
          Спонсор —{' '}
          <span className="text-slate-400 font-medium">Сенчушкин Сергей Игоревич</span>
        </p>
      </footer>
    </div>
  );
}
