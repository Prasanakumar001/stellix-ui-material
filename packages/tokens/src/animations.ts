export const durations = {
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
  stream: 30,
  stagger: 80,
} as const;

export const easings = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
