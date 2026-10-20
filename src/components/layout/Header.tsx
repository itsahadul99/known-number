'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useSettings } from '@/lib/settings-context';
import { SUPPORTED_LANGUAGES, Locale } from '@/lib/i18n/translations';

export function Header() {
  const {
    setIsSettingsOpen,
    textSize,
    contrast,
    language,
    setLanguage,
    t,
  } = useSettings();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Locale);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="border-b border-rule bg-paper px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
        <Logo showTagline={true} />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Universal Language Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="language-select-header" className="sr-only">
              {t.languageSelect}
            </label>
            <select
              id="language-select-header"
              value={language}
              onChange={handleLanguageChange}
              className="bg-panel border-2 border-control-edge rounded-control px-2.5 py-1.5 text-sm font-bold text-ink cursor-pointer min-h-[44px] hover:bg-panel-darker transition-colors focus-visible:outline-signal-blue"
              aria-label={t.languageSelect}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/organise"
            className="text-sm font-semibold text-signal-blue no-underline px-3 py-2 rounded-control border border-rule hover:bg-panel inline-flex items-center min-h-[44px] transition-colors"
          >
            {t.sendFamilyDrill}
          </Link>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label={t.openSettingsAria}
            className="bg-panel border-2 border-control-edge rounded-control px-3 py-2 text-sm font-semibold text-ink cursor-pointer min-h-[44px] inline-flex items-center gap-2 hover:bg-panel-darker transition-colors"
          >
            <span>{t.settings}</span>
            <span className="text-xs bg-paper px-2 py-0.5 rounded border border-rule hidden sm:inline">
              {textSize === 'large' ? t.sizeLarge : textSize === 'extra-large' ? t.sizeXL : '20px'}
              {contrast === 'high' ? ` · ${t.contrastShort}` : ''}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
