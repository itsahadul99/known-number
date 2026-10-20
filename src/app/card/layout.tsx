import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Printable Scam-Safety Fridge Card',
  description: 'Print a one-page Pause, Verify, Tell card with trusted numbers for the fridge or beside the phone.',
  alternates: { canonical: '/card' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
