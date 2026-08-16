'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  TableCellsIcon,
  CursorArrowRaysIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const nav = [
  { label: 'Overview', href: '/', icon: HomeIcon },
  { label: 'Setup', href: '/setup', icon: WrenchScrewdriverIcon },
  { label: 'Documentation', href: '/docs', icon: BookOpenIcon },
  {
    label: 'Feedback',
    icon: SparklesIcon,
    children: [
      { label: 'LoadingState', href: '/components/loading-state' },
      { label: 'Thinking', href: '/components/thinking' },
      { label: 'TaskRows', href: '/components/task-rows' },
    ],
  },
  {
    label: 'Content',
    icon: DocumentTextIcon,
    children: [
      { label: 'StreamingText', href: '/components/streaming-text' },
      { label: 'CodeBlock', href: '/components/code-block' },
      { label: 'ContextCards', href: '/components/context-cards' },
    ],
  },
  {
    label: 'Forms',
    icon: CursorArrowRaysIcon,
    children: [
      { label: 'ApprovalCard', href: '/components/approval-card' },
      { label: 'PromptBar', href: '/components/prompt-bar' },
      { label: 'SelectionActions', href: '/components/selection-actions' },
    ],
  },
  {
    label: 'Tables',
    icon: TableCellsIcon,
    children: [
      { label: 'DiffTable', href: '/components/diff-table' },
      { label: 'RecordsTable', href: '/components/records-table' },
      { label: 'FilterTable', href: '/components/filter-table' },
    ],
  },
  {
    label: 'Navigation',
    icon: ChatBubbleLeftRightIcon,
    children: [
      { label: 'Chat', href: '/components/chat' },
      { label: 'Search', href: '/components/search' },
      { label: 'SidebarNav', href: '/components/sidebar-nav' },
    ],
  },
  {
    label: 'Cards & Controls',
    icon: RectangleGroupIcon,
    children: [
      { label: 'RecommendationCard', href: '/components/recommendation-card' },
      { label: 'InsightCards', href: '/components/insight-cards' },
      { label: 'ToolChips', href: '/components/tool-chips' },
      { label: 'FineTuneCard', href: '/components/fine-tune-card' },
    ],
  },
  {
    label: 'Primitives',
    icon: CursorArrowRaysIcon,
    children: [
      { label: 'Button', href: '/components/button' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Tag', href: '/components/tag' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'Input', href: '/components/input' },
      { label: 'Textarea', href: '/components/textarea' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Switch', href: '/components/switch' },
    ],
  },
  {
    label: 'Feedback',
    icon: SparklesIcon,
    children: [
      { label: 'Toast', href: '/components/toast' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'ProgressBar', href: '/components/progress-bar' },
      { label: 'Spinner', href: '/components/spinner' },
      { label: 'SkeletonBlock', href: '/components/skeleton-block' },
      { label: 'EmptyState', href: '/components/empty-state' },
      { label: 'StepIndicator', href: '/components/step-indicator' },
    ],
  },
  {
    label: 'Layout',
    icon: RectangleGroupIcon,
    children: [
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Pagination', href: '/components/pagination' },
      { label: 'Dropdown', href: '/components/dropdown' },
      { label: 'Modal', href: '/components/modal' },
      { label: 'Drawer', href: '/components/drawer' },
      { label: 'Accordion', href: '/components/accordion' },
    ],
  },
  {
    label: 'Data Display',
    icon: TableCellsIcon,
    children: [
      { label: 'DataCard', href: '/components/data-card' },
      { label: 'TimelineView', href: '/components/timeline-view' },
      { label: 'FileTree', href: '/components/file-tree' },
      { label: 'JSONViewer', href: '/components/json-viewer' },
      { label: 'MarkdownView', href: '/components/markdown-view' },
      { label: 'Changelog', href: '/components/changelog' },
      { label: 'ActivityFeed', href: '/components/activity-feed' },
    ],
  },
  {
    label: 'AI / Agent',
    icon: SparklesIcon,
    children: [
      { label: 'AgentStatus', href: '/components/agent-status' },
      { label: 'ToolCallCard', href: '/components/tool-call-card' },
      { label: 'ModelSelector', href: '/components/model-selector' },
      { label: 'TokenCounter', href: '/components/token-counter' },
      { label: 'ConversationList', href: '/components/conversation-list' },
      { label: 'SystemPrompt', href: '/components/system-prompt' },
    ],
  },
];

function NavGroup({ item, pathname }: { item: (typeof nav)[number]; pathname: string }) {
  const hasChildren = 'children' in item && item.children;
  const isActive = hasChildren
    ? item.children.some((c) => pathname === c.href)
    : pathname === item.href;
  const [open, setOpen] = useState<boolean>(true);
  const Icon = item.icon;

  if (!hasChildren) {
    return (
      <Link
        href={item.href!}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          pathname === item.href
            ? 'bg-accent/10 text-accent'
            : 'text-ink-2 hover:bg-surface-field hover:text-ink'
        }`}
      >
        <Icon className="h-4 w-4" />
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface-field hover:text-ink transition-colors"
      >
        <Icon className="h-4 w-4" />
        <span className="flex-1 text-left">{item.label}</span>
        <span className="rounded bg-surface-field px-1.5 text-[10px] text-ink-3">{item.children.length}</span>
        <ChevronDownIcon className={`h-3 w-3 text-ink-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-line pl-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                pathname === child.href
                  ? 'text-accent font-medium bg-accent/5'
                  : 'text-ink-3 hover:text-ink hover:bg-surface-field'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };
  return (
    <div className="border-t border-line p-3">
      <button
        onClick={toggle}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface-field hover:text-ink transition-colors"
        aria-label="Toggle dark mode"
      >
        {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
        <Squares2X2Icon className="h-5 w-5 text-accent" />
        <div>
          <div className="text-sm font-bold text-ink">Stellix UI</div>
          <div className="text-[10px] text-ink-3">v0.1.3 — 19 components</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => (
          <NavGroup key={item.label} item={item} pathname={pathname} />
        ))}
      </nav>
      <DarkModeToggle />
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-3 z-50 rounded-lg border border-line bg-surface p-2 shadow-card md:hidden"
        aria-label="Open navigation"
      >
        <Bars3Icon className="h-5 w-5 text-ink" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-72 border-r border-line bg-surface shadow-modal">
            <div className="flex justify-end p-2">
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-ink-3 hover:text-ink">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            {content}
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line bg-surface md:block lg:w-72">
        {content}
      </aside>
    </>
  );
}
