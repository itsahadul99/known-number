'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useSettings } from '@/lib/settings-context';

export function Header() {
  const {
    setIsSettingsOpen,
    textSize,
    contrast,
    language,
    setLanguage,
    t,
  } = useSettings();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <header className="border-b border-rule bg-paper px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
        <Logo showTagline={true} />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="bg-panel border-2 border-control-edge rounded-control px-2.5 py-1.5 text-sm font-bold text-ink cursor-pointer min-h-[44px] inline-flex items-center gap-1.5 hover:bg-panel-darker transition-colors"
            aria-label={`Switch language. Current: ${language === 'en' ? 'English' : 'বাংলা'}`}
          >
            <span>{language === 'en' ? '🇧🇩 বাংলা' : '🇺🇸 English'}</span>
          </button>

          <Link
            href="/organise"
            className="text-sm font-semibold text-signal-blue no-underline px-3 py-2 rounded-control border border-rule hover:bg-panel inline-flex items-center min-h-[44px] transition-colors"
          >
            {t.sendFamilyDrill}
          </Link>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open display and contrast settings"
            className="bg-panel border-2 border-control-edge rounded-control px-3 py-2 text-sm font-semibold text-ink cursor-pointer min-h-[44px] inline-flex items-center gap-2 hover:bg-panel-darker transition-colors"
          >
            <span>{t.settings}</span>
            <span className="text-xs bg-paper px-2 py-0.5 rounded border border-rule hidden sm:inline">
              {textSize === 'large' ? 'Large' : textSize === 'extra-large' ? 'XL' : '20px'}
              {contrast === 'high' ? ' · Hi-Con' : ''}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
