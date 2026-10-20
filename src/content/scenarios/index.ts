import { Scenario } from '@/lib/engine';
import { grandchildCallScenario } from './grandchild-call';
import { bankFraudScenario } from './bank-fraud';
import { parcelPhishingScenario } from './parcel-phishing';
import { bkashFraudScenarioBn } from './bn/bkash-fraud';
import { hospitalEmergencyScenarioBn } from './bn/hospital-emergency';
import { courierPhishingScenarioBn } from './bn/courier-phishing';
import { Locale } from '@/lib/i18n/translations';

export const ALL_SCENARIOS: Scenario[] = [
  // English Scenarios
  grandchildCallScenario,
  bankFraudScenario,
  parcelPhishingScenario,

  // Native Bangla (বাংলা) Scenarios
  hospitalEmergencyScenarioBn,
  bkashFraudScenarioBn,
  courierPhishingScenarioBn,
];

// Paired cross-language counterpart scenarios
export const SCENARIO_PAIRS: Record<string, string> = {
  'grandchild-call': 'hospital-emergency-bn',
  'hospital-emergency-bn': 'grandchild-call',
  'bank-fraud': 'bkash-fraud-bn',
  'bkash-fraud-bn': 'bank-fraud',
  'parcel-phishing': 'courier-phishing-bn',
  'courier-phishing-bn': 'parcel-phishing',
};

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}

export function getAllScenarios(locale?: Locale): Scenario[] {
  if (locale === 'bn') {
    return [
      hospitalEmergencyScenarioBn,
      bkashFraudScenarioBn,
      courierPhishingScenarioBn,
      // fallback English scenarios
      grandchildCallScenario,
      bankFraudScenario,
      parcelPhishingScenario,
    ];
  }

  return [
    grandchildCallScenario,
    bankFraudScenario,
    parcelPhishingScenario,
    hospitalEmergencyScenarioBn,
    bkashFraudScenarioBn,
    courierPhishingScenarioBn,
  ];
}

export function getScenariosForLocale(locale: Locale): Scenario[] {
  if (locale === 'bn') {
    return [
      hospitalEmergencyScenarioBn,
      bkashFraudScenarioBn,
      courierPhishingScenarioBn,
    ];
  }
  return [
    grandchildCallScenario,
    bankFraudScenario,
    parcelPhishingScenario,
  ];
}
