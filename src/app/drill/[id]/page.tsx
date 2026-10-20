import React from 'react';
import { notFound } from 'next/navigation';
import { ALL_SCENARIOS, getScenarioById } from '@/content/scenarios';
import { DrillClientWrapper } from './DrillClientWrapper';

// Required for static export in Next.js
export function generateStaticParams() {
  return ALL_SCENARIOS.map((s) => ({
    id: s.id,
  }));
}

interface DrillPageProps {
  params: Promise<{ id: string }>;
}

export default async function DrillPage({ params }: DrillPageProps) {
  const { id } = await params;
  const scenario = getScenarioById(id);

  if (!scenario) {
    notFound();
  }

  return <DrillClientWrapper scenario={scenario} />;
}
