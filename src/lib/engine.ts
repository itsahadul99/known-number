export type Channel = 'call' | 'sms' | 'chat' | 'email' | 'popup' | 'web';
export type Habit = 'pause' | 'verify' | 'tell';

export interface RedFlag {
  id: string;
  label: string;
  explanation: string;
}

export interface Choice {
  id: string;
  label: string;
  next: string | 'END_SAFE' | 'END_UNSAFE';
  habit?: Habit;
  feedback: string;
  whatToDoInstead?: string;
  points?: number;
}

export interface ScenarioNode {
  id: string;
  channel: Channel;
  sender: { displayName: string; handle?: string };
  messages: {
    text: string;
    flagIds?: string[];
    spokenText?: string;
    time?: string;
    isIncoming?: boolean;
  }[];
  pressure: 0 | 1 | 2 | 3;
  choices: Choice[];
}

export interface Scenario {
  id: string;
  version: number;
  region: string;
  locale: string;
  title: string;
  summary: string;
  category:
    | 'family-distress'
    | 'bank-impersonation'
    | 'authority'
    | 'tech-support'
    | 'romance-investment'
    | 'delivery-phishing';
  durationMin: number;
  startNodeId: string;
  nodes: Record<string, ScenarioNode>;
  redFlags: RedFlag[];
  debrief: {
    summary: string;
    whatToDoIfReal: string[];
    reportingKey: string;
  };
  lastReviewed: string;
  sources: string[];
}

export interface EngineState {
  scenario: Scenario;
  currentNodeId: string;
  stepNumber: number;
  totalSteps: number;
  selectedChoice: Choice | null;
  showFeedback: boolean;
  habitsDemonstrated: Habit[];
  tappedFlagIds: string[];
  outcome: 'safe' | 'unsafe' | null;
  history: { nodeId: string; choiceId: string }[];
}

export type EngineAction =
  | { type: 'SELECT_CHOICE'; choice: Choice }
  | { type: 'ADVANCE_NODE' }
  | { type: 'TAP_FLAG'; flagId: string }
  | { type: 'RESTART' }
  | { type: 'SET_SCENARIO'; scenario: Scenario };

export function createInitialEngineState(scenario: Scenario): EngineState {
  return {
    scenario,
    currentNodeId: scenario.startNodeId,
    stepNumber: 1,
    totalSteps: Object.keys(scenario.nodes).length || 5,
    selectedChoice: null,
    showFeedback: false,
    habitsDemonstrated: [],
    tappedFlagIds: [],
    outcome: null,
    history: [],
  };
}

export function scenarioReducer(state: EngineState, action: EngineAction): EngineState {
  switch (action.type) {
    case 'SELECT_CHOICE': {
      const { choice } = action;
      const updatedHabits = [...state.habitsDemonstrated];
      if (choice.habit && !updatedHabits.includes(choice.habit)) {
        updatedHabits.push(choice.habit);
      }

      return {
        ...state,
        selectedChoice: choice,
        showFeedback: true,
        habitsDemonstrated: updatedHabits,
        history: [...state.history, { nodeId: state.currentNodeId, choiceId: choice.id }],
      };
    }

    case 'ADVANCE_NODE': {
      if (!state.selectedChoice) return state;

      const nextTarget = state.selectedChoice.next;

      if (nextTarget === 'END_SAFE') {
        return {
          ...state,
          outcome: 'safe',
          showFeedback: false,
        };
      }

      if (nextTarget === 'END_UNSAFE') {
        return {
          ...state,
          outcome: 'unsafe',
          showFeedback: false,
        };
      }

      const nextNode = state.scenario.nodes[nextTarget];
      if (!nextNode) {
        // Fallback to safe if node not found
        return {
          ...state,
          outcome: 'safe',
          showFeedback: false,
        };
      }

      return {
        ...state,
        currentNodeId: nextTarget,
        stepNumber: state.stepNumber + 1,
        selectedChoice: null,
        showFeedback: false,
      };
    }

    case 'TAP_FLAG': {
      if (state.tappedFlagIds.includes(action.flagId)) return state;
      return {
        ...state,
        tappedFlagIds: [...state.tappedFlagIds, action.flagId],
      };
    }

    case 'RESTART': {
      return createInitialEngineState(state.scenario);
    }

    case 'SET_SCENARIO': {
      return createInitialEngineState(action.scenario);
    }

    default:
      return state;
  }
}
