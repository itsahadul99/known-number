'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllScenarios } from '@/content/scenarios';
import { encodeDrillHash } from '@/lib/share';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/lib/settings-context';

export default function OrganisePage() {
  const { t, language } = useSettings();
  const scenarios = getAllScenarios(language);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const recipientInputId = useId();
  const senderInputId = useId();

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const hashParams = encodeDrillHash({
    from: senderName.trim() || undefined,
    to: recipientName.trim() || undefined,
    region: language === 'bn' ? 'bd' : 'us',
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://knownnumber.org';
  const drillLink = `${baseUrl}/drill/${selectedScenario.id}#${hashParams}`;

  let messagePreview = '';
  const signature = senderName.trim() ? ` — ${senderName.trim()}` : '';

  if (language === 'bn') {
    const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'আম্মু, ';
    messagePreview = `${greeting}Known Number দেখে নাও। মাত্র ৫ মিনিট লাগবে। প্রতারক চক্র কীভাবে ফোন দিয়ে ভয় দেখায় ও টাকা হাতিয়ে নেয় তা নিরাপদে অনুশীলন করা যায়। এই লিঙ্কটি খুলে প্র্যাকটিস করে নাও:\n\n${drillLink}${signature}`;
  } else if (language === 'hi') {
    const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'मम्मी, ';
    messagePreview = `${greeting}Known Number आज़माएं। सिर्फ 5 मिनट लगेंगे। धोखेबाज़ फोन पर कैसे दबाव बनाते हैं, उसका सुरक्षित अभ्यास कर लें:\n\n${drillLink}${signature}`;
  } else if (language === 'es') {
    const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'Mamá, ';
    messagePreview = `${greeting}prueba Known Number. Solo toma cinco minutos para practicar cómo reaccionar ante llamadas fraudulentas con seguridad:\n\n${drillLink}${signature}`;
  } else if (language === 'ar') {
    const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'أمي، ';
    messagePreview = `${greeting}جرّبي Known Number. يستغرق خمس دقائق فقط للتدرب على كيفية التصرف مع المكالمات الاحتيالية بأمان:\n\n${drillLink}${signature}`;
  } else {
    const greeting = recipientName.trim() ? `${recipientName.trim()}, ` : 'Mum, ';
    messagePreview = `${greeting}try Known Number. It takes five minutes and rehearses the realistic calls scammers use so you know how to react in safety. Check this drill:\n\n${drillLink}${signature}`;
  }

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
          title: `Known Number: ${selectedScenario.title}`,
          text: messagePreview,
          url: drillLink,
        });
      } catch {
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
            {t.sendFamilyDrill}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            {t.organiseTitle}
          </h1>
          <p className="text-lg text-ink-muted mt-2 max-w-prose">
            {t.organiseSubtitle}
          </p>
        </header>

        {/* Step 1: Select Scenario */}
        <fieldset className="border-2 border-control-edge rounded-panel p-6 bg-paper">
          <legend className="text-xl font-bold text-ink px-2">
            {t.selectScenario}
          </legend>
          <div className="flex flex-col gap-3 mt-4">
            {scenarios.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              const durationText = `${scenario.durationMin} ${
                language === 'bn' ? 'মিনিট' : language === 'hi' ? 'मिनट' : 'min'
              }`;

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
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-ink">
                        {scenario.title}
                      </span>
                    </div>
                    <span className="text-sm text-ink-muted mt-0.5 leading-relaxed">
                      {scenario.summary}
                    </span>
                    <span className="text-xs text-signal-blue font-semibold mt-2">
                      ~{durationText}
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
            {t.personalize}
          </legend>
          <p className="text-sm text-ink-muted mt-1 mb-4">
            {language === 'bn'
              ? 'নাম শুধুমাত্র ব্রাউজার লিঙ্কে থাকে (#), কোনো সার্ভারে কখনোই পাঠানো হয় না।'
              : 'Names are encoded solely in the web address fragment (#) and are never stored or sent to any server.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={recipientInputId} className="font-bold text-base text-ink">
                {t.recipientLabel}
              </label>
              <input
                id={recipientInputId}
                type="text"
                placeholder={language === 'bn' ? 'যেমন: আম্মু, বাবা, নানা' : language === 'hi' ? 'जैसे: मम्मी, पापा' : 'e.g. Mum, Grandpa, David'}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="min-h-[48px] px-4 py-2 border-2 border-control-edge rounded-control text-base focus-visible:outline-signal-blue"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={senderInputId} className="font-bold text-base text-ink">
                {t.senderLabel}
              </label>
              <input
                id={senderInputId}
                type="text"
                placeholder={language === 'bn' ? 'যেমন: আহাদুল, তারেক' : language === 'hi' ? 'जैसे: राहुल, प्रिया' : 'e.g. Sam, Sarah'}
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
            {t.previewMessage}
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
              {t.shareWhatsapp}
            </Button>

            <Button
              type="button"
              onClick={handleCopyMessage}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              {copiedMessage ? t.messageCopied : t.copyFullMessage}
            </Button>

            <Button
              type="button"
              onClick={handleCopyLink}
              variant="outline"
              size="lg"
            >
              {copiedLink ? t.linkCopied : t.copyLinkOnly}
            </Button>
          </div>
        </section>

        {/* Direct Test Link */}
        <div className="text-center">
          <Link
            href={`/drill/${selectedScenario.id}#${hashParams}`}
            className="text-signal-blue underline text-base font-semibold"
          >
            {t.previewYourself}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
