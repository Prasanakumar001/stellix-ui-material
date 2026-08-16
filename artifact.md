# Stellix UI Material — Enhancement Artifact

> **Rule: DO NOT modify any existing components. All enhancements are NEW files, NEW variants, and NEW components.**

---

## Current State (v0.1.4)

19 components built, 1,456 E2E tests passing, deployed at https://stellix-ui-material.vercel.app/

---

## Enhancement Phases

### Phase 10 — New Component Variants (Existing Components)

> Add new variant options to existing components WITHOUT touching current code. Create variant sub-components in new files.

#### 10.1 LoadingState — New Variants
**Current:** Drive, Dots, Orbit
**New variants to add:**
- [ ] `pulse` — pulsing ring that grows and fades (like iOS loading)
- [ ] `skeleton` — shimmer skeleton blocks (content placeholder)
- [ ] `progress` — determinate progress ring with percentage text
- [ ] `wave` — 5 bars animating in a wave pattern (equalizer style)
- [ ] `typing` — 3 dots typing indicator (chat bubble style)

#### 10.2 TaskRows — New Variants
**Current:** list view only
**New variants to add:**
- [ ] `capsule` variant — horizontal card/capsule layout (compact)
- [ ] `kanban` variant — draggable columns (queued → running → completed → failed)
- [ ] `timeline` variant — vertical timeline with connecting lines between tasks

#### 10.3 Chat — New Variants
**Current:** basic tabbed chat
**New variants to add:**
- [ ] `bubble` variant — WhatsApp-style with timestamps, read receipts, typing indicator
- [ ] `thread` variant — Slack-style threaded replies with collapse
- [ ] `agent` variant — agentic chat with tool calls inline, step indicators

#### 10.4 CodeBlock — New Variants
**Current:** basic syntax highlighting
**New variants to add:**
- [ ] `diff` variant — inline diff highlighting within code block (green/red lines)
- [ ] `terminal` variant — terminal/console output style with $ prompt
- [ ] `multi-file` variant — tabbed file selector at top (like VS Code)
- [ ] `playground` variant — editable code with live preview

#### 10.5 PromptBar — New Variants
**Current:** single composer
**New variants to add:**
- [ ] `pill` variant — rounded pill shape (centered, minimal)
- [ ] `floating` variant — fixed bottom bar with shadow (ChatGPT style)
- [ ] `multi-modal` variant — image/file upload chips inline with text

#### 10.6 InsightCards — New Chart Types
**Current:** bar, line, area
**New chart types to add:**
- [ ] `donut` — donut/ring chart with center label
- [ ] `sparkline` — tiny inline chart (no axes)
- [ ] `heatmap` — grid heatmap with color intensity
- [ ] `gauge` — semicircle gauge meter

#### 10.7 ApprovalCard — New Variants
**Current:** radio/checkbox
**New variants to add:**
- [ ] `slider` variant — approve with a confidence slider (0-100%)
- [ ] `swipe` variant — swipe left to reject, right to approve (mobile-first)
- [ ] `multi-step` variant — wizard-style with pagination dots and step progress

#### 10.8 RecommendationCard — New Variants
**Current:** single card
**New variants to add:**
- [ ] `comparison` variant — side-by-side A/B comparison cards
- [ ] `carousel` variant — swipeable card stack with pagination
- [ ] `minimal` variant — compact inline suggestion (no alternatives section)

---

### Phase 11 — New Components (Not in Current Library)

> Entirely new components that complement the existing 19.

#### 11.1 Primitives / Atoms
- [ ] `Button` — primary, secondary, ghost, destructive, outline, icon-only, loading state, sizes (sm/md/lg)
- [ ] `Badge` — status badges (success, warning, error, info, neutral), dot variant, removable
- [ ] `Avatar` — image, initials, icon, sizes, status dot (online/offline/away), group stack
- [ ] `Tag` — colored tags with remove button, selectable, icon prefix
- [ ] `Tooltip` — hover/focus tooltip with arrow, placement options (top/bottom/left/right)
- [ ] `Toggle` — standalone toggle switch (not inside FineTuneCard)
- [ ] `Input` — text input with label, helper text, error state, prefix/suffix icons
- [ ] `Textarea` — auto-resize textarea with char count, error state
- [ ] `Select` — custom select dropdown with search, multi-select, grouped options
- [ ] `Checkbox` — custom styled checkbox with label, indeterminate state
- [ ] `Radio` — custom styled radio group with descriptions
- [ ] `Switch` — labeled on/off switch with description

#### 11.2 Feedback / Status
- [ ] `Toast` — notification toast (success/error/warning/info), auto-dismiss, stack, action button
- [ ] `Alert` — inline alert banner (info/success/warning/error), dismissible, with icon
- [ ] `ProgressBar` — determinate/indeterminate, sizes, colors, label, striped variant
- [ ] `Spinner` — standalone spinner (sizes, colors), overlay mode
- [ ] `Skeleton` — content placeholder (text lines, circle, rectangle, card, table)
- [ ] `EmptyState` — illustration + title + description + action button
- [ ] `StepIndicator` — horizontal/vertical step wizard with active/completed/upcoming states

#### 11.3 Layout / Navigation
- [ ] `Tabs` — horizontal/vertical tabs, pill variant, bordered variant, icon tabs
- [ ] `Breadcrumb` — navigation breadcrumb with separator, truncation
- [ ] `Pagination` — page numbers, prev/next, items per page selector
- [ ] `Dropdown` — trigger + menu, nested submenus, dividers, icons, keyboard nav
- [ ] `Modal` — centered/slide dialog, sizes, header/body/footer, close button, backdrop
- [ ] `Drawer` — slide-in panel (left/right/bottom), sizes, overlay
- [ ] `Accordion` — single/multi expand, bordered/separated variants
- [ ] `CommandMenu` — Cmd+K palette (standalone, not tied to Search component)

#### 11.4 Data Display
- [ ] `DataCard` — metric card with label, value, change indicator, sparkline
- [ ] `Timeline` — vertical timeline with icons, dates, connector lines
- [ ] `FileTree` — collapsible file/folder tree (VS Code style)
- [ ] `JSON Viewer` — collapsible JSON tree with syntax coloring
- [ ] `Markdown` — rendered markdown with code blocks, tables, headings
- [ ] `Changelog` — version log with badges (feat/fix/breaking), dates
- [ ] `ActivityFeed` — user activity stream with avatars, timestamps, actions

#### 11.5 AI / Agent-specific
- [ ] `AgentStatus` — agent state card (idle/thinking/acting/waiting), with live duration
- [ ] `ToolCallCard` — expanded tool call with input/output JSON, duration, status
- [ ] `ModelSelector` — model picker card with provider logos, capability tags, pricing
- [ ] `TokenCounter` — live token usage bar (prompt/completion/total), cost estimate
- [ ] `ConversationList` — list of past conversations with preview, date, model used
- [ ] `SystemPrompt` — editable system prompt textarea with token count, presets

---

### Phase 12 — Component Composition Patterns

> Pre-built layout patterns combining multiple components.

- [ ] `AIChatLayout` — full-page layout: SidebarNav + Chat + PromptBar
- [ ] `DashboardLayout` — InsightCards grid + TaskRows + ActivityFeed
- [ ] `AgentWorkbench` — Thinking + ToolChips + StreamingText + ApprovalCard composed
- [ ] `CodeReview` — DiffTable + Chat + ApprovalCard composed
- [ ] `DataExplorer` — FilterTable + RecordsTable + InsightCards composed
- [ ] `OnboardingWizard` — StepIndicator + ApprovalCard multi-step flow

---

### Phase 13 — Animations & Interactions

> New animation primitives and interaction patterns.

- [ ] `GlimmEffect` — WebGL gradient sweep effect (celebration/success)
- [ ] `GlidingHighlight` — smooth highlight that follows cursor across menu items
- [ ] `MorphTransition` — shared layout animation between page/state transitions
- [ ] `ConfettiEffect` — particle burst on success actions
- [ ] `TypewriterEffect` — character-by-character typing (not word-by-word)
- [ ] `NumberTicker` — animated counting number (0 → 1,234)
- [ ] `ProgressRing` — circular progress with smooth animation
- [ ] `RippleEffect` — material-style ripple on button click
- [ ] `ShakeAnimation` — error shake animation for invalid inputs
- [ ] `SlideReveal` — content slides in from direction on scroll/mount

---

### Phase 14 — Theme Variants

> Multiple visual theme presets beyond light/dark.

- [ ] `midnight` — deep blue/purple dark theme
- [ ] `sunset` — warm orange/amber accent theme
- [ ] `forest` — green/emerald nature theme
- [ ] `ocean` — cyan/teal water theme
- [ ] `monochrome` — grayscale only, no color accents
- [ ] `high-contrast` — WCAG AAA contrast, thick borders, bold text
- [ ] Custom theme builder — runtime theme configuration via CSS variables

---

### Phase 15 — Documentation Site Enhancements

> Make the docs site world-class.

- [ ] Interactive playground — edit props live and see component update
- [ ] Theme playground — pick accent color, preview across all components
- [ ] Copy full page example — one-click copy of complete page layout
- [ ] Figma design tokens export — download tokens for Figma
- [ ] Storybook integration — export stories for each component
- [ ] Performance benchmarks — bundle size per component, render time
- [ ] Accessibility audit page — live WCAG checker per component
- [ ] Changelog page — version history with visual diffs

---

## Priority Order

| Priority | Phase | Effort | Impact |
|---|---|---|---|
| 1 | Phase 11.1 (Primitives) | High | Highest — every app needs buttons, inputs, badges |
| 2 | Phase 10 (Variants) | Medium | High — makes existing components more versatile |
| 3 | Phase 11.2 (Feedback) | Medium | High — toast, alert, skeleton are essential |
| 4 | Phase 11.5 (AI/Agent) | Medium | High — unique differentiator for AI apps |
| 5 | Phase 11.3 (Layout) | Medium | Medium — tabs, modal, dropdown are common |
| 6 | Phase 11.4 (Data Display) | Medium | Medium — useful for dashboards |
| 7 | Phase 12 (Compositions) | Low | Medium — nice-to-have templates |
| 8 | Phase 13 (Animations) | Low | Medium — visual polish |
| 9 | Phase 14 (Themes) | Low | Low — nice-to-have variety |
| 10 | Phase 15 (Docs) | Low | Low — developer experience |

---

## Rules

1. **DO NOT modify existing component files** — they are working and tested
2. New variants go in new files (e.g., `LoadingState/variants/Pulse.tsx`)
3. New components go in new folders (e.g., `components/Button/Button.tsx`)
4. All new components must have: TypeScript types, data-testid, ARIA, responsive, dark mode
5. All new components need: E2E tests, demo page entry, npm README update
6. Maintain tree-shakeability — no barrel imports that pull in everything
