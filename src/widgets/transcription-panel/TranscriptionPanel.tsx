import { X } from 'lucide-react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';

interface TranscriptionPanelProps {
  text: string | null;
  onClear: () => void;
  isConnected?: boolean;
}

export function TranscriptionPanel({ text, onClear, isConnected }: TranscriptionPanelProps) {

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Транскрипция</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="text-xs text-green-600">● Онлайн</span>
          ) : (
            <span className="text-xs text-muted-foreground">○ Офлайн</span>
          )}
          {text ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 w-8 p-0"
            aria-label="Очистить"
          >
            <X className="w-4 h-4" aria-hidden />
          </Button>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          'min-h-[120px] max-h-[300px] overflow-y-auto rounded-md',
          'bg-muted/50 p-4 text-sm whitespace-pre-wrap',
          text ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {text ?? 'Ожидание транскрипции...'}
      </div>
    </section>
  );
}
