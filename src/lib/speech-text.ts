/**
 * Prepares scenario text for text-to-speech. Shared by the runtime player and the
 * build-time audio generator so both read the line identically.
 * Quotes and brackets are dropped, and codes/numbers of 3+ digits (OTPs, hotlines) are
 * spelled digit by digit, in both Latin and Bangla numerals.
 */
export function prepareSpeechText(text: string): string {
  return text
    .replace(/[0-9০-৯]{3,}/g, (m) => m.split('').join(' '))
    .replace(/["“”«»]/g, '')
    .replace(/[()]/g, '')
    .trim();
}
