import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-contrast="high"]'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12263A',
          muted: '#435566',
        },
        paper: '#FFFFFF',
        panel: {
          DEFAULT: '#EAF0F5',
          darker: '#DCE6EF',
        },
        rule: '#C5D0DA',
        'control-edge': '#5F7385',
        'signal-blue': {
          DEFAULT: '#0A4F8A',
          hover: '#083C68',
          light: '#E6EFF7',
        },
        'safe-green': {
          DEFAULT: '#1B6B3A',
          light: '#EBF7EE',
        },
        'warn-amber': {
          DEFAULT: '#F2B705',
          light: '#FFF9E6',
        },
        'stop-red': {
          DEFAULT: '#B3261E',
          light: '#FDF2F2',
        },
        device: {
          bg: '#FFFFFF',
          screen: '#F8FAFC',
          text: '#0F172A',
          'text-muted': '#64748B',
          border: '#CBD5E1',
          'bubble-in': '#E2E8F0',
          'bubble-in-text': '#0F172A',
          'bubble-out': '#0A4F8A',
          'bubble-out-text': '#FFFFFF',
          'call-green': '#15803D',
          'call-red': '#B91C1C',
        },
      },
      borderRadius: {
        control: '6px',
        panel: '12px',
        device: '32px',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [],
};

export default config;
