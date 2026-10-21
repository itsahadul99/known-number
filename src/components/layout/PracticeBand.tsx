'use client';

import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/lib/settings-context';

interface PracticeBandProps {
  onStop?: () => void;
  stopHref?: string;
}

export function PracticeBand({ onStop, stopHref = '/' }: PracticeBandProps) {
  const { t } = useSettings();

  return (
    <aside
      className="sticky top-0 z-50 bg-signal-blue text-white min-h-[52px] flex items-center px-4 py-2 border-b-2 border-ink shadow-sm"
      aria-label="Practice notification banner"
    >
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-white inline-block animate-pulse shrink-0" aria-hidden="true" />
          <span className="font-bold text-sm sm:text-base sm:tracking-wide leading-tight">
            {t.practiceBanner}
          </span>
        </div>

        {onStop ? (
          <button
            type="button"
            onClick={onStop}
            className="shrink-0 bg-transparent text-white border-2 border-white rounded-control px-3 py-1 text-sm font-semibold min-h-[38px] hover:bg-white hover:text-signal-blue transition-colors cursor-pointer"
            aria-label={t.stopPractice}
          >
            {t.stopPractice}
          </button>
        ) : (
          <Link
            href={stopHref}
            className="shrink-0 bg-transparent text-white border-2 border-white rounded-control px-3 py-1 text-sm font-semibold min-h-[38px] hover:bg-white hover:text-signal-blue transition-colors inline-flex items-center no-underline"
            aria-label={t.stopPractice}
          >
            {t.stopPractice}
          </Link>
        )}
      </div>
    </aside>
  );
}
