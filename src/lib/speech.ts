'use client';

import { prepareSpeechText } from './speech-text';

let currentAudio: HTMLAudioElement | null = null;
let audioQueue: string[] = [];
let currentQueueLang: string = 'en';
let currentQueueOnEnd: (() => void) | null = null;
let isPlayingQueue = false;
// Bumped on every speakText/stopSpeech so callbacks from an older queue are ignored
let generation = 0;

/**
 * Detects the script language of the text (Bangla, Hindi, Arabic, or fallback)
 * to prevent mismatching voices with character sets.
 */
export function detectTextLanguage(text: string, fallbackLang: string = 'en'): string {
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  return fallbackLang ? fallbackLang.split('-')[0] : 'en';
}

/**
 * Split text into manageable audio phrases (max ~110 characters per chunk)
 * without cutting words, respecting punctuation and Bengali dāri (।).
 */
function splitTextIntoPhrases(text: string): string[] {
  const clean = prepareSpeechText(text);

  if (!clean) return [];

  // Split on periods, exclamation, question marks, Bengali dāri (।), or newlines
  const rawSentences = clean.split(/([।!?\n]+)/);
  const chunks: string[] = [];
  let current = '';

  for (let i = 0; i < rawSentences.length; i++) {
    const part = rawSentences[i]?.trim();
    if (!part) continue;

    // Check if this part has any actual letters/numbers (not just punctuation)
    const hasContent = /[a-zA-Z0-9\u0980-\u09FF\u0900-\u097F\u0600-\u06FF]/.test(part);

    if (current.length + part.length < 110) {
      current = current ? `${current} ${part}` : part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      current = hasContent ? part : '';
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  // Filter out any empty chunks or chunks with no letters
  const validChunks = chunks.filter((c) =>
    /[a-zA-Z0-9\u0980-\u09FF\u0900-\u097F\u0600-\u06FF]/.test(c)
  );

  return validChunks.length > 0 ? validChunks : [clean];
}

/**
 * Plays the next phrase chunk from the queue.
 */
function playNextChunk() {
  if (audioQueue.length === 0) {
    isPlayingQueue = false;
    currentAudio = null;
    if (currentQueueOnEnd) {
      currentQueueOnEnd();
      currentQueueOnEnd = null;
    }
    return;
  }

  const chunk = audioQueue.shift();
  if (!chunk) {
    playNextChunk();
    return;
  }

  // Each chunk may advance the queue exactly once, even if error and play() rejection both fire
  const myGeneration = generation;
  let advanced = false;
  const next = () => {
    if (advanced || myGeneration !== generation) return;
    advanced = true;
    playNextChunk();
  };

  // Determine exact language for this specific chunk
  const langCode = detectTextLanguage(chunk, currentQueueLang);
  const audioUrl = `/api/tts?lang=${encodeURIComponent(langCode)}&text=${encodeURIComponent(chunk)}`;

  try {
    const audio = new Audio();
    currentAudio = audio;
    audio.preload = 'auto';
    audio.src = audioUrl;

    audio.onended = next;

    audio.onerror = (e) => {
      console.warn('TTS streaming error, attempting browser speech synthesis fallback:', e);
      fallbackSpeechSynthesis(chunk, langCode, next);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play rejected by browser policy, trying fallback:', err);
        fallbackSpeechSynthesis(chunk, langCode, next);
      });
    }
  } catch (err) {
    console.warn('Audio element initialization error:', err);
    fallbackSpeechSynthesis(chunk, langCode, next);
  }
}

/**
 * Fallback to browser SpeechSynthesis if audio stream is unavailable.
 */
function fallbackSpeechSynthesis(text: string, lang: string, onDone?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onDone) onDone();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;

    if (lang === 'bn') {
      utterance.lang = 'bn-BD';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'es') {
      utterance.lang = 'es-ES';
    } else if (lang === 'ar') {
      utterance.lang = 'ar-SA';
    } else {
      utterance.lang = 'en-US';
    }

    const voices = window.speechSynthesis.getVoices() || [];
    const matched = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(lang) ||
        v.name.toLowerCase().includes(lang === 'bn' ? 'bangla' : lang)
    );
    if (matched) utterance.voice = matched;

    let ended = false;
    const finish = () => {
      if (!ended) {
        ended = true;
        if (onDone) onDone();
      }
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    // Safety timeout in case speechSynthesis hangs
    setTimeout(finish, 8000);

    window.speechSynthesis.speak(utterance);
  } catch {
    if (onDone) onDone();
  }
}

/**
 * Universally speaks any text in any language:
 * - Natural human-sounding neural audio streams via /api/tts
 * - Works for Bangla ('bn'), English ('en'), Hindi ('hi'), Spanish ('es'), Arabic ('ar'), etc.
 * - Automatic sentence queuing
 */
export function speakText(
  text: string,
  lang: string = 'en',
  onEnd?: () => void
): boolean {
  stopSpeech();
  generation++;

  const phrases = splitTextIntoPhrases(text);
  if (phrases.length === 0) {
    if (onEnd) onEnd();
    return false;
  }

  audioQueue = phrases;
  currentQueueLang = lang;
  currentQueueOnEnd = onEnd || null;
  isPlayingQueue = true;

  playNextChunk();
  return true;
}

/**
 * Plays a pre-generated audio file (see scripts/generate-audio.ts). If the file is missing
 * or fails to play, falls back to the chunked speakText() path with the same text.
 */
export function speakFile(
  url: string,
  fallbackText: string,
  lang: string = 'en',
  onEnd?: () => void
): boolean {
  stopSpeech();
  const myGeneration = ++generation;
  currentQueueOnEnd = onEnd || null;
  isPlayingQueue = true;

  const fallback = () => {
    if (myGeneration !== generation) return;
    speakText(fallbackText, lang, onEnd);
  };

  try {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      if (myGeneration !== generation) return;
      isPlayingQueue = false;
      currentAudio = null;
      const cb = currentQueueOnEnd;
      currentQueueOnEnd = null;
      cb?.();
    };
    audio.onerror = fallback;
    audio.play().catch(fallback);
  } catch {
    fallback();
  }
  return true;
}

/**
 * Instantly stops all current speech or queued audio.
 */
export function stopSpeech() {
  generation++;
  isPlayingQueue = false;
  audioQueue = [];

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }

  if (currentQueueOnEnd) {
    const cb = currentQueueOnEnd;
    currentQueueOnEnd = null;
    cb();
  }
}
