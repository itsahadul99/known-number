'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scenario } from '@/lib/engine';
import { ScenarioPlayer } from '@/components/player/ScenarioPlayer';
import { parseDrillHash } from '@/lib/share';

interface DrillClientWrapperProps {
  scenario: Scenario;
}

export function DrillClientWrapper({ scenario }: DrillClientWrapperProps) {
  const router = useRouter();
  const [fromName, setFromName] = useState<string | undefined>();
  const [toName, setToName] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const parsed = parseDrillHash(window.location.hash);
      if (parsed.from) setFromName(parsed.from);
      if (parsed.to) setToName(parsed.to);
    }
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
