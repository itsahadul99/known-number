import { Scenario } from '@/lib/engine';

export const grandchildCallScenario: Scenario = {
  id: 'grandchild-call',
  version: 1,
  region: 'us',
  locale: 'en-US',
  title: 'Grandchild in Trouble',
  summary: 'A distressed call claiming your grandchild was arrested and needs bail money sent right away in secrecy.',
  category: 'family-distress',
  durationMin: 5,
  startNodeId: 'node-1-incoming',
  redFlags: [
    {
      id: 'rf-urgency',
      label: 'Panic and immediate urgency',
      explanation: 'The caller creates instant panic so you react with emotion rather than thinking.',
    },
    {
      id: 'rf-secrecy',
      label: 'Plea for secrecy',
      explanation: 'Demanding "don\'t tell mum and dad" isolates you from the people who could verify the truth.',
    },
    {
      id: 'rf-voice-distress',
      label: 'Disguised voice blamed on injury',
      explanation: 'Claiming a broken nose or bad phone connection covers up that the voice doesn\'t sound quite right.',
    },
    {
      id: 'rf-unusual-payment',
      label: 'Urgent wire / courier / gift card transfer',
      explanation: 'Real courts and police departments never request bail through wires, gift cards, or courier pickup.',
    },
  ],
  debrief: {
    summary: 'Family emergency calls use fear and love against you. Always hang up and call back on a known number.',
    whatToDoIfReal: [
      'Hang up immediately. You do not owe a strange caller your time.',
      'Call the family member back on the number you already have saved in your contacts (the "known number").',
      'If they do not answer, call their parents, spouse, or workplace before sending any money.',
      'Agree on a simple family code word in advance for real emergencies.',
    ],
    reportingKey: 'fbi-ic3',
  },
  lastReviewed: '2026-10-20',
  sources: ['FTC Consumer Sentinel 2025', 'FBI IC3 Elder Fraud Report 2025'],
  nodes: {
    'node-1-incoming': {
      id: 'node-1-incoming',
      channel: 'call',
      sender: {
        displayName: 'Unknown Number',
        handle: '+1 (555) 019-2834',
      },
      pressure: 1,
      messages: [
        {
          text: 'Ring... incoming call from an unknown number. You pick up and hear frantic crying.',
        },
        {
          text: '"Grandma? It\'s me... I\'m in so much trouble! Please don\'t hang up, I don\'t know who else to call!"',
        },
      ],
      choices: [
        {
          id: 'c1-ask-who',
          label: '"Who is this? You don\'t sound like yourself."',
          next: 'node-2-explanation',
          habit: 'pause',
          feedback: 'Great reaction. Pausing and questioning the caller prevents you from supplying a grandchild\'s name yourself.',
          whatToDoInstead: 'Never guess names like "Is that Billy?". Make the caller identify themselves.',
        },
        {
          id: 'c1-guess-name',
          label: '"Billy? Is that you? What happened?!"',
          next: 'node-2-scammer-takes-name',
          feedback: 'A scammer loves when you guess a name. Once you say "Billy?", they immediately pretend to be Billy for the rest of the call.',
          whatToDoInstead: 'Pause and ask them to state their name and details only family would know.',
        },
        {
          id: 'c1-hangup-immediate',
          label: 'Hang up and immediately dial your grandchild\'s known phone number.',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Outstanding move! Hanging up and calling back on your saved "known number" completely stops this scam in its tracks.',
          whatToDoInstead: 'This is the gold standard response.',
        },
      ],
    },

    'node-2-explanation': {
      id: 'node-2-explanation',
      channel: 'call',
      sender: {
        displayName: 'Distressed Caller',
      },
      pressure: 2,
      messages: [
        {
          text: '"It\'s your grandson! My nose is broken from a car crash, that\'s why my voice sounds weird. The police took my phone! I\'m at the station downtown."',
        },
        {
          text: '"A public defender named Mark Taylor is standing right next to me. He says I need bail money within the next hour or I\'ll be moved to state prison!"',
        },
      ],
      choices: [
        {
          id: 'c2-ask-code-word',
          label: '"What is our family secret word?" (or ask a private family question)',
          next: 'node-3-scammer-dodges',
          habit: 'verify',
          feedback: 'Brilliant! A scammer or voice cloner cannot answer a private question or family code word.',
          whatToDoInstead: 'Keep a pre-agreed family code word for emergencies.',
        },
        {
          id: 'c2-ask-lawyer',
          label: '"Put the public defender on the phone."',
          next: 'node-3-fake-lawyer',
          feedback: 'Scammers have accomplices ready to pose as lawyers or police officers with fake badge numbers.',
          whatToDoInstead: 'Do not trust whoever they hand the phone to. Verify independently.',
        },
        {
          id: 'c2-promise-money',
          label: '"Don\'t worry darling, how much money do you need?"',
          next: 'node-3-payment-demand',
          feedback: 'Offering money signals you are fully hooked. Scammers will now escalate their demands rapidly.',
          whatToDoInstead: 'Pause before committing money, no matter how panicked the voice sounds.',
        },
      ],
    },

    'node-2-scammer-takes-name': {
      id: 'node-2-scammer-takes-name',
      channel: 'call',
      sender: {
        displayName: 'Caller posing as Billy',
      },
      pressure: 2,
      messages: [
        {
          text: '"Yes Grandma, it\'s Billy! I was in an accident and broke my nose. I\'m locked in a holding cell and only get one phone call!"',
        },
        {
          text: '"Please don\'t tell Mom and Dad, they will murder me! You have to help me post bail right now."',
        },
      ],
      choices: [
        {
          id: 'c2b-call-parents',
          label: '"I am calling your mother right now, Billy."',
          next: 'END_SAFE',
          habit: 'tell',
          feedback: 'Exactly right! Breaking the secrecy rule by calling his parents instantly shatters the scam.',
          whatToDoInstead: 'Always tell another family member. Real crises are never kept secret from parents.',
        },
        {
          id: 'c2b-keep-secret',
          label: '"Okay, I won\'t tell your mother. What do I need to do?"',
          next: 'node-3-payment-demand',
          feedback: 'Agreed secrecy is the scammer\'s strongest weapon. It keeps anyone else from warning you.',
          whatToDoInstead: 'Never keep sudden financial emergencies secret from your family.',
        },
      ],
    },

    'node-3-scammer-dodges': {
      id: 'node-3-scammer-dodges',
      channel: 'call',
      sender: {
        displayName: 'Distressed Caller',
      },
      pressure: 3,
      messages: [
        {
          text: '"Grandma, why are you testing me right now?! I\'m bleeding and terrified and you\'re asking riddles! Do you want me to sit in jail?!"',
        },
      ],
      choices: [
        {
          id: 'c3-hangup-now',
          label: '"I am hanging up now and calling your parents."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Superb! Recognizing emotional guilt trips and hanging up takes tremendous bravery.',
          whatToDoInstead: 'Hang up whenever a caller becomes aggressive or tries to shame you.',
        },
        {
          id: 'c3-apologize-pay',
          label: '"I\'m sorry! Tell me how to send the money."',
          next: 'node-3-payment-demand',
          feedback: 'Guilt and urgency made you back down. Scammers practice this emotional manipulation specifically.',
          whatToDoInstead: 'Remember: a real grandchild will understand why you need to verify their safety.',
        },
      ],
    },

    'node-3-fake-lawyer': {
      id: 'node-3-fake-lawyer',
      channel: 'call',
      sender: {
        displayName: 'Fake Public Defender',
      },
      pressure: 3,
      messages: [
        {
          text: '"Ma\'am, this is Attorney Taylor, bar number 48291. Your grandson is facing reckless endangerment charges. Bail is set at $4,500 by the magistrate."',
        },
        {
          text: '"The clerk is closing the register in 20 minutes. You must send cash via express courier or bank wire immediately."',
        },
      ],
      choices: [
        {
          id: 'c3l-verify-court',
          label: '"Give me the case number. I will call the courthouse directly on their official line."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Flawless response! Real courts accept verified payments through official clerk offices, never couriers or rushed wires.',
          whatToDoInstead: 'Look up the courthouse phone number yourself in directory listings.',
        },
        {
          id: 'c3l-send-courier',
          label: '"I will go to my bank and withdraw the $4,500 for the courier."',
          next: 'END_UNSAFE',
          feedback: 'A courier pickup or direct cash wire means the money is permanently gone with zero recovery.',
          whatToDoInstead: 'Never hand cash or wire money to couriers claiming to represent court officials.',
        },
      ],
    },

    'node-3-payment-demand': {
      id: 'node-3-payment-demand',
      channel: 'call',
      sender: {
        displayName: 'Urgent Caller',
      },
      pressure: 3,
      messages: [
        {
          text: '"The court bail bondsman says we need $3,000 immediately. Go to Walmart or the supermarket right now and buy Apple or Target gift cards, then read me the 16-digit codes on the back!"',
        },
      ],
      choices: [
        {
          id: 'c4-refuse-gift-cards',
          label: '"Gift cards for court bail? No court takes gift cards. I am hanging up."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Spot on! NO legitimate government body, police station, or court EVER takes gift cards.',
          whatToDoInstead: 'Any demand for gift cards is 100% fraud every single time.',
        },
        {
          id: 'c4-comply-gift-cards',
          label: '"Okay, I am driving to the store now to buy the gift cards."',
          next: 'END_UNSAFE',
          feedback: 'Reading gift card numbers over the phone empties the balance immediately across overseas accounts.',
          whatToDoInstead: 'Gift cards are for gifts only, never for bail, taxes, or bills.',
        },
      ],
    },
  },
};
