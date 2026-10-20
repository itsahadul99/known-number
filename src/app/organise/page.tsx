'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ALL_SCENARIOS } from '@/content/scenarios';
import { encodeDrillHash } from '@/lib/share';
import { Button } from '@/components/ui/button';

export default function OrganisePage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(ALL_SCENARIOS[0].id);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const recipientInputId = useId();
  const senderInputId = useId();

  const selectedScenario = ALL_SCENARIOS.find((s) => s.id === selectedScenarioId) || ALL_SCENARIOS[0];

  const hashParams = encodeDrillHash({
    from: senderName.trim() || undefined,
    to: recipientName.trim() || undefined,
    region: 'us',
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://knownnumber.org';
  const drillLink = `${baseUrl}/drill/${selectedScenario.id}#${hashParams}`;

  const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'Mum, ';
  const signature = senderName.trim() ? ` — ${senderName.trim()}` : '';
  const messagePreview = `${greeting}try Known Number. It takes five minutes and rehearses the realistic calls scammers use so you know how to react in safety. Check this drill:\n\n${drillLink}${signature}`;

  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(drillLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyMessage = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(messagePreview);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Known Number Rehearsal: ${selectedScenario.title}`,
          text: messagePreview,
          url: drillLink,
        });
      } catch {
        // Fallback to copy
        handleCopyMessage();
      }
    } else {
      handleCopyMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            Family Organiser
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            Send a 5-minute drill to family
          </h1>
          <p className="text-lg text-ink-muted mt-2 max-w-prose">
            Choose a scam scenario, add optional first names (kept 100% in the link, never sent to a server), and copy the ready-to-send family message.
          </p>
        </header>

        {/* Step 1: Select Scenario */}
        <fieldset className="border-2 border-control-edge rounded-panel p-6 bg-paper">
          <legend className="text-xl font-bold text-ink px-2">
            1. Select a rehearsal scenario
          </legend>
          <div className="flex flex-col gap-3 mt-4">
            {ALL_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              return (
                <label
                  key={scenario.id}
                  className={`flex items-start gap-4 p-4 rounded-control border-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-signal-blue bg-panel'
                      : 'border-rule hover:bg-panel'
                  }`}
                >
                  <input
                    type="radio"
                    name="scenario"
                    value={scenario.id}
                    checked={isSelected}
                    onChange={() => setSelectedScenarioId(scenario.id)}
                    className="mt-1 w-5 h-5 accent-signal-blue shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-ink">
                      {scenario.title}
                    </span>
                    <span className="text-sm text-ink-muted mt-0.5 leading-relaxed">
                      {scenario.summary}
                    </span>
                    <span className="text-xs text-signal-blue font-semibold mt-2">
                      Estimated time: {scenario.durationMin} minutes · Channel: {scenario.category.replace('-', ' ')}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Step 2: Personalize with Names (Optional) */}
        <fieldset className="border-2 border-control-edge rounded-panel p-6 bg-paper">
          <legend className="text-xl font-bold text-ink px-2">
            2. Personalize (Optional)
          </legend>
          <p className="text-sm text-ink-muted mt-1 mb-4">
            Names are encoded solely in the web address fragment (#) and are <strong>never stored or sent to any server</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={recipientInputId} className="font-bold text-base text-ink">
                Who are you sending this to?
              </label>
              <input
                id={recipientInputId}
                type="text"
                placeholder="e.g. Mum, Grandpa, David"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="min-h-[48px] px-4 py-2 border-2 border-control-edge rounded-control text-base focus-visible:outline-signal-blue"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={senderInputId} className="font-bold text-base text-ink">
                Your first name
              </label>
              <input
                id={senderInputId}
                type="text"
                placeholder="e.g. Sam, Sarah"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="min-h-[48px] px-4 py-2 border-2 border-control-edge rounded-control text-base focus-visible:outline-signal-blue"
              />
            </div>
          </div>
        </fieldset>

        {/* Step 3: Copy and Share Ready-made message */}
        <section className="bg-panel border-2 border-control-edge rounded-panel p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-ink">
            3. Ready-to-send message preview
          </h2>

          <div className="bg-paper p-4 rounded-control border border-control-edge font-mono text-sm sm:text-base leading-relaxed text-ink whitespace-pre-wrap select-all">
            {messagePreview}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              type="button"
              onClick={handleNativeShare}
              size="lg"
              className="flex-1"
            >
              Share via WhatsApp / Messages
            </Button>

            <Button
              type="button"
              onClick={handleCopyMessage}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              {copiedMessage ? '✓ Message copied!' : 'Copy full message'}
            </Button>

            <Button
              type="button"
              onClick={handleCopyLink}
              variant="outline"
              size="lg"
            >
              {copiedLink ? '✓ Link copied!' : 'Copy link only'}
            </Button>
          </div>
        </section>

        {/* Direct Test Link */}
        <div className="text-center">
          <Link
            href={`/drill/${selectedScenario.id}/#${hashParams}`}
            className="text-signal-blue underline text-base font-semibold"
          >
            Preview drill in your own browser first →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
