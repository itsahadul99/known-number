'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSettings } from '@/lib/settings-context';

export default function ReportPage() {
  const { language } = useSettings();

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            {language === 'bn' ? 'অফিশিয়াল হেল্পলাইন ও আইনি সহায়তা' : 'Official Hotlines & Authorities'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            {language === 'bn' ? 'প্রতারণার শিকার হলে কোথায় অভিযোগ করবেন?' : 'Where to report a scam'}
          </h1>
          <p className="text-lg text-ink-muted mt-2 max-w-prose">
            {language === 'bn'
              ? 'আপনি বা আপনার পরিবারের কেউ টাকা পাঠিয়ে ফেললে, পিন হারিয়ে ফেললে বা প্রতারক ক্রমাগত হুমকি দিলে অবিলম্বে এই অফিশিয়াল নম্বরে যোগাযোগ করুন।'
              : 'If you or a loved one sent money, gave away passwords, or are currently being harassed by a suspected fraudster, contact these official bodies immediately.'}
          </p>
        </header>

        {/* Immediate steps if money was sent */}
        <section className="bg-stop-red-light border-2 border-stop-red border-l-8 p-6 rounded-panel flex flex-col gap-3">
          <h2 className="text-xl font-bold text-ink">
            {language === 'bn' ? 'ইতিমধ্যেই টাকা পাঠিয়ে ফেলেছেন বা পিন দিয়ে ফেলেছেন?' : 'Did you already send money or share bank access?'}
          </h2>
          <ol className="list-decimal pl-5 flex flex-col gap-2 text-base text-ink">
            <li>
              <strong>{language === 'bn' ? 'অবিলম্বে একাউন্ট লক করুন:' : 'Call your bank immediately:'}</strong>{' '}
              {language === 'bn'
                ? 'বিকাশের ক্ষেত্রে ১৬২৪৭, নগদের ক্ষেত্রে ১৬১৬৭ অথবা আপনার ব্যাংকের অফিশিয়াল হেল্পলাইনে ফোন দিয়ে একাউন্ট সাময়িক ব্লক ও পিন রিসেট করার অনুরোধ জানান।'
                : 'Ask for the fraud department to freeze transfers and cancel compromised debit or credit cards.'}
            </li>
            <li>
              <strong>{language === 'bn' ? 'ট্রানজেকশন আইডি ও স্ক্রিনশট সংরক্ষণ করুন:' : 'Save records & screenshots:'}</strong>{' '}
              {language === 'bn'
                ? 'যে নম্বরে টাকা পাঠিয়েছেন এবং মেসেজের স্ক্রিনশট ডিলিট করবেন না। অভিযোগ দায়েরের সময় এগুলি প্রমাণ হিসেবে প্রয়োজন হবে।'
                : 'Keep all receipts, phone logs, and confirmation emails for police and banking claims.'}
            </li>
            <li>
              <strong>{language === 'bn' ? 'থানায় সাধারণ ডায়েরি (GD) বা অভিযোগ করুন:' : 'Contact local police:'}</strong>{' '}
              {language === 'bn'
                ? 'নিকটস্থ থানায় গিয়ে জিডি করুন এবং জরুরি সহায়তায় ৯৯৯-এ কল দিন।'
                : 'File an official police report. You will often need the police report number for insurance and bank reimbursement.'}
            </li>
          </ol>
        </section>

        {/* Bangladesh Official Reporting Channels */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-rule pb-2">
            <h2 className="text-2xl font-bold text-ink">
              🇧🇩 বাংলাদেশ অফিশিয়াল হেল্পলাইন
            </h2>
            <span className="text-xs font-bold text-safe-green bg-panel px-2 py-0.5 rounded border border-rule">
              সরাসরি চালু
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-stop-red uppercase tracking-wider block">জরুরি জাতীয় সেবা</span>
                <h3 className="text-xl font-bold text-ink mt-0.5">জাতীয় জরুরি হেল্পলাইন (৯৯৯)</h3>
                <p className="text-sm text-ink-muted mt-1">
                  পুলিশ, অ্যাম্বুলেন্স ও তাৎক্ষণিক উদ্ধার সহায়তার জন্য ২৪ ঘণ্টা টোল-ফ্রি।
                </p>
              </div>
              <div>
                <a href="tel:999" className="font-bold text-signal-blue text-xl underline">
                  ডায়াল করুন: ৯৯৯
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-signal-blue uppercase tracking-wider block">সাইবার অপরাধ তদন্ত</span>
                <h3 className="text-xl font-bold text-ink mt-0.5">সিআইডি সাইবার পুলিশ সেন্টার</h3>
                <p className="text-sm text-ink-muted mt-1">
                  অনলাইন প্রতারণা, বিকাশ ফ্রড ও ডিজিটাল ব্ল্যাকমেইল সংক্রান্ত বিশেষজ্ঞ অভিযোগ কেন্দ্র।
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <a href="tel:01769691522" className="font-bold text-signal-blue text-base underline">
                  কল: 01769-691522
                </a>
                <a href="tel:01769691509" className="font-bold text-signal-blue text-base underline">
                  কল: 01769-691509
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-signal-blue uppercase tracking-wider block">মোবাইল ফাইন্যান্সিয়াল সার্ভিস</span>
                <h3 className="text-xl font-bold text-ink mt-0.5">বিকাশ ও নগদ হেল্পলাইন</h3>
                <p className="text-sm text-ink-muted mt-1">
                  একাউন্ট হ্যাক হওয়া রোধে বা ট্রানজেকশন স্থগিত করতে সরাসরি যোগাযোগ করুন।
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <a href="tel:16247" className="font-bold text-signal-blue text-lg underline">
                  বিকাশ হেল্পলাইন: 16247
                </a>
                <a href="tel:16167" className="font-bold text-signal-blue text-lg underline">
                  নগদ হেল্পলাইন: 16167
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-signal-blue uppercase tracking-wider block">টেলিকম ও সিম জালিয়াতি</span>
                <h3 className="text-xl font-bold text-ink mt-0.5">বিটিআরসি ভোক্তা অভিযোগ (১০০)</h3>
                <p className="text-sm text-ink-muted mt-1">
                  ভুয়া সিম, স্প্যাম এসএমএস ও কল সেন্টারের প্রতারণামূলক কার্যক্রমের অভিযোগ জানান।
                </p>
              </div>
              <div>
                <a href="tel:100" className="font-bold text-signal-blue text-xl underline">
                  ডায়াল করুন: ১০০
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* United States Reporting Channels */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink border-b border-rule pb-2">
            🇺🇸 United States Official Reporting Channels
          </h2>

          <div className="flex flex-col gap-3">
            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col gap-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold text-ink">
                  Federal Trade Commission (FTC)
                </h3>
                <span className="text-xs font-bold text-signal-blue bg-paper px-2 py-1 rounded border border-rule">
                  ReportFraud.ftc.gov
                </span>
              </div>
              <p className="text-base text-ink-muted">
                Official federal fraud reporting portal used by law enforcement nationwide.
              </p>
              <div className="mt-2">
                <a
                  href="https://reportfraud.ftc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-signal-blue underline text-base"
                >
                  Visit ReportFraud.ftc.gov →
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col gap-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold text-ink">
                  AARP Fraud Watch Network Helpline
                </h3>
                <span className="text-xs font-bold text-safe-green bg-paper px-2 py-1 rounded border border-rule">
                  Free Support
                </span>
              </div>
              <p className="text-base text-ink-muted">
                Free confidential helpline for older adults and families.
              </p>
              <div className="mt-2">
                <a href="tel:877-908-3360" className="font-bold text-signal-blue underline text-lg">
                  Call toll-free: 877-908-3360
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
