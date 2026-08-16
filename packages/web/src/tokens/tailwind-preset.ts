import { colors, shadows, tailwindScreens, radii, fontFamilies } from '@stellix/ui-tokens';

const stellixPreset = {
  theme: {
    screens: tailwindScreens,
    extend: {
      colors: {
        ink: colors.ink,
        surface: colors.surface,
        line: colors.line,
        accent: colors.accent,
        green: colors.green,
        red: colors.red,
        orange: colors.orange,
        blue: colors.blue,
        purple: colors.purple,
      },
      boxShadow: {
        btn: shadows.btn,
        card: shadows.card,
        raised: shadows.raised,
        hairline: shadows.hairline,
        overlay: shadows.overlay,
        modal: shadows.modal,
      },
      borderRadius: {
        control: radii.control,
      },
      fontFamily: {
        sans: fontFamilies.sans,
        mono: fontFamilies.mono,
      },
      animation: {
        'pixel-on': 'pixel-on 0.4s ease-out forwards',
        'shimmer-text': 'shimmer-text 2s linear infinite',
        'fade-in': 'fade-in 0.25s ease-out forwards',
        'fade-up': 'fade-up 0.3s ease-out forwards',
        'pop-in': 'pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'stream-in': 'stream-in 0.2s ease-out forwards',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        'pixel-on': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'stream-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};

export default stellixPreset;
