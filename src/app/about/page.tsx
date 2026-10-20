import React from 'react';
import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Known Number exists: a free, non-commercial tool that helps families rehearse scam calls and messages before they happen.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
