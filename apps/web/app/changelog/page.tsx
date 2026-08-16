'use client';

import React from 'react';
import { Changelog } from '@stellix/ui-web';
import type { ChangelogEntry } from '@stellix/ui-web';

const entries: ChangelogEntry[] = [
  {
    version: 'v0.1.4',
    date: '2026-08-15',
    changes: [
      { type: 'feat', description: 'Phase 10-14: 94 new components across Primitives, Feedback, Layout, Data Display, AI/Agent, Compositions, Animations, and Themes categories.' },
      { type: 'feat', description: 'Added ThemeSwitcher and ThemeBuilder with 8 preset colour schemes (Light, Dark, Ocean, Forest, Sunset, Midnight, Sakura, Monochrome).' },
      { type: 'feat', description: 'Added animation components: GlimmEffect, GlidingHighlight, MorphTransition, ConfettiEffect, TypewriterEffect, NumberTicker, ProgressRing, RippleEffect, ShakeAnimation, SlideReveal.' },
      { type: 'feat', description: 'Added composition layouts: AIChatLayout, DashboardLayout, AgentWorkbench, CodeReview, DataExplorer, OnboardingWizard.' },
      { type: 'feat', description: 'Added AI/Agent components: AgentStatus, ToolCallCard, ModelSelector, TokenCounter, ConversationList, SystemPrompt.' },
      { type: 'feat', description: 'Added Data Display components: DataCard, TimelineView, FileTree, JSONViewer, MarkdownView, Changelog, ActivityFeed.' },
      { type: 'docs', description: 'Full documentation pages added for all 94 new components with live previews, props tables, and code snippets.' },
    ],
  },
  {
    version: 'v0.1.3',
    date: '2026-07-01',
    changes: [
      { type: 'feat', description: 'Phase 9: Comprehensive accessibility pass across all 19 components. Full WCAG 2.1 AA compliance.' },
      { type: 'feat', description: 'Dark mode support via CSS variables and data-theme attribute across all components.' },
      { type: 'feat', description: 'Added focus-visible ring for keyboard navigation on all interactive elements.' },
      { type: 'feat', description: 'Added reduced-motion support via @media (prefers-reduced-motion) in animations.' },
      { type: 'fix', description: 'Fixed contrast ratio for ink-3 text on surface-field background in light mode.' },
      { type: 'fix', description: 'Fixed AriaLive region not announcing Toast messages in Firefox.' },
      { type: 'docs', description: 'Accessibility page added with WCAG compliance summary and keyboard navigation guide.' },
    ],
  },
  {
    version: 'v0.1.2',
    date: '2026-06-10',
    changes: [
      { type: 'feat', description: 'Launched the Stellix UI Material documentation site built with Next.js 15.' },
      { type: 'feat', description: 'Live component previews with viewport switcher (Mobile, Tablet, Web, Large).' },
      { type: 'feat', description: 'Interactive playground page for trying components with real-time controls.' },
      { type: 'feat', description: 'Theme playground page with live theme switching across a component showcase.' },
      { type: 'docs', description: 'Added props tables, web code, and React Native code tabs for every component.' },
      { type: 'docs', description: 'Setup guide with installation instructions for web, native, core, and tokens packages.' },
    ],
  },
  {
    version: 'v0.1.1',
    date: '2026-05-20',
    changes: [
      { type: 'docs', description: 'Added README files to all four npm packages: @stellix/ui-web, @stellix/ui-native, @stellix/ui-core, @stellix/ui-tokens.' },
      { type: 'docs', description: 'Added JSDoc comments to all exported component props interfaces.' },
      { type: 'fix', description: 'Fixed missing peer dependency declaration for react and react-dom in @stellix/ui-web.' },
      { type: 'fix', description: 'Fixed tree-shaking issue where named exports from @stellix/ui-core were not preserved.' },
    ],
  },
  {
    version: 'v0.1.0',
    date: '2026-05-01',
    changes: [
      { type: 'feat', description: 'Initial public release of Stellix UI Material with 19 production-ready components.' },
      { type: 'feat', description: 'Feedback components: LoadingState (5 variants), Thinking, TaskRows (3 variants).' },
      { type: 'feat', description: 'Content components: StreamingText, CodeBlock (3 variants), ContextCards.' },
      { type: 'feat', description: 'Forms components: ApprovalCard (with MultiStepApproval), PromptBar, SelectionActions.' },
      { type: 'feat', description: 'Tables components: DiffTable, RecordsTable, FilterTable.' },
      { type: 'feat', description: 'Navigation components: Chat (3 variants), Search, SidebarNav.' },
      { type: 'feat', description: 'Cards components: RecommendationCard (with ComparisonCard), InsightCards (DonutChart + GaugeChart), ToolChips, FineTuneCard.' },
      { type: 'feat', description: '11 headless hooks in @stellix/ui-core: useTimer, useStreamingText, useCodeStream, useExpandable, useStaggeredReveal, useSearch, useSortable, useTaskProgress, useBreakpoint, useTextSelection, useDictation.' },
      { type: 'feat', description: 'React Native equivalents of all 19 components in @stellix/ui-native via NativeWind.' },
      { type: 'feat', description: 'Design tokens package @stellix/ui-tokens with colors, shadows, spacing, and radius values.' },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Changelog</h1>
        <p className="mt-2 text-sm text-ink-2 max-w-2xl">
          A full history of releases for Stellix UI Material. Each entry covers new features,
          bug fixes, documentation updates, and breaking changes.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { label: 'Feature', className: 'bg-accent/10 text-accent border border-accent/20' },
          { label: 'Fix', className: 'bg-green-500/10 text-green-600 border border-green-500/20' },
          { label: 'Breaking', className: 'bg-red-500/10 text-red-600 border border-red-500/20' },
          { label: 'Docs', className: 'bg-ink-3/10 text-ink-3 border border-line' },
        ].map(({ label, className }) => (
          <span key={label} className={`rounded-full px-2.5 py-0.5 font-medium ${className}`}>
            {label}
          </span>
        ))}
        <span className="text-ink-3 self-center pl-1">Change type legend</span>
      </div>

      <Changelog entries={entries} />
    </div>
  );
}
