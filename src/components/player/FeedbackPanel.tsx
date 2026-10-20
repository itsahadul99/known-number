import React, { useEffect, useRef } from 'react';
import { RedFlagIcon, SafeOutcomeIcon } from '@/components/sign/Pictograms';
import { HabitBadge, HabitType } from '@/components/sign/HabitBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeedbackPanelProps {
  isSafeChoice: boolean;
  feedbackText: string;
  whatToDoInstead?: string;
  habitAwarded?: HabitType;
  onContinue: () => void;
  continueLabel?: string;
  className?: string;
}

export function FeedbackPanel({
  isSafeChoice,
  feedbackText,
  whatToDoInstead,
  habitAwarded,
  onContinue,
  continueLabel = 'Continue',
  className,
}: FeedbackPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Accessible focus management: focus on feedback announcement
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  return (
    <section
      className={cn(
        'mt-6 p-6 rounded-panel border-2 flex flex-col gap-4 shadow-sm',
        isSafeChoice
          ? 'bg-safe-green-light border-control-edge border-l-8 border-l-safe-green'
          : 'bg-warn-amber-light border-control-edge border-l-8 border-l-warn-amber',
        className
      )}
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0" aria-hidden="true">
          {isSafeChoice ? <SafeOutcomeIcon size={34} /> : <RedFlagIcon size={34} />}
        </div>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-xl font-bold text-ink outline-none"
        >
          {isSafeChoice ? 'Good instinct' : 'Why a scammer loves this response'}
        </h3>
      </div>

      <p className="text-base text-ink leading-relaxed">
        {feedbackText}
      </p>

      {whatToDoInstead && (
        <div className="bg-paper p-4 rounded-control border border-control-edge">
          <span className="font-bold text-sm text-ink block">
            What to do instead:
          </span>
          <p className="text-base text-ink mt-1 leading-relaxed">
            {whatToDoInstead}
          </p>
        </div>
      )}

      {habitAwarded && (
        <div className="flex items-center gap-4 bg-paper p-4 rounded-control border border-rule">
          <HabitBadge habit={habitAwarded} state="shown" size="small" showStateLabel={false} />
          <div>
            <span className="font-bold text-sm text-signal-blue block">
              Habit demonstrated: {habitAwarded.toUpperCase()}
            </span>
            <p className="text-xs text-ink-muted mt-0.5">
              {habitAwarded === 'pause' && 'You slowed down the urgency instead of rushing.'}
              {habitAwarded === 'verify' && 'You checked through an independent, trusted channel.'}
              {habitAwarded === 'tell' && 'You consulted someone you trust to break isolation.'}
            </p>
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={onContinue}
        size="lg"
        fullWidth
        className="mt-2"
      >
        {continueLabel}
      </Button>
    </section>
  );
}
