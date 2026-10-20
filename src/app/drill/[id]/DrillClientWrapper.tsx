'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scenario } from '@/lib/engine';
import { ScenarioPlayer } from '@/components/player/ScenarioPlayer';
import { parseDrillHash } from '@/lib/share';
import { useSettings } from '@/lib/settings-context';

interface DrillClientWrapperProps {
  scenario: Scenario;
}

export function DrillClientWrapper({ scenario }: DrillClientWrapperProps) {
  const router = useRouter();
  const { setLanguage } = useSettings();
  const [fromName, setFromName] = useState<string | undefined>();
  const [toName, setToName] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const parsed = parseDrillHash(window.location.hash);
      if (parsed.from) setFromName(parsed.from);
      if (parsed.to) setToName(parsed.to);
      if (parsed.lang === 'en' || parsed.lang === 'bn') setLanguage(parsed.lang);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExit = () => {
    router.push('/');
  };

  return (
    <ScenarioPlayer
      scenario={scenario}
      fromName={fromName}
      toName={toName}
      onExit={handleExit}
    />
  );
}
