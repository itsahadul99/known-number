'use client';

import React from 'react';
import { useSettings } from '@/lib/settings-context';

export function SkipLink() {
  const { t } = useSettings();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:p-3 focus:bg-signal-blue focus:text-white focus:rounded-control"
    >
      {t.skipToContent}
    </a>
  );
}
