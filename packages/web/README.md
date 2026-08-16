# @stellix/ui-web

> 19 production-ready UI components for Next.js — Tailwind CSS 4, Heroicons, fully responsive, dark mode, accessible.

**[Live Demo](https://stellix-ui-material.vercel.app/)**

---

## Why @stellix/ui-web?

- **19 components** — built by Stellix Private Ltd, production-ready components with modern design
- **4 breakpoints** — mobile, tablet, web, big screen — every component adapts
- **Dark mode** — full token swap via CSS variables, one-click toggle
- **Accessible** — WCAG 2.1 AA, ARIA attributes, keyboard navigation, focus-visible, skip-to-content
- **Tree-shakeable** — import only what you need, unused components excluded from bundle
- **TypeScript** — full type safety with exported interfaces for all props
- **SVG icons** — Heroicons v2, no emojis
- **1,400+ tests** — E2E (Playwright) across 4 viewports + unit tests (Vitest)

---

## Install

```bash
npm install @stellix/ui-web
# or
pnpm add @stellix/ui-web
```

**Peer dependencies:** `react ^18 || ^19`, `react-dom ^18 || ^19`

---

## Quick Start (Next.js)

### 1. Configure Next.js

```ts
// next.config.ts
export default {
  transpilePackages: ['@stellix/ui-web', '@stellix/ui-core', '@stellix/ui-tokens'],
};
```

### 2. Add Tailwind CSS theme

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

### 3. Use components

```tsx
import { LoadingState, Chat, CodeBlock, StreamingText } from '@stellix/ui-web';

export default function Page() {
  return (
    <div>
      <LoadingState variant="orbit" label="Processing..." />
      <CodeBlock code="console.log('hello')" language="ts" streaming />
    </div>
  );
}
```

---

## Component Catalog

> **[See all components live →](https://stellix-ui-material.vercel.app/)**

### Feedback Components
| Component | Description | Demo |
|---|---|---|
| `LoadingState` | Pixel-grid loader with 3 variants (Drive, Dots, Orbit) + shimmer + timer | [View](https://stellix-ui-material.vercel.app/components/loading-state) |
| `Thinking` | Expandable trace panel with step types, progress bar, active indicators | [View](https://stellix-ui-material.vercel.app/components/thinking) |
| `TaskRows` | Live task status list with progress bars, status badges, expand details | [View](https://stellix-ui-material.vercel.app/components/task-rows) |

### Content Components
| Component | Description | Demo |
|---|---|---|
| `StreamingText` | Word-by-word streaming with citations, action toolbar, follow-ups | [View](https://stellix-ui-material.vercel.app/components/streaming-text) |
| `CodeBlock` | Syntax-highlighted code with streaming, copy button, line numbers | [View](https://stellix-ui-material.vercel.app/components/code-block) |
| `ContextCards` | Knowledge chunks with relevance meter, source icons, show more/less | [View](https://stellix-ui-material.vercel.app/components/context-cards) |

### Form Components
| Component | Description | Demo |
|---|---|---|
| `ApprovalCard` | Human-in-the-loop with radio/checkbox options, risk badge, custom input | [View](https://stellix-ui-material.vercel.app/components/approval-card) |
| `PromptBar` | Composer with @sources, /commands, model picker, dictation, char count | [View](https://stellix-ui-material.vercel.app/components/prompt-bar) |
| `SelectionActions` | Text highlight toolbar — Rewrite, Summarize, Explain, Translate | [View](https://stellix-ui-material.vercel.app/components/selection-actions) |

### Table Components
| Component | Description | Demo |
|---|---|---|
| `DiffTable` | Code diff viewer with unified/split toggle, accept/reject per hunk | [View](https://stellix-ui-material.vercel.app/components/diff-table) |
| `RecordsTable` | CRM grid with column sorting, row selection, card view on mobile | [View](https://stellix-ui-material.vercel.app/components/records-table) |
| `FilterTable` | Dynamic filter chips with count badges, clear all, live result count | [View](https://stellix-ui-material.vercel.app/components/filter-table) |

### Navigation Components
| Component | Description | Demo |
|---|---|---|
| `Chat` | Tabbed chat with avatars, reasoning toggle, composer | [View](https://stellix-ui-material.vercel.app/components/chat) |
| `Search` | Command palette (Cmd+K) with keyboard nav, categories, recent searches | [View](https://stellix-ui-material.vercel.app/components/search) |
| `SidebarNav` | Collapsible nav groups, quick search, mobile hamburger drawer | [View](https://stellix-ui-material.vercel.app/components/sidebar-nav) |

### Card & Control Components
| Component | Description | Demo |
|---|---|---|
| `RecommendationCard` | Agent suggestion with confidence meter, alternatives, Accept/Modify/Reject | [View](https://stellix-ui-material.vercel.app/components/recommendation-card) |
| `InsightCards` | SVG charts (line/bar/area) with trend badges, responsive grid | [View](https://stellix-ui-material.vercel.app/components/insight-cards) |
| `ToolChips` | Tool call display with status icons, expandable diff counts | [View](https://stellix-ui-material.vercel.app/components/tool-chips) |
| `FineTuneCard` | Property inspector with slider, toggle, color picker, select | [View](https://stellix-ui-material.vercel.app/components/fine-tune-card) |

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind | Behavior |
|---|---|---|---|
| Mobile | < 640px | default | Card layouts, bottom sheets, stacked |
| Tablet | 640–1023px | `sm:` | 2-column grids, side panels |
| Web | 1024–1439px | `md:` | Full tables, expanded sidebars |
| Big Screen | 1440px+ | `lg:` | 4-column grids, persistent panels |

---

## Also Available

| Package | Purpose | Install |
|---|---|---|
| [@stellix/ui-core](https://www.npmjs.com/package/@stellix/ui-core) | 11 headless hooks + TypeScript types | `npm i @stellix/ui-core` |
| [@stellix/ui-tokens](https://www.npmjs.com/package/@stellix/ui-tokens) | Design tokens (colors, shadows, spacing) | `npm i @stellix/ui-tokens` |
| [@stellix/ui-native](https://www.npmjs.com/package/@stellix/ui-native) | React Native components (NativeWind) | `npm i @stellix/ui-native` |

---

## License

MIT - Stellix Private Ltd
