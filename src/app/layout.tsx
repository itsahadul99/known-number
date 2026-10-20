import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SettingsProvider } from '@/lib/settings-context';
import { SettingsModal } from '@/components/layout/SettingsModal';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Known Number — Practice the call before it comes',
  description:
    'A free, zero-friction 5-minute scam rehearsal for families. Rehearse realistic scam calls safely in your browser. No sign-up, no personal data stored.',
  keywords: [
    'scam drill',
    'elder fraud prevention',
    'phone scam rehearsal',
    'known number',
    'cybersecurity for seniors',
  ],
  authors: [{ name: 'Known Number Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-paper text-ink selection:bg-signal-blue-light selection:text-ink">
        <SettingsProvider>
          {/* Skip link for screen reader accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:p-3 focus:bg-signal-blue focus:text-white focus:rounded-control"
          >
            Skip to main content
          </a>

          <div id="main-content" className="flex flex-col flex-1">
            {children}
          </div>

          <SettingsModal />
        </SettingsProvider>
      </body>
    </html>
  );
}
