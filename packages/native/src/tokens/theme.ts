import { colors, shadows } from '@stellix/ui-tokens';

// React Native StyleSheet-compatible tokens
export const nativeColors = {
  ink: colors.ink.DEFAULT,
  ink2: colors.ink[2],
  ink3: colors.ink[3],
  surface: colors.surface.DEFAULT,
  surfaceField: colors.surface.field,
  surfaceCanvas: colors.surface.canvas,
  line: colors.line.DEFAULT,
  lineStrong: colors.line.strong,
  accent: colors.accent,
  green: colors.green,
  red: colors.red,
  orange: colors.orange,
  blue: colors.blue,
  purple: colors.purple,
} as const;

export const darkNativeColors = {
  ink: colors.dark.ink.DEFAULT,
  ink2: colors.dark.ink[2],
  ink3: colors.dark.ink[3],
  surface: colors.dark.surface.DEFAULT,
  surfaceField: colors.dark.surface.field,
  surfaceCanvas: colors.dark.surface.canvas,
  line: colors.dark.line.DEFAULT,
  lineStrong: colors.dark.line.strong,
  accent: colors.accent,
  green: colors.green,
  red: colors.red,
  orange: colors.orange,
  blue: colors.blue,
  purple: colors.purple,
} as const;

// Parsed shadow values for React Native
export const nativeShadows = {
  btn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  overlay: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
} as const;
