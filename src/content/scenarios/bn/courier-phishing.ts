import { Scenario } from '@/lib/engine';

export const courierPhishingScenarioBn: Scenario = {
  id: 'courier-phishing-bn',
  version: 1,
  region: 'bd',
  locale: 'bn-BD',
  title: 'কুরিয়ার পার্সেল ডেলিভারি এসএমএস',
  summary: 'এসএমএস এসে দাবি করছে আপনার একটি পার্সেল ডেলিভারি হাবে আটকে আছে এবং ঠিকানা ঠিক করতে ও ৫০ টাকা ফি দিতে লিঙ্কে ক্লিক করতে বলা হচ্ছে।',
  category: 'delivery-phishing',
  durationMin: 4,
  startNodeId: 'node-1-sms',
  redFlags: [
    {
      id: 'rf-suspicious-sms-link',
      label: 'অপরিচিত ও অদ্ভুত ওয়েব লিঙ্ক',
      explanation: 'লিঙ্কে সুন্দরবন বা পাঠাওয়ের নাম থাকলেও ডোমেইনটি ভুয়া (যেমন: redx-delivery-portal88.xyz)।',
    },
    {
      id: 'rf-small-fee-bait',
      label: '৫০ টাকার মতো ক্ষুদ্র ফি নেওয়ার টোপ',
      explanation: 'অল্প টাকা দাবি করায় মানুষ সহজে ক্লিক করে কার্ড বা বিকাশ পিন দিয়ে বসে।',
    },
    {
      id: 'rf-no-prior-order',
      label: 'অর্ডার না করলেও পার্সেলের দাবি',
      explanation: 'প্রতারকরা আন্দাজে লাখ লাখ নম্বরে মেসেজ পাঠায় যাতে কেউ না কেউ বিভ্রান্ত হয়।',
    },
  ],
  debrief: {
    summary: 'কুরিয়ার সার্ভিস কখনোই এসএমএসে পাঠানো অচেনা লিঙ্কে কার্ডের তথ্য বা পিন দিতে বলে না। সরাসরি অফিশিয়াল অ্যাপ বা হেল্পলাইনে যাচাই করুন।',
    whatToDoIfReal: [
      'এসএমএসে আসা কোনো লিঙ্কে ভুলেও ক্লিক করবেন না।',
      'যদি আপনি সত্যিই কোনো পার্সেলের অপেক্ষায় থাকেন, যে শপ থেকে অর্ডার করেছেন তাদের নিজস্ব অ্যাপ বা সাইটে ট্র্যাকিং নম্বর দিয়ে চেক করুন।',
      'প্রতারণামূলক মেসেজ নম্বরটি ব্লক করে দিন।',
    ],
    reportingKey: 'bd-police',
  },
  lastReviewed: '2026-10-20',
  sources: ['বাংলাদেশ সাইবার পুলিশ হেল্পডেস্ক ২০২৫'],
  nodes: {
    'node-1-sms': {
      id: 'node-1-sms',
      channel: 'sms',
      sender: {
        displayName: 'Courier Express Alert',
        handle: '০১৮৯২-১১৯৮৭৬',
      },
      pressure: 1,
      messages: [
        {
          text: 'পার্সেল সতর্কতা: আপনার #BD8892 পার্সেলটি ঠিকানায় ত্রুটি থাকায় তেজগাঁও হাবে আটকে আছে। আগামী ১২ ঘণ্টার মধ্যে ৫০ টাকা রি-ডেলিভারি ফি পরিশোধ ও ঠিকানা আপডেট করুন: http://courier-hub-update-fee55.com',
          time: '১২:৪৫',
          isIncoming: true,
        },
      ],
      choices: [
        {
          id: 'c1-pause-check-order',
          label: 'থামুন: আপনি বা পরিবারের কেউ সম্প্রতি কোনো পার্সেল অর্ডার করেছেন কিনা যাচাই করুন।',
          next: 'node-2-inspect-link',
          habit: 'pause',
          feedback: 'খুব ভালো সিদ্ধান্ত। প্রথমে ভাবুন আপনার আদৌ কোনো পার্সেল আসার কথা কিনা।',
          whatToDoInstead: 'অযাচিত যেকোনো ডেলিভারি এসএমএস আসলে এক মুহূর্ত ভাবুন।',
        },
        {
          id: 'c1-click-link-fast',
          label: 'দেরি না করে লিঙ্কে ক্লিক করে ৫০ টাকা দিয়ে পার্সেল নিশ্চিত করুন।',
          next: 'node-2-phishing-page',
          feedback: 'লিঙ্কে ক্লিক করলে প্রতারকের তৈরি হুবহু নকল ওয়েবসাইটে নিয়ে যায় যা আপনার গোপন তথ্য চুরি করে।',
          whatToDoInstead: 'অপরিচিত এসএমএস লিঙ্কে ক্লিক করবেন না।',
        },
        {
          id: 'c1-delete-ignore',
          label: 'মেসেজটি ডিলিট করুন এবং কোনো কিছু জানার থাকলে অফিশিয়াল কুরিয়ার নাম্বারে নিজে কল দিন।',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'চমৎকার! ভুয়া মেসেজ এড়িয়ে সরাসরি অফিশিয়াল নাম্বারে যাচাই করাই সেরা উপায়।',
          whatToDoInstead: 'এটিই সবচেয়ে নিরাপদ প্রতিক্রিয়া।',
        },
      ],
    },

    'node-2-inspect-link': {
      id: 'node-2-inspect-link',
      channel: 'sms',
      sender: {
        displayName: 'Courier Express Alert',
      },
      pressure: 2,
      messages: [
        {
          text: 'লিঙ্কটি ভালো করে খেয়াল করুন: "courier-hub-update-fee55.com"। এটি কি কোনো পরিচিত বা অফিশিয়াল কুরিয়ারের আসল ওয়েবসাইট?',
          isIncoming: true,
        },
      ],
      choices: [
        {
          id: 'c2-identify-fake-domain',
          label: '"এটি একটি নকল ওয়েবসাইট। আসল কুরিয়ারের নিজস্ব সুপরিচিত ডোমেইন থাকে।"',
          next: 'END_SAFE',
          habit: 'verify',
          feedback: 'তীক্ষ্ণ নজর! অদ্ভুত নামের ডোমেইন দেখেই প্রতারণা চিনে নেওয়ার দক্ষতা থাকা খুবই জরুরি।',
          whatToDoInstead: 'শুধুমাত্র বিশ্বস্ত ও জানা ওয়েবসাইটেই প্রবেশ করুন।',
        },
        {
          id: 'c2-trust-it',
          label: '"Courier লেখা আছে, তাই বিশ্বাস করে প্রবেশ করা যেতে পারে।" (লিঙ্কে যান)',
          next: 'node-2-phishing-page',
          feedback: 'প্রতারকরা ডোমেইনে কুরিয়ার বা ব্যাংকের নাম জুড়ে দিয়েই মানুষকে ফাঁদে ফেলে।',
          whatToDoInstead: 'নাম থাকলেই সেটি আসল নয়।',
        },
      ],
    },

    'node-2-phishing-page': {
      id: 'node-2-phishing-page',
      channel: 'web',
      sender: {
        displayName: 'নকল ডেলিভারি পোর্টাল',
      },
      pressure: 3,
      messages: [
        {
          text: 'নকল ওয়েবসাইটটি দেখতে আসল ডেলিভারি কোম্পানির মতোই। এটি ৫০ টাকা ফি নেওয়ার নাম করে আপনার বিকাশ নম্বর এবং বিকাশ একাউন্টের গোপন পিন নম্বর চাইছে!',
        },
      ],
      choices: [
        {
          id: 'c3-close-tab',
          label: '"বিকাশের গোপন পিন কখনোই কোনো ওয়েবসাইটে দিতে হয় না!" (ট্যাবটি বন্ধ করে দিন)',
          next: 'END_SAFE',
          habit: 'pause',
          feedback: 'অসাধারণ রক্ষা! পিন না দিয়ে ট্যাব বন্ধ করে আপনি নিজের বিকাশ একাউন্টের সম্পূর্ণ টাকা বাঁচিয়ে নিলেন।',
          whatToDoInstead: 'বিকাশ বা ব্যাংকের পিন কোনো লিঙ্কে প্রবেশ করাবেন না।',
        },
        {
          id: 'c3-enter-pin',
          label: '৫০ টাকা পরিশোধের জন্য বিকাশ নম্বর ও গোপন পিন লিখে সাবমিট করুন।',
          next: 'END_UNSAFE',
          feedback: 'আপনার গোপন পিন প্রতারকের কাছে পৌঁছে গেল এবং মুহূর্তেই একাউন্ট খালি হয়ে যাবে।',
          whatToDoInstead: 'পিন নম্বর একমাত্র আপনার গোপনীয়তা। এটি কোনো পোর্টালে টাইপ করবেন না।',
        },
      ],
    },
  },
};
