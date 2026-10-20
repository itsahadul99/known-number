import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Drill Result',
  description: 'A shared family scam drill result.',
  
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
