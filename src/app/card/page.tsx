'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PauseIcon, VerifyIcon, TellIcon } from '@/components/sign/Pictograms';
import { Button } from '@/components/ui/button';

export default function CardPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <div className="no-print">
        <Header />
      </div>

      <main className="max-w-2xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-rule pb-6">
          <div>
            <h1 className="text-3xl font-bold text-ink">
              Printable Family Fridge Card
            </h1>
            <p className="text-base text-ink-muted mt-1">
              Stick this on the refrigerator beside the house phone. Formatted for standard A4 or Letter printing.
            </p>
          </div>

          <Button
            type="button"
            onClick={handlePrint}
            size="lg"
            className="shrink-0"
          >
            🖨️ Print this card
          </Button>
        </div>

        {/* PRINTABLE CARD CONTAINER */}
        <div className="border-4 border-ink p-8 rounded-panel bg-paper flex flex-col gap-8 shadow-sm print:border-2 print:p-6 print:rounded-none">
          {/* Card Header */}
          <div className="border-b-2 border-ink pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-ink tracking-tight uppercase">
                Known Number
              </h2>
              <p className="text-sm font-semibold text-ink-muted">
                Family Phone Safety & Anti-Scam Guide
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center border-2 border-ink print:bg-black print:text-white">
              <VerifyIcon size={28} color="#FFFFFF" />
            </div>
          </div>

          {/* The 3 Golden Habits */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-ink uppercase tracking-wide border-b border-rule pb-1">
              When an unexpected caller asks for money or codes:
            </h3>

            {/* 1. PAUSE */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center shrink-0 border-2 border-ink print:bg-black">
                <PauseIcon size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-ink">1. PAUSE</h4>
                <p className="text-lg text-ink font-medium leading-relaxed">
                  Take a breath. Scammers manufacture urgent panic so you act on impulse. Legitimate callers will wait.
                </p>
              </div>
            </div>

            {/* 2. VERIFY */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center shrink-0 border-2 border-ink print:bg-black">
                <VerifyIcon size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-ink">2. VERIFY</h4>
                <p className="text-lg text-ink font-medium leading-relaxed">
                  Hang up immediately. Never call numbers given by the caller. Call back on a <strong>known number</strong> from your address book or the back of your bank card.
                </p>
              </div>
            </div>

            {/* 3. TELL */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-signal-blue text-white flex items-center justify-center shrink-0 border-2 border-ink print:bg-black">
                <TellIcon size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-ink">3. TELL</h4>
                <p className="text-lg text-ink font-medium leading-relaxed">
                  Tell a trusted family member. Scammers insist on secrecy (&ldquo;don&apos;t tell mum&rdquo;). Talking to someone breaks the scam.
                </p>
              </div>
            </div>
          </div>

          {/* Fill-in Family Info Section */}
          <div className="border-t-2 border-ink pt-6 flex flex-col gap-4">
            <h4 className="text-lg font-bold text-ink uppercase tracking-wider">
              Family Emergency Quick Reference
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-control-edge p-3 rounded-control">
                <span className="text-xs font-bold text-ink-muted uppercase block">Our Secret Family Codeword:</span>
                <div className="h-8 border-b-2 border-dotted border-ink mt-2" />
              </div>

              <div className="border border-control-edge p-3 rounded-control">
                <span className="text-xs font-bold text-ink-muted uppercase block">Trusted Relative Phone:</span>
                <div className="h-8 border-b-2 border-dotted border-ink mt-2" />
              </div>

              <div className="border border-control-edge p-3 rounded-control">
                <span className="text-xs font-bold text-ink-muted uppercase block">Bank Phone (from card back):</span>
                <div className="h-8 border-b-2 border-dotted border-ink mt-2" />
              </div>

              <div className="border border-control-edge p-3 rounded-control">
                <span className="text-xs font-bold text-ink-muted uppercase block">Local Police Non-Emergency:</span>
                <div className="h-8 border-b-2 border-dotted border-ink mt-2" />
              </div>
            </div>
          </div>

          <footer className="text-center text-xs text-ink-muted border-t border-rule pt-3">
            Known Number · Free family scam drills · https://knownnumber.org
          </footer>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
