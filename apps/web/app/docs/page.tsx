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
  { name: 'LoadingState', category: 'Feedback', href: '/components/loading-state' },
  { name: 'Thinking', category: 'Feedback', href: '/components/thinking' },
  { name: 'TaskRows', category: 'Feedback', href: '/components/task-rows' },
  { name: 'StreamingText', category: 'Content', href: '/components/streaming-text' },
  { name: 'CodeBlock', category: 'Content', href: '/components/code-block' },
  { name: 'ContextCards', category: 'Content', href: '/components/context-cards' },
  { name: 'ApprovalCard', category: 'Forms', href: '/components/approval-card' },
  { name: 'PromptBar', category: 'Forms', href: '/components/prompt-bar' },
  { name: 'SelectionActions', category: 'Forms', href: '/components/selection-actions' },
  { name: 'DiffTable', category: 'Tables', href: '/components/diff-table' },
  { name: 'RecordsTable', category: 'Tables', href: '/components/records-table' },
  { name: 'FilterTable', category: 'Tables', href: '/components/filter-table' },
  { name: 'Chat', category: 'Navigation', href: '/components/chat' },
  { name: 'Search', category: 'Navigation', href: '/components/search' },
  { name: 'SidebarNav', category: 'Navigation', href: '/components/sidebar-nav' },
  { name: 'RecommendationCard', category: 'Cards', href: '/components/recommendation-card' },
  { name: 'InsightCards', category: 'Cards', href: '/components/insight-cards' },
  { name: 'ToolChips', category: 'Cards', href: '/components/tool-chips' },
  { name: 'FineTuneCard', category: 'Cards', href: '/components/fine-tune-card' },
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Documentation</h1>
        <p className="mt-2 text-sm text-ink-2">API reference for all 19 components and 11 hooks.</p>
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
                  <td className="px-4 py-2.5 text-xs text-green">Yes</td>
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
