import React from 'react';
import { notFound } from 'next/navigation';
import { ALL_SCENARIOS, getScenarioById } from '@/content/scenarios';
import type { Metadata } from 'next';
import { DrillClientWrapper } from './DrillClientWrapper';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

// Required for static export in Next.js
export function generateStaticParams() {
  return ALL_SCENARIOS.map((s) => ({
    id: s.id,
  }));
}

interface DrillPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DrillPageProps): Promise<Metadata> {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) return {};

  const isBn = scenario.locale.startsWith('bn');
  return {
    title: `${scenario.title} — ${isBn ? 'অনুশীলন' : 'Scam Drill'}`,
    description: scenario.summary,
    alternates: { canonical: `/drill/${scenario.id}` },
    openGraph: {
      type: 'article',
      title: `${scenario.title} | ${SITE_NAME}`,
      description: scenario.summary,
      url: `/drill/${scenario.id}`,
      locale: isBn ? 'bn_BD' : 'en_US',
    },
  };
}

export default async function DrillPage({ params }: DrillPageProps) {
  const { id } = await params;
  const scenario = getScenarioById(id);

  if (!scenario) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: scenario.title,
    description: scenario.summary,
    url: absoluteUrl(`/drill/${scenario.id}`),
    inLanguage: scenario.locale,
    learningResourceType: 'Interactive scam rehearsal',
    timeRequired: `PT${scenario.durationMin}M`,
    isAccessibleForFree: true,
    dateModified: scenario.lastReviewed,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DrillClientWrapper scenario={scenario} />
    </>
  );
}
