import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            About The Project
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            About Known Number
          </h1>
          <p className="text-lg text-ink-muted mt-2">
            &ldquo;Practice the call before it comes.&rdquo;
          </p>
        </header>

        <section className="flex flex-col gap-4 text-base text-ink leading-relaxed">
          <p>
            <strong>Known Number</strong> is a free, non-commercial tool designed to help families rehearse realistic scam calls and messages together in safety.
          </p>
          <p>
            According to the FBI IC3 and FTC, fraud against adults aged 60+ caused over $7.75 billion in reported losses in 2025 alone. Traditional security advice like &ldquo;be careful&rdquo; and &ldquo;never share passwords&rdquo; is read in calm moments, but scams work by inducing sudden panic and confusion.
          </p>
          <p>
            Under emotional pressure, people fall back on practiced habit, not leaflets. Rehearsing in a zero-risk browser environment gives families the confidence to recognize manipulation and hang up with certainty.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-4">
            Guiding Principles
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>
              <strong>Zero Cost & Zero Data:</strong> No accounts, no subscriptions, no ads, no trackers.
            </li>
            <li>
              <strong>Respectful & Non-Shaming:</strong> Victims of scams are intelligent people caught in high-pressure operations. Our drills celebrate good instincts and never use mocking language.
            </li>
            <li>
              <strong>Family-Centric:</strong> Adult children can send a drill to their parents with one tap, initiating healthy safety conversations without paternalism.
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
