'use client';

import React from 'react';
import { useSettings, TextSize, ContrastMode, AudioMode } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';

export function SettingsModal() {
  const {
    textSize,
    setTextSize,
    contrast,
    setContrast,
    audio,
    setAudio,
    isSettingsOpen,
    setIsSettingsOpen,
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
        className="bg-paper text-ink border-2 border-ink rounded-panel max-w-lg w-full p-6 flex flex-col gap-5 shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h2 id="settings-title" className="text-2xl font-bold">
            Display & Audio Settings
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

        {/* Text Size Control */}
        <fieldset className="border border-rule rounded-control p-4">
          <legend className="font-bold px-2 text-ink">Text Size</legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'normal', label: 'Standard (20px)' },
              { id: 'large', label: 'Large (24px)' },
              { id: 'extra-large', label: 'Extra Large (28px)' },
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
          <legend className="font-bold px-2 text-ink">Contrast Theme</legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'normal', label: 'Standard contrast' },
              { id: 'high', label: 'High contrast (pure black/white lines)' },
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
          <legend className="font-bold px-2 text-ink">Spoken Voice for Phone Calls</legend>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { id: 'off', label: 'Audio off (read transcript on screen)' },
              { id: 'on', label: 'Audio on (browser reads caller lines aloud)' },
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
          Apply settings
        </Button>
      </div>
    </div>
  );
}
