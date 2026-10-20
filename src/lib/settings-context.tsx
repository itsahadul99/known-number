'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type TextSize = 'normal' | 'large' | 'extra-large';
export type ContrastMode = 'normal' | 'high';
export type AudioMode = 'on' | 'off';

interface SettingsContextValue {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  contrast: ContrastMode;
  setContrast: (mode: ContrastMode) => void;
  audio: AudioMode;
  setAudio: (mode: AudioMode) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'known_number_settings';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>('normal');
  const [contrast, setContrastState] = useState<ContrastMode>('normal');
  const [audio, setAudioState] = useState<AudioMode>('off');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.textSize) setTextSizeState(parsed.textSize);
        if (parsed.contrast) setContrastState(parsed.contrast);
        if (parsed.audio) setAudioState(parsed.audio);
      }
    } catch {
      // Fallback to defaults
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute('data-contrast', contrast);
    document.documentElement.setAttribute('data-text-size', textSize);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ textSize, contrast, audio })
      );
    } catch {
      // Ignore storage errors
    }
  }, [textSize, contrast, audio, isMounted]);

  const setTextSize = (size: TextSize) => setTextSizeState(size);
  const setContrast = (mode: ContrastMode) => setContrastState(mode);
  const setAudio = (mode: AudioMode) => setAudioState(mode);

  return (
    <SettingsContext.Provider
      value={{
        textSize,
        setTextSize,
        contrast,
        setContrast,
        audio,
        setAudio,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
