export const breakpoints = {
  mobile: { min: 0, max: 639, columns: 4 },
  tablet: { min: 640, max: 1023, columns: 8 },
  web: { min: 1024, max: 1439, columns: 12 },
  bigScreen: { min: 1440, max: Infinity, columns: 16 },
} as const;

export const tailwindScreens = {
  sm: '640px',
  md: '1024px',
  lg: '1440px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type TailwindScreen = keyof typeof tailwindScreens;
