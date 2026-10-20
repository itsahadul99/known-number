import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-rule bg-panel px-4 py-8 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/about"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            About Known Number
          </Link>
          <Link
            href="/report"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            Official Reporting Numbers
          </Link>
          <Link
            href="/card"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            Printable Fridge Card
          </Link>
          <Link
            href="/styleguide"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            Design Styleguide
          </Link>
          <Link
            href="/privacy"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            Privacy & Non-collection
          </Link>
          <Link
            href="/accessibility"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            Accessibility Statement
          </Link>
        </div>

        <div className="border-t border-rule pt-4">
          <p className="text-sm text-ink-muted leading-relaxed">
            Known Number is a free, open-source educational drill. It does not collect personal data, does not use cookies, and does not replace legal or financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
