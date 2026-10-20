'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DeviceFrame } from '@/components/device/DeviceFrame';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { useSettings } from '@/lib/settings-context';
import { ALL_SCENARIOS, getScenariosForLocale } from '@/content/scenarios';

const CATEGORY_NAMES: Record<string, Record<string, string>> = {
  'bank-impersonation': {
    en: 'Bank Impersonation',
    bn: 'ব্যাংক ও বিকাশ প্রতারণা',
  },
  'family-distress': {
    en: 'Family Emergency',
    bn: 'পরিবারের জরুরি বিপদ',
  },
  'delivery-phishing': {
    en: 'Package / Delivery Scam',
    bn: 'পার্সেল ও কুরিয়ার প্রতারণা',
  },
};

function getDurationUnit(lang: string): string {
  return lang === 'bn' ? 'মিনিট' : 'minutes';
}

export default function HomePage() {
  const router = useRouter();
  const { t, language } = useSettings();

  const handleAnswerDemo = () => {
    if (language === 'bn') {
      router.push('/drill/bkash-fraud-bn');
    } else {
      router.push('/drill/bank-fraud');
    }
  };

  const handleDeclineDemo = () => {
    if (language === 'bn') {
      router.push('/drill/hospital-emergency-bn');
    } else {
      router.push('/drill/grandchild-call');
    }
  };

  // Primary scenarios for the selected locale
  const currentScenarios = getScenariosForLocale(language);

  const demoSender =
    language === 'bn'
      ? { name: 'বিকাশ ভেরিফিকেশন ইউনিট', subtitle: 'প্রধান কার্যালয়, ঢাকা' }
      : { name: 'Northfield Bank', subtitle: 'Fraud Prevention Unit' };

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
                {t.heroBadge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
              {t.tagline}
            </h1>

            <p className="text-xl text-ink-muted leading-relaxed max-w-prose">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href={language === 'bn' ? '/drill/bkash-fraud-bn' : '/drill/grandchild-call'}
                className="inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors"
              >
                {t.startPractice}
              </Link>

              <Link
                href="/organise"
                className="inline-flex items-center justify-center rounded-control font-semibold text-signal-blue bg-paper hover:bg-panel border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors"
              >
                {t.sendFamilyDrill}
              </Link>
            </div>

            <div className="text-sm text-ink-muted pt-2 border-t border-rule mt-2">
              {t.inMessageLabel}{' '}
              <em className="text-ink">&ldquo;{t.familyMessageHint}&rdquo;</em>
            </div>
          </div>

          {/* Right Column: Interactive Phone Demo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <DeviceFrame
              channel="call-incoming"
              senderName={demoSender.name}
              senderSubtitle={demoSender.subtitle}
              caption={t.deviceSimulatedScreen}
              messages={[]}
              onAnswer={handleAnswerDemo}
              onDecline={handleDeclineDemo}
            />
          </div>
        </div>
      </section>

      {/* The 3 Core Defense Habits */}
      <section className="py-12 bg-panel border-b border-rule">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              {t.threeHabitsTitle}
            </h2>
            <p className="text-base text-ink-muted mt-2">
              {t.threeHabitsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="pause" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">1. {t.habits.pause.name}</h3>
              <p className="text-base text-ink leading-relaxed">
                {t.habits.pause.desc}
              </p>
            </div>

            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="verify" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">2. {t.habits.verify.name}</h3>
              <p className="text-base text-ink leading-relaxed">
                {t.habits.verify.desc}
              </p>
            </div>

            <div className="bg-paper p-6 rounded-panel border-2 border-control-edge flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <HabitBadge habit="tell" state="neutral" size="large" showStateLabel={false} />
              <h3 className="text-xl font-bold text-ink">3. {t.habits.tell.name}</h3>
              <p className="text-base text-ink leading-relaxed">
                {t.habits.tell.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Scenarios (Strictly filtered by selected language) */}
      <section className="py-12 max-w-4xl mx-auto px-4 w-full">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                {t.scenariosTitle}
              </h2>
              <p className="text-base text-ink-muted mt-1">
                {t.scenariosSubtitle}
              </p>
            </div>

            <span className="text-xs font-bold text-signal-blue bg-panel px-3 py-1.5 rounded-control border border-rule">
              {t.scenariosRegionLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {currentScenarios.map((scenario) => {
            const categoryLabel =
              CATEGORY_NAMES[scenario.category]?.[language] ||
              scenario.category.replace(/-/g, ' ');
            const durationUnit = getDurationUnit(language);

            return (
              <div
                key={scenario.id}
                className="bg-paper border-2 border-control-edge rounded-panel p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-signal-blue transition-colors"
              >
                <div className="flex flex-col gap-1 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-signal-blue uppercase tracking-wider">
                    <span>{categoryLabel}</span>
                    <span>·</span>
                    <span>~{scenario.durationMin} {durationUnit}</span>
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
                    {t.startPractice}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Family Organiser Callout */}
      <section className="py-12 bg-panel border-t border-rule">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink">
              {t.sendToElderlyTitle}
            </h2>
            <p className="text-base text-ink-muted max-w-prose">
              {t.sendToElderlyDesc}
            </p>
          </div>

          <Link
            href="/organise"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[56px] px-6 text-base no-underline transition-colors shrink-0"
          >
            {t.sendFamilyDrill}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
