import { Scenario } from '@/lib/engine';
import { grandchildCallScenario } from './grandchild-call';
import { bankFraudScenario } from './bank-fraud';
import { parcelPhishingScenario } from './parcel-phishing';
import { bkashFraudScenarioBn } from './bn/bkash-fraud';
import { hospitalEmergencyScenarioBn } from './bn/hospital-emergency';
import { courierPhishingScenarioBn } from './bn/courier-phishing';
import { Locale } from '@/lib/i18n/translations';

// English scenarios only
export const ENGLISH_SCENARIOS: Scenario[] = [
  grandchildCallScenario,
  bankFraudScenario,
  parcelPhishingScenario,
];

// Bangla scenarios only
export const BANGLA_SCENARIOS: Scenario[] = [
  bkashFraudScenarioBn,
  hospitalEmergencyScenarioBn,
  courierPhishingScenarioBn,
];

// All scenarios across all regions
export const ALL_SCENARIOS: Scenario[] = [
  ...ENGLISH_SCENARIOS,
  ...BANGLA_SCENARIOS,
];

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}

/**
 * Returns strictly the scenarios belonging to the selected locale:
 * If 'bn', returns only Bangla scenarios.
 * If 'en', returns only English scenarios.
 */
export function getScenariosForLocale(locale: Locale): Scenario[] {
  if (locale === 'bn') {
    return BANGLA_SCENARIOS;
  }
  return ENGLISH_SCENARIOS;
}

export function getAllScenarios(locale?: Locale): Scenario[] {
  if (locale) {
    return getScenariosForLocale(locale);
  }
  return ALL_SCENARIOS;
}
