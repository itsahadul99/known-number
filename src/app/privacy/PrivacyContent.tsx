'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSettings } from '@/lib/settings-context';

interface PrivacyCopy {
  kicker: string;
  title: string;
  banner: string;
  linksTitle: string;
  /** [before bold, bold, before code, after code] */
  linksP1: [string, string, string, string];
  /** [before em, em, after em] */
  linksP2: [string, string, string];
  storageTitle: string;
  /** [before code, after code] */
  storage: [string, string];
  voiceTitle: string;
  voice: string;
}

const content: { en: PrivacyCopy; bn: PrivacyCopy } = {
  en: {
    kicker: 'Zero Tracking Policy',
    title: 'Privacy & Non-Collection',
    banner:
      'We collect zero personal information. No accounts, no cookies, no tracking pixels, and no database of users.',
    linksTitle: 'How Family and Result Links Work',
    linksP1: [
      'When an organizer creates a drill link (e.g. including first names like “Mum” or “Sam”), those names live entirely in the URL ',
      'hash fragment',
      ' (everything after the ',
      ' symbol in your browser bar).',
    ],
    linksP2: [
      'By internet standards, web browsers ',
      'never transmit hash fragments to web servers',
      '. The names exist solely in your local browser window.',
    ],
    storageTitle: 'Local Storage',
    storage: [
      'Your display preferences (text size, high-contrast theme, and audio voice toggle) are stored only on your computer or phone using standard ',
      ' so they stay saved when you return.',
    ],
    voiceTitle: 'Spoken Voice Synthesis',
    voice:
      'The voice for each scenario is pre-recorded and served from our own website, so nothing about you is sent anywhere to play it. Only if a recording fails to load, the fixed scripted sentence (never your name, choices or settings) is sent through our server to a third-party text-to-speech service (currently Google) as a backup. We do not record or store any audio.',
  },
  bn: {
    kicker: 'কোনো ট্র্যাকিং নয়—আমাদের নীতি',
    title: 'গোপনীয়তা ও তথ্য সংগ্রহ না করা',
    banner:
      'আমরা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না। কোনো অ্যাকাউন্ট নেই, কোনো কুকি নেই, কোনো ট্র্যাকিং পিক্সেল নেই, এবং ব্যবহারকারীদের কোনো ডেটাবেসও নেই।',
    linksTitle: 'পারিবারিক ও ফলাফলের লিংক যেভাবে কাজ করে',
    linksP1: [
      'কোনো আয়োজক যখন মহড়ার লিংক তৈরি করেন (যেমন “মা” বা “সাম”-এর মতো প্রথম নাম যোগ করে), তখন সেই নামগুলো পুরোপুরি URL-এর ',
      'হ্যাশ অংশে',
      ' (আপনার ব্রাউজারের ঠিকানা বারে ',
      ' চিহ্নের পরের সবকিছু) থাকে।',
    ],
    linksP2: [
      'ইন্টারনেটের নিয়ম অনুযায়ী, ওয়েব ব্রাউজার ',
      'হ্যাশ অংশ কখনো ওয়েব সার্ভারে পাঠায় না',
      '। নামগুলো শুধু আপনার নিজের ব্রাউজার উইন্ডোতেই থাকে।',
    ],
    storageTitle: 'লোকাল স্টোরেজ',
    storage: [
      'আপনার পছন্দের ডিসপ্লে সেটিংস (লেখার আকার, হাই-কনট্রাস্ট থিম এবং কণ্ঠস্বর চালু/বন্ধ) শুধু আপনার কম্পিউটার বা ফোনে সাধারণ ',
      '-এর মাধ্যমে সংরক্ষিত থাকে, যাতে আপনি আবার এলে সেগুলো ঠিক থাকে।',
    ],
    voiceTitle: 'কণ্ঠস্বরে পড়ে শোনানো',
    voice:
      'প্রতিটি দৃশ্যের কণ্ঠস্বর আগে থেকেই রেকর্ড করা এবং আমাদের নিজস্ব ওয়েবসাইট থেকে চালানো হয়, তাই এটি চালাতে আপনার সম্পর্কে কোনো তথ্য কোথাও পাঠানো হয় না। শুধুমাত্র কোনো রেকর্ডিং লোড না হলে, বিকল্প হিসেবে নির্ধারিত বাক্যটি (কখনোই আপনার নাম, পছন্দ বা সেটিংস নয়) আমাদের সার্ভারের মাধ্যমে একটি তৃতীয় পক্ষের টেক্সট-টু-স্পিচ সেবায় (বর্তমানে Google) পাঠানো হয়। আমরা কোনো অডিও রেকর্ড বা সংরক্ষণ করি না।',
  },
};

export function PrivacyContent() {
  const { language } = useSettings();
  const t = language === 'bn' ? content.bn : content.en;

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            {t.kicker}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            {t.title}
          </h1>
        </header>

        <section className="flex flex-col gap-4 text-base text-ink leading-relaxed">
          <div className="p-4 bg-safe-green-light border-2 border-safe-green rounded-panel font-semibold">
            {t.banner}
          </div>

          <h2 className="text-2xl font-bold text-ink mt-2">
            {t.linksTitle}
          </h2>
          <p>
            {t.linksP1[0]}<strong>{t.linksP1[1]}</strong>{t.linksP1[2]}<code className="bg-panel px-1 py-0.5 rounded">#</code>{t.linksP1[3]}
          </p>
          <p>
            {t.linksP2[0]}<em>{t.linksP2[1]}</em>{t.linksP2[2]}
          </p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            {t.storageTitle}
          </h2>
          <p>
            {t.storage[0]}<code className="bg-panel px-1 py-0.5 rounded">localStorage</code>{t.storage[1]}
          </p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            {t.voiceTitle}
          </h2>
          <p>{t.voice}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
