export type Locale = 'en' | 'bn';

export interface SupportedLanguage {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', flag: '🇺🇸' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা (বাংলাদেশ)', flag: '🇧🇩' },
];

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
  redFlagsPlacedDesc: string;
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
  skipToContent: string;
  closeSettings: string;
  openSettingsAria: string;
  availableChoices: string;
  sizeLarge: string;
  sizeXL: string;
  contrastShort: string;
  drillOtherLanguage: string;
  openInYourLanguage: string;
  // Additional UI components translations
  heroBadge: string;
  heroDescription: string;
  inMessageLabel: string;
  scenariosRegionLabel: string;
  sendToElderlyTitle: string;
  sendToElderlyDesc: string;
  stepText: string;
  ofText: string;
  voiceListen: string;
  voiceStop: string;
  urgencyPressure: string;
  pressureCalm: string;
  pressureRising: string;
  pressureHigh: string;
  pressurePeak: string;
  deviceAnswer: string;
  deviceDecline: string;
  deviceInCall: string;
  deviceLiveTranscript: string;
  deviceSimulatedScreen: string;
  habitShown: string;
  habitNotYet: string;
  safeBadge: string;
  unsafeBadge: string;
  practicingFor: string;
  sentThis: string;
  footerAbout: string;
  footerReporting: string;
  footerFridgeCard: string;
  footerStyleguide: string;
  footerPrivacy: string;
  footerAccessibility: string;
  footerDisclaimer: string;
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
    redFlagsPlacedDesc: 'Every red flag here was placed by the caller to bypass caution:',
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
    skipToContent: 'Skip to main content',
    closeSettings: 'Close settings',
    openSettingsAria: 'Open display, language and sound settings',
    availableChoices: 'Available choices',
    sizeLarge: 'Large',
    sizeXL: 'XL',
    contrastShort: 'High contrast',
    drillOtherLanguage: 'This drill is in Bangla. A matching drill exists in English.',
    openInYourLanguage: 'Open the English version →',
    heroBadge: 'Family Rehearsal · Zero Sign-up',
    heroDescription: 'A five-minute rehearsal for the calls and texts that target families. No install, no account, and nothing is recorded.',
    inMessageLabel: 'In a message:',
    scenariosRegionLabel: '🇺🇸 US & International Scenarios',
    sendToElderlyTitle: 'Want to send a drill to a parent or relative?',
    sendToElderlyDesc: 'Create a personalized link in under 60 seconds with a pre-written message for WhatsApp or SMS.',
    stepText: 'Step',
    ofText: 'of',
    voiceListen: 'Listen to caller voice',
    voiceStop: 'Stop voice',
    urgencyPressure: 'Urgency pressure:',
    pressureCalm: 'Calm',
    pressureRising: 'Rising',
    pressureHigh: 'High',
    pressurePeak: 'Peak urgency',
    deviceAnswer: 'Answer',
    deviceDecline: 'Decline',
    deviceInCall: 'In call',
    deviceLiveTranscript: 'Live transcript:',
    deviceSimulatedScreen: 'Simulated screen. Remember, nothing here is real.',
    habitShown: 'Shown',
    habitNotYet: 'Not yet',
    safeBadge: 'Safe outcome',
    unsafeBadge: 'Unsafe outcome',
    practicingFor: 'Practicing for:',
    sentThis: 'sent this',
    footerAbout: 'About Known Number',
    footerReporting: 'Official Reporting Numbers',
    footerFridgeCard: 'Printable Fridge Card',
    footerStyleguide: 'Design Styleguide',
    footerPrivacy: 'Privacy & Non-collection',
    footerAccessibility: 'Accessibility Statement',
    footerDisclaimer: 'Known Number is a free, open-source educational drill. It does not collect personal data, does not use cookies, and does not replace legal or financial advice.',
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
    goodInstinct: 'চমৎকার ও নিরাপদ সিদ্ধান্ত!',
    scammerLovesReply: 'প্রতারক কেন এই উত্তরের অপেক্ষায় থাকে',
    whatToDoInstead: 'এর পরিবর্তে কী করা উচিত:',
    habitAwarded: 'অর্জিত ভালো অভ্যাস:',
    continueDrill: 'পরের ধাপে যান',
    seeDebrief: 'ফলাফল ও বিশ্লেষণ দেখুন',
    drillCompleted: 'অনুশীলন সম্পন্ন · ফলাফল',
    summaryFor: '-এর অনুশীলনের সারসংক্ষেপ',
    safeOutcomeTitle: 'আপনি নিজেকে সুরক্ষিত রেখেছেন!',
    unsafeOutcomeTitle: 'বাস্তবে হলে প্রতারক সফল হয়ে যেত',
    redFlagsTitle: 'এই প্রতারণার বিপদচিহ্ন (Red Flags)',
    redFlagsPlacedDesc: 'প্রতারক আপনাকে স্বাভাবিকভাবে চিন্তা করতে না দেওয়ার জন্য এই কৌশলগুলো ব্যবহার করে:',
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
    skipToContent: 'মূল বিষয়বস্তুতে যান',
    closeSettings: 'সেটিংস বন্ধ করুন',
    openSettingsAria: 'ডিসপ্লে, ভাষা ও সাউন্ড সেটিংস খুলুন',
    availableChoices: 'আপনার সম্ভাব্য পদক্ষেপ',
    sizeLarge: 'বড়',
    sizeXL: 'অনেক বড়',
    contrastShort: 'হাই কনট্রাস্ট',
    drillOtherLanguage: 'এই অনুশীলনটি ইংরেজিতে। আপনার ভাষায় একই ধরনের অনুশীলন আছে।',
    openInYourLanguage: 'বাংলা সংস্করণ খুলুন →',
    heroBadge: 'পারিবারিক মহড়া · সম্পূর্ণ বিনামূল্যে',
    heroDescription: 'পরিবারের জন্য ফোন কল ও মেসেজ প্রতারণার ৫ মিনিটের বাস্তব মহড়া। কোনো অ্যাপ ইনস্টল বা একাউন্ট খোলা লাগবে না, কোনো তথ্য কোথাও জমা রাখা হয় না।',
    inMessageLabel: 'পরিবারের বার্তায়:',
    scenariosRegionLabel: '🇧🇩 বাংলাদেশ উপযোগী পর্বসমূহ',
    sendToElderlyTitle: 'পরিবারের প্রিয়জনকে অনুশীলন পাঠাতে চান?',
    sendToElderlyDesc: 'হোয়াটসঅ্যাপ বা মেসেজে পাঠানোর উপযোগী তৈরি মেসেজ ও লিঙ্ক ১ মিনিটে কপি করে নিন।',
    stepText: 'ধাপ',
    ofText: '/',
    voiceListen: 'কথাটি শুনুন (Listen)',
    voiceStop: 'থামুন (Stop)',
    urgencyPressure: 'চাপ ও তাড়াহুড়োর মাত্রা:',
    pressureCalm: 'স্বাভাবিক',
    pressureRising: 'চাপ বাড়ছে',
    pressureHigh: 'তীব্র চাপ',
    pressurePeak: 'চরম আতঙ্ক ও ভয়',
    deviceAnswer: 'ধরুন (Answer)',
    deviceDecline: 'কেটে দিন (Decline)',
    deviceInCall: 'কথা চলছে',
    deviceLiveTranscript: 'সরাসরি কথোপকথন:',
    deviceSimulatedScreen: 'নকল স্ক্রিন। মনে রাখবেন, এখানে কিছুই বাস্তব নয়।',
    habitShown: 'প্রদর্শিত',
    habitNotYet: 'প্রদর্শিত হয়নি',
    safeBadge: 'নিরাপদ ফলাফল',
    unsafeBadge: 'অনিরাপদ ফলাফল',
    practicingFor: 'অনুশীলন করছেন:',
    sentThis: 'পাঠিয়েছেন',
    footerAbout: 'Known Number সম্পর্কে',
    footerReporting: 'জরুরি ও অফিশিয়াল অভিযোগ নম্বর',
    footerFridgeCard: 'ফ্রিজে লাগানোর গাইড কার্ড',
    footerStyleguide: 'ডিজাইন নির্দেশিকা',
    footerPrivacy: 'গোপনীয়তা ও ডেটা সংগ্রহহীনতা',
    footerAccessibility: 'অ্যাক্সেসিবিলিটি বিবরণ',
    footerDisclaimer: 'Known Number একটি সম্পূর্ণ বিনামূল্যের শিক্ষামূলক মহড়া। এটি কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না, কোনো কুকিজ ব্যবহার করে না এবং কোনো আইনি পরামর্শের বিকল্প নয়।',
  },
};
