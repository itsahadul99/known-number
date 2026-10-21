import React from 'react';
import Link from 'next/link';
import { VerifyIcon } from '@/components/sign/Pictograms';
import { cn } from '@/lib/utils';

interface LogoProps {
  showTagline?: boolean;
  size?: 'normal' | 'large';
  linkToHome?: boolean;
  className?: string;
}

export function Logo({
  showTagline = false,
  size = 'normal',
  linkToHome = true,
  className,
}: LogoProps) {
  const isLarge = size === 'large';
  const circleSize = isLarge ? 'w-14 h-14' : 'w-10 h-10';
  const iconSize = isLarge ? 34 : 24;

  const content = (
    <div className={cn('inline-flex items-center gap-3', className)}>
      {/* Visual System: A blue circle with the Verify pictogram as the logo */}
      <div
        className={cn(
          'rounded-full bg-signal-blue text-white flex items-center justify-center shrink-0 border-2 border-ink',
          circleSize
        )}
        aria-hidden="true"
      >
        <VerifyIcon size={iconSize} color="#FFFFFF" />
      </div>

      <div className="flex flex-col min-w-0">
        <span
          className={cn(
            'font-bold text-ink leading-tight tracking-tight',
            isLarge ? 'text-2xl' : 'text-xl'
          )}
        >
          Known Number
        </span>
        {showTagline && (
          <span className="text-sm text-ink-muted leading-tight">
            Practice the call before it comes.
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="no-underline text-inherit inline-block hover:opacity-95"
        aria-label="Known Number - Return to home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
