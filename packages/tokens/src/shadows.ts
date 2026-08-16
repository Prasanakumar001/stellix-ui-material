export const shadows = {
  btn: '0 1px 2px rgba(0, 0, 0, 0.05)',
  card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  raised: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  hairline: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  overlay: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
  modal: '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.12)',
  none: 'none',
} as const;

export const darkShadows = {
  btn: '0 1px 2px rgba(0, 0, 0, 0.3)',
  card: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
  raised: '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
  hairline: '0 0 0 1px rgba(255, 255, 255, 0.08)',
  overlay: '0 10px 25px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.4)',
  modal: '0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.5)',
  none: 'none',
} as const;

export type ShadowToken = typeof shadows;
