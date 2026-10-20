'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/settings-context';

export type PressureLevel = 0 | 1 | 2 | 3;

interface PressureMeterProps {
  level: PressureLevel;
  className?: string;
}

export function PressureMeter({ level, className }: PressureMeterProps) {
  const { t } = useSettings();

  const labels: Record<PressureLevel, string> = {
    0: t.pressureCalm,
    1: t.pressureRising,
    2: t.pressureHigh,
    3: t.pressurePeak,
  };

  const currentLabel = labels[level] || labels[0];

  return (
    <div
      className={cn('flex flex-col gap-1.5 my-3 mb-5', className)}
      role="region"
      aria-label={`${t.urgencyPressure} ${currentLabel}`}
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-ink-muted font-semibold">
          {t.urgencyPressure}
        </span>
        <span
          className={cn(
            'font-bold',
            level >= 2 ? 'text-stop-red' : level === 1 ? 'text-ink' : 'text-safe-green'
          )}
        >
          {currentLabel}
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
