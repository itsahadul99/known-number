'use client';

import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/lib/settings-context';

export function Footer() {
  const { t } = useSettings();

  return (
    <footer className="border-t border-rule bg-panel px-4 py-8 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/about"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerAbout}
          </Link>
          <Link
            href="/report"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerReporting}
          </Link>
          <Link
            href="/card"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerFridgeCard}
          </Link>
          <Link
            href="/styleguide"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerStyleguide}
          </Link>
          <Link
            href="/privacy"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerPrivacy}
          </Link>
          <Link
            href="/accessibility"
            className="text-ink font-semibold underline min-h-[44px] inline-flex items-center hover:text-signal-blue"
          >
            {t.footerAccessibility}
          </Link>
        </div>

        <div className="border-t border-rule pt-4">
          <p className="text-sm text-ink-muted leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
