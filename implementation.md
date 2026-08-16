# Stellix UI Material — Implementation Plan

> **A cross-platform, responsive UI component library cloning every component from [beautifului.dev](https://www.beautifului.dev/).**
> Built for **Next.js (Web)** + **React Native (Mobile)** with a single API surface.

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Repo Name** | `stellix-ui-material` |
| **Purpose** | Production-ready, reusable component library that mirrors all 19 beautifului.dev components with full responsive behavior (mobile, tablet, web, big screen) and React Native support |
| **Web Stack** | Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 |
| **Mobile Stack** | React Native 0.76+ · NativeWind 4 (Tailwind for RN) · Expo SDK 52+ |
| **Shared Layer** | Universal component API via `@stellix/ui-core` (headless logic) + platform renderers |
| **Package Manager** | pnpm (monorepo with workspaces) |
| **Bundler** | Turborepo for orchestration, tsup for library builds |

---

## 2. Monorepo Structure

```
stellix-ui-material/
├── apps/
│   ├── web/                        # Next.js 15 demo/docs site
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── components/[slug]/page.tsx
│   │   ├── tailwind.config.ts
│   │   └── next.config.ts
│   │
│   └── mobile/                     # Expo React Native demo app
│       ├── app/
│       ├── metro.config.js
│       └── tailwind.config.ts      # NativeWind config
│
├── packages/
│   ├── core/                       # @stellix/ui-core — headless logic, hooks, types
│   │   ├── src/
│   │   │   ├── hooks/              # useStreaming, useTimer, useExpandable, etc.
│   │   │   ├── types/              # Shared TypeScript interfaces
│   │   │   ├── utils/              # Shared utilities (animation timing, formatters)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                        # @stellix/ui-web — Tailwind + Next.js components
│   │   ├── src/
│   │   │   ├── components/         # All 19 components (web renderers)
│   │   │   ├── tokens/             # Design tokens (CSS custom properties)
│   │   │   ├── animations/         # Keyframe definitions
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── native/                     # @stellix/ui-native — React Native components
│   │   ├── src/
│   │   │   ├── components/         # All 19 components (RN renderers)
│   │   │   ├── tokens/             # Design tokens (RN StyleSheet)
│   │   │   ├── animations/         # Reanimated animation presets
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── tokens/                     # @stellix/ui-tokens — shared design tokens
│       ├── src/
│       │   ├── colors.ts
│       │   ├── shadows.ts
│       │   ├── spacing.ts
│       │   ├── breakpoints.ts
│       │   └── index.ts
│       └── package.json
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

---

## 3. Design Token System

Mirroring beautifului.dev's token architecture, extended for all breakpoints.

### 3.1 Color Tokens

```ts
// packages/tokens/src/colors.ts
export const colors = {
  ink:        { DEFAULT: '#1a1a1a', 2: '#6b6b6b', 3: '#9a9a9a' },
  surface:    { DEFAULT: '#ffffff', field: '#f5f5f5', canvas: '#fafafa' },
  line:       { DEFAULT: '#e5e5e5', strong: '#d1d1d1' },
  accent:     '#6366f1',
  green:      '#22c55e',
  red:        '#ef4444',
  orange:     '#f97316',
  blue:       '#3b82f6',
  purple:     '#a855f7',
} as const;
```

### 3.2 Responsive Breakpoints

```ts
// packages/tokens/src/breakpoints.ts
export const breakpoints = {
  mobile:   { min: 0,    max: 639,  columns: 4  },  // phones
  tablet:   { min: 640,  max: 1023, columns: 8  },  // tablets
  web:      { min: 1024, max: 1439, columns: 12 },  // laptops/desktops
  bigScreen:{ min: 1440, max: Infinity, columns: 16 }, // large monitors/TVs
} as const;

// Tailwind extension
export const tailwindScreens = {
  sm: '640px',   // tablet
  md: '1024px',  // web
  lg: '1440px',  // big screen
};
```

### 3.3 Shadow System

```ts
export const shadows = {
  btn:      '0 1px 2px rgba(0,0,0,0.05)',
  card:     '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  raised:   '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  hairline: '0 0 0 1px rgba(0,0,0,0.05)',
} as const;
```

---

## 4. Complete Component Inventory (19 Components)

Every component from beautifului.dev, with responsive behavior per breakpoint.

### 4.1 Loading State
**Category:** Feedback · **Variants:** Drive, Dots, Orbit

| Feature | Implementation |
|---|---|
| Pixel-grid loader | CSS Grid + keyframe `pixel-on` animation with staggered delays |
| Shimmer effect | CSS `shimmer-text` animation (linear-gradient background sweep) |
| Elapsed timer | `useTimer()` hook from `@stellix/ui-core` |
| 3 variants | Compound component pattern: `<LoadingState variant="drive \| dots \| orbit">` |

**Responsive:**
- Mobile: compact single-column, smaller grid
- Tablet: medium grid, side-aligned timer
- Web/Big Screen: full pixel grid with expanded shimmer

---

### 4.2 Thinking
**Category:** Feedback · **Expandable trace panel**

| Feature | Implementation |
|---|---|
| Expandable sections | `useExpandable()` hook with `grid-template-rows` animation |
| Trace types | Steps, Reasoning, Search, Coding — tab-based or accordion |
| Animated dots | CSS `spin` keyframe on dot indicators |
| Step-by-step reveal | `useStaggeredReveal()` hook with configurable delays |

**Responsive:**
- Mobile: full-width accordion (one section open at a time)
- Tablet: side panel or bottom sheet
- Web: inline expandable within content flow
- Big Screen: persistent side panel with all sections visible

---

### 4.3 Streaming Text
**Category:** Content · **Streamed answer display**

| Feature | Implementation |
|---|---|
| Word-by-word reveal | `useStreamingText()` hook with `stream-in` CSS animation |
| Inline citations | `<Citation>` sub-component with numbered source chips |
| Source chips | Clickable chip array linking to context sources |
| Follow-up suggestions | `<FollowUpChips>` array rendered after stream completes |
| Actions | Toolbar (copy, share, thumbs up/down) |

**Responsive:**
- Mobile: stacked chips below text, compact toolbar
- Tablet+: inline chips, floating toolbar

---

### 4.4 Approval Card
**Category:** Forms · **Human-in-the-loop UI**

| Feature | Implementation |
|---|---|
| Radio/checkbox options | `<ApprovalOption>` with `type="radio" \| "checkbox"` |
| Custom input | Optional text input field for custom responses |
| Pagination dots | Dot indicators for multi-step approvals |
| Animated progression | `pop-in` animation on step transition |
| Approve/Reject actions | Primary and secondary action buttons |

**Responsive:**
- Mobile: full-width card, stacked options, bottom-pinned actions
- Tablet: centered card with max-width
- Web/Big Screen: inline card with side-by-side options

---

### 4.5 Tool Chips
**Category:** Information · **Code edit and tool call display**

| Feature | Implementation |
|---|---|
| Compact chip display | `<ToolChip>` showing tool name + status icon |
| Expandable rows | Click to reveal file diff summary |
| File diff with +/- counts | `<DiffSummary>` sub-component |
| Status indicators | Success (green), running (blue pulse), error (red) |

**Responsive:**
- Mobile: vertical stack, full-width chips
- Tablet+: horizontal wrap, inline expansion

---

### 4.6 Task Rows
**Category:** Lists · **Live agent task status**

| Feature | Implementation |
|---|---|
| Status badges | Running (spinner), Failed (red), Completed (green check) |
| Spinner rings | CSS `spin` animation on SVG circle |
| Expandable details | `useExpandable()` with animated height |
| Live progress | `useTaskProgress()` hook with polling/SSE support |

**Responsive:**
- Mobile: card layout (stacked metadata)
- Tablet: compact table with key columns
- Web/Big Screen: full table with all columns visible

---

### 4.7 Chat
**Category:** Communication · **Tabbed chat panel**

| Feature | Implementation |
|---|---|
| Tabbed interface | `<ChatTabs>` with tab switching animation |
| Reasoning replies | `<ReasoningBubble>` with expandable thinking |
| Message composer | `<Composer>` with auto-resize textarea |
| Multi-phase conversation | State machine for conversation phases |

**Responsive:**
- Mobile: full-screen overlay, bottom-anchored composer
- Tablet: side panel (40% width)
- Web: side panel (30% width) or inline
- Big Screen: persistent panel with expanded view

---

### 4.8 Prompt Bar
**Category:** Forms · **Advanced composer**

| Feature | Implementation |
|---|---|
| @ source menu | `<MentionMenu>` triggered by `@` keystroke |
| / command menu | `<CommandMenu>` triggered by `/` keystroke |
| Model picker | `<ModelPicker>` dropdown with gliding highlight |
| Dictation | Web Speech API integration via `useDictation()` |
| File attachments | `<AttachmentChip>` with drag-and-drop support |
| Gliding highlights | Absolute-positioned highlight div with CSS transitions |

**Responsive:**
- Mobile: full-width, simplified menus (bottom sheet), large touch targets
- Tablet: floating bar with popover menus
- Web/Big Screen: full-featured with inline dropdowns

---

### 4.9 Recommendation Card
**Category:** Cards · **Agent suggestion display**

| Feature | Implementation |
|---|---|
| Confidence meter | `<ConfidenceMeter>` (segmented bar or radial) |
| Alternative options | `<AlternativeList>` collapsible section |
| Action buttons | Accept, Modify, Reject |
| Animated entrance | `fade-up` + `pop-in` animation |

**Responsive:**
- Mobile: full-width card, stacked layout
- Tablet+: max-width card, side-by-side confidence + alternatives

---

### 4.10 Context Cards
**Category:** Information · **Retrieved knowledge chunks**

| Feature | Implementation |
|---|---|
| Source display | Document title + icon + relevance score |
| Content preview | Truncated text with "show more" |
| Source link | Clickable link to original document |
| Highlight matching | Bolded matching terms in preview |

**Responsive:**
- Mobile: single-column card stack
- Tablet: 2-column grid
- Web: 3-column grid
- Big Screen: 4-column grid

---

### 4.11 Diff Table
**Category:** Tables · **AI-proposed edits**

| Feature | Implementation |
|---|---|
| Side-by-side diff | `<DiffView mode="split">` |
| Inline diff | `<DiffView mode="unified">` |
| Line numbers | Gutter with old/new line numbers |
| Accept/reject per chunk | `<DiffAction>` buttons per hunk |
| Syntax highlighting | Integrated with `shiki` or `prism` |

**Responsive:**
- Mobile: unified (inline) diff only, horizontal scroll for long lines
- Tablet: option for split or unified
- Web/Big Screen: split diff by default

---

### 4.12 Records Table
**Category:** Tables · **CRM-style grid**

| Feature | Implementation |
|---|---|
| Column sorting | `useSortable()` hook |
| Tags | `<Tag>` chips with color variants |
| Relationship status | `<StatusBadge>` component |
| Row selection | Checkbox column with bulk actions |
| Pagination | `<TablePagination>` component |

**Responsive:**
- Mobile: card list view (table → cards transformation)
- Tablet: horizontal scroll with pinned first column
- Web/Big Screen: full table with all columns

---

### 4.13 Filter Table
**Category:** Tables · **Dynamic data filtering**

| Feature | Implementation |
|---|---|
| Status chips | `<FilterChip>` toggle buttons |
| Live data reorganization | Animated row reordering with `layout` transitions |
| Active filter indicators | Highlighted chip + count badge |
| Clear all | Reset button |

**Responsive:**
- Mobile: horizontal scrollable chip bar, card layout for results
- Tablet+: wrapped chip row, table layout

---

### 4.14 Sidebar Nav
**Category:** Navigation · **Workspace navigation**

| Feature | Implementation |
|---|---|
| Quick search | `<QuickSearch>` input with filtering |
| Collapsible sections | `<NavGroup>` with expand/collapse |
| Active state | Highlighted background on current route |
| Icon + label | `<NavItem icon={} label="">` |

**Responsive:**
- Mobile: hidden by default, slide-in drawer (hamburger menu)
- Tablet: icon-only collapsed sidebar (56px)
- Web: expanded sidebar (240px)
- Big Screen: expanded sidebar (280px) with extra info

---

### 4.15 Search
**Category:** Navigation · **Command palette search**

| Feature | Implementation |
|---|---|
| Command palette | `<CommandPalette>` modal (⌘K / Ctrl+K) |
| Live filtering | `useSearch()` hook with debounced input |
| Keyboard navigation | Arrow keys, Enter to select, Esc to close |
| Empty state | `<EmptyState>` with illustration and suggestions |
| Recent searches | Persisted in localStorage |

**Responsive:**
- Mobile: full-screen modal
- Tablet: centered modal (80% width)
- Web/Big Screen: centered modal (max-width 640px)

---

### 4.16 Insight Cards
**Category:** Cards · **Agent insights with charts**

| Feature | Implementation |
|---|---|
| Paged cards | `<InsightCarousel>` with swipe/arrow navigation |
| Live charts | Lightweight chart renderer (custom SVG or `recharts`) |
| Scrub interaction | Touch/mouse scrub to explore data points |
| Data labels | Dynamic tooltip on hover/scrub |

**Responsive:**
- Mobile: single card, full-width, swipeable
- Tablet: 2 cards visible
- Web: 3 cards visible
- Big Screen: 4 cards visible with expanded charts

---

### 4.17 Code Block
**Category:** Content · **Code streaming display**

| Feature | Implementation |
|---|---|
| Line-by-line streaming | `useCodeStream()` hook |
| Syntax highlighting | `shiki` for web, custom tokenizer for RN |
| Copy button | One-click copy to clipboard |
| Language badge | Auto-detected or specified language label |
| Line numbers | Optional gutter |

**Responsive:**
- Mobile: full-width, horizontal scroll, smaller font
- Tablet+: contained width, standard font size

---

### 4.18 Fine-tune Card
**Category:** Controls · **Design property adjuster**

| Feature | Implementation |
|---|---|
| Inspector format | Property name + value pairs |
| Sliders | `<PropertySlider>` for numeric values |
| Color pickers | `<ColorPicker>` for color properties |
| Toggle switches | `<Toggle>` for boolean properties |
| Real-time preview | Live preview updates on value change |

**Responsive:**
- Mobile: full-width, vertical stacked controls
- Tablet+: two-column inspector layout

---

### 4.19 Selection Actions
**Category:** Forms · **Text highlight actions**

| Feature | Implementation |
|---|---|
| Text selection detection | `useTextSelection()` hook |
| Floating toolbar | Positioned above selection (like Medium) |
| Rewrite action | Send selected text to agent |
| Action options | Rewrite, Summarize, Explain, Translate |

**Responsive:**
- Mobile: bottom sheet instead of floating toolbar (touch-friendly)
- Tablet+: floating toolbar above selection

---

## 5. Animation System

### 5.1 Keyframe Definitions (Web)

```css
@keyframes pixel-on {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes shimmer-text {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes stream-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### 5.2 React Native Animations

- Use `react-native-reanimated` v3 for performant native animations
- Shared animation timing via `@stellix/ui-core` (durations, easings)
- Staggered animations using `withDelay()` + `withTiming()`
- Layout animations using `LayoutAnimationConfig` for list reordering

### 5.3 Reduced Motion

```ts
// All components respect prefers-reduced-motion
// Web: @media (prefers-reduced-motion: reduce)
// RN: AccessibilityInfo.isReduceMotionEnabled()
```

---

## 6. Cross-Platform Strategy

### 6.1 Architecture Pattern

```
┌─────────────────────────────┐
│    @stellix/ui-core         │  ← Headless logic, hooks, types
│    (platform-agnostic)      │     No UI rendering
├──────────────┬──────────────┤
│ @stellix/    │ @stellix/    │  ← Platform-specific renderers
│ ui-web       │ ui-native    │     Same API, different impl
│ (Tailwind)   │ (NativeWind) │
└──────────────┴──────────────┘
```

### 6.2 Shared Hook Examples

```ts
// packages/core/src/hooks/useTimer.ts
export function useTimer(autoStart = true) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(autoStart);
  // ... platform-agnostic timer logic
  return { elapsed, running, start, stop, reset };
}

// packages/core/src/hooks/useExpandable.ts
export function useExpandable(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen(prev => !prev);
  return { isOpen, toggle, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

// packages/core/src/hooks/useStreamingText.ts
export function useStreamingText(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  // ... word-by-word reveal logic
  return { displayed, isComplete, reset };
}
```

### 6.3 Platform Rendering

```tsx
// packages/web/src/components/LoadingState/LoadingState.tsx
import { useTimer } from '@stellix/ui-core';

export function LoadingState({ variant = 'drive' }: LoadingStateProps) {
  const { elapsed } = useTimer();
  return (
    <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:p-8 md:gap-6">
      <PixelGrid variant={variant} />
      <span className="text-ink-2 text-sm">{formatTime(elapsed)}</span>
    </div>
  );
}

// packages/native/src/components/LoadingState/LoadingState.tsx
import { useTimer } from '@stellix/ui-core';
import { View, Text } from 'react-native';

export function LoadingState({ variant = 'drive' }: LoadingStateProps) {
  const { elapsed } = useTimer();
  return (
    <View className="flex-col items-center gap-4 p-6 sm:flex-row sm:p-8 md:gap-6">
      <PixelGrid variant={variant} />
      <Text className="text-ink-2 text-sm">{formatTime(elapsed)}</Text>
    </View>
  );
}
```

---

## 7. Responsive System

### 7.1 Tailwind Breakpoint Config

```ts
// tailwind.config.ts (shared)
export default {
  theme: {
    screens: {
      sm: '640px',    // tablet
      md: '1024px',   // web/desktop
      lg: '1440px',   // big screen
    },
  },
};
```

### 7.2 Per-Component Responsive Pattern

Every component follows this responsive contract:

```tsx
// Example: ContextCards responsive grid
<div className="
  grid gap-4
  grid-cols-1           /* mobile: 1 column */
  sm:grid-cols-2        /* tablet: 2 columns */
  md:grid-cols-3        /* web: 3 columns */
  lg:grid-cols-4        /* big screen: 4 columns */
">
  {cards.map(card => <ContextCard key={card.id} {...card} />)}
</div>
```

### 7.3 React Native Responsive

```ts
// packages/native/src/utils/responsive.ts
import { useWindowDimensions } from 'react-native';

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'web';
  return 'bigScreen';
}
```

NativeWind 4 supports Tailwind's `sm:`, `md:`, `lg:` prefixes natively on React Native.

---

## 8. Integration API (Consumer Usage)

### 8.1 Web (Next.js)

```bash
pnpm add @stellix/ui-web @stellix/ui-tokens
```

```tsx
// app/layout.tsx
import '@stellix/ui-web/styles.css';

// app/page.tsx
import {
  LoadingState, Thinking, StreamingText, ApprovalCard,
  ToolChips, TaskRows, Chat, PromptBar, RecommendationCard,
  ContextCards, DiffTable, RecordsTable, FilterTable,
  SidebarNav, Search, InsightCards, CodeBlock,
  FineTuneCard, SelectionActions,
} from '@stellix/ui-web';

export default function Page() {
  return <LoadingState variant="orbit" />;
}
```

### 8.2 React Native (Expo)

```bash
pnpm add @stellix/ui-native @stellix/ui-tokens
```

```tsx
import { LoadingState, Chat, PromptBar } from '@stellix/ui-native';

export default function Screen() {
  return <LoadingState variant="dots" />;
}
```

### 8.3 Tree-Shaking

Both packages are fully tree-shakeable. Import only what you need — unused components are excluded from the bundle.

---

## 9. Dependencies

### Web (`@stellix/ui-web`)

| Package | Version | Purpose |
|---|---|---|
| `next` | `^15.x` | App framework |
| `react` | `^19.x` | UI runtime |
| `tailwindcss` | `^4.x` | Styling |
| `shiki` | `^1.x` | Code syntax highlighting |
| `recharts` | `^2.x` | Charts for InsightCards |
| `framer-motion` | `^11.x` | Complex layout animations |
| `cmdk` | `^1.x` | Command palette base (Search) |

### Native (`@stellix/ui-native`)

| Package | Version | Purpose |
|---|---|---|
| `react-native` | `^0.76` | Mobile runtime |
| `expo` | `^52` | Build/dev toolchain |
| `nativewind` | `^4.x` | Tailwind for RN |
| `react-native-reanimated` | `^3.x` | Performant animations |
| `react-native-gesture-handler` | `^2.x` | Touch gestures |
| `react-native-svg` | `^15.x` | SVG rendering |
| `expo-haptics` | `^13.x` | Haptic feedback |

---

## 10. Implementation Phases

### Phase 1 — Foundation (Week 1-2)

- [ ] Initialize monorepo (pnpm workspaces + Turborepo)
- [ ] Setup `@stellix/ui-tokens` (colors, shadows, spacing, breakpoints)
- [ ] Setup `@stellix/ui-core` (project skeleton, shared types)
- [ ] Setup `@stellix/ui-web` with Next.js 15 + Tailwind CSS 4
- [ ] Setup `@stellix/ui-native` with Expo + NativeWind 4
- [ ] Configure Tailwind theme with custom tokens
- [ ] Setup animation system (keyframes for web, Reanimated presets for native)
- [ ] Setup CI/CD (lint, type-check, build verification)

### Phase 2 — Core Hooks (Week 2-3)

- [ ] `useTimer()` — elapsed time tracking
- [ ] `useExpandable()` — expand/collapse state
- [ ] `useStreamingText()` — word-by-word text reveal
- [ ] `useStaggeredReveal()` — staggered child animations
- [ ] `useSearch()` — debounced search with filtering
- [ ] `useSortable()` — column sorting logic
- [ ] `useTextSelection()` — text selection detection
- [ ] `useTaskProgress()` — live task status polling
- [ ] `useCodeStream()` — line-by-line code streaming
- [ ] `useDictation()` — Web Speech API wrapper
- [ ] `useBreakpoint()` — responsive breakpoint detection

### Phase 3 — Feedback Components (Week 3-4)

- [ ] `LoadingState` (web + native) — 3 variants
- [ ] `Thinking` (web + native) — expandable trace panel
- [ ] `TaskRows` (web + native) — live task status list

### Phase 4 — Content Components (Week 4-5)

- [ ] `StreamingText` (web + native) — streamed answer with citations
- [ ] `CodeBlock` (web + native) — syntax-highlighted code streaming
- [ ] `ContextCards` (web + native) — knowledge chunk cards

### Phase 5 — Form Components (Week 5-6)

- [ ] `ApprovalCard` (web + native) — human-in-the-loop UI
- [ ] `PromptBar` (web + native) — advanced composer
- [ ] `SelectionActions` (web + native) — text highlight toolbar

### Phase 6 — Table Components (Week 6-7)

- [ ] `DiffTable` (web + native) — side-by-side + unified diff
- [ ] `RecordsTable` (web + native) — CRM grid with sorting/tags
- [ ] `FilterTable` (web + native) — dynamic filter chips

### Phase 7 — Navigation Components (Week 7-8)

- [ ] `SidebarNav` (web + native) — workspace navigation
- [ ] `Search` (web + native) — command palette
- [ ] `Chat` (web + native) — tabbed chat panel

### Phase 8 — Card & Control Components (Week 8-9)

- [ ] `RecommendationCard` (web + native) — agent suggestion
- [ ] `InsightCards` (web + native) — paged charts
- [ ] `ToolChips` (web + native) — tool call display
- [ ] `FineTuneCard` (web + native) — property adjuster

### Phase 9 — Polish & Docs (Week 9-10)

- [ ] Accessibility audit (WCAG 2.1 AA) — keyboard nav, screen readers, ARIA
- [ ] Reduced motion support across all components
- [ ] Dark mode support (full token swap)
- [ ] Demo site with interactive playground for each component
- [ ] API documentation (props, events, slots)
- [ ] Integration guides (Next.js, Expo, standalone React)
- [ ] npm publish setup (`@stellix/ui-core`, `@stellix/ui-web`, `@stellix/ui-native`, `@stellix/ui-tokens`)

---

## 11. Quality Standards

| Area | Standard |
|---|---|
| **TypeScript** | Strict mode, no `any` types, exported interfaces for all props |
| **Accessibility** | WCAG 2.1 AA, full keyboard navigation, ARIA labels, screen reader tested |
| **Performance** | < 50KB per component (gzipped), tree-shakeable, lazy-loadable |
| **Testing** | Unit tests (Vitest), component tests (Testing Library), visual regression (Chromatic) |
| **Browser Support** | Chrome/Edge 90+, Firefox 90+, Safari 15+ |
| **RN Support** | iOS 15+, Android 10+ |
| **Responsive** | Tested at all 4 breakpoints (mobile/tablet/web/big screen) |

---

## 12. File Naming Convention

```
packages/web/src/components/
├── LoadingState/
│   ├── LoadingState.tsx          # Main component
│   ├── LoadingState.test.tsx     # Tests
│   ├── PixelGrid.tsx             # Sub-component
│   ├── variants/
│   │   ├── Drive.tsx
│   │   ├── Dots.tsx
│   │   └── Orbit.tsx
│   └── index.ts                  # Public export
```

---

## 13. Theming & Customization

```tsx
// Consumer can override tokens
import { StellixProvider } from '@stellix/ui-web';

<StellixProvider
  theme={{
    colors: {
      accent: '#your-brand-color',
    },
    shadows: {
      card: 'your-custom-shadow',
    },
  }}
>
  <App />
</StellixProvider>
```

---

## 14. Summary

**stellix-ui-material** delivers all 19 beautifului.dev components as a production-grade, cross-platform library:

- **19 components** — exact feature parity with beautifului.dev
- **4 packages** — core (headless), web (Tailwind), native (NativeWind), tokens (shared)
- **4 breakpoints** — mobile, tablet, web, big screen — every component is responsive
- **2 platforms** — Next.js (web) + React Native (mobile) with shared logic
- **Easy integration** — `pnpm add @stellix/ui-web` → import and use
- **Customizable** — theme provider for token overrides
- **Accessible** — WCAG 2.1 AA compliant
- **Performant** — tree-shakeable, < 50KB per component
