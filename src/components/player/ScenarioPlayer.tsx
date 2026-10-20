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
import { speakText, stopSpeech } from '@/lib/speech';
import { translateScenario } from '@/lib/translator';

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
  const [activeScenario, setActiveScenario] = useState<Scenario>(initialScenario);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Auto-translate scenario if the selected language differs from the scenario's native locale
  useEffect(() => {
    let isCancelled = false;

    async function checkAndTranslate() {
      const scenarioLang = initialScenario.locale.split('-')[0];
      if (scenarioLang !== language) {
        setIsTranslating(true);
        try {
          const translated = await translateScenario(initialScenario, language);
          if (!isCancelled) {
            setActiveScenario(translated);
          }
        } catch (err) {
          console.warn('Auto translation failed, using original:', err);
        } finally {
          if (!isCancelled) {
            setIsTranslating(false);
          }
        }
      } else {
        setActiveScenario(initialScenario);
      }
    }

    checkAndTranslate();

    return () => {
      isCancelled = true;
    };
  }, [initialScenario, language]);

  const [state, dispatch] = useReducer(
    scenarioReducer,
    activeScenario,
    createInitialEngineState
  );

  // Re-sync reducer when activeScenario translates
  useEffect(() => {
    dispatch({ type: 'SET_SCENARIO', scenario: activeScenario });
  }, [activeScenario]);

  const currentNode = state.scenario.nodes[state.currentNodeId] || Object.values(state.scenario.nodes)[0];

  // Universal text-to-speech for any language
  const handlePlayVoice = useCallback(() => {
    if (!currentNode || !currentNode.messages || currentNode.messages.length === 0) return;
    const textToSpeak = currentNode.messages
      .map((m) => m.spokenText || m.text)
      .join('. ');

    setIsPlayingAudio(true);
    // Uses neural streaming TTS for the target language (e.g. 'bn', 'en', 'hi', 'es', 'ar')
    speakText(textToSpeak, language, () => {
      setIsPlayingAudio(false);
    });
  }, [currentNode, language]);

  // Autoplay voice if setting is enabled
  useEffect(() => {
    if (audio === 'on' && !state.outcome && !state.showFeedback && !isTranslating) {
      handlePlayVoice();
    }
    return () => {
      stopSpeech();
    };
  }, [state.currentNodeId, state.outcome, state.showFeedback, audio, isTranslating, handlePlayVoice]);

  const handleSelectChoice = (choice: Choice) => {
    stopSpeech();
    setIsPlayingAudio(false);
    dispatch({ type: 'SELECT_CHOICE', choice });
  };

  const handleAdvance = () => {
    dispatch({ type: 'ADVANCE_NODE' });
  };

  const handleRestart = () => {
    stopSpeech();
    setIsPlayingAudio(false);
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
  else if (state.stepNumber === 1 && currentNode?.channel === 'call') {
    deviceChannel = 'call-incoming';
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-paper">
      <PracticeBand onStop={onExit} />

      <main className="max-w-2xl w-full mx-auto px-4 py-6 flex flex-col flex-1">
        {/* Loading indicator when auto-translating */}
        {isTranslating && (
          <div className="bg-signal-blue-light border border-signal-blue p-2.5 rounded-control text-xs text-signal-blue font-semibold mb-3 flex items-center gap-2">
            <span className="animate-spin">🔄</span>
            <span>{t.translatingScenario}</span>
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
          onAnswer={deviceChannel === 'call-incoming' ? () => {} : undefined}
          onDecline={deviceChannel === 'call-incoming' ? () => handleSelectChoice({
            id: 'decline-call',
            label: t.deviceDecline,
            next: 'END_SAFE',
            habit: 'pause',
            feedback: t.safeOutcomeTitle,
            points: 1,
          }) : undefined}
        />

        {/* Universal Voice Playback Button */}
        {currentNode?.channel === 'call' && (
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
        {!state.showFeedback ? (
          <section className="flex flex-col gap-3 mt-4" aria-label="Available choices">
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
