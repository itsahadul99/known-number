import React from 'react';
import type { Metadata } from 'next';
import { AccessibilityContent } from './AccessibilityContent';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Large text, high contrast, voice playback and keyboard support: how Known Number is built for older users.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
