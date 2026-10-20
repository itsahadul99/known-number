'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSettings } from '@/lib/settings-context';

interface AccessibilityCopy {
  kicker: string;
  title: string;
  intro: string;
  featuresTitle: string;
  features: { label: string; text: string }[];
  motionLabel: string;
  /** [before code, after code] */
  motion: [string, string];
}

const content: { en: AccessibilityCopy; bn: AccessibilityCopy } = {
  en: {
    kicker: 'WCAG 2.2 AA Conformance',
    title: 'Accessibility Statement',
    intro:
      'Known Number is engineered from the ground up for older adults, individuals with low vision, and people using assistive technologies.',
    featuresTitle: 'Key Accessibility Features',
    features: [
      {
        label: 'Large Default Typography:',
        text: 'Base body text starts at 20px, with built-in instant scaling options up to 28px without horizontal scrolling or layout breakages.',
      },
      {
        label: 'High-Contrast Theme:',
        text: 'Our high-contrast mode exceeds WCAG AAA contrast ratios with solid ink outlines and high-contrast sign shapes.',
      },
      {
        label: 'Multi-Sensory Sign System:',
        text: 'Never relying on color alone, all statuses pair distinct geometric shapes (circles, triangles, squares, bars) with prominent text labels.',
      },
      {
        label: 'Generous Interactive Targets:',
        text: 'Primary interactive buttons are at least 56px in height with generous spacing between adjacent touch targets.',
      },
      {
        label: 'Screen Reader Accessible:',
        text: 'All simulated phone screens and alerts have textual captions; SVGs have proper ARIA attributes; focus states are preserved throughout.',
      },
    ],
    motionLabel: 'Respect for Reduced Motion:',
    motion: [
      'Flashing, entrance animations, and timer countdowns are completely disabled under ',
      '.',
    ],
  },
  bn: {
    kicker: 'WCAG 2.2 AA মান অনুসরণ',
    title: 'অ্যাক্সেসিবিলিটি বিবৃতি',
    intro:
      'Known Number গোড়া থেকেই তৈরি করা হয়েছে বয়স্ক মানুষ, কম দেখতে পান এমন ব্যক্তি এবং সহায়ক প্রযুক্তি ব্যবহারকারীদের কথা মাথায় রেখে।',
    featuresTitle: 'প্রধান অ্যাক্সেসিবিলিটি সুবিধা',
    features: [
      {
        label: 'বড় ডিফল্ট লেখা:',
        text: 'সাধারণ লেখার আকার শুরু হয় 20px দিয়ে, আর সঙ্গে সঙ্গে 28px পর্যন্ত বড় করার ব্যবস্থা আছে। এতে পাশে স্ক্রল করতে হয় না এবং পাতার বিন্যাসও এলোমেলো হয় না।',
      },
      {
        label: 'হাই-কনট্রাস্ট থিম:',
        text: 'আমাদের হাই-কনট্রাস্ট মোডে গাঢ় কালো রেখা ও স্পষ্ট চিহ্নের আকার ব্যবহার করা হয়, যা WCAG AAA-এর কনট্রাস্ট মানকেও ছাড়িয়ে যায়।',
      },
      {
        label: 'একাধিক ইন্দ্রিয়ের চিহ্নব্যবস্থা:',
        text: 'শুধু রঙের ওপর নির্ভর করা হয় না; প্রতিটি অবস্থার সঙ্গে আলাদা জ্যামিতিক আকার (বৃত্ত, ত্রিভুজ, চতুর্ভুজ, বার) এবং স্পষ্ট লেখা থাকে।',
      },
      {
        label: 'বড় ও সহজে চাপার বোতাম:',
        text: 'প্রধান বোতামগুলোর উচ্চতা কমপক্ষে 56px, এবং পাশাপাশি বোতামগুলোর মাঝে যথেষ্ট ফাঁকা জায়গা রাখা হয়েছে।',
      },
      {
        label: 'স্ক্রিন রিডারে ব্যবহারযোগ্য:',
        text: 'নকল ফোনের সব পর্দা ও সতর্কবার্তার লিখিত বর্ণনা আছে; SVG-তে সঠিক ARIA বৈশিষ্ট্য দেওয়া আছে; ফোকাস চিহ্ন সব জায়গায় বজায় থাকে।',
      },
    ],
    motionLabel: 'কম নড়াচড়ার পছন্দকে সম্মান:',
    motion: [
      'ঝলকানি, প্রবেশের অ্যানিমেশন এবং টাইমারের গণনা ',
      ' চালু থাকলে পুরোপুরি বন্ধ থাকে।',
    ],
  },
};

export function AccessibilityContent() {
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
          <p>{t.intro}</p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            {t.featuresTitle}
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            {t.features.map((f) => (
              <li key={f.label}>
                <strong>{f.label}</strong> {f.text}
              </li>
            ))}
            <li>
              <strong>{t.motionLabel}</strong> {t.motion[0]}<code className="bg-panel px-1 py-0.5 rounded">prefers-reduced-motion</code>{t.motion[1]}
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
