'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PracticeBand } from '@/components/layout/PracticeBand';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { OutcomeSign } from '@/components/sign/OutcomeSign';
import { FlagMarker } from '@/components/sign/FlagMarker';
import { RouteLine } from '@/components/player/RouteLine';
import { PressureMeter, PressureLevel } from '@/components/player/PressureMeter';
import { ChoiceButton } from '@/components/player/ChoiceButton';
import { FeedbackPanel } from '@/components/player/FeedbackPanel';
import { DeviceFrame } from '@/components/device/DeviceFrame';
import { Button } from '@/components/ui/button';
import { VerifyIcon, PauseIcon, TellIcon, RedFlagIcon, SafeOutcomeIcon, UnsafeOutcomeIcon } from '@/components/sign/Pictograms';

export default function StyleguidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-12">
        <header className="border-b-2 border-ink pb-4">
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            Design QA & Verification
          </span>
          <h1 className="text-4xl font-bold mt-1 text-ink">
            Known Number Design System Styleguide
          </h1>
          <p className="text-base text-ink-muted mt-2">
            Living component catalog verifying all shapes, pictograms, and states under current text size and contrast theme.
          </p>
        </header>

        {/* 1. Practice Band */}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-ink">1. Practice Band</h2>
          <p className="text-sm text-ink-muted">Always sits at the top of active rehearsals:</p>
          <div className="border border-rule rounded-control overflow-hidden">
            <PracticeBand stopHref="/styleguide" />
          </div>
        </section>

        {/* 2. Original Pictograms & Sign System */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">2. Safety Sign Pictograms</h2>
          <p className="text-sm text-ink-muted">
            Original geometric SVG pictograms on a 48px grid (Pause vertical bars, Verify loop phone, Tell overlapping bubbles, Red Flag triangle, Safe square check, Unsafe barred circle):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 p-6 bg-panel rounded-panel border border-rule justify-items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center border-2 border-ink">
                <VerifyIcon size={28} color="#FFFFFF" />
              </div>
              <span className="text-xs font-bold text-ink">Verify (Logo)</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center border-2 border-ink">
                <PauseIcon size={28} color="#FFFFFF" />
              </div>
              <span className="text-xs font-bold text-ink">Pause</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center border-2 border-ink">
                <TellIcon size={28} color="#FFFFFF" />
              </div>
              <span className="text-xs font-bold text-ink">Tell</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <RedFlagIcon size={44} />
              <span className="text-xs font-bold text-ink">Red Flag</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <SafeOutcomeIcon size={44} />
              <span className="text-xs font-bold text-ink">Safe Check</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <UnsafeOutcomeIcon size={44} />
              <span className="text-xs font-bold text-ink">Unsafe Bar</span>
            </div>
          </div>
        </section>

        {/* 3. Habit Badges (States) */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">3. Habit Badges</h2>
          <div className="grid grid-cols-3 gap-4 p-6 bg-paper border-2 border-control-edge rounded-panel justify-items-center">
            <HabitBadge habit="pause" state="shown" />
            <HabitBadge habit="verify" state="shown" />
            <HabitBadge habit="tell" state="not-yet" />
          </div>
        </section>

        {/* 4. Outcome Signs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">4. Outcome Signs</h2>
          <OutcomeSign
            outcome="safe"
            title="Safe outcome"
            summary="You hung up and verified the call with a known number."
          />
          <OutcomeSign
            outcome="unsafe"
            title="A scammer would have succeeded"
            summary="Reading verification codes out loud gives the fraudster direct account control."
          />
        </section>

        {/* 5. Flag Marker */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">5. Red Flag Marker</h2>
          <FlagMarker
            label="Red flag: Pressure and manufactured secrecy"
            explanation="The caller insists you must not speak with anyone else before sending the funds."
            interactive={true}
          />
        </section>

        {/* 6. Route Line & Pressure Meters */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">6. Progress Route & Pressure Meters</h2>
          <div>
            <h3 className="text-base font-bold text-ink mb-2">Step progress:</h3>
            <RouteLine currentStep={3} totalSteps={6} />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-ink mb-1">Pressure urgency levels:</h3>
            {([0, 1, 2, 3] as PressureLevel[]).map((lvl) => (
              <PressureMeter key={lvl} level={lvl} />
            ))}
          </div>
        </section>

        {/* 7. Choice Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">7. Choice Buttons</h2>
          <div className="flex flex-col gap-3">
            <ChoiceButton
              label="Hang up and call the phone number on the back of my card."
              shortcutIndex={1}
              isSelected={true}
              onClick={() => {}}
            />
            <ChoiceButton
              label="Ask the caller to read their badge number again."
              shortcutIndex={2}
              isSelected={false}
              onClick={() => {}}
            />
          </div>
        </section>

        {/* 8. Feedback Panel */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">8. Feedback Panel</h2>
          <FeedbackPanel
            isSafeChoice={false}
            feedbackText="Scammers have fake badge numbers and fake supervisor transfers ready on the line."
            whatToDoInstead="Never try to interrogate a suspicious caller. Hang up and dial a verified known number."
            habitAwarded="verify"
            onContinue={() => {}}
            continueLabel="Continue"
          />
        </section>

        {/* 9. Buttons Component Gallery */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">9. Buttons (CVA + Tailwind)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default">Primary button (56px)</Button>
            <Button variant="secondary">Secondary button</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="quiet">Quiet link button</Button>
          </div>
        </section>

        {/* 10. Device Frames Gallery */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">10. Simulated Device Frames</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DeviceFrame
              channel="call-active"
              senderName="Northfield Bank Fraud"
              caption="Active call frame"
              messages={[{ text: 'We detected suspicious activity on your card.' }]}
            />
            <DeviceFrame
              channel="sms"
              senderName="Postal Service"
              caption="SMS message frame"
              messages={[{ text: 'Your parcel is held due to unpaid $2.15 fee.', isIncoming: true }]}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
