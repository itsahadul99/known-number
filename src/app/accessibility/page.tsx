import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            WCAG 2.2 AA Conformance
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            Accessibility Statement
          </h1>
        </header>

        <section className="flex flex-col gap-4 text-base text-ink leading-relaxed">
          <p>
            Known Number is engineered from the ground up for older adults, individuals with low vision, and people using assistive technologies.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-2">
            Key Accessibility Features
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>
              <strong>Large Default Typography:</strong> Base body text starts at 20px, with built-in instant scaling options up to 28px without horizontal scrolling or layout breakages.
            </li>
            <li>
              <strong>High-Contrast Theme:</strong> Our high-contrast mode exceeds WCAG AAA contrast ratios with solid ink outlines and high-contrast sign shapes.
            </li>
            <li>
              <strong>Multi-Sensory Sign System:</strong> Never relying on color alone, all statuses pair distinct geometric shapes (circles, triangles, squares, bars) with prominent text labels.
            </li>
            <li>
              <strong>Generous Interactive Targets:</strong> Primary interactive buttons are at least 56px in height with generous spacing between adjacent touch targets.
            </li>
            <li>
              <strong>Screen Reader Accessible:</strong> All simulated phone screens and alerts have textual captions; SVGs have proper ARIA attributes; focus states are preserved throughout.
            </li>
            <li>
              <strong>Respect for Reduced Motion:</strong> Flashing, entrance animations, and timer countdowns are completely disabled under <code className="bg-panel px-1 py-0.5 rounded">prefers-reduced-motion</code>.
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
