export type Locale = 'en' | 'bn';

export interface Translations {
  appName: string;
  tagline: string;
  familyMessageHint: string;
  practiceBanner: string;
  stopPractice: string;
  settings: string;
  sendFamilyDrill: string;
  threeHabitsTitle: string;
  threeHabitsSubtitle: string;
  habits: {
    pause: {
      name: string;
      desc: string;
    };
    verify: {
      name: string;
      desc: string;
    };
    tell: {
      name: string;
      desc: string;
    };
  };
  scenariosTitle: string;
  scenariosSubtitle: string;
  startPractice: string;
  whatToDoNext: string;
  goodInstinct: string;
  scammerLovesReply: string;
  whatToDoInstead: string;
  habitAwarded: string;
  continueDrill: string;
  seeDebrief: string;
  drillCompleted: string;
  summaryFor: string;
  safeOutcomeTitle: string;
  unsafeOutcomeTitle: string;
  redFlagsTitle: string;
  ifRealTitle: string;
  shareResult: string;
  practiceAgain: string;
  practiceAnother: string;
  linkCopied: string;
  messageCopied: string;
  organiseTitle: string;
  organiseSubtitle: string;
  selectScenario: string;
  personalize: string;
  recipientLabel: string;
  senderLabel: string;
  previewMessage: string;
  shareWhatsapp: string;
  copyFullMessage: string;
  copyLinkOnly: string;
  previewYourself: string;
  printFridgeCard: string;
  officialReporting: string;
  languageSelect: string;
  switchLanguage: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    appName: 'Known Number',
    tagline: 'Practice the call before it comes.',
    familyMessageHint: 'Mum, try Known Number. It takes five minutes.',
    practiceBanner: 'Practice. Nothing here is real.',
    stopPractice: 'Stop practice',
    settings: 'Settings',
    sendFamilyDrill: 'Send a family drill',
    threeHabitsTitle: 'Three habits to protect your family',
    threeHabitsSubtitle: 'Scammers rely on surprise and manufactured panic. These three simple steps take control back:',
    habits: {
      pause: {
        name: 'Pause',
        desc: 'Take a breath before reacting. Urgency is the scammer’s primary weapon.',
      },
      verify: {
        name: 'Verify',
        desc: 'Hang up immediately. Call back on a known number from your contacts or card.',
      },
      tell: {
        name: 'Tell',
        desc: 'Tell a trusted family member. Secrecy protects the scammer.',
      },
    },
    scenariosTitle: 'Choose a rehearsal scenario',
    scenariosSubtitle: 'Each scenario takes 4–5 minutes and teaches safe instincts for high-loss fraud tactics:',
    startPractice: 'Start practice',
    whatToDoNext: 'What do you do next?',
    goodInstinct: 'Good instinct',
    scammerLovesReply: 'Why a scammer loves this response',
    whatToDoInstead: 'What to do instead:',
    habitAwarded: 'Habit demonstrated:',
    continueDrill: 'Continue drill',
    seeDebrief: 'See the rehearsal debrief',
    drillCompleted: 'Drill Completed · Debrief',
    summaryFor: 'rehearsal summary',
    safeOutcomeTitle: 'You protected yourself and took control',
    unsafeOutcomeTitle: 'A scammer would have succeeded here',
    redFlagsTitle: 'Red flags in this scam',
    ifRealTitle: 'If this happens for real',
    shareResult: 'Share result with family',
    practiceAgain: 'Practice again',
    practiceAnother: 'Practice another drill',
    linkCopied: '✓ Link copied to clipboard!',
    messageCopied: '✓ Message copied!',
    organiseTitle: 'Send a 5-minute drill to family',
    organiseSubtitle: 'Choose a scam scenario, add optional first names (kept 100% in the link, never sent to a server), and copy the ready-to-send family message.',
    selectScenario: '1. Select a rehearsal scenario',
    personalize: '2. Personalize (Optional)',
    recipientLabel: 'Who are you sending this to?',
    senderLabel: 'Your first name',
    previewMessage: '3. Ready-to-send message preview',
    shareWhatsapp: 'Share via WhatsApp / Messages',
    copyFullMessage: 'Copy full message',
    copyLinkOnly: 'Copy link only',
    previewYourself: 'Preview drill in your own browser first →',
    printFridgeCard: 'Printable Fridge Card',
    officialReporting: 'Official Reporting Numbers',
    languageSelect: 'Language / ভাষা',
    switchLanguage: 'Switch Language',
  },
  bn: {
    appName: 'Known Number (পরিচিত নম্বর)',
    tagline: 'ফোন আসার আগেই অনুশীলন করুন।',
    familyMessageHint: 'আম্মু, Known Number দেখে নাও। মাত্র ৫ মিনিট লাগবে।',
    practiceBanner: 'অনুশীলন চলছে। এখানে কোনো কিছুই আসল নয়।',
    stopPractice: 'অনুশীলন বন্ধ করুন',
    settings: 'সেটিংস',
    sendFamilyDrill: 'পরিবারে ড্রিল পাঠান',
    threeHabitsTitle: 'পরিবারকে প্রতারণা থেকে বাঁচাতে ৩টি অভ্যাস',
    threeHabitsSubtitle: 'প্রতারকরা হঠাৎ ভয় দেখিয়ে এবং তাড়াহুড়া করে টাকা হাতিয়ে নেয়। এই ৩টি ধাপ আপনাকে নিয়ন্ত্রণে রাখবে:',
    habits: {
      pause: {
        name: 'থামুন (Pause)',
        desc: 'তাড়াহুড়ো করবেন না, এক মুহূর্ত ভাবুন। জরুরি পরিস্থিতির চাপ তৈরি করাই প্রতারকের প্রধান অস্ত্র।',
      },
      verify: {
        name: 'যাচাই করুন (Verify)',
        desc: 'সাথে সাথে ফোন কেটে দিন। আপনার ফোনে সেভ থাকা পরিচিত নম্বরে বা ব্যাংকের আসল নম্বরে নিজে ফোন করুন।',
      },
      tell: {
        name: 'জানান (Tell)',
        desc: 'পরিবারের বিশ্বস্ত কাউকে বলুন। প্রতারকরা গোপন রাখতে বলে—কথা বললেই ফাঁদ ধরা পড়ে।',
      },
    },
    scenariosTitle: 'একটি অনুশীলন পর্ব বেছে নিন',
    scenariosSubtitle: 'প্রতিটি পর্ব ৪–৫ মিনিট সময় নেয় এবং বাস্তব প্রতারণা থেকে বাঁচার সঠিক উপায় শেখায়:',
    startPractice: 'অনুশীলন শুরু করুন',
    whatToDoNext: 'এখন আপনি কী করবেন?',
    goodInstinct: 'চমৎকার সিদ্ধান্ত!',
    scammerLovesReply: 'প্রতারক কেন এই উত্তরের অপেক্ষায় থাকে',
    whatToDoInstead: 'এর পরিবর্তে কী করা উচিত:',
    habitAwarded: 'অর্জিত ভালো অভ্যাস:',
    continueDrill: 'পরের ধাপে যান',
    seeDebrief: 'ফলাফল ও বিশ্লেষণ দেখুন',
    drillCompleted: 'অনুশীলন সম্পন্ন · ফলাফল',
    summaryFor: 'এর অনুশীলনের সারসংক্ষেপ',
    safeOutcomeTitle: 'আপনি নিজেকে সুরক্ষিত রেখেছেন!',
    unsafeOutcomeTitle: 'বাস্তবে হলে প্রতারক সফল হয়ে যেত',
    redFlagsTitle: 'এই প্রতারণার বিপদচিহ্ন (Red Flags)',
    ifRealTitle: 'বাস্তবে এমন কল বা মেসেজ আসলে যা করবেন',
    shareResult: 'পরিবারের সাথে ফলাফল শেয়ার করুন',
    practiceAgain: 'আবার অনুশীলন করুন',
    practiceAnother: 'অন্য পর্ব অনুশীলন করুন',
    linkCopied: '✓ লিঙ্ক কপি করা হয়েছে!',
    messageCopied: '✓ মেসেজ কপি করা হয়েছে!',
    organiseTitle: 'পরিবারের সদস্যকে ৫ মিনিটের ড্রিল পাঠান',
    organiseSubtitle: 'প্রতারণার ধরন নির্বাচন করুন, নাম লিখুন (নাম কোনো সার্ভারে যায় না, শুধু লিঙ্কেই থাকে) এবং মেসেজ কপি করে পাঠিয়ে দিন।',
    selectScenario: '১. একটি অনুশীলনের পর্ব বেছে নিন',
    personalize: '২. নাম যোগ করুন (ঐচ্ছিক)',
    recipientLabel: 'কাকে পাঠাচ্ছেন?',
    senderLabel: 'আপনার নাম',
    previewMessage: '৩. তৈরি করা মেসেজ প্রিভিউ',
    shareWhatsapp: 'হোয়াটসঅ্যাপ / মেসেজে পাঠান',
    copyFullMessage: 'সম্পূর্ণ মেসেজ কপি করুন',
    copyLinkOnly: 'শুধুমাত্র লিঙ্ক কপি করুন',
    previewYourself: 'নিজের ফোনে আগে দেখে নিন →',
    printFridgeCard: 'প্রিন্ট করার নির্দেশিকা কার্ড',
    officialReporting: 'জরুরি হেল্পলাইন নম্বর',
    languageSelect: 'ভাষা (Language)',
    switchLanguage: 'ভাষা পরিবর্তন করুন',
  },
};
