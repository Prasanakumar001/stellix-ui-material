# @stellix/ui-core

> Headless hooks, TypeScript types, and utilities for the Stellix UI Material component library.

**[Live Demo](https://stellix-ui-material-web-alpha.vercel.app/)**

## What is this?

`@stellix/ui-core` provides **11 platform-agnostic React hooks** and full TypeScript interfaces for all 19 Stellix UI components. Use it to build your own UI with Stellix logic — no CSS or rendering opinions included.

## Install

```bash
npm install @stellix/ui-core
# or
pnpm add @stellix/ui-core
```

**Peer dependency:** `react ^18.0.0 || ^19.0.0`

## Hooks

### useTimer
Elapsed time tracking with start/stop/reset.
```tsx
const { elapsed, formatted, running, start, stop, reset } = useTimer(true);
// formatted → "1m 23s"
```

### useStreamingText
Word-by-word text reveal (AI streaming effect).
```tsx
const { displayed, isComplete, progress, skip } = useStreamingText('Hello world', 30);
```

### useCodeStream
Line-by-line code streaming.
```tsx
const { displayedLines, currentLine, totalLines, isComplete } = useCodeStream(code, 60);
```

### useExpandable
Boolean expand/collapse state.
```tsx
const { isOpen, toggle, open, close } = useExpandable(false);
```

### useStaggeredReveal
Staggered child animation controller.
```tsx
const { visibleCount, isComplete, isVisible, showAll } = useStaggeredReveal(10, 80);
```

### useSearch
Debounced search with generic filtering.
```tsx
const { query, setQuery, results, isSearching, clear } = useSearch(items, filterFn, 200);
```

### useSortable
Column sorting with direction toggle.
```tsx
const { sortedData, sortKey, sortDirection, sort, resetSort } = useSortable(data);
```

### useTaskProgress
Task list state management with status counts.
```tsx
const { tasks, updateTask, addTask, completedCount, progressPercent } = useTaskProgress(initialTasks);
```

### useBreakpoint
Responsive breakpoint detection.
```tsx
const { breakpoint, isMobile, isTablet, isWeb, isBigScreen, isAtLeast } = useBreakpoint();
```

### useTextSelection
Browser text selection detection with position rect.
```tsx
const { text, rect, isSelected, clear } = useTextSelection(containerRef);
```

### useDictation
Web Speech API wrapper.
```tsx
const { isListening, transcript, start, stop, isSupported } = useDictation('en-US');
```

## Utilities

```tsx
import { cn, formatTime, formatNumber, truncate, clamp, percentage } from '@stellix/ui-core';

cn('base', condition && 'active', { disabled: true }); // → 'base active disabled'
formatTime(90000);    // → '1m 30s'
formatNumber(1500);   // → '1.5K'
truncate('long text here', 10); // → 'long te...'
clamp(150, 0, 100);  // → 100
percentage(25, 100);  // → 25
```

## TypeScript Types

Full interfaces for all 19 components:

```tsx
import type {
  LoadingStateProps, ThinkingProps, StreamingTextProps,
  ApprovalCardProps, ToolChipsProps, TaskRowsProps,
  ChatProps, PromptBarProps, RecommendationCardProps,
  ContextCardsProps, DiffTableProps, RecordsTableProps,
  FilterTableProps, SidebarNavProps, SearchProps,
  InsightCardsProps, CodeBlockProps, FineTuneCardProps,
  SelectionActionsProps,
} from '@stellix/ui-core';
```

## Part Of

| Package | Purpose |
|---|---|
| [@stellix/ui-tokens](https://www.npmjs.com/package/@stellix/ui-tokens) | Design tokens |
| **@stellix/ui-core** | Headless hooks & types (this package) |
| [@stellix/ui-web](https://www.npmjs.com/package/@stellix/ui-web) | Web components (Tailwind + Next.js) |
| [@stellix/ui-native](https://www.npmjs.com/package/@stellix/ui-native) | React Native components (NativeWind) |

## License

MIT - Stellix Private Ltd
