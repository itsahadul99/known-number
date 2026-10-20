'use client';

import React, { useState } from 'react';
import { RedFlagIcon } from './Pictograms';
import { cn } from '@/lib/utils';

interface FlagMarkerProps {
  id?: string;
  label?: string;
  explanation: string;
  interactive?: boolean;
  onTap?: () => void;
  isTapped?: boolean;
  className?: string;
}

export function FlagMarker({
  label = 'Red flag',
  explanation,
  interactive = false,
  onTap,
  isTapped = false,
  className,
}: FlagMarkerProps) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (interactive) {
      setExpanded(!expanded);
      if (onTap) onTap();
    }
  };

  return (
    <div className={cn('inline-flex flex-col my-2 w-full', className)}>
      <div
        onClick={interactive ? handleClick : undefined}
        onKeyDown={interactive ? (e) => (e.key === 'Enter' || e.key === ' ' ? handleClick() : null) : undefined}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        aria-expanded={interactive ? expanded : undefined}
        className={cn(
          'flex items-center gap-3 p-3 px-4 border rounded-control transition-colors',
          'border-l-4 border-l-warn-amber border-y-rule border-r-rule',
          isTapped ? 'bg-warn-amber-light' : 'bg-panel',
          interactive && 'cursor-pointer hover:bg-warn-amber-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-blue'
        )}
      >
        <div className="shrink-0" aria-hidden="true">
          <RedFlagIcon size={26} />
        </div>

        <div className="flex flex-col flex-1 text-left">
          <span className="font-bold text-sm text-ink">{label}</span>
          <span className="text-sm text-ink-muted leading-relaxed">{explanation}</span>
        </div>
      </div>
    </div>
  );
}
