import type { Config } from 'tailwindcss';
import { tailwindScreens } from '@stellix/ui-tokens';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/native/src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: tailwindScreens,
  },
};

export default config;
