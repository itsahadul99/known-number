'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HabitBadge } from '@/components/sign/HabitBadge';
import { OutcomeSign } from '@/components/sign/OutcomeSign';
import { decodeResultHash, ResultPayload } from '@/lib/share';
import { getScenarioById } from '@/content/scenarios';
import { useSettings } from '@/lib/settings-context';

export default function ResultPage() {
  const { language } = useSettings();
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
  const isBn = scenario ? scenario.locale.startsWith('bn') : language === 'bn';
  const personName = payload?.recipientName || (isBn ? 'আপনার প্রিয়জন' : 'Your relative');

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-2xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-ink-muted">
              {isBn ? 'ফলাফল লোড হচ্ছে...' : 'Reading rehearsal result...'}
            </p>
          </div>
        ) : !payload ? (
          <div className="bg-panel border-2 border-control-edge rounded-panel p-5 sm:p-8 text-center flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-ink">
              {isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No result data found'}
            </h1>
            <p className="text-base text-ink-muted max-w-md">
              {isBn
                ? 'লিঙ্কটি অসম্পূর্ণ হতে পারে। যিনি অনুশীলন সম্পন্ন করেছেন, তাকে পুনরায় "ফলাফল শেয়ার করুন" এ চাপতে বলুন।'
                : 'This result link may be incomplete or expired. If a family member completed a drill, ask them to tap "Share result with family" again.'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-control font-semibold text-white bg-signal-blue hover:bg-signal-blue-hover border-2 border-signal-blue min-h-[48px] px-6 text-base no-underline mt-2"
            >
              {isBn ? 'মূল পাতায় ফিরে যান' : 'Go to Known Number home'}
            </Link>
          </div>
        ) : (
          <>
            <header>
              <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
                {isBn ? 'পারিবারিক অনুশীলনের ফলাফল' : 'Family Rehearsal Debrief'}
              </span>
              <h1 className="text-3xl font-bold mt-1 text-ink">
                {isBn ? `${personName}-এর অনুশীলনের সারসংক্ষেপ` : `${personName}'s drill result`}
              </h1>
              {scenario && (
                <p className="text-lg text-ink-muted mt-1">
                  {isBn ? `পর্ব: ${scenario.title}` : `Rehearsal: ${scenario.title}`}
                </p>
              )}
            </header>

            {/* Outcome Sign */}
            <OutcomeSign
              outcome={payload.outcome}
              title={
                isSafe
                  ? (isBn ? `${personName} নিরাপদ সিদ্ধান্ত নিয়েছেন!` : `${personName} took the safe route!`)
                  : (isBn ? 'প্রতারক ফাঁদে ফেলতে সক্ষম হয়েছিল।' : 'The scammer found an opening this time.')
              }
              summary={
                isSafe
                  ? (isBn ? 'তিনি বিপদটি চিনে নিয়েছিলেন এবং পরিচিত নম্বরে যাচাই করেছেন।' : 'They identified the threat and verified through a known, trusted channel.')
                  : (isBn ? 'অনুশীলনের উদ্দেশ্যই হলো বাস্তব ঘটনার আগে ভুল শুধরে নেওয়া। এবার পরিবারে আলোচনা করে নিন।' : 'This was great practice! Now you have the perfect chance to talk through what to do if it happens for real.')
              }
            />

            {/* Defense Habits Summary */}
            <section className="bg-panel p-6 rounded-panel border-2 border-control-edge">
              <h2 className="text-xl font-bold text-ink mb-4">
                {isBn ? '৩টি প্রতিরক্ষা অভ্যাস' : 'Three Defense Habits'}
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
                {isBn ? 'পরিবারে পরবর্তী আড্ডার ৩টি কথা' : '3 Conversation starters for your next phone call'}
              </h2>
              <p className="text-sm text-ink-muted">
                {isBn
                  ? 'কাউকে ছোট না করে সহজ কথায় নিরাপত্তা সচেতনতা গড়ে তুলুন:'
                  : 'Use these gentle prompts to build shared habits without making anyone feel tested:'}
              </p>

              <div className="flex flex-col gap-3">
                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">
                    {isBn ? '১. পারিবারিক গোপন শব্দ (Codeword):' : '1. Establish a family codeword:'}
                  </span>
                  <p className="text-base text-ink mt-0.5">
                    {isBn
                      ? '“আমরা কি একটি গোপন শব্দ ঠিক করে রাখতে পারি, যা সত্যি কোনো বিপদে পড়লেই শুধু ব্যবহার করবো?”'
                      : '“Should we agree on a family secret word that we only use if someone is ever in real trouble?”'}
                  </p>
                </div>

                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">
                    {isBn ? '২. পরিচিত নম্বরে কল দেওয়ার নিয়ম:' : '2. Emphasize the known number rule:'}
                  </span>
                  <p className="text-base text-ink mt-0.5">
                    {isBn
                      ? '“কেউ যদি দাবি করে আমি এক্সিডেন্ট করেছি বা বিপদে আছি, কথা দিবা আগে ফোন কেটে আমার নিয়মিত নম্বরে কল দিবা।”'
                      : '“If anyone ever calls claiming I’m in jail or hurt, promise me you’ll hang up and call me back on my normal saved number first.”'}
                  </p>
                </div>

                <div className="p-3 bg-panel rounded-control border border-rule">
                  <span className="font-bold text-sm text-signal-blue block">
                    {isBn ? '৩. পিন বা ওটিপি কখনোই কাউকে না দেওয়া:' : '3. Normalize checking in:'}
                  </span>
                  <p className="text-base text-ink mt-0.5">
                    {isBn
                      ? '“বিকাশ বা ব্যাংক কখনোই পিন চায় না। কোনো অদ্ভুত ফোন আসলে দ্বিধা না করে আমাকে কল দিয়ে জানাবে।”'
                      : '“Banks never ask to move money to a safe account. If you ever get a weird call, call me right away so we can laugh about it together.”'}
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
                {isBn ? 'ফ্রিজ নির্দেশিকা কার্ড প্রিন্ট করুন' : 'Print “Pause · Verify · Tell” fridge card'}
              </Link>
              <Link
                href="/organise"
                className="flex-1 inline-flex items-center justify-center rounded-control font-semibold text-signal-blue bg-paper hover:bg-panel border-2 border-signal-blue min-h-[56px] text-base no-underline transition-colors text-center"
              >
                {isBn ? 'আরেকটি পর্ব পাঠান' : 'Send another scenario'}
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
