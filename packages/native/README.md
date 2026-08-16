# @stellix/ui-native

> 19 React Native components for mobile apps — built with NativeWind and Reanimated.

## What is this?

`@stellix/ui-native` provides all 19 Stellix UI Material components for React Native / Expo apps. Same component API as `@stellix/ui-web`, different rendering — NativeWind for Tailwind-style classes, Reanimated for animations, and native controls for touch.

## Install

```bash
npm install @stellix/ui-native
# or
pnpm add @stellix/ui-native
```

**Peer dependencies:**
```bash
pnpm add react-native-reanimated react-native-gesture-handler react-native-svg nativewind
```

## Setup (Expo)

```json
// app.json
{
  "expo": {
    "plugins": ["nativewind"]
  }
}
```

```ts
// tailwind.config.ts
export default {
  content: ['./app/**/*.{ts,tsx}', 'node_modules/@stellix/ui-native/dist/**/*.{js,mjs}'],
  theme: {
    screens: { sm: '640px', md: '1024px', lg: '1440px' },
  },
};
```

## Usage

```tsx
import {
  LoadingState, Thinking, StreamingText, ApprovalCard,
  ToolChips, TaskRows, Chat, PromptBar, RecommendationCard,
  ContextCards, DiffTable, RecordsTable, FilterTable,
  SidebarNav, Search, InsightCards, CodeBlock,
  FineTuneCard, SelectionActions,
} from '@stellix/ui-native';

export default function Screen() {
  return (
    <ScrollView>
      <LoadingState variant="dots" label="Loading..." />
      <Chat messages={messages} tabs={['Chat']} />
      <TaskRows tasks={tasks} />
    </ScrollView>
  );
}
```

## All 19 Components

Same components as `@stellix/ui-web`, adapted for React Native:

| Category | Components |
|---|---|
| **Feedback** | `LoadingState`, `Thinking`, `TaskRows` |
| **Content** | `StreamingText`, `CodeBlock`, `ContextCards` |
| **Forms** | `ApprovalCard`, `PromptBar`, `SelectionActions` |
| **Tables** | `DiffTable`, `RecordsTable`, `FilterTable` |
| **Navigation** | `Chat`, `Search`, `SidebarNav` |
| **Cards** | `RecommendationCard`, `InsightCards`, `ToolChips`, `FineTuneCard` |

## Responsive Behavior

Components adapt automatically using `useWindowDimensions()`:
- **Mobile** — card layouts, bottom sheets, full-width
- **Tablet** — 2-column grids, side panels, horizontal scroll
- **Web/Big Screen** — full table views, persistent sidebars

## Native Tokens

```tsx
import { nativeColors, darkNativeColors, nativeShadows } from '@stellix/ui-native';

nativeColors.accent;      // '#6366f1'
nativeColors.ink;          // '#1a1a1a'
nativeShadows.card;        // { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }
```

## Animation Presets

```tsx
import { animationPresets } from '@stellix/ui-native';

animationPresets.fadeIn;   // { duration: 250, easing: '...' }
animationPresets.popIn;    // { duration: 250, easing: spring, scale: { from: 0.95, to: 1 } }
animationPresets.stagger;  // { delay: 80 }
```

## Part Of

| Package | Purpose |
|---|---|
| [@stellix/ui-tokens](https://www.npmjs.com/package/@stellix/ui-tokens) | Design tokens |
| [@stellix/ui-core](https://www.npmjs.com/package/@stellix/ui-core) | Headless hooks & types |
| [@stellix/ui-web](https://www.npmjs.com/package/@stellix/ui-web) | Web components (Tailwind + Next.js) |
| **@stellix/ui-native** | React Native components (this package) |

## License

MIT - Stellix Private Ltd
