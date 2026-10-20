'use client';

import React, { useReducer, useEffect, useCallback } from 'react';
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
  const [state, dispatch] = useReducer(
    scenarioReducer,
    scenario,
    createInitialEngineState
  );
  const { audio } = useSettings();

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
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [audio, currentNode]);

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
        {/* Personalized greeting if drill was sent by family */}
        {toName && (
          <div className="bg-panel p-3 px-4 rounded-control border border-rule mb-3 flex items-center justify-between text-sm">
            <span>
              Practicing for: <strong className="text-ink">{toName}</strong>
            </span>
            {fromName && (
              <span className="text-ink-muted">
                Sent with love by <strong>{fromName}</strong>
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
        <PressureMeter level={currentNode.pressure} />

        {/* Realistic Simulated Device Screen */}
        <DeviceFrame
          channel={deviceChannel}
          senderName={currentNode.sender.displayName}
          senderSubtitle={currentNode.sender.handle}
          caption={`Simulated ${currentNode.channel} screen. Remember, nothing here is real.`}
          messages={currentNode.messages.map((m) => ({
            text: m.text,
            isIncoming: true,
          }))}
          onAnswer={deviceChannel === 'call-incoming' ? () => {} : undefined}
          onDecline={deviceChannel === 'call-incoming' ? () => handleSelectChoice({
            id: 'decline-call',
            label: 'Decline call',
            next: 'END_SAFE',
            habit: 'pause',
            feedback: 'Great move. Declining calls from unknown numbers avoids the pressure entirely.',
            points: 1,
          }) : undefined}
        />

        {/* Choices Area */}
        {!state.showFeedback ? (
          <section className="flex flex-col gap-3 mt-4" aria-label="Available choices">
            <h3 className="text-xl font-bold text-ink mb-1">
              What do you do next?
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
                  ? 'See the rehearsal debrief'
                  : 'Continue drill'
              }
            />
          )
        )}
      </main>
    </div>
  );
}
