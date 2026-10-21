export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://knownnumber.vercel.app').replace(/\/$/, '');
export const SITE_NAME = 'Known Number';
export const SITE_TAGLINE = 'Practice the call before it comes.';
export const SITE_DESCRIPTION =
  'A free, 5-minute scam rehearsal for families. Practice realistic scam calls, bKash/bank fraud and parcel phishing safely in your browser. No sign-up, no personal data stored.';

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
