import React from 'react';
import { cn } from '@/lib/utils';

export type PressureLevel = 0 | 1 | 2 | 3;

interface PressureMeterProps {
  level: PressureLevel;
  className?: string;
}

const PRESSURE_LABELS: Record<PressureLevel, { label: string; description: string }> = {
  0: { label: 'Calm', description: 'Caller is asking conversational questions' },
  1: { label: 'Rising', description: 'Caller begins introducing time pressure' },
  2: { label: 'High', description: 'Caller claims emergency and demands secrecy' },
  3: { label: 'Peak urgency', description: 'Scammer relies on intense panic or intimidation' },
};

export function PressureMeter({ level, className }: PressureMeterProps) {
  const current = PRESSURE_LABELS[level] || PRESSURE_LABELS[0];

  return (
    <div
      className={cn('flex flex-col gap-1.5 my-3 mb-5', className)}
      role="region"
      aria-label={`Scammer pressure indicator: ${current.label}. ${current.description}`}
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-ink-muted font-semibold">
          Urgency pressure:
        </span>
        <span
          className={cn(
            'font-bold',
            level >= 2 ? 'text-stop-red' : level === 1 ? 'text-ink' : 'text-safe-green'
          )}
        >
          {current.label}
        </span>
      </div>

      {/* 4 segmented bars */}
      <div className="flex gap-1.5 w-full">
        {[0, 1, 2, 3].map((segmentIndex) => {
          const isActive = segmentIndex <= level;
          let segmentClasses = 'bg-panel border-control-edge';

          if (isActive) {
            if (segmentIndex === 0) {
              segmentClasses = 'bg-safe-green border-safe-green';
            } else if (segmentIndex === 1) {
              segmentClasses = 'bg-warn-amber border-ink';
            } else {
              segmentClasses = 'bg-stop-red border-stop-red';
            }
          }

          return (
            <div
              key={segmentIndex}
              className={cn(
                'flex-1 h-2.5 rounded-sm border transition-colors',
                segmentClasses
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
