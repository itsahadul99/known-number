import React from 'react';
import { PauseIcon, VerifyIcon, TellIcon } from './Pictograms';
import { cn } from '@/lib/utils';

export type HabitType = 'pause' | 'verify' | 'tell';

interface HabitBadgeProps {
  habit: HabitType;
  state?: 'shown' | 'not-yet' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  showStateLabel?: boolean;
  className?: string;
}

const HABIT_CONFIG: Record<
  HabitType,
  { label: string; actionText: string; icon: (props: { size: number; color: string }) => React.JSX.Element }
> = {
  pause: {
    label: 'Pause',
    actionText: 'Take a breath before reacting',
    icon: (p) => <PauseIcon {...p} />,
  },
  verify: {
    label: 'Verify',
    actionText: 'Call back on a known number',
    icon: (p) => <VerifyIcon {...p} />,
  },
  tell: {
    label: 'Tell',
    actionText: 'Tell a friend or family member',
    icon: (p) => <TellIcon {...p} />,
  },
};

export function HabitBadge({
  habit,
  state = 'neutral',
  size = 'medium',
  showStateLabel = true,
  className,
}: HabitBadgeProps) {
  const config = HABIT_CONFIG[habit];
  const isShown = state === 'shown';
  const isNeutral = state === 'neutral';

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
        {config.icon({
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
          {config.label}
        </span>

        {showStateLabel && state !== 'neutral' && (
          <span
            className={cn(
              'text-xs font-semibold mt-0.5',
              isShown ? 'text-safe-green font-bold' : 'text-ink-muted'
            )}
          >
            {isShown ? 'Shown' : 'Not yet'}
          </span>
        )}
      </div>
    </div>
  );
}
