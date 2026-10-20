'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSettings } from '@/lib/settings-context';

interface AboutCopy {
  kicker: string;
  title: string;
  tagline: string;
  p1After: string;
  p2: string;
  p3: string;
  principlesTitle: string;
  principles: { label: string; text: string }[];
}

const content: { en: AboutCopy; bn: AboutCopy } = {
  en: {
    kicker: 'About The Project',
    title: 'About Known Number',
    tagline: '“Practice the call before it comes.”',
    p1After:
      ' is a free, non-commercial tool designed to help families rehearse realistic scam calls and messages together in safety.',
    p2: 'According to the FBI IC3 and FTC, fraud against adults aged 60+ caused over $7.75 billion in reported losses in 2025 alone. Traditional security advice like “be careful” and “never share passwords” is read in calm moments, but scams work by inducing sudden panic and confusion.',
    p3: 'Under emotional pressure, people fall back on practiced habit, not leaflets. Rehearsing in a zero-risk browser environment gives families the confidence to recognize manipulation and hang up with certainty.',
    principlesTitle: 'Guiding Principles',
    principles: [
      {
        label: 'Zero Cost & Zero Data:',
        text: 'No accounts, no subscriptions, no ads, no trackers.',
      },
      {
        label: 'Respectful & Non-Shaming:',
        text: 'Victims of scams are intelligent people caught in high-pressure operations. Our drills celebrate good instincts and never use mocking language.',
      },
      {
        label: 'Family-Centric:',
        text: 'Adult children can send a drill to their parents with one tap, initiating healthy safety conversations without paternalism.',
      },
    ],
  },
  bn: {
    kicker: 'প্রকল্প সম্পর্কে',
    title: 'Known Number সম্পর্কে',
    tagline: '“ফোন আসার আগেই অনুশীলন করে নিন।”',
    p1After:
      ' একটি বিনামূল্যের, অবাণিজ্যিক টুল। এর মাধ্যমে পরিবারের সবাই মিলে নিরাপদে প্রতারণার বাস্তবসম ফোনকল ও মেসেজের মহড়া দিতে পারে।',
    p2: 'FBI IC3 ও FTC-র তথ্য অনুযায়ী, ২০২৫ সালেই ৬০ বছর বা তার বেশি বয়সীদের সঙ্গে প্রতারণায় জানা ক্ষতির পরিমাণ ছিল ৭.৭৫ বিলিয়ন ডলারের বেশি। “সাবধান থাকুন” বা “কখনো পাসওয়ার্ড জানাবেন না”—এই ধরনের নিরাপত্তার পরামর্শ আমরা শান্ত মুহূর্তে পড়ি, অথচ প্রতারণা কাজ করে হঠাৎ ভয় ও বিভ্রান্তি তৈরি করে।',
    p3: 'মানসিক চাপের মুহূর্তে মানুষ লিফলেটের কথা নয়, অভ্যাসের ওপরই ভরসা করে। কোনো ঝুঁকি ছাড়া ব্রাউজারে মহড়া দিলে পরিবারগুলো প্রতারণার কৌশল চিনতে এবং দৃঢ়ভাবে ফোন কেটে দিতে আত্মবিশ্বাস পায়।',
    principlesTitle: 'আমাদের মূল নীতি',
    principles: [
      {
        label: 'বিনা খরচ ও কোনো তথ্য নয়:',
        text: 'কোনো অ্যাকাউন্ট নেই, কোনো সাবস্ক্রিপশন নেই, কোনো বিজ্ঞাপন নেই, কোনো ট্র্যাকার নেই।',
      },
      {
        label: 'সম্মানজনক ও লজ্জা না দেওয়া:',
        text: 'প্রতারণার শিকার মানুষ বুদ্ধিমান; তাঁরা চাপের মুখে থাকা চক্রের ফাঁদে পড়েছেন মাত্র। আমাদের মহড়াগুলো ভালো সহজাত বুদ্ধির প্রশংসা করে এবং কখনো বিদ্রূপের ভাষা ব্যবহার করে না।',
      },
      {
        label: 'পরিবারকেন্দ্রিক:',
        text: 'প্রাপ্তবয়স্ক সন্তানরা এক ট্যাপেই বাবা-মাকে একটি মহড়া পাঠাতে পারেন। এতে কারও ওপর কর্তৃত্ব না খাটিয়েই নিরাপত্তা নিয়ে সুন্দর আলোচনা শুরু হয়।',
      },
    ],
  },
};

export function AboutContent() {
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
          <p className="text-lg text-ink-muted mt-2">
            {t.tagline}
          </p>
        </header>

        <section className="flex flex-col gap-4 text-base text-ink leading-relaxed">
          <p>
            <strong>Known Number</strong>{t.p1After}
          </p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>

          <h2 className="text-2xl font-bold text-ink mt-4">
            {t.principlesTitle}
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            {t.principles.map((p) => (
              <li key={p.label}>
                <strong>{p.label}</strong> {p.text}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
