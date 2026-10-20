'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { OutcomeSign } from '@/components/sign/OutcomeSign';
import { decodeResultHash, ResultPayload } from '@/lib/share';
import { getScenarioById } from '@/content/scenarios';
import { Button } from '@/components/ui/button';

export default function ResultPage() {
  const [payload, setPayload] = useState<ResultPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const decoded = decodeResultHash(window.location.hash);
      setPayload(decoded);
      setLoading(false);
    }
  }, []);

  const scenario = payload ? getScenarioById(payload.scenarioId) : undefined;
  const isSafe = payload?.outcome === 'safe';
  const personName = payload?.recipientName || 'Your relative';

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-2xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-ink-muted">Reading rehearsal result...</p>
          </div>
        ) : !payload ? (
          <div className="bg-panel border-2 border-control-edge rounded-panel p-8 text-center flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-ink">
              No result data found
            </h1>
            <p className="text-base text-ink-muted max-w-md">
              This result link may be incomplete or expired. If a family member completed a drill, ask them to tap &ldquo;Share result with family&rdquo; again.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[48px] px-6 text-base no-underline mt-2"
            >
              Go to Known Number home
            </Link>
          </div>
        ) : (
          <>
            <header>
              <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
                Family Rehearsal Debrief
              </span>
              <h1 className="text-3xl font-bold mt-1 text-ink">
                {personName}&apos;s drill result
              </h1>
              {scenario && (
                <p className="text-lg text-ink-muted mt-1">
                  Rehearsal: {scenario.title}
                </p>
              )}
            </header>

            {/* Outcome Sign */}
            <OutcomeSign
              outcome={payload.outcome}
              title={
                isSafe
                  ? `${personName} took the safe route!`
                  : `The scammer found an opening this time.`
              }
              summary={
                isSafe
                  ? 'They identified the threat and verified through a known, trusted channel.'
                  : 'This was great practice! Now you have the perfect chance to talk through what to do if it happens for real.'
              }
            />

            {/* Defense Habits Summary */}
            <section className="bg-panel p-6 rounded-panel border-2 border-control-edge">
              <h2 className="text-xl font-bold text-ink mb-4">
                Three Defense Habits
              </h2>
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                <HabitBadge
                  habit="pause"
                  state={payload.habits.includes('pause') ? 'shown' : 'not-yet'}
                  size="medium"
                />
                <HabitBadge
                  habit="verify"
                  state={payload.habits.includes('verify') ? 'shown' : 'not-yet'}
                  size="medium"
                />
                <HabitBadge
                  habit="tell"
                  state={payload.habits.includes('tell') ? 'shown' : 'not-yet'}
                  size="medium"
                />
              </div>
            </section>

            {/* Conversation Prompts for the family */}
            <section className="border-2 border-control-edge rounded-panel p-6 bg-paper flex flex-col gap-4">
              <h2 className="text-xl font-bold text-ink">
                3 Conversation starters for your next phone call
              </h2>
              <p className="text-sm text-ink-muted">
                Use these gentle prompts to build shared habits without making anyone feel tested:
              </p>

              <div className="flex flex-col gap-3">
                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">1. Establish a family codeword:</span>
                  <p className="text-base text-ink mt-0.5">
                    &ldquo;Should we agree on a family secret word that we only use if someone is ever in real trouble?&rdquo;
                  </p>
                </div>

                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">2. Emphasize the known number rule:</span>
                  <p className="text-base text-ink mt-0.5">
                    &ldquo;If anyone ever calls claiming I\'m in jail or hurt, promise me you\'ll hang up and call me back on my normal saved number first.&rdquo;
                  </p>
                </div>

                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">3. Normalize checking in:</span>
                  <p className="text-base text-ink mt-0.5">
                    &ldquo;Banks never ask to move money to a safe account. If you ever get a weird call, call me right away so we can laugh about it together.&rdquo;
                  </p>
                </div>
              </div>
            </section>

            {/* Next actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href="/card"
                className="flex-1 inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[56px] text-base no-underline transition-colors text-center"
              >
                Print &ldquo;Pause · Verify · Tell&rdquo; fridge card
              </Link>
              <Link
                href="/organise"
                className="flex-1 inline-flex items-center justify-center rounded-control font-semibold text-signal-blue bg-paper hover:bg-panel border-2 border-signal-blue min-h-[56px] text-base no-underline transition-colors text-center"
              >
                Send another scenario
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
