'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const hooks = [
  { name: 'useTimer', desc: 'Elapsed time tracking with start/stop/reset', returns: 'elapsed, formatted, running, start, stop, reset' },
  { name: 'useStreamingText', desc: 'Word-by-word text reveal', returns: 'displayed, isComplete, progress, skip, reset' },
  { name: 'useCodeStream', desc: 'Line-by-line code streaming', returns: 'displayedLines, currentLine, totalLines, isComplete, progress' },
  { name: 'useExpandable', desc: 'Boolean expand/collapse state', returns: 'isOpen, toggle, open, close' },
  { name: 'useStaggeredReveal', desc: 'Staggered child animation controller', returns: 'visibleCount, isComplete, isVisible, showAll, reset' },
  { name: 'useSearch', desc: 'Debounced search with filtering', returns: 'query, setQuery, results, isSearching, resultCount, clear' },
  { name: 'useSortable', desc: 'Column sorting with direction toggle', returns: 'sortedData, sortKey, sortDirection, sort, resetSort, isSorted' },
  { name: 'useTaskProgress', desc: 'Task list state management', returns: 'tasks, updateTask, addTask, removeTask, completedCount, progressPercent' },
  { name: 'useBreakpoint', desc: 'Responsive breakpoint detection', returns: 'breakpoint, isMobile, isTablet, isWeb, isBigScreen, width' },
  { name: 'useTextSelection', desc: 'Text selection detection', returns: 'text, rect, isSelected, clear' },
  { name: 'useDictation', desc: 'Web Speech API wrapper', returns: 'isListening, transcript, start, stop, isSupported' },
];

const components = [
  // Core Feedback
  { name: 'LoadingState', category: 'Core Feedback', href: '/components/loading-state', native: true },
  { name: 'Thinking', category: 'Core Feedback', href: '/components/thinking', native: true },
  { name: 'TaskRows', category: 'Core Feedback', href: '/components/task-rows', native: true },
  // Content
  { name: 'StreamingText', category: 'Content', href: '/components/streaming-text', native: true },
  { name: 'CodeBlock', category: 'Content', href: '/components/code-block', native: true },
  { name: 'ContextCards', category: 'Content', href: '/components/context-cards', native: true },
  // Forms
  { name: 'ApprovalCard', category: 'Forms', href: '/components/approval-card', native: true },
  { name: 'PromptBar', category: 'Forms', href: '/components/prompt-bar', native: true },
  { name: 'SelectionActions', category: 'Forms', href: '/components/selection-actions', native: true },
  // Tables
  { name: 'DiffTable', category: 'Tables', href: '/components/diff-table', native: true },
  { name: 'RecordsTable', category: 'Tables', href: '/components/records-table', native: true },
  { name: 'FilterTable', category: 'Tables', href: '/components/filter-table', native: true },
  // Navigation
  { name: 'Chat', category: 'Navigation', href: '/components/chat', native: true },
  { name: 'Search', category: 'Navigation', href: '/components/search', native: true },
  { name: 'SidebarNav', category: 'Navigation', href: '/components/sidebar-nav', native: true },
  // Cards & Controls
  { name: 'RecommendationCard', category: 'Cards', href: '/components/recommendation-card', native: true },
  { name: 'InsightCards', category: 'Cards', href: '/components/insight-cards', native: true },
  { name: 'ToolChips', category: 'Cards', href: '/components/tool-chips', native: true },
  { name: 'FineTuneCard', category: 'Cards', href: '/components/fine-tune-card', native: true },
  // Primitives
  { name: 'Button', category: 'Primitives', href: '/components/button', native: true },
  { name: 'Badge', category: 'Primitives', href: '/components/badge', native: true },
  { name: 'Avatar', category: 'Primitives', href: '/components/avatar', native: true },
  { name: 'Tag', category: 'Primitives', href: '/components/tag', native: true },
  { name: 'Tooltip', category: 'Primitives', href: '/components/tooltip', native: true },
  { name: 'Toggle', category: 'Primitives', href: '/components/toggle', native: true },
  { name: 'Input', category: 'Primitives', href: '/components/input', native: true },
  { name: 'Textarea', category: 'Primitives', href: '/components/textarea', native: true },
  { name: 'Select', category: 'Primitives', href: '/components/select', native: true },
  { name: 'Checkbox', category: 'Primitives', href: '/components/checkbox', native: true },
  { name: 'Radio', category: 'Primitives', href: '/components/radio', native: true },
  { name: 'Switch', category: 'Primitives', href: '/components/switch', native: true },
  // Feedback
  { name: 'Toast', category: 'Feedback', href: '/components/toast', native: true },
  { name: 'Alert', category: 'Feedback', href: '/components/alert', native: true },
  { name: 'ProgressBar', category: 'Feedback', href: '/components/progress-bar', native: true },
  { name: 'Spinner', category: 'Feedback', href: '/components/spinner', native: true },
  { name: 'SkeletonBlock', category: 'Feedback', href: '/components/skeleton-block', native: true },
  { name: 'EmptyState', category: 'Feedback', href: '/components/empty-state', native: true },
  { name: 'StepIndicator', category: 'Feedback', href: '/components/step-indicator', native: true },
  // Layout
  { name: 'Tabs', category: 'Layout', href: '/components/tabs', native: true },
  { name: 'Breadcrumb', category: 'Layout', href: '/components/breadcrumb', native: true },
  { name: 'Pagination', category: 'Layout', href: '/components/pagination', native: false },
  { name: 'Dropdown', category: 'Layout', href: '/components/dropdown', native: false },
  { name: 'Modal', category: 'Layout', href: '/components/modal', native: false },
  { name: 'Drawer', category: 'Layout', href: '/components/drawer', native: false },
  { name: 'Accordion', category: 'Layout', href: '/components/accordion', native: false },
  // Data Display
  { name: 'DataCard', category: 'Data Display', href: '/components/data-card', native: false },
  { name: 'TimelineView', category: 'Data Display', href: '/components/timeline-view', native: false },
  { name: 'FileTree', category: 'Data Display', href: '/components/file-tree', native: false },
  { name: 'JSONViewer', category: 'Data Display', href: '/components/json-viewer', native: false },
  { name: 'MarkdownView', category: 'Data Display', href: '/components/markdown-view', native: false },
  { name: 'Changelog', category: 'Data Display', href: '/components/changelog', native: false },
  { name: 'ActivityFeed', category: 'Data Display', href: '/components/activity-feed', native: false },
  // AI / Agent
  { name: 'AgentStatus', category: 'AI / Agent', href: '/components/agent-status', native: false },
  { name: 'ToolCallCard', category: 'AI / Agent', href: '/components/tool-call-card', native: false },
  { name: 'ModelSelector', category: 'AI / Agent', href: '/components/model-selector', native: false },
  { name: 'TokenCounter', category: 'AI / Agent', href: '/components/token-counter', native: false },
  { name: 'ConversationList', category: 'AI / Agent', href: '/components/conversation-list', native: false },
  { name: 'SystemPrompt', category: 'AI / Agent', href: '/components/system-prompt', native: false },
  // Compositions
  { name: 'AIChatLayout', category: 'Compositions', href: '/components/ai-chat-layout', native: false },
  { name: 'DashboardLayout', category: 'Compositions', href: '/components/dashboard-layout', native: false },
  { name: 'AgentWorkbench', category: 'Compositions', href: '/components/agent-workbench', native: false },
  { name: 'CodeReview', category: 'Compositions', href: '/components/code-review', native: false },
  { name: 'DataExplorer', category: 'Compositions', href: '/components/data-explorer', native: false },
  { name: 'OnboardingWizard', category: 'Compositions', href: '/components/onboarding-wizard', native: false },
  // Animations
  { name: 'GlimmEffect', category: 'Animations', href: '/components/glimm-effect', native: false },
  { name: 'GlidingHighlight', category: 'Animations', href: '/components/gliding-highlight', native: false },
  { name: 'MorphTransition', category: 'Animations', href: '/components/morph-transition', native: false },
  { name: 'ConfettiEffect', category: 'Animations', href: '/components/confetti-effect', native: false },
  { name: 'TypewriterEffect', category: 'Animations', href: '/components/typewriter-effect', native: false },
  { name: 'NumberTicker', category: 'Animations', href: '/components/number-ticker', native: false },
  { name: 'ProgressRing', category: 'Animations', href: '/components/progress-ring', native: false },
  { name: 'RippleEffect', category: 'Animations', href: '/components/ripple-effect', native: false },
  { name: 'ShakeAnimation', category: 'Animations', href: '/components/shake-animation', native: false },
  { name: 'SlideReveal', category: 'Animations', href: '/components/slide-reveal', native: false },
  // Themes
  { name: 'ThemeSwitcher', category: 'Themes', href: '/components/theme-switcher', native: false },
  { name: 'ThemeBuilder', category: 'Themes', href: '/components/theme-builder', native: false },
  // Charts
  { name: 'DonutChart', category: 'Charts', href: '/components/donut-chart', native: false },
  { name: 'GaugeChart', category: 'Charts', href: '/components/gauge-chart', native: false },
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Documentation</h1>
        <p className="mt-2 text-sm text-ink-2">API reference for all 77+ components and 11 hooks.</p>
      </div>

      {/* Component Index */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">All Components</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Component</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Category</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Web</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Native</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3"></th>
              </tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.name} className="border-b border-line last:border-b-0 hover:bg-surface-field transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs font-medium text-accent">{c.name}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-3">{c.category}</td>
                  <td className="px-4 py-2.5 text-xs text-green">Yes</td>
                  <td className={`px-4 py-2.5 text-xs ${c.native ? 'text-green' : 'text-ink-3'}`}>{c.native ? 'Yes' : '\u2014'}</td>
                  <td className="px-4 py-2.5">
                    <Link href={c.href} className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                      View <ArrowRightIcon className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hooks Reference */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Hooks Reference</h2>
        <div className="space-y-3">
          {hooks.map((h) => (
            <div key={h.name} className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-mono text-sm font-semibold text-accent">{h.name}()</h3>
                  <p className="mt-0.5 text-xs text-ink-2">{h.desc}</p>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-surface-field px-3 py-2 font-mono text-[11px] text-ink-3 overflow-x-auto">
                {'{ '}{h.returns}{' }'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakpoints */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Responsive Breakpoints</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Breakpoint</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Width</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Tailwind Prefix</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Columns</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Mobile', width: '< 640px', prefix: 'default', cols: '4' },
                { name: 'Tablet', width: '640–1023px', prefix: 'sm:', cols: '8' },
                { name: 'Web', width: '1024–1439px', prefix: 'md:', cols: '12' },
                { name: 'Big Screen', width: '1440px+', prefix: 'lg:', cols: '16' },
              ].map((bp) => (
                <tr key={bp.name} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-2.5 text-xs font-medium text-ink">{bp.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-ink-2">{bp.width}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-accent">{bp.prefix}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-3">{bp.cols}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
