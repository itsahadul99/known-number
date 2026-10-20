import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            Zero Tracking Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            Privacy & Non-Collection
          </h1>
        </header>

        <section className="flex flex-col gap-4 text-base text-ink leading-relaxed">
          <div className="p-4 bg-safe-green-light border-2 border-safe-green rounded-panel font-semibold">
            We collect zero personal information. No accounts, no cookies, no tracking pixels, and no database.
          </div>

          <h2 className="text-2xl font-bold text-ink mt-2">
            How Family and Result Links Work
          </h2>
          <p>
            When an organizer creates a drill link (e.g. including first names like &ldquo;Mum&rdquo; or &ldquo;Sam&rdquo;), those names live entirely in the URL <strong>hash fragment</strong> (everything after the <code className="bg-panel px-1 py-0.5 rounded">#</code> symbol in your browser bar).
          </p>
          <p>
            By internet standards, web browsers <em>never transmit hash fragments to web servers</em>. The names exist solely in your local browser window.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            Local Storage
          </h2>
          <p>
            Your display preferences (text size, high-contrast theme, and audio voice toggle) are stored only on your computer or phone using standard <code className="bg-panel px-1 py-0.5 rounded">localStorage</code> so they stay saved when you return.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            Spoken Voice Synthesis
          </h2>
          <p>
            When the spoken voice option is turned on, speech is generated locally using your browser&apos;s built-in Web Speech API. None of your rehearsal audio or choices are recorded or transmitted anywhere.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
