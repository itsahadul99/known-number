export type Locale = 'en' | 'bn' | 'hi' | 'es' | 'ar';

export interface SupportedLanguage {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', flag: '🇺🇸' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা (বাংলাদেশ)', flag: '🇧🇩' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
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
  translatingScenario: string;
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
    translatingScenario: 'Translating scenario into your language...',
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
    translatingScenario: 'আপনার ভাষায় পর্বটি অনুবাদ করা হচ্ছে...',
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
  hi: {
    appName: 'Known Number',
    tagline: 'कॉल आने से पहले अभ्यास करें।',
    familyMessageHint: 'मम्मी, Known Number आज़माएं। सिर्फ 5 मिनट लगेंगे।',
    practiceBanner: 'अभ्यास सत्र। यहाँ कुछ भी असली नहीं है।',
    stopPractice: 'अभ्यास बंद करें',
    settings: 'सेटिंग्स',
    sendFamilyDrill: 'परिवार को अभ्यास भेजें',
    threeHabitsTitle: 'परिवार को ठगी से बचाने की 3 आदतें',
    threeHabitsSubtitle: 'धोखेबाज़ घबराहट पैदा करके पैसे ऐंठते हैं। ये 3 कदम आपको सुरक्षित रखेंगे:',
    habits: {
      pause: {
        name: 'रुकें (Pause)',
        desc: 'जल्दबाज़ी न करें। हड़बड़ी पैदा करना ही धोखेबाज़ों का सबसे बड़ा हथियार है।',
      },
      verify: {
        name: 'जांचें (Verify)',
        desc: 'तुरंत फोन काटें। अपने फोन में पहले से सुरक्षित ज्ञात नंबर पर दोबारा कॉल करें।',
      },
      tell: {
        name: 'बताएं (Tell)',
        desc: 'परिवार के किसी भरोसेमंद सदस्य को बताएं। बात करने से फ्रॉड तुरंत पकड़ा जाता है।',
      },
    },
    scenariosTitle: 'अभ्यास का विषय चुनें',
    scenariosSubtitle: 'प्रत्येक अभ्यास में 4-5 मिनट लगते हैं और सुरक्षित आदतें सिखाते हैं:',
    startPractice: 'अभ्यास शुरू करें',
    whatToDoNext: 'अब आप क्या करेंगे?',
    goodInstinct: 'बहुत बढ़िया निर्णय!',
    scammerLovesReply: 'स्कैमर इस जवाब का इंतज़ार क्यों करते हैं',
    whatToDoInstead: 'इसके बजाय क्या करना चाहिए:',
    habitAwarded: 'प्रदर्शित आदत:',
    continueDrill: 'आगे बढ़ें',
    seeDebrief: 'परिणाम और समीक्षा देखें',
    drillCompleted: 'अभ्यास पूरा · समीक्षा',
    summaryFor: 'का अभ्यास सारांश',
    safeOutcomeTitle: 'आपने खुद को सुरक्षित रखा!',
    unsafeOutcomeTitle: 'असली परिस्थिति में स्कैमर सफल हो जाता',
    redFlagsTitle: 'इस कॉल के खतरे के संकेत (Red Flags)',
    redFlagsPlacedDesc: 'स्कैमर ने आपकी सावधानी को दरकिनार करने के लिए ये जाल बिछाए थे:',
    ifRealTitle: 'अगर वास्तव में ऐसा हो तो क्या करें',
    shareResult: 'परिवार के साथ परिणाम साझा करें',
    practiceAgain: 'दोबारा अभ्यास करें',
    practiceAnother: 'दूसरा अभ्यास करें',
    linkCopied: '✓ लिंक कॉपी हो गया!',
    messageCopied: '✓ संदेश कॉपी हो गया!',
    organiseTitle: 'परिवार को 5 मिनट का अभ्यास भेजें',
    organiseSubtitle: 'परिदृश्य चुनें, नाम जोड़ें (नाम किसी सर्वर पर नहीं जाते) और संदेश भेजें।',
    selectScenario: '1. अभ्यास परिदृश्य चुनें',
    personalize: '2. नाम जोड़ें (वैकल्पिक)',
    recipientLabel: 'किसे भेज रहे हैं?',
    senderLabel: 'आपका नाम',
    previewMessage: '3. तैयार संदेश का पूर्वावलोकन',
    shareWhatsapp: 'व्हाट्सएप / मैसेज पर साझा करें',
    copyFullMessage: 'पूरा संदेश कॉपी करें',
    copyLinkOnly: 'केवल लिंक कॉपी करें',
    previewYourself: 'पहले अपने फ़ोन पर देखें →',
    printFridgeCard: 'फ्रिज कार्ड प्रिंट करें',
    officialReporting: 'आधिकारिक हेल्पलाइन नंबर',
    languageSelect: 'भाषा (Language)',
    switchLanguage: 'भाषा बदलें',
    translatingScenario: 'आपकी भाषा में अनुवाद किया जा रहा है...',
    heroBadge: 'पारिवारिक अभ्यास · पूर्णतः निःशुल्क',
    heroDescription: 'परिवारों को निशाना बनाने वाले कॉल और मैसेज से बचने का 5 मिनट का पूर्वाभ्यास। कोई ऐप इंस्टॉल नहीं, कोई अकाउंट नहीं।',
    inMessageLabel: 'संदेश में:',
    scenariosRegionLabel: '🇮🇳 अभ्यास परिदृश्य',
    sendToElderlyTitle: 'क्या आप माता-पिता या रिश्तेदारों को अभ्यास भेजना चाहते हैं?',
    sendToElderlyDesc: 'व्हाट्सएप या एसएमएस के लिए 60 सेकंड में तैयार लिंक और संदेश बनाएं।',
    stepText: 'चरण',
    ofText: '/',
    voiceListen: 'आवाज़ सुनें (Listen)',
    voiceStop: 'रोकें (Stop)',
    urgencyPressure: 'दबाव का स्तर:',
    pressureCalm: 'शांत',
    pressureRising: 'बढ़ रहा है',
    pressureHigh: 'गंभीर दबाव',
    pressurePeak: 'अत्यधिक घबराहट',
    deviceAnswer: 'उत्तर दें',
    deviceDecline: 'काटें',
    deviceInCall: 'कॉल जारी है',
    deviceLiveTranscript: 'संवाद:',
    deviceSimulatedScreen: 'नकली स्क्रीन। याद रखें, यहाँ कुछ भी वास्तविक नहीं है।',
    habitShown: 'प्रदर्शित',
    habitNotYet: 'अभी नहीं',
    safeBadge: 'सुरक्षित निर्णय',
    unsafeBadge: 'असुरक्षित निर्णय',
    practicingFor: 'अभ्यास कर रहे हैं:',
    sentThis: 'ने भेजा है',
    footerAbout: 'Known Number के बारे में',
    footerReporting: 'आधिकारिक शिकायत नंबर',
    footerFridgeCard: 'फ्रिज कार्ड',
    footerStyleguide: 'डिज़ाइन स्टाइलगाइड',
    footerPrivacy: 'गोपनीयता नीति',
    footerAccessibility: 'सुलभता विवरण',
    footerDisclaimer: 'Known Number एक निःशुल्क शैक्षिक उपकरण है। यह कोई व्यक्तिगत डेटा एकत्र नहीं करता है।',
  },
  es: {
    appName: 'Known Number',
    tagline: 'Practica la llamada antes de que llegue.',
    familyMessageHint: 'Mamá, prueba Known Number. Solo toma cinco minutos.',
    practiceBanner: 'Práctica. Nada de lo que ves aquí es real.',
    stopPractice: 'Detener práctica',
    settings: 'Ajustes',
    sendFamilyDrill: 'Enviar simulacro a tu familia',
    threeHabitsTitle: 'Tres hábitos para proteger a tu familia',
    threeHabitsSubtitle: 'Los estafadores generan pánico artificial. Estos tres pasos te devuelven el control:',
    habits: {
      pause: {
        name: 'Pausa',
        desc: 'Respira antes de reaccionar. La prisa es el arma principal del estafador.',
      },
      verify: {
        name: 'Verifica',
        desc: 'Cuelga de inmediato. Devuelve la llamada a un número conocido guardado en tus contactos.',
      },
      tell: {
        name: 'Avisa',
        desc: 'Habla con alguien de confianza. El secretismo solo protege a los estafadores.',
      },
    },
    scenariosTitle: 'Elige un simulacro de práctica',
    scenariosSubtitle: 'Cada simulacro toma 4-5 minutos y enseña respuestas seguras:',
    startPractice: 'Iniciar práctica',
    whatToDoNext: '¿Qué haces ahora?',
    goodInstinct: '¡Excelente decisión!',
    scammerLovesReply: 'Por qué a un estafador le gusta esta respuesta',
    whatToDoInstead: 'Qué deberías hacer en su lugar:',
    habitAwarded: 'Hábito demostrado:',
    continueDrill: 'Continuar simulacro',
    seeDebrief: 'Ver el informe final',
    drillCompleted: 'Simulacro completado · Informe',
    summaryFor: 'resumen del simulacro de',
    safeOutcomeTitle: '¡Te protegiste y tomaste el control!',
    unsafeOutcomeTitle: 'En la vida real, el estafador habría ganado',
    redFlagsTitle: 'Señales de alerta (Red Flags)',
    redFlagsPlacedDesc: 'Cada señal de alerta fue puesta por el estafador para anular tu cautela:',
    ifRealTitle: 'Si esto ocurre en la realidad',
    shareResult: 'Compartir resultado con la familia',
    practiceAgain: 'Practicar de nuevo',
    practiceAnother: 'Practicar otro caso',
    linkCopied: '✓ ¡Enlace copiado!',
    messageCopied: '✓ ¡Mensaje copiado!',
    organiseTitle: 'Envía un simulacro de 5 minutos',
    organiseSubtitle: 'Elige una situación, añade nombres (no se guardan en ningún servidor) y envía el mensaje.',
    selectScenario: '1. Selecciona un escenario',
    personalize: '2. Personalizar (Opcional)',
    recipientLabel: '¿A quién se lo envías?',
    senderLabel: 'Tu nombre',
    previewMessage: '3. Vista previa del mensaje',
    shareWhatsapp: 'Compartir por WhatsApp / Mensajes',
    copyFullMessage: 'Copiar mensaje completo',
    copyLinkOnly: 'Copiar solo enlace',
    previewYourself: 'Pruébalo tú mismo primero →',
    printFridgeCard: 'Tarjeta para la nevera',
    officialReporting: 'Números oficiales de denuncia',
    languageSelect: 'Idioma / Language',
    switchLanguage: 'Cambiar idioma',
    translatingScenario: 'Traduciendo a tu idioma...',
    heroBadge: 'Ensayo familiar · Sin registro',
    heroDescription: 'Un ensayo de cinco minutos contra llamadas fraudulentas. Sin instalaciones ni registros.',
    inMessageLabel: 'En un mensaje:',
    scenariosRegionLabel: 'Casos disponibles',
    sendToElderlyTitle: '¿Quieres enviar un simulacro a un familiar?',
    sendToElderlyDesc: 'Crea un enlace con un mensaje listo para WhatsApp o SMS en menos de un minuto.',
    stepText: 'Paso',
    ofText: 'de',
    voiceListen: 'Escuchar voz (Listen)',
    voiceStop: 'Detener voz',
    urgencyPressure: 'Nivel de presión:',
    pressureCalm: 'Calma',
    pressureRising: 'Aumentando',
    pressureHigh: 'Presión alta',
    pressurePeak: 'Pánico extremo',
    deviceAnswer: 'Responder',
    deviceDecline: 'Colgar',
    deviceInCall: 'En llamada',
    deviceLiveTranscript: 'Transcripción en vivo:',
    deviceSimulatedScreen: 'Pantalla simulada. Recuerda, nada aquí es real.',
    habitShown: 'Demostrado',
    habitNotYet: 'Aún no',
    safeBadge: 'Resultado seguro',
    unsafeBadge: 'Resultado inseguro',
    practicingFor: 'Practicando para:',
    sentThis: 'envió esto',
    footerAbout: 'Acerca de Known Number',
    footerReporting: 'Teléfonos de denuncia oficial',
    footerFridgeCard: 'Tarjeta para la nevera',
    footerStyleguide: 'Guía de estilo',
    footerPrivacy: 'Privacidad',
    footerAccessibility: 'Accesibilidad',
    footerDisclaimer: 'Known Number es un simulacro educativo y gratuito. No recopila datos personales.',
  },
  ar: {
    appName: 'Known Number',
    tagline: 'تدرّب على المكالمة قبل أن تأتيك.',
    familyMessageHint: 'أمي، جرّبي Known Number. يستغرق خمس دقائق فقط.',
    practiceBanner: 'تدريب. لا شيء هنا حقيقي.',
    stopPractice: 'إيقاف التدريب',
    settings: 'الإعدادات',
    sendFamilyDrill: 'إرسال تدريب للعائلة',
    threeHabitsTitle: 'ثلاث عادات لحماية عائلتك من الاحتيال',
    threeHabitsSubtitle: 'يعتمد المحتالون على عنصر المفاجأة وإثارة الذعر. هذه الخطوات الثلاث تبقيك مسيطراً:',
    habits: {
      pause: {
        name: 'توقف (Pause)',
        desc: 'خذ نفساً عميقاً قبل الرد. خلق حالة الطوارئ هو السلاح الأكبر للمحتال.',
      },
      verify: {
        name: 'تحقق (Verify)',
        desc: 'أغلق الخط فوراً. عاود الاتصال على رقم معروف ومحفوظ في هاتفك.',
      },
      tell: {
        name: 'أخبر (Tell)',
        desc: 'أخبر شخصاً تثق به من عائلتك. المحتال يطلب الكتمان، والحديث يكشفه.',
      },
    },
    scenariosTitle: 'اختر سيناريو التدريب',
    scenariosSubtitle: 'يستغرق كل سيناريو 4-5 دقائق ويعلمك ردود الفعل الآمنة:',
    startPractice: 'ابدأ التدريب',
    whatToDoNext: 'ماذا ستفعل الآن؟',
    goodInstinct: 'تصرف سليم ورائع!',
    scammerLovesReply: 'لماذا يسعد المحتال بهذه الإجابة',
    whatToDoInstead: 'ما الذي يجب عليك فعله بدلاً من ذلك:',
    habitAwarded: 'العادة المكتسبة:',
    continueDrill: 'متابعة التدريب',
    seeDebrief: 'عرض التقييم النهائي',
    drillCompleted: 'اكتمل التدريب · التقييم',
    summaryFor: 'ملخص تدريب',
    safeOutcomeTitle: 'لقد حميت نفسك وسيطرت على الموقف!',
    unsafeOutcomeTitle: 'في الواقع، كان المحتال سينجح',
    redFlagsTitle: 'علامات الخطر في هذه المكالمة',
    redFlagsPlacedDesc: 'كل علامة خطر هنا وضعها المحتال لتجاوز حذرك:',
    ifRealTitle: 'إذا حدث هذا في الواقع',
    shareResult: 'مشاركة النتيجة مع العائلة',
    practiceAgain: 'تدرب مرة أخرى',
    practiceAnother: 'تدرب على سيناريو آخر',
    linkCopied: '✓ تم نسخ الرابط!',
    messageCopied: '✓ تم نسخ الرسالة!',
    organiseTitle: 'أرسل تدريباً لمدة 5 دقائق لعائلتك',
    organiseSubtitle: 'اختر سيناريو، أضف الأسماء (لا تُرسل لأي خادم) وأرسل الرسالة الجاهزة.',
    selectScenario: '1. اختر سيناريو التدريب',
    personalize: '2. تخصيص (اختياري)',
    recipientLabel: 'إلى من ترسل التدريب؟',
    senderLabel: 'اسمك',
    previewMessage: '3. معاينة الرسالة الجاهزة',
    shareWhatsapp: 'مشاركة عبر واتساب / الرسائل',
    copyFullMessage: 'نسخ الرسالة كاملة',
    copyLinkOnly: 'نسخ الرابط فقط',
    previewYourself: 'جرّب التدريب بنفسك أولاً →',
    printFridgeCard: 'بطاقة الثلاجة للطباعة',
    officialReporting: 'أرقام البلاغات الرسمية',
    languageSelect: 'اللغة (Language)',
    switchLanguage: 'تغيير اللغة',
    translatingScenario: 'جاري ترجمة السيناريو إلى لغتك...',
    heroBadge: 'تدريب عائلي · بدون تسجيل',
    heroDescription: 'تدريب واقعي لمدة 5 دقائق على مكالمات ورسائل الاحتيال التي تستهدف العائلات. بدون تثبيت أي تطبيق.',
    inMessageLabel: 'في رسالة:',
    scenariosRegionLabel: 'السيناريوهات المتاحة',
    sendToElderlyTitle: 'هل تريد إرسال تدريب لأحد والديك أو أقاربك؟',
    sendToElderlyDesc: 'أنشئ رابطاً مخصصاً في أقل من دقيقة مع رسالة جاهزة للإرسال عبر واتساب.',
    stepText: 'الخطوة',
    ofText: 'من',
    voiceListen: 'الاستماع للمتصل (Listen)',
    voiceStop: 'إيقاف الصوت',
    urgencyPressure: 'مستوى الضغط:',
    pressureCalm: 'هادئ',
    pressureRising: 'متصاعد',
    pressureHigh: 'ضغط عالي',
    pressurePeak: 'ذعر شديد',
    deviceAnswer: 'رد',
    deviceDecline: 'رفض',
    deviceInCall: 'المكالمة جارية',
    deviceLiveTranscript: 'النص المباشر:',
    deviceSimulatedScreen: 'شاشة محاكاة. تذكر، لا شيء هنا حقيقي.',
    habitShown: 'تم إظهاره',
    habitNotYet: 'ليس بعد',
    safeBadge: 'نتيجة آمنة',
    unsafeBadge: 'نتيجة غير آمنة',
    practicingFor: 'تتدرب من أجل:',
    sentThis: 'أرسل هذا',
    footerAbout: 'عن Known Number',
    footerReporting: 'أرقام البلاغات الرسمية',
    footerFridgeCard: 'بطاقة الثلاجة',
    footerStyleguide: 'دليل التصميم',
    footerPrivacy: 'الخصوصية وعدم جمع البيانات',
    footerAccessibility: 'إمكانية الوصول',
    footerDisclaimer: 'Known Number هو تمرين تعليمي مجاني ومفتوح المصدر. لا يجمع بيانات شخصية.',
  },
};
