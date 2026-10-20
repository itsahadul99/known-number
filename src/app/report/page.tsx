import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ReportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        <header>
          <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
            Official Hotlines & Authorities
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            Where to report a scam
          </h1>
          <p className="text-lg text-ink-muted mt-2 max-w-prose">
            If you or a loved one sent money, gave away passwords, or are currently being harassed by a suspected fraudster, contact these official bodies immediately.
          </p>
        </header>

        {/* Immediate steps if money was sent */}
        <section className="bg-stop-red-light border-2 border-stop-red border-l-8 p-6 rounded-panel flex flex-col gap-3">
          <h2 className="text-xl font-bold text-ink">
            Did you already send money or share bank access?
          </h2>
          <ol className="list-decimal pl-5 flex flex-col gap-2 text-base text-ink">
            <li>
              <strong>Call your bank immediately:</strong> Ask for the fraud department to freeze transfers and cancel compromised debit or credit cards.
            </li>
            <li>
              <strong>Wire transfer or gift cards:</strong> If you wired money through Western Union or MoneyGram, call them immediately to check if the transfer can be halted before pickup.
            </li>
            <li>
              <strong>Contact local police:</strong> File an official police report. You will often need the police report number for insurance and bank reimbursement.
            </li>
          </ol>
        </section>

        {/* United States Reporting Channels */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink border-b border-rule pb-2">
            United States Official Reporting Channels
          </h2>

          <div className="flex flex-col gap-3">
            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col gap-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold text-ink">
                  Federal Trade Commission (FTC)
                </h3>
                <span className="text-xs font-bold text-signal-blue bg-paper px-2 py-1 rounded border border-rule">
                  Federal Regulator
                </span>
              </div>
              <p className="text-base text-ink-muted">
                Official federal fraud reporting portal. Used by law enforcement across the US to investigate criminal rings.
              </p>
              <div className="mt-2">
                <a
                  href="https://reportfraud.ftc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-signal-blue underline text-lg"
                >
                  Visit ReportFraud.ftc.gov →
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col gap-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold text-ink">
                  FBI Internet Crime Complaint Center (IC3)
                </h3>
                <span className="text-xs font-bold text-signal-blue bg-paper px-2 py-1 rounded border border-rule">
                  Cyber & Financial Crimes
                </span>
              </div>
              <p className="text-base text-ink-muted">
                Specialized reporting for cyber fraud, wire scams, tech-support extortion, and large financial theft.
              </p>
              <div className="mt-2">
                <a
                  href="https://www.ic3.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-signal-blue underline text-lg"
                >
                  Visit IC3.gov →
                </a>
              </div>
            </div>

            <div className="p-5 bg-panel border-2 border-control-edge rounded-panel flex flex-col gap-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold text-ink">
                  AARP Fraud Watch Network Helpline
                </h3>
                <span className="text-xs font-bold text-safe-green bg-paper px-2 py-1 rounded border border-rule">
                  Free Support Call
                </span>
              </div>
              <p className="text-base text-ink-muted">
                A free, confidential helpline for older adults and their families. Trained specialists provide warm guidance on what to do next.
              </p>
              <div className="mt-2">
                <span className="font-bold text-ink text-lg">Call toll-free: </span>
                <a href="tel:877-908-3360" className="font-bold text-signal-blue underline text-xl">
                  877-908-3360
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* International Channels */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink border-b border-rule pb-2">
            United Kingdom & Canada
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-panel border border-control-edge rounded-control flex flex-col gap-2">
              <h3 className="text-lg font-bold text-ink">United Kingdom</h3>
              <p className="text-sm text-ink-muted">
                Action Fraud (national fraud and cybercrime reporting centre)
              </p>
              <a href="https://www.actionfraud.police.uk" target="_blank" rel="noopener noreferrer" className="font-bold text-signal-blue underline text-sm">
                actionfraud.police.uk (0300 123 2040)
              </a>
            </div>

            <div className="p-4 bg-panel border border-control-edge rounded-control flex flex-col gap-2">
              <h3 className="text-lg font-bold text-ink">Canada</h3>
              <p className="text-sm text-ink-muted">
                Canadian Anti-Fraud Centre (CAFC)
              </p>
              <a href="https://www.antifraudcentre-centreantifraude.ca" target="_blank" rel="noopener noreferrer" className="font-bold text-signal-blue underline text-sm">
                antifraudcentre.ca (1-888-495-8501)
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
