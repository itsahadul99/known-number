import { Habit } from './engine';

export interface DrillHashParams {
  from?: string;
  to?: string;
  region?: string;
  lang?: string;
}

export interface ResultPayload {
  v: 1;
  scenarioId: string;
  outcome: 'safe' | 'unsafe';
  habits: Habit[];
  flags: string[];
  recipientName?: string;
  senderName?: string;
}

export function parseDrillHash(hash: string): DrillHashParams {
  const clean = hash.replace(/^#/, '');
  const params = new URLSearchParams(clean);
  return {
    from: params.get('from') || undefined,
    to: params.get('to') || undefined,
    region: params.get('region') || 'us',
    lang: params.get('lang') || undefined,
  };
}

export function encodeDrillHash(params: DrillHashParams): string {
  const searchParams = new URLSearchParams();
  if (params.from) searchParams.set('from', params.from);
  if (params.to) searchParams.set('to', params.to);
  if (params.region) searchParams.set('region', params.region);
  if (params.lang) searchParams.set('lang', params.lang);
  return searchParams.toString();
}

export function encodeResultHash(payload: ResultPayload): string {
  try {
    const jsonStr = JSON.stringify(payload);
    if (typeof window !== 'undefined' && window.btoa) {
      const base64 = window.btoa(unescape(encodeURIComponent(jsonStr)));
      return `d=${base64}`;
    }
    return `d=${Buffer.from(jsonStr).toString('base64url')}`;
  } catch {
    return '';
  }
}

export function decodeResultHash(hash: string): ResultPayload | null {
  try {
    const clean = hash.replace(/^#/, '');
    const params = new URLSearchParams(clean);
    const data = params.get('d');
    if (!data) return null;

    let jsonStr = '';
    if (typeof window !== 'undefined' && window.atob) {
      jsonStr = decodeURIComponent(escape(window.atob(data)));
    } else {
      jsonStr = Buffer.from(data, 'base64url').toString('utf8');
    }

    return JSON.parse(jsonStr) as ResultPayload;
  } catch {
    return null;
  }
}
