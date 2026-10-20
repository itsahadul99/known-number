'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/settings-context';

interface RouteLineProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function RouteLine({ currentStep, totalSteps, className }: RouteLineProps) {
  const { t } = useSettings();
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div
      className={cn('flex flex-col gap-2 my-4', className)}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`${t.stepText} ${currentStep} ${t.ofText} ${totalSteps}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-base text-ink">
          {t.stepText} {currentStep} {t.ofText} {totalSteps}
        </span>
      </div>

      {/* Visual route line */}
      <div className="flex items-center relative py-2">
        {/* Background track line */}
        <div className="absolute left-0 right-0 h-1 bg-rule z-0 rounded-full" />

        {/* Completed track line */}
        <div
          className="absolute left-0 h-1 bg-signal-blue z-0 rounded-full transition-all duration-200"
          style={{
            width: totalSteps > 1 ? `${((currentStep - 1) / (totalSteps - 1)) * 100}%` : '0%',
          }}
        />

        {/* Step stops */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;

            return (
              <div
                key={step}
                className={cn(
                  'rounded-full flex items-center justify-center transition-all',
                  isCurrent
                    ? 'w-6 h-6 bg-paper border-3 border-signal-blue ring-2 ring-paper'
                    : isCompleted
                    ? 'w-4 h-4 bg-signal-blue border-2 border-signal-blue'
                    : 'w-4 h-4 bg-paper border-2 border-control-edge'
                )}
                aria-hidden="true"
              >
                {isCurrent && (
                  <div className="w-2.5 h-2.5 rounded-full bg-signal-blue" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
