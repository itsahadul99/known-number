'use client';

import React, { useReducer, useEffect, useState, useCallback } from 'react';
import {
  Scenario,
  scenarioReducer,
  createInitialEngineState,
  Choice,
} from '@/lib/engine';
import { useSettings } from '@/lib/settings-context';
import { PracticeBand } from '@/components/layout/PracticeBand';
import { RouteLine } from './RouteLine';
import { PressureMeter } from './PressureMeter';
import { ChoiceButton } from './ChoiceButton';
import { FeedbackPanel } from './FeedbackPanel';
import { DebriefScreen } from './DebriefScreen';
import { DeviceFrame, ChannelType } from '@/components/device/DeviceFrame';
import { encodeResultHash } from '@/lib/share';
import { speakText, speakFile, stopSpeech } from '@/lib/speech';
import { getStaticAudioUrl } from '@/content/audio-manifest';
import Link from 'next/link';
import { ALL_SCENARIOS } from '@/content/scenarios';

interface ScenarioPlayerProps {
  scenario: Scenario;
  fromName?: string;
  toName?: string;
  onExit?: () => void;
}

export function ScenarioPlayer({
  scenario: initialScenario,
  fromName,
  toName,
  onExit,
}: ScenarioPlayerProps) {
  const { audio, t, language } = useSettings();
  const activeScenario = initialScenario;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [callAnswered, setCallAnswered] = useState(false);

  const [state, dispatch] = useReducer(
    scenarioReducer,
    activeScenario,
    createInitialEngineState
  );

  // Re-sync reducer when activeScenario translates
  useEffect(() => {
    dispatch({ type: 'SET_SCENARIO', scenario: activeScenario });
  }, [activeScenario]);

  // Same type of scam, written in the user's language (if one exists)
  const scenarioLang = initialScenario.locale.split('-')[0];
  const counterpart = ALL_SCENARIOS.find(
    (s) => s.category === initialScenario.category && s.locale.split('-')[0] === language
  );

  // The first call screen rings until the user answers (or declines)
  const isRinging =
    state.stepNumber === 1 && state.scenario.nodes[state.currentNodeId]?.channel === 'call' && !callAnswered;

  const currentNode = state.scenario.nodes[state.currentNodeId] || Object.values(state.scenario.nodes)[0];

  // Universal text-to-speech for any language
  const handlePlayVoice = useCallback(() => {
    if (!currentNode || !currentNode.messages || currentNode.messages.length === 0) return;
    const textToSpeak = currentNode.messages
      .map((m) => m.spokenText || m.text)
      .join('. ');

    setIsPlayingAudio(true);
    const done = () => setIsPlayingAudio(false);

    // Prefer the pre-generated neural voice clip; falls back to live TTS if it is missing
    const clipUrl =
      state.scenario.locale.split('-')[0] === language
        ? getStaticAudioUrl(state.scenario.id, currentNode.id)
        : undefined;
    if (clipUrl) {
      speakFile(clipUrl, textToSpeak, language, done);
    } else {
      speakText(textToSpeak, language, done);
    }
  }, [currentNode, language, state.scenario.id, state.scenario.locale]);

  // Autoplay voice if setting is enabled
  useEffect(() => {
    if (audio === 'on' && !state.outcome && !state.showFeedback && !isRinging) {
      handlePlayVoice();
    }
    return () => {
      stopSpeech();
    };
  }, [state.currentNodeId, state.outcome, state.showFeedback, audio, isRinging, handlePlayVoice]);

  const handleSelectChoice = (choice: Choice) => {
    stopSpeech();
    setIsPlayingAudio(false);
    dispatch({ type: 'SELECT_CHOICE', choice });
  };

  // Number keys 1-9 pick the matching choice (the numbered badges on the buttons)
  useEffect(() => {
    if (state.outcome || state.showFeedback || isRinging) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const idx = Number(e.key) - 1;
      const choice = state.scenario.nodes[state.currentNodeId]?.choices[idx];
      if (choice) {
        stopSpeech();
        setIsPlayingAudio(false);
        dispatch({ type: 'SELECT_CHOICE', choice });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.outcome, state.showFeedback, state.currentNodeId, state.scenario, isRinging]);

  const handleAdvance = () => {
    dispatch({ type: 'ADVANCE_NODE' });
  };

  const handleRestart = () => {
    stopSpeech();
    setIsPlayingAudio(false);
    setCallAnswered(false);
    dispatch({ type: 'RESTART' });
  };

  // If completed, show Debrief Screen
  if (state.outcome) {
    const resultHash = encodeResultHash({
      v: 1,
      scenarioId: state.scenario.id,
      outcome: state.outcome,
      habits: state.habitsDemonstrated,
      flags: state.tappedFlagIds,
      recipientName: toName,
      senderName: fromName,
    });

    return (
      <div className="w-full">
        <PracticeBand onStop={onExit || handleRestart} />
        <main className="max-w-2xl mx-auto px-4 py-6">
          <DebriefScreen
            outcome={state.outcome}
            scenarioTitle={state.scenario.title}
            habitsDemonstrated={state.habitsDemonstrated}
            redFlags={state.scenario.redFlags}
            whatToDoIfReal={state.scenario.debrief.whatToDoIfReal}
            takeawayMessage={state.scenario.debrief.summary}
            onRetry={handleRestart}
            resultShareHash={resultHash}
            recipientName={toName}
          />
        </main>
      </div>
    );
  }

  // Map engine channel to device frame channel
  let deviceChannel: ChannelType = 'call-active';
  if (currentNode?.channel === 'sms') deviceChannel = 'sms';
  else if (currentNode?.channel === 'chat') deviceChannel = 'chat';
  else if (currentNode?.channel === 'email') deviceChannel = 'email';
  else if (currentNode?.channel === 'popup') deviceChannel = 'popup';
  else if (isRinging) {
    deviceChannel = 'call-incoming';
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-paper">
      <PracticeBand onStop={onExit} />

      <main className="max-w-2xl w-full mx-auto px-4 py-6 flex flex-col flex-1">
        {/* The drill is written in the other language: offer the matching drill in the user's language */}
        {scenarioLang !== language && counterpart && (
          <div role="status" className="bg-signal-blue-light border border-signal-blue p-3 rounded-control text-sm text-ink mb-3 flex flex-wrap items-center justify-between gap-2">
            <span>{t.drillOtherLanguage}</span>
            <Link href={`/drill/${counterpart.id}`} className="font-bold text-signal-blue underline">
              {t.openInYourLanguage}
            </Link>
          </div>
        )}

        {/* Personalized greeting if drill was sent by family */}
        {toName && (
          <div className="bg-panel p-2.5 px-4 rounded-control border border-rule mb-3 flex items-center justify-between text-sm">
            <span>
              {t.practicingFor}{' '}
              <strong className="text-ink">{toName}</strong>
            </span>
            {fromName && (
              <span className="text-ink-muted">
                {fromName} {t.sentThis}
              </span>
            )}
          </div>
        )}

        {/* Progress Route Line */}
        <RouteLine
          currentStep={state.stepNumber}
          totalSteps={state.totalSteps}
        />

        {/* Scammer Urgency/Pressure Meter */}
        <PressureMeter level={currentNode?.pressure || 0} />

        {/* Realistic Simulated Device Screen */}
        <DeviceFrame
          channel={deviceChannel}
          senderName={currentNode?.sender?.displayName || 'Unknown'}
          senderSubtitle={currentNode?.sender?.handle}
          caption={t.deviceSimulatedScreen}
          messages={(currentNode?.messages || []).map((m) => ({
            text: m.text,
            isIncoming: true,
          }))}
          onAnswer={isRinging ? () => setCallAnswered(true) : undefined}
          onDecline={isRinging ? () => handleSelectChoice({
            id: 'decline-call',
            label: t.deviceDecline,
            next: 'END_SAFE',
            habit: 'pause',
            feedback: t.safeOutcomeTitle,
            points: 1,
          }) : undefined}
        />

        {/* Universal Voice Playback Button */}
        {!isRinging && (
          <div className="flex justify-end my-1">
            <button
              type="button"
              onClick={isPlayingAudio ? stopSpeech : handlePlayVoice}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-control border border-control-edge bg-panel hover:bg-panel-darker text-ink transition-colors cursor-pointer"
              aria-label={isPlayingAudio ? t.voiceStop : t.voiceListen}
            >
              <span>{isPlayingAudio ? '⏹️' : '🔊'}</span>
              <span>
                {isPlayingAudio ? t.voiceStop : t.voiceListen}
              </span>
            </button>
          </div>
        )}

        {/* Choices Area */}
        {isRinging ? null : !state.showFeedback ? (
          <section className="flex flex-col gap-3 mt-4" aria-label={t.availableChoices}>
            <h3 className="text-xl font-bold text-ink mb-1">
              {t.whatToDoNext}
            </h3>
            {(currentNode?.choices || []).map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                label={choice.label}
                shortcutIndex={index + 1}
                onClick={() => handleSelectChoice(choice)}
              />
            ))}
          </section>
        ) : (
          /* Feedback Panel after picking a choice */
          state.selectedChoice && (
            <FeedbackPanel
              isSafeChoice={
                state.selectedChoice.next === 'END_SAFE' ||
                !!state.selectedChoice.habit
              }
              feedbackText={state.selectedChoice.feedback}
              whatToDoInstead={state.selectedChoice.whatToDoInstead}
              habitAwarded={state.selectedChoice.habit}
              onContinue={handleAdvance}
              continueLabel={
                state.selectedChoice.next.startsWith('END')
                  ? t.seeDebrief
                  : t.continueDrill
              }
            />
          )
        )}
      </main>
    </div>
  );
}
