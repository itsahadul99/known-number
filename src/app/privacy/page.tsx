import React from 'react';
import type { Metadata } from 'next';
import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy & Non-Collection',
  description: 'Known Number has no accounts, no ads and no trackers. See exactly what is, and is not, stored on your device.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
