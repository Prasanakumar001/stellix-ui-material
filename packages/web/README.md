# @stellix/ui-web

> 19 production-ready web components for Next.js — built with Tailwind CSS 4 and Heroicons.

## What is this?

`@stellix/ui-web` is a complete UI component library cloning every component from [beautifului.dev](https://www.beautifului.dev/). Fully responsive across mobile, tablet, web, and big screen. Includes dark mode, accessibility (WCAG 2.1 AA), reduced motion support, and 1,400+ E2E tests.

## Install

```bash
npm install @stellix/ui-web
# or
pnpm add @stellix/ui-web
```

**Peer dependencies:** `react ^18 || ^19`, `react-dom ^18 || ^19`

## Setup (Next.js)

```ts
// next.config.ts
export default {
  transpilePackages: ['@stellix/ui-web', '@stellix/ui-core', '@stellix/ui-tokens'],
};
```

```css
/* app/globals.css */
@import 'tailwindcss';
@source "node_modules/@stellix/ui-web/dist/**/*.mjs";

@theme {
  --color-ink: #1a1a1a;
  --color-ink-2: #6b6b6b;
  --color-ink-3: #9a9a9a;
  --color-surface: #ffffff;
  --color-surface-field: #f5f5f5;
  --color-surface-canvas: #fafafa;
  --color-line: #e5e5e5;
  --color-line-strong: #d1d1d1;
  --color-accent: #6366f1;
  --color-green: #22c55e;
  --color-red: #ef4444;
  --color-orange: #f97316;
  --color-blue: #3b82f6;
  --color-purple: #a855f7;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-raised: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-btn: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-overlay: 0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.12);
  --shadow-hairline: 0 0 0 1px rgba(0,0,0,0.05);
  --breakpoint-sm: 640px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1440px;
}
```

## Usage

```tsx
import {
  LoadingState, Thinking, StreamingText, ApprovalCard,
  ToolChips, TaskRows, Chat, PromptBar, RecommendationCard,
  ContextCards, DiffTable, RecordsTable, FilterTable,
  SidebarNav, Search, InsightCards, CodeBlock,
  FineTuneCard, SelectionActions,
} from '@stellix/ui-web';

export default function Page() {
  return (
    <div>
      <LoadingState variant="orbit" label="Processing..." />
      <CodeBlock code="const x = 1;" language="ts" streaming />
      <Chat messages={messages} tabs={['Chat', 'History']} />
    </div>
  );
}
```

## All 19 Components

| Category | Components |
|---|---|
| **Feedback** | `LoadingState` (3 variants), `Thinking` (trace panel), `TaskRows` (live status) |
| **Content** | `StreamingText` (citations + toolbar), `CodeBlock` (syntax highlighting), `ContextCards` (relevance meter) |
| **Forms** | `ApprovalCard` (human-in-the-loop), `PromptBar` (composer + menus), `SelectionActions` (text toolbar) |
| **Tables** | `DiffTable` (split/unified), `RecordsTable` (sorting + selection), `FilterTable` (chip filters) |
| **Navigation** | `Chat` (tabs + reasoning), `Search` (command palette), `SidebarNav` (drawer + groups) |
| **Cards** | `RecommendationCard` (confidence meter), `InsightCards` (SVG charts), `ToolChips` (status icons), `FineTuneCard` (property inspector) |

## Features

- **Responsive** — 4 breakpoints: mobile, tablet, web, big screen
- **Dark mode** — full token swap via CSS variables
- **Accessible** — WCAG 2.1 AA, ARIA attributes, keyboard navigation, focus-visible
- **Reduced motion** — respects `prefers-reduced-motion`
- **Tree-shakeable** — import only what you need
- **Heroicons** — all icons are SVG (no emojis)
- **TypeScript** — full type safety, exported interfaces

## Responsive Breakpoints

| Breakpoint | Width | Tailwind |
|---|---|---|
| Mobile | < 640px | default |
| Tablet | 640–1023px | `sm:` |
| Web | 1024–1439px | `md:` |
| Big Screen | 1440px+ | `lg:` |

## Part Of

| Package | Purpose |
|---|---|
| [@stellix/ui-tokens](https://www.npmjs.com/package/@stellix/ui-tokens) | Design tokens |
| [@stellix/ui-core](https://www.npmjs.com/package/@stellix/ui-core) | Headless hooks & types |
| **@stellix/ui-web** | Web components (this package) |
| [@stellix/ui-native](https://www.npmjs.com/package/@stellix/ui-native) | React Native components |

## License

MIT - Stellix Private Ltd
