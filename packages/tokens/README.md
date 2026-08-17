# @stellix/ui-tokens

> Shared design tokens for the Stellix UI Material component library.

**[Live Demo](https://stellix-ui-material-web-alpha.vercel.app/)**

## What is this?

`@stellix/ui-tokens` provides a complete design token system — colors, shadows, spacing, breakpoints, typography, and animation timing constants — used across all Stellix UI packages. Use it to keep your app visually consistent with the Stellix design language.

## Install

```bash
npm install @stellix/ui-tokens
# or
pnpm add @stellix/ui-tokens
```

## Usage

```ts
import { colors, shadows, breakpoints, spacing, fontFamilies, durations, easings } from '@stellix/ui-tokens';

// Colors
console.log(colors.accent);        // '#6366f1'
console.log(colors.ink.DEFAULT);   // '#1a1a1a'
console.log(colors.dark.ink.DEFAULT); // '#f5f5f5'

// Shadows
console.log(shadows.card);        // '0 1px 3px rgba(0,0,0,0.1), ...'

// Breakpoints
console.log(breakpoints.tablet);  // { min: 640, max: 1023, columns: 8 }

// Animation timing
console.log(durations.normal);    // 250
console.log(easings.spring);      // 'cubic-bezier(0.34, 1.56, 0.64, 1)'
```

## Available Tokens

| Token | Description |
|---|---|
| `colors` | Ink, surface, line, accent, green, red, orange, blue, purple + dark mode variants |
| `shadows` | btn, card, raised, hairline, overlay, modal + dark variants |
| `spacing` | 0–32 spacing scale (0px–128px) |
| `radii` | none, sm, md, lg, xl, 2xl, 3xl, full, control |
| `breakpoints` | mobile (<640), tablet (640–1023), web (1024–1439), bigScreen (1440+) |
| `tailwindScreens` | sm: 640px, md: 1024px, lg: 1440px |
| `fontSizes` | xs through 4xl with line heights |
| `fontWeights` | normal, medium, semibold, bold |
| `fontFamilies` | sans (Inter), mono (JetBrains Mono) |
| `durations` | fast (150ms), normal (250ms), slow (400ms), stream (30ms), stagger (80ms) |
| `easings` | default, easeIn, easeOut, easeInOut, spring, bounce |

## Designed For

- Building custom components matching the Stellix design system
- Configuring Tailwind CSS themes
- React Native StyleSheet values
- Any project needing a consistent token set

## Part Of

This package is part of the Stellix UI Material component library:

| Package | Purpose |
|---|---|
| **@stellix/ui-tokens** | Design tokens (this package) |
| [@stellix/ui-core](https://www.npmjs.com/package/@stellix/ui-core) | Headless hooks & types |
| [@stellix/ui-web](https://www.npmjs.com/package/@stellix/ui-web) | Web components (Tailwind + Next.js) |
| [@stellix/ui-native](https://www.npmjs.com/package/@stellix/ui-native) | React Native components (NativeWind) |

## License

MIT - Stellix Private Ltd
