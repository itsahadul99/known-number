import React from 'react';
import { SafeOutcomeIcon, UnsafeOutcomeIcon } from './Pictograms';
import { cn } from '@/lib/utils';

interface OutcomeSignProps {
  outcome: 'safe' | 'unsafe';
  title?: string;
  summary?: string;
  className?: string;
}

export function OutcomeSign({ outcome, title, summary, className }: OutcomeSignProps) {
  const isSafe = outcome === 'safe';

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-5 rounded-panel border-2 my-4',
        isSafe
          ? 'bg-safe-green-light border-l-8 border-l-safe-green border-control-edge text-ink'
          : 'bg-stop-red-light border-l-8 border-l-stop-red border-control-edge text-ink',
        className
      )}
      role="region"
      aria-label={isSafe ? 'Safe outcome' : 'Unsafe outcome'}
    >
      <div className="shrink-0 mt-0.5" aria-hidden="true">
        {isSafe ? <SafeOutcomeIcon size={44} /> : <UnsafeOutcomeIcon size={44} />}
      </div>

      <div className="flex flex-col gap-1">
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-wider',
            isSafe ? 'text-safe-green' : 'text-stop-red'
          )}
        >
          {isSafe ? 'Safe outcome' : 'Unsafe outcome'}
        </span>

        <h3 className="text-xl font-bold text-ink leading-snug">
          {title || (isSafe ? 'You protected yourself and took control' : 'A scammer would have succeeded here')}
        </h3>

        {summary && (
          <p className="text-base text-ink mt-1 leading-relaxed">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
