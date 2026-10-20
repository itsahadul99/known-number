'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DeviceFrame } from '@/components/device/DeviceFrame';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { Button } from '@/components/ui/button';
import { ALL_SCENARIOS } from '@/content/scenarios';

export default function HomePage() {
  const router = useRouter();

  const handleAnswerDemo = () => {
    router.push('/drill/bank-fraud');
  };

  const handleDeclineDemo = () => {
    router.push('/drill/grandchild-call');
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-rule bg-paper py-10 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-signal-blue-light border border-signal-blue rounded-full w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-blue" />
              <span className="text-xs font-bold text-signal-blue uppercase tracking-wider">
                Family Rehearsal · Zero Sign-up
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
              Practice the call before it comes.
            </h1>

            <p className="text-xl text-ink-muted leading-relaxed max-w-prose">
              A five-minute rehearsal for the calls and texts that target families.
              No install, no account, and nothing is recorded.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="/drill/grandchild-call"
                className="inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors"
              >
                Start a practice call
              </Link>

              <Link
                href="/organise"
                className="inline-flex items-center justify-center rounded-control font-semibold text-signal-blue bg-paper hover:bg-panel border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors"
              >
                Send a drill to family
              </Link>
            </div>

            <div className="text-sm text-ink-muted pt-2 border-t border-rule mt-2">
              In a message: <em className="text-ink">&ldquo;Mum, try Known Number. It takes five minutes.&rdquo;</em>
            </div>
          </div>

          {/* Right Column: Interactive Phone Demo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <DeviceFrame
              channel="call-incoming"
              senderName="Northfield Bank"
              senderSubtitle="Fraud Prevention Unit"
              caption="Live demo: Tap Answer or Decline to start rehearsal"
              messages={[]}
              onAnswer={handleAnswerDemo}
              onDecline={handleDeclineDemo}
            />
          </div>
        </div>
      </section>

      {/* The 3 Core Defense Habits (Pause · Verify · Tell) */}
      <section className="py-12 bg-panel border-b border-rule">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              Three habits to protect your family
            </h2>
            <p className="text-base text-ink-muted mt-2">
              Scammers rely on surprise and manufactured panic. These three simple steps take control back:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="pause" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">1. Pause</h3>
              <p className="text-base text-ink leading-relaxed">
                Take a breath before reacting. Urgency is the scammer&apos;s primary tool. Real emergencies allow you to think.
              </p>
            </div>

            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="verify" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">2. Verify</h3>
              <p className="text-base text-ink leading-relaxed">
                Hang up immediately. Call back on a <strong>known number</strong> from your own address book or the back of your card.
              </p>
            </div>

            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="tell" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">3. Tell</h3>
              <p className="text-base text-ink leading-relaxed">
                Tell someone you trust. Secrecy protects scammers. Talking to family breaks the spell instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Scenarios */}
      <section className="py-12 max-w-4xl mx-auto px-4 w-full">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">
            Choose a rehearsal scenario
          </h2>
          <p className="text-base text-ink-muted">
            Each scenario takes 4–5 minutes and teaches safe instincts for high-loss fraud tactics:
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {ALL_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-paper border-2 border-control-edge rounded-panel p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-signal-blue transition-colors"
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-signal-blue uppercase tracking-wider">
                  <span>{scenario.category.replace('-', ' ')}</span>
                  <span>·</span>
                  <span>~{scenario.durationMin} minutes</span>
                </div>
                <h3 className="text-xl font-bold text-ink">
                  {scenario.title}
                </h3>
                <p className="text-base text-ink-muted leading-relaxed">
                  {scenario.summary}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  href={`/drill/${scenario.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[48px] px-5 text-sm no-underline transition-colors shrink-0"
                >
                  Start practice
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Family Organiser Callout */}
      <section className="py-12 bg-panel border-t border-rule">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink">
              Want to send a drill to a parent or relative?
            </h2>
            <p className="text-base text-ink-muted max-w-prose">
              Create a personalized link in under 60 seconds with a pre-written message for WhatsApp or SMS.
            </p>
          </div>

          <Link
            href="/organise"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors shrink-0"
          >
            Create family drill link
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
