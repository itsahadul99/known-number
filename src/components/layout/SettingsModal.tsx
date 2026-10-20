'use client';

import React from 'react';
import { useSettings, TextSize, ContrastMode, AudioMode } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Locale, SUPPORTED_LANGUAGES } from '@/lib/i18n/translations';

export function SettingsModal() {
  const {
    language,
    setLanguage,
    textSize,
    setTextSize,
    contrast,
    setContrast,
    audio,
    setAudio,
    isSettingsOpen,
    setIsSettingsOpen,
    t,
  } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className="fixed inset-0 bg-ink/65 flex items-center justify-center z-50 p-4"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper text-ink border-2 border-ink rounded-panel max-w-lg w-full p-6 flex flex-col gap-5 shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 id="settings-title" className="text-2xl font-bold">
            {language === 'bn' ? 'ডিসপ্লে, ভাষা ও সাউন্ড সেটিংস' : 'Display & Audio Settings'}
          </h2>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            aria-label="Close settings"
            className="bg-transparent border-2 border-control-edge rounded-control w-11 h-11 text-xl font-bold cursor-pointer text-ink hover:bg-panel flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Language Selection */}
        <fieldset className="border border-rule rounded-control p-4">
          <legend className="font-bold px-2 text-ink">{t.languageSelect}</legend>
          <div className="flex flex-col gap-2 mt-2">
            {SUPPORTED_LANGUAGES.map((option) => (
              <label
                key={option.code}
                className={`flex items-center gap-3 min-h-[48px] px-3 py-2 border rounded-control cursor-pointer transition-colors ${
                  language === option.code
                    ? 'border-2 border-signal-blue bg-panel font-bold'
                    : 'border-control-edge bg-transparent hover:bg-panel'
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value={option.code}
                  checked={language === option.code}
                  onChange={() => setLanguage(option.code as Locale)}
                  className="w-5 h-5 accent-signal-blue"
                />
                <span className="text-base flex items-center gap-2">
                  <span>{option.flag}</span>
                  <span>{option.nativeName}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Text Size Control */}
        <fieldset className="border border-rule rounded-control p-4">
          <legend className="font-bold px-2 text-ink">
            {language === 'bn' ? 'লেখার আকার (Text Size)' : 'Text Size'}
          </legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'normal', label: language === 'bn' ? 'স্বাভাবিক (20px)' : 'Standard (20px)' },
              { id: 'large', label: language === 'bn' ? 'বড় (24px)' : 'Large (24px)' },
              { id: 'extra-large', label: language === 'bn' ? 'অনেক বড় (28px)' : 'Extra Large (28px)' },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 min-h-[48px] px-3 py-2 border rounded-control cursor-pointer transition-colors ${
                  textSize === option.id
                    ? 'border-2 border-signal-blue bg-panel font-bold'
                    : 'border-control-edge bg-transparent hover:bg-panel'
                }`}
              >
                <input
                  type="radio"
                  name="text-size"
                  value={option.id}
                  checked={textSize === option.id}
                  onChange={() => setTextSize(option.id as TextSize)}
                  className="w-5 h-5 accent-signal-blue"
                />
                <span className="text-base">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* High Contrast Mode */}
        <fieldset className="border border-rule rounded-control p-4">
          <legend className="font-bold px-2 text-ink">
            {language === 'bn' ? 'কনট্রাস্ট থিম' : 'Contrast Theme'}
          </legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'normal', label: language === 'bn' ? 'স্বাভাবিক কনট্রাস্ট' : 'Standard contrast' },
              { id: 'high', label: language === 'bn' ? 'হাই কনট্রাস্ট (উচ্চ স্পষ্টতা)' : 'High contrast (pure black/white lines)' },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 min-h-[48px] px-3 py-2 border rounded-control cursor-pointer transition-colors ${
                  contrast === option.id
                    ? 'border-2 border-signal-blue bg-panel font-bold'
                    : 'border-control-edge bg-transparent hover:bg-panel'
                }`}
              >
                <input
                  type="radio"
                  name="contrast"
                  value={option.id}
                  checked={contrast === option.id}
                  onChange={() => setContrast(option.id as ContrastMode)}
                  className="w-5 h-5 accent-signal-blue"
                />
                <span className="text-base">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Audio Spoken Voice */}
        <fieldset className="border border-rule rounded-control p-4">
          <legend className="font-bold px-2 text-ink">
            {language === 'bn' ? 'ফোনের কথা পড়ে শোনানো (Audio)' : 'Spoken Voice for Phone Calls'}
          </legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'off', label: language === 'bn' ? 'অডিও বন্ধ (স্ক্রিনে পড়ে দেখুন)' : 'Audio off (read transcript on screen)' },
              { id: 'on', label: language === 'bn' ? 'অডিও চালু (উচ্চমানের ভয়েস স্বয়ংক্রিয়ভাবে চলবে)' : 'Audio on (high-fidelity neural voice)' },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 min-h-[48px] px-3 py-2 border rounded-control cursor-pointer transition-colors ${
                  audio === option.id
                    ? 'border-2 border-signal-blue bg-panel font-bold'
                    : 'border-control-edge bg-transparent hover:bg-panel'
                }`}
              >
                <input
                  type="radio"
                  name="audio"
                  value={option.id}
                  checked={audio === option.id}
                  onChange={() => setAudio(option.id as AudioMode)}
                  className="w-5 h-5 accent-signal-blue"
                />
                <span className="text-base">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          type="button"
          onClick={() => setIsSettingsOpen(false)}
          fullWidth
          size="default"
        >
          {language === 'bn' ? 'সেটিংস প্রয়োগ করুন' : 'Apply settings'}
        </Button>
      </div>
    </div>
  );
}
