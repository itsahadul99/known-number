'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HabitBadge, HabitType } from '@/components/sign/HabitBadge';
import { OutcomeSign } from '@/components/sign/OutcomeSign';
import { FlagMarker } from '@/components/sign/FlagMarker';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/settings-context';

export interface RedFlagSummary {
  id: string;
  label: string;
  explanation: string;
}

interface DebriefScreenProps {
  outcome: 'safe' | 'unsafe';
  scenarioTitle: string;
  habitsDemonstrated: HabitType[];
  redFlags: RedFlagSummary[];
  whatToDoIfReal: string[];
  takeawayMessage: string;
  onRetry?: () => void;
  resultShareHash?: string;
  recipientName?: string;
  className?: string;
}

export function DebriefScreen({
  outcome,
  scenarioTitle,
  habitsDemonstrated,
  redFlags,
  whatToDoIfReal,
  takeawayMessage,
  onRetry,
  resultShareHash,
  recipientName,
  className,
}: DebriefScreenProps) {
  const { t } = useSettings();
  const isSafe = outcome === 'safe';
  const [copied, setCopied] = useState(false);

  const handleCopyShare = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const shareUrl = `${window.location.origin}/result#${resultShareHash || ''}`;
      const shareText = `Known Number: "${scenarioTitle}". ${shareUrl}`;
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <article className={cn('flex flex-col gap-6 py-4 max-w-xl mx-auto', className)}>
      <header>
        <span className="text-xs text-ink-muted font-bold uppercase tracking-wider">
          {t.drillCompleted}
        </span>
        <h2 className="text-3xl font-bold mt-1 text-ink">
          {recipientName ? `${recipientName} ${t.summaryFor}` : t.summaryFor}
        </h2>
        <p className="text-lg text-ink-muted mt-1">
          {scenarioTitle}
        </p>
      </header>

      {/* Outcome banner */}
      <OutcomeSign
        outcome={outcome}
        title={isSafe ? t.safeOutcomeTitle : t.unsafeOutcomeTitle}
        summary={takeawayMessage}
      />

      {/* Habit Signage Section: Pause · Verify · Tell */}
      <section className="bg-panel p-6 rounded-panel border-2 border-control-edge">
        <h3 className="text-xl font-bold text-ink mb-4">
          {t.threeHabitsTitle}
        </h3>
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          <HabitBadge
            habit="pause"
            state={habitsDemonstrated.includes('pause') ? 'shown' : 'not-yet'}
            size="medium"
          />
          <HabitBadge
            habit="verify"
            state={habitsDemonstrated.includes('verify') ? 'shown' : 'not-yet'}
            size="medium"
          />
          <HabitBadge
            habit="tell"
            state={habitsDemonstrated.includes('tell') ? 'shown' : 'not-yet'}
            size="medium"
          />
        </div>
      </section>

      {/* Red Flags in this scenario */}
      {redFlags && redFlags.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-ink mb-2">
            {t.redFlagsTitle}
          </h3>
          <p className="text-sm text-ink-muted mb-3">
            {t.redFlagsPlacedDesc}
          </p>
          <div className="flex flex-col gap-2">
            {redFlags.map((flag) => (
              <FlagMarker
                key={flag.id}
                label={flag.label}
                explanation={flag.explanation}
                interactive={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* What to do if this happens for real */}
      {whatToDoIfReal && whatToDoIfReal.length > 0 && (
        <section className="border-t-2 border-rule pt-6">
          <h3 className="text-xl font-bold text-ink mb-3">
            {t.ifRealTitle}
          </h3>
          <ol className="list-decimal pl-6 flex flex-col gap-2 text-base text-ink">
            {whatToDoIfReal.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-4">
        <Button
          type="button"
          onClick={handleCopyShare}
          size="lg"
          fullWidth
        >
          {copied ? t.linkCopied : t.shareResult}
        </Button>

        <div className="flex gap-3 flex-wrap">
          {onRetry && (
            <Button
              type="button"
              onClick={onRetry}
              variant="secondary"
              className="flex-1 min-w-[140px]"
            >
              {t.practiceAgain}
            </Button>
          )}

          <Link
            href="/"
            className="flex-1 min-w-[140px] inline-flex items-center justify-center rounded-control font-semibold text-signal-blue bg-paper border-2 border-signal-blue hover:bg-panel min-h-[56px] text-base no-underline transition-colors"
          >
            {t.practiceAnother}
          </Link>
        </div>
      </div>
    </article>
  );
}
