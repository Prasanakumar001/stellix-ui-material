import type { Config } from 'tailwindcss';
import stellixPreset from '@stellix/ui-web/src/tokens/tailwind-preset';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/web/src/**/*.{ts,tsx}',
  ],
  presets: [stellixPreset as unknown as Partial<Config>],
  darkMode: ['class', '[data-theme="dark"]'],
};

export default config;
