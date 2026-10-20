import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Send a Family Scam Drill',
  description: 'Create a personalised 5-minute scam drill link for a parent or grandparent and share it on WhatsApp or SMS. Names stay in the link and are never sent to a server.',
  alternates: { canonical: '/organise' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
