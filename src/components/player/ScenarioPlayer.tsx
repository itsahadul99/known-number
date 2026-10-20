'use client';

import React, { useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
import { SCENARIO_PAIRS } from '@/content/scenarios';

interface ScenarioPlayerProps {
  scenario: Scenario;
  fromName?: string;
  toName?: string;
  onExit?: () => void;
}

export function ScenarioPlayer({
  scenario,
  fromName,
  toName,
  onExit,
}: ScenarioPlayerProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    scenarioReducer,
    scenario,
    createInitialEngineState
  );
  const { audio, t, language, setLanguage } = useSettings();

  const currentNode = state.scenario.nodes[state.currentNodeId];

  // Browser speech synthesis for spoken audio if enabled
  const speakMessages = useCallback(() => {
    if (audio === 'on' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (currentNode && currentNode.messages.length > 0) {
        const textToSpeak = currentNode.messages
          .map((m) => m.spokenText || m.text)
          .join('. ');
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.95;
        // set language voice
        utterance.lang = scenario.locale || (language === 'bn' ? 'bn-BD' : 'en-US');
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [audio, currentNode, scenario.locale, language]);

  useEffect(() => {
    if (!state.outcome && !state.showFeedback) {
      speakMessages();
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.currentNodeId, state.outcome, state.showFeedback, speakMessages]);

  const handleSelectChoice = (choice: Choice) => {
    dispatch({ type: 'SELECT_CHOICE', choice });
  };

  const handleAdvance = () => {
    dispatch({ type: 'ADVANCE_NODE' });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  // Instant Translate / Switch Language handler
  const pairedScenarioId = SCENARIO_PAIRS[scenario.id];
  const handleToggleTranslation = () => {
    const nextLang = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
    if (pairedScenarioId) {
      router.push(`/drill/${pairedScenarioId}`);
    }
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
  if (currentNode.channel === 'sms') deviceChannel = 'sms';
  else if (currentNode.channel === 'chat') deviceChannel = 'chat';
  else if (currentNode.channel === 'email') deviceChannel = 'email';
  else if (currentNode.channel === 'popup') deviceChannel = 'popup';
  else if (state.stepNumber === 1 && currentNode.channel === 'call') {
    deviceChannel = 'call-incoming';
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-paper">
      <PracticeBand onStop={onExit} />

      <main className="max-w-2xl w-full mx-auto px-4 py-6 flex flex-col flex-1">
        {/* Top Control Bar: Personalized greeting + Translate button */}
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          {toName ? (
            <div className="bg-panel p-2 px-3 rounded-control border border-rule text-sm">
              <span>
                {language === 'bn' ? 'অনুশীলন করছেন: ' : 'Practicing for: '}
                <strong className="text-ink">{toName}</strong>
              </span>
              {fromName && (
                <span className="text-ink-muted ml-2">
                  ({fromName} {language === 'bn' ? 'পাঠিয়েছেন' : 'sent this'})
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">
              {scenario.title}
            </span>
          )}

          {/* Instant Translate / Switch to counterpart */}
          {pairedScenarioId && (
            <button
              type="button"
              onClick={handleToggleTranslation}
              className="bg-panel border-2 border-signal-blue rounded-control px-3 py-1.5 text-xs font-bold text-signal-blue cursor-pointer inline-flex items-center gap-1.5 hover:bg-signal-blue hover:text-white transition-colors"
              title="Switch between English and Bengali scenario versions"
            >
              <span>🌐</span>
              <span>{language === 'en' ? 'বাংলা সংস্করণ দেখুন (Translate)' : 'View English Version'}</span>
            </button>
          )}
        </div>

        {/* Progress Route Line */}
        <RouteLine
          currentStep={state.stepNumber}
          totalSteps={state.totalSteps}
        />

        {/* Scammer Urgency/Pressure Meter */}
        <PressureMeter level={currentNode.pressure} />

        {/* Realistic Simulated Device Screen */}
        <DeviceFrame
          channel={deviceChannel}
          senderName={currentNode.sender.displayName}
          senderSubtitle={currentNode.sender.handle}
          caption={
            language === 'bn'
              ? `নকল ${currentNode.channel} স্ক্রিন। মনে রাখবেন, এখানে কিছুই বাস্তব নয়।`
              : `Simulated ${currentNode.channel} screen. Remember, nothing here is real.`
          }
          messages={currentNode.messages.map((m) => ({
            text: m.text,
            isIncoming: true,
          }))}
          onAnswer={deviceChannel === 'call-incoming' ? () => {} : undefined}
          onDecline={deviceChannel === 'call-incoming' ? () => handleSelectChoice({
            id: 'decline-call',
            label: language === 'bn' ? 'কল কেটে দিন (Decline)' : 'Decline call',
            next: 'END_SAFE',
            habit: 'pause',
            feedback: language === 'bn'
              ? 'চমৎকার! অপরিচিত নম্বর থেকে আসা চাপমূলক ফোন কেটে দেওয়াই সবচেয়ে নিরাপদ।'
              : 'Great move. Declining calls from unknown numbers avoids the pressure entirely.',
            points: 1,
          }) : undefined}
        />

        {/* Choices Area */}
        {!state.showFeedback ? (
          <section className="flex flex-col gap-3 mt-4" aria-label="Available choices">
            <h3 className="text-xl font-bold text-ink mb-1">
              {t.whatToDoNext}
            </h3>
            {currentNode.choices.map((choice, index) => (
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
