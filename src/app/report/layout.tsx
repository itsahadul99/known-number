import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where to Report a Scam',
  description: 'Official hotlines and steps to take if you were targeted by a scam call, SMS or phishing link, including what to do if you already sent money.',
  alternates: { canonical: '/report' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
