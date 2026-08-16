export const colors = {
  // Primary ink colors
  ink: {
    DEFAULT: '#1a1a1a',
    2: '#6b6b6b',
    3: '#9a9a9a',
  },

  // Surface colors
  surface: {
    DEFAULT: '#ffffff',
    field: '#f5f5f5',
    canvas: '#fafafa',
  },

  // Line/border colors
  line: {
    DEFAULT: '#e5e5e5',
    strong: '#d1d1d1',
  },

  // Semantic accent colors
  accent: '#6366f1',
  green: '#22c55e',
  red: '#ef4444',
  orange: '#f97316',
  blue: '#3b82f6',
  purple: '#a855f7',

  // Dark mode overrides
  dark: {
    ink: {
      DEFAULT: '#f5f5f5',
      2: '#a3a3a3',
      3: '#737373',
    },
    surface: {
      DEFAULT: '#0a0a0a',
      field: '#171717',
      canvas: '#111111',
    },
    line: {
      DEFAULT: '#2e2e2e',
      strong: '#404040',
    },
  },
} as const;

export type ColorToken = typeof colors;
