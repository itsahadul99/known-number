import { Scenario } from '@/lib/engine';

export const bankFraudScenario: Scenario = {
  id: 'bank-fraud',
  version: 1,
  region: 'us',
  locale: 'en-US',
  title: 'Bank Fraud Department',
  summary: 'A professional-sounding caller claims someone is stealing from your account and urges you to transfer funds to a "secure safety vault account".',
  category: 'bank-impersonation',
  durationMin: 5,
  startNodeId: 'node-1-fraud-alert',
  redFlags: [
    {
      id: 'rf-safe-account',
      label: 'Request to move money to a "safe account"',
      explanation: 'Banks never ask you to move your money to protect it. Moving your money IS the theft.',
    },
    {
      id: 'rf-otp-request',
      label: 'Asking for one-time verification code',
      explanation: 'Passcodes sent by SMS or banking apps say "Do NOT share this code with anyone, including bank staff".',
    },
    {
      id: 'rf-spoofed-id',
      label: 'Caller ID matching bank phone number',
      explanation: 'Scammers easily spoof numbers so your screen displays your actual bank\'s name or phone number.',
    },
  ],
  debrief: {
    summary: 'A real bank will never ask you to transfer money to another account or read back secret codes sent to your phone.',
    whatToDoIfReal: [
      'Hang up immediately. Even if your caller ID shows the bank\'s exact phone number, caller ID is easily faked.',
      'Turn your debit or credit card over and look at the customer service number printed on the back.',
      'Dial that number directly from your phone to speak with genuine bank staff.',
      'If you already shared information, contact your bank\'s genuine fraud hotline right away to freeze your account.',
    ],
    reportingKey: 'ftc-report',
  },
  lastReviewed: '2026-10-20',
  sources: ['American Bankers Association (ABA) Scam Guidance 2025', 'FTC 2025'],
  nodes: {
    'node-1-fraud-alert': {
      id: 'node-1-fraud-alert',
      channel: 'call',
      sender: {
        displayName: 'Northfield Bank',
        handle: 'Fraud Prevention Unit',
      },
      pressure: 1,
      messages: [
        {
          text: '"Good afternoon. This is Jonathan from Northfield Bank Fraud Department. We are detecting suspicious international charges of $1,280 on your checking account right now."',
        },
        {
          text: '"To halt the transaction and secure your funds, I need to verify your account credentials."',
        },
      ],
      choices: [
        {
          id: 'c1-ask-card-call',
          label: '"I\'m hanging up to call the number printed on the back of my bank card."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Perfect! This is the single safest thing you can do when your bank calls. Genuine bank staff will always encourage this.',
          whatToDoInstead: 'Always hang up and call the number printed on the back of your physical card.',
        },
        {
          id: 'c1-ask-which-card',
          label: '"Which account number or card are you referring to?"',
          next: 'node-2-vague-answer',
          habit: 'pause',
          feedback: 'Good instinct to pause. Notice how the scammer avoids giving specific details and pressures you instead.',
          whatToDoInstead: 'Do not stay on the line. Call back independently.',
        },
        {
          id: 'c1-give-details',
          label: '"Oh dear, please stop it! What information do you need?"',
          next: 'node-2-ask-code',
          feedback: 'Fear of losing money makes people comply quickly. Scammers rely on this exact shock reaction.',
          whatToDoInstead: 'Take a breath. A real bank can freeze fraudulent charges without needing you to do anything on the call.',
        },
      ],
    },

    'node-2-vague-answer': {
      id: 'node-2-vague-answer',
      channel: 'call',
      sender: {
        displayName: 'Northfield Bank - Fraud Prevention',
      },
      pressure: 2,
      messages: [
        {
          text: '"Due to federal privacy laws, I cannot read your full card number out loud until you verify the security code we just texted to your phone."',
        },
        {
          text: '"The transfer is currently pending. If you do not read the 6-digit code in the next 90 seconds, the money will leave your account forever!"',
        },
      ],
      choices: [
        {
          id: 'c2-read-code-warning',
          label: 'Check the text message on your phone carefully before doing anything.',
          next: 'node-3-check-sms',
          habit: 'pause',
          feedback: 'Excellent pause. Checking the text reveals the warning: "Do NOT share this code with anyone".',
          whatToDoInstead: 'Read the text message carefully; banks explicitly warn never to read it to phone agents.',
        },
        {
          id: 'c2-read-code-aloud',
          label: 'Quickly read out the 6-digit code to stop the transfer.',
          next: 'END_UNSAFE',
          feedback: 'That code was a 2-factor authentication code allowing the scammer to log into your account and drain your savings.',
          whatToDoInstead: 'Never read out temporary codes sent to your phone. Bank reps never need them.',
        },
      ],
    },

    'node-2-ask-code': {
      id: 'node-2-ask-code',
      channel: 'call',
      sender: {
        displayName: 'Northfield Bank - Fraud Prevention',
      },
      pressure: 2,
      messages: [
        {
          text: '"I have generated a security authorization code to your mobile phone right now. Please read me the 6 digits so I can block the hacker."',
        },
      ],
      choices: [
        {
          id: 'c2b-refuse-code',
          label: '"My text message says \'Never share this code\'. I am hanging up."',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Incredible awareness! You read the security warning and protected your online banking access.',
          whatToDoInstead: 'Always heed the warning inside the security text message.',
        },
        {
          id: 'c2b-give-code',
          label: 'Read the 6 digits: "It says 849-201."',
          next: 'END_UNSAFE',
          feedback: 'By giving them that code, the scammer authorized a password reset on your real bank account.',
          whatToDoInstead: 'One-time passcodes are for YOU to type into apps, never for a phone caller.',
        },
      ],
    },

    'node-3-check-sms': {
      id: 'node-3-check-sms',
      channel: 'sms',
      sender: {
        displayName: 'Northfield Bank Auth',
      },
      pressure: 3,
      messages: [
        {
          text: 'NORTHFIELD BANK: Your passcode is 592-104 for a transfer of $1,280.00. WARNING: Northfield employees will NEVER ask for this code on a phone call. If you did not request this, hang up and call 1-800-555-0199.',
          time: 'Just now',
          isIncoming: true,
        },
      ],
      choices: [
        {
          id: 'c3-hangup-card-number',
          label: 'Hang up on the caller and call the official 1-800 number from your card.',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'Masterful! You verified with the bank directly through a known number and stopped the theft.',
          whatToDoInstead: 'This is the gold standard response for any banking alert.',
        },
        {
          id: 'c3-ignore-warning',
          label: 'Tell the caller: "The code is 592-104."',
          next: 'END_UNSAFE',
          feedback: 'Ignoring the security warning handed total control of your money to the fraudster.',
          whatToDoInstead: 'Always stop and read SMS warnings thoroughly.',
        },
      ],
    },
  },
};
