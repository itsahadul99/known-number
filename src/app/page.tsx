'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DeviceFrame } from '@/components/device/DeviceFrame';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { useSettings } from '@/lib/settings-context';
import { getScenariosForLocale, getAllScenarios } from '@/content/scenarios';

export default function HomePage() {
  const router = useRouter();
  const { t, language, setLanguage } = useSettings();

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

  const currentScenarios = getScenariosForLocale(language);

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-rule bg-paper py-10 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-signal-blue-light border border-signal-blue rounded-full w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-blue" />
                <span className="text-xs font-bold text-signal-blue uppercase tracking-wider">
                  {language === 'bn' ? 'পারিবারিক অনুশীলন · সম্পূর্ণ বিনামূল্যে' : 'Family Rehearsal · Zero Sign-up'}
                </span>
              </div>

              {/* Language Switch Pills */}
              <div className="inline-flex rounded-control border border-rule p-0.5 bg-panel text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-sm font-semibold transition-colors ${
                    language === 'en' ? 'bg-signal-blue text-white' : 'text-ink hover:text-signal-blue'
                  }`}
                >
                  🇺🇸 English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-2 py-1 rounded-sm font-semibold transition-colors ${
                    language === 'bn' ? 'bg-signal-blue text-white' : 'text-ink hover:text-signal-blue'
                  }`}
                >
                  🇧🇩 বাংলা
                </button>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
              {t.tagline}
            </h1>

            <p className="text-xl text-ink-muted leading-relaxed max-w-prose">
              {language === 'bn'
                ? 'পরিবারের জন্য ফোন কল ও মেসেজ প্রতারণার ৫ মিনিটের বাস্তব মহড়া। কোনো অ্যাপ ইনস্টল বা একাউন্ট খোলা লাগবে না, কোনো তথ্য কোথাও জমা রাখা হয় না।'
                : 'A five-minute rehearsal for the calls and texts that target families. No install, no account, and nothing is recorded.'}
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
              {language === 'bn' ? 'পরিবারের বার্তায়: ' : 'In a message: '}
              <em className="text-ink">&ldquo;{t.familyMessageHint}&rdquo;</em>
            </div>
          </div>

          {/* Right Column: Interactive Phone Demo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <DeviceFrame
              channel="call-incoming"
              senderName={language === 'bn' ? 'বিকাশ ভেরিফিকেশন ইউনিট' : 'Northfield Bank'}
              senderSubtitle={language === 'bn' ? 'প্রধান কার্যালয়, ঢাকা' : 'Fraud Prevention Unit'}
              caption={
                language === 'bn'
                  ? 'লাইভ ডেমো: অনুশীলন শুরু করতে Answer বা Decline চাপুন'
                  : 'Live demo: Tap Answer or Decline to start rehearsal'
              }
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

      {/* Available Scenarios */}
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

            {/* Region selection note */}
            <span className="text-xs font-bold text-signal-blue bg-panel px-3 py-1.5 rounded-control border border-rule">
              {language === 'bn' ? '🇧🇩 বাংলাদেশ উপযোগী পর্বসমূহ' : '🇺🇸 US & International Scenarios'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {currentScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-paper border-2 border-control-edge rounded-panel p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-signal-blue transition-colors"
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-signal-blue uppercase tracking-wider">
                  <span>{scenario.category.replace('-', ' ')}</span>
                  <span>·</span>
                  <span>~{scenario.durationMin} {language === 'bn' ? 'মিনিট' : 'minutes'}</span>
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
          ))}
        </div>
      </section>

      {/* Family Organiser Callout */}
      <section className="py-12 bg-panel border-t border-rule">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink">
              {language === 'bn'
                ? 'পরিবারের বড়দের সতর্ক করতে চান?'
                : 'Want to send a drill to a parent or relative?'}
            </h2>
            <p className="text-base text-ink-muted max-w-prose">
              {language === 'bn'
                ? 'হোয়াটসঅ্যাপ বা মেসেজে পাঠানোর উপযোগী তৈরি মেসেজ ও লিঙ্ক ১ মিনিটে কপি করে নিন।'
                : 'Create a personalized link in under 60 seconds with a pre-written message for WhatsApp or SMS.'}
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
