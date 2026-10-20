import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  title?: string;
}

/**
 * Verify pictogram: Phone outline with a return arrow.
 * Used for the Verify habit and the Known Number logo.
 */
export function VerifyIcon({ size = 32, className = '', color = 'currentColor', title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!title}
      role={title ? 'img' : 'presentation'}
    >
      {title && <title>{title}</title>}
      {/* Phone handset outline */}
      <path
        d="M10 14C10 11.7909 11.7909 10 14 10H17.2C18.1565 10 18.966 10.6726 19.1415 11.6094L20.1415 16.9427C20.2974 17.7745 19.9231 18.6146 19.2223 19.004L16.8 20.35C18.6 24.5 23.5 29.4 27.65 31.2L29 28.78C29.39 28.08 30.23 27.7 31.06 27.86L36.39 28.86C37.33 29.03 38 29.84 38 30.8V34C38 36.21 36.21 38 34 38C20.7452 38 10 27.2548 10 14Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Return/Verify loop arrow */}
      <path
        d="M26 12H34C36.2091 12 38 13.7909 38 16V20M26 12L29.5 8.5M26 12L29.5 15.5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Pause pictogram: Two vertical bars.
 */
export function PauseIcon({ size = 32, className = '', color = 'currentColor', title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!title}
      role={title ? 'img' : 'presentation'}
    >
      {title && <title>{title}</title>}
      <rect x="14" y="10" width="6" height="28" rx="2" fill={color} />
      <rect x="28" y="10" width="6" height="28" rx="2" fill={color} />
    </svg>
  );
}

/**
 * Tell pictogram: Two overlapping speech bubbles.
 */
export function TellIcon({ size = 32, className = '', color = 'currentColor', title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!title}
      role={title ? 'img' : 'presentation'}
    >
      {title && <title>{title}</title>}
      <path
        d="M8 18C8 13.5817 11.5817 10 16 10H26C30.4183 10 34 13.5817 34 18V22C34 26.4183 30.4183 30 26 30H16L10 35V29.5C8.75 28.1 8 26.2 8 24V18Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 16C37.3 16.5 40 19.5 40 23V27C40 28.9 39.2 30.6 38 31.9V37L32.5 33H28C24.7 33 22 30.5 22 27"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Red Flag pictogram: Triangle with exclamation mark.
 */
export function RedFlagIcon({ size = 28, className = '', color = '#12263A' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 6L44 40H4L24 6Z"
        fill="#F2B705"
        stroke="#12263A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="24" y1="18" x2="24" y2="28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.5" fill={color} />
    </svg>
  );
}

/**
 * Safe Outcome pictogram: Square with checkmark.
 */
export function SafeOutcomeIcon({ size = 36, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="5" width="38" height="38" rx="6" fill="#1B6B3A" stroke="#12263A" strokeWidth="2.5" />
      <path d="M14 24L21 31L34 17" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Unsafe Outcome pictogram: Circle with horizontal bar.
 */
export function UnsafeOutcomeIcon({ size = 36, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="19" fill="#B3261E" stroke="#12263A" strokeWidth="2.5" />
      <line x1="12" y1="24" x2="36" y2="24" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
