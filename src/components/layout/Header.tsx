'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useSettings } from '@/lib/settings-context';

export function Header() {
  const { setIsSettingsOpen, textSize, contrast } = useSettings();

  return (
    <header className="border-b border-rule bg-paper px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
        <Logo showTagline={true} />

        <div className="flex items-center gap-3">
          <Link
            href="/organise"
            className="text-sm font-semibold text-signal-blue no-underline px-3 py-2 rounded-control border border-rule hover:bg-panel inline-flex items-center min-h-[44px] transition-colors"
          >
            Send a family drill
          </Link>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open display and contrast settings"
            className="bg-panel border-2 border-control-edge rounded-control px-3 py-2 text-sm font-semibold text-ink cursor-pointer min-h-[44px] inline-flex items-center gap-2 hover:bg-panel-darker transition-colors"
          >
            <span>Settings</span>
            <span className="text-xs bg-paper px-2 py-0.5 rounded border border-rule">
              {textSize === 'large' ? 'Large' : textSize === 'extra-large' ? 'XL' : '20px'}
              {contrast === 'high' ? ' · Hi-Con' : ''}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
