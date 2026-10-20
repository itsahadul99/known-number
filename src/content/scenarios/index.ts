import { Scenario } from '@/lib/engine';
import { grandchildCallScenario } from './grandchild-call';
import { bankFraudScenario } from './bank-fraud';
import { parcelPhishingScenario } from './parcel-phishing';

export const ALL_SCENARIOS: Scenario[] = [
  grandchildCallScenario,
  bankFraudScenario,
  parcelPhishingScenario,
];

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}

export function getAllScenarios(): Scenario[] {
  return ALL_SCENARIOS;
}
