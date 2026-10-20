'use client';

import React from 'react';
import { PauseIcon, VerifyIcon, TellIcon } from './Pictograms';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/settings-context';

export type HabitType = 'pause' | 'verify' | 'tell';

interface HabitBadgeProps {
  habit: HabitType;
  state?: 'shown' | 'not-yet' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  showStateLabel?: boolean;
  className?: string;
}

export function HabitBadge({
  habit,
  state = 'neutral',
  size = 'medium',
  showStateLabel = true,
  className,
}: HabitBadgeProps) {
  const { t } = useSettings();
  const isShown = state === 'shown';
  const isNeutral = state === 'neutral';

  const habitName = t.habits[habit]?.name || habit;

  const dimensions = {
    small: 'w-9 h-9',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }[size];

  const iconSizes = {
    small: 20,
    medium: 28,
    large: 38,
  }[size];

  const renderIcon = (p: { size: number; color: string }) => {
    if (habit === 'pause') return <PauseIcon {...p} />;
    if (habit === 'verify') return <VerifyIcon {...p} />;
    return <TellIcon {...p} />;
  };

  return (
    <div className={cn('inline-flex flex-col items-center gap-2 text-center', className)}>
      {/* Circle sign shape */}
      <div
        className={cn(
          'rounded-full flex items-center justify-center shrink-0 border-2 transition-colors',
          dimensions,
          isShown || isNeutral
            ? 'bg-signal-blue text-white border-ink'
            : 'bg-paper text-ink-muted border-control-edge'
        )}
        aria-hidden="true"
      >
        {renderIcon({
          size: iconSizes,
          color: isShown || isNeutral ? '#FFFFFF' : 'currentColor',
        })}
      </div>

      <div className="flex flex-col items-center">
        <span
          className={cn(
            'font-bold text-ink leading-tight',
            size === 'small' ? 'text-sm' : 'text-base'
          )}
        >
          {habitName}
        </span>

        {showStateLabel && state !== 'neutral' && (
          <span
            className={cn(
              'text-xs font-semibold mt-0.5',
              isShown ? 'text-safe-green font-bold' : 'text-ink-muted'
            )}
          >
            {isShown ? t.habitShown : t.habitNotYet}
          </span>
        )}
      </div>
    </div>
  );
}
