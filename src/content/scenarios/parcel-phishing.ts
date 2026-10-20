import { Scenario } from '@/lib/engine';

export const parcelPhishingScenario: Scenario = {
  id: 'parcel-phishing',
  version: 1,
  region: 'us',
  locale: 'en-US',
  title: 'Parcel Delivery Fee Text',
  summary: 'You receive an urgent text message claiming a package is held at the sorting depot and requires an immediate $2.15 re-delivery fee.',
  category: 'delivery-phishing',
  durationMin: 4,
  startNodeId: 'node-1-sms',
  redFlags: [
    {
      id: 'rf-suspicious-link',
      label: 'Strange or scrambled web link',
      explanation: 'Links like "usps-post-redelivery-tracking.xyz" look legitimate at a glance but lead to phishing pages.',
    },
    {
      id: 'rf-small-fee',
      label: 'Small fee ($1–$3) as bait',
      explanation: 'A tiny charge lowers your suspicion, but the payment form steals your full card number and CVV.',
    },
    {
      id: 'rf-unknown-order',
      label: 'Package you did not order',
      explanation: 'Scammers broadcast millions of texts knowing someone in the household recently bought something online.',
    },
  ],
  debrief: {
    summary: 'Postal and delivery services never ask for fee payments through text links. Always check orders through the store you bought from.',
    whatToDoIfReal: [
      'Do not tap or click links sent in unsolicited text messages.',
      'If you are expecting a package, open your original email receipt from the merchant and use the tracking number provided there.',
      'Forward the spam text to 7726 (SPAM) to alert your carrier.',
      'Delete and block the sender number.',
    ],
    reportingKey: 'uspis-report',
  },
  lastReviewed: '2026-10-20',
  sources: ['US Postal Inspection Service (USPIS) 2025', 'FTC Phishing Advisory 2025'],
  nodes: {
    'node-1-sms': {
      id: 'node-1-sms',
      channel: 'sms',
      sender: {
        displayName: 'Postal Services Alert',
        handle: '+1 (555) 018-9921',
      },
      pressure: 1,
      messages: [
        {
          text: 'POSTAL ALERT: Your parcel #US984291 cannot be delivered due to missing house number and unpaid $2.15 customs handling fee. Update address and pay within 12h or parcel will be returned: http://postal-depot-reschedule-fee84.com',
          time: '14:22',
          isIncoming: true,
        },
      ],
      choices: [
        {
          id: 'c1-pause-check',
          label: 'Pause: Check whether you or anyone in the house actually ordered something.',
          next: 'node-2-evaluate-link',
          habit: 'pause',
          feedback: 'Smart pause! Scammers send this blast to millions of numbers hoping you happen to be expecting an order.',
          whatToDoInstead: 'Always pause and review recent purchases before reacting to delivery texts.',
        },
        {
          id: 'c1-tap-link',
          label: 'Tap the link immediately to pay the $2.15 so your package isn\'t sent back.',
          next: 'node-2-fake-site',
          feedback: 'Tapping the link opens a counterfeit website designed to capture your credit card details.',
          whatToDoInstead: 'Never tap links in unexpected text messages.',
        },
        {
          id: 'c1-delete-ignore',
          label: 'Delete the message and verify via your official shopping app.',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Spot on! You refused to take the bait and checked through genuine channels.',
          whatToDoInstead: 'This is the safest reaction.',
        },
      ],
    },

    'node-2-evaluate-link': {
      id: 'node-2-evaluate-link',
      channel: 'sms',
      sender: {
        displayName: 'Postal Services Alert',
      },
      pressure: 2,
      messages: [
        {
          text: 'Notice the address in the text: "postal-depot-reschedule-fee84.com". Is that the official website of the national post office?',
          isIncoming: true,
        },
      ],
      choices: [
        {
          id: 'c2-recognize-fake-url',
          label: '"This link is fake. The real postal service is usps.com (or royalmail.com)."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Sharp eye! Domain names with extra words and hyphens are classic spoof websites.',
          whatToDoInstead: 'Only trust the official website you type yourself into your browser address bar.',
        },
        {
          id: 'c2-trust-url',
          label: '"It has the word \'postal\' in it, so it looks legitimate enough to click."',
          next: 'node-2-fake-site',
          feedback: 'Scammers deliberately include words like "postal", "bank", or "support" in fake domains to deceive visitors.',
          whatToDoInstead: 'Anyone can register a domain with the word "postal" in it.',
        },
      ],
    },

    'node-2-fake-site': {
      id: 'node-2-fake-site',
      channel: 'web',
      sender: {
        displayName: 'Counterfeit Delivery Portal',
      },
      pressure: 3,
      messages: [
        {
          text: 'The web page looks official with familiar postal logos. It asks for: Full Name, Home Address, Card Number, Expiration Date, and 3-digit CVV code to pay $2.15.',
        },
      ],
      choices: [
        {
          id: 'c3-close-tab',
          label: 'Realize the danger and immediately close the browser tab without entering data.',
          next: 'END_SAFE',
          habit: 'pause',
          feedback: 'Huge relief! Closing the tab prevented your card details from being stolen.',
          whatToDoInstead: 'If you ever arrive on a suspicious page, leave immediately.',
        },
        {
          id: 'c3-enter-card',
          label: 'Fill in your card details and submit the form to pay the $2.15 fee.',
          next: 'END_UNSAFE',
          feedback: 'The $2.15 was a trick. The scammer now has your full card details and will make thousands in unauthorized charges.',
          whatToDoInstead: 'Legitimate delivery couriers do not hold deliveries for tiny online credit card payments via SMS links.',
        },
      ],
    },
  },
};
