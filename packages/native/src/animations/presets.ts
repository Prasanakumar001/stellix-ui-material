import { durations, easings } from '@stellix/ui-tokens';

// Reanimated-compatible animation config presets
export const animationPresets = {
  fadeIn: {
    duration: durations.normal,
    easing: easings.easeOut,
  },
  fadeUp: {
    duration: durations.slow,
    easing: easings.easeOut,
    translateY: 8,
  },
  popIn: {
    duration: durations.normal,
    easing: easings.spring,
    scale: { from: 0.95, to: 1 },
  },
  streamIn: {
    duration: durations.fast,
    easing: easings.easeOut,
    translateY: 4,
  },
  stagger: {
    delay: durations.stagger,
  },
  spin: {
    duration: 1000,
    loop: true,
  },
} as const;

export type AnimationPreset = keyof typeof animationPresets;
