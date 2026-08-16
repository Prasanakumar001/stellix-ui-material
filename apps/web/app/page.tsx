'use client';

import React from 'react';
import {
  LoadingState,
  Thinking,
  StreamingText,
  ApprovalCard,
  ToolChips,
  TaskRows,
  Chat,
  PromptBar,
  RecommendationCard,
  ContextCards,
  CodeBlock,
  InsightCards,
  FineTuneCard,
  SelectionActions,
  DiffTable,
  RecordsTable,
  FilterTable,
} from '@stellix/ui-web';

const sampleThinkingSteps = [
  { id: '1', type: 'steps' as const, content: 'Breaking down the request into 3 sub-tasks: schema design, API routes, and frontend integration.', status: 'completed' as const, timestamp: Date.now() - 5000 },
  { id: '2', type: 'reasoning' as const, content: 'The user needs a dashboard with real-time data. Considering WebSocket vs SSE for live updates. SSE is simpler and sufficient for one-directional flow.', status: 'completed' as const, timestamp: Date.now() - 3000 },
  { id: '3', type: 'search' as const, content: 'Found 3 relevant docs: React Server Components guide, Next.js streaming patterns, and Tailwind dashboard templates.', status: 'completed' as const, timestamp: Date.now() - 1500 },
  { id: '4', type: 'coding' as const, content: 'Generating the Dashboard component with chart widgets, stat cards, and activity feed using Server Components...', status: 'active' as const },
];

const sampleTools = [
  { id: '1', name: 'readFile', status: 'success' as const, file: 'src/index.ts', additions: 12, deletions: 3, summary: 'Read the main entry file' },
  { id: '2', name: 'writeCode', status: 'running' as const, file: 'src/utils.ts' },
  { id: '3', name: 'runTests', status: 'error' as const, summary: '2 tests failed' },
];

const sampleTasks = [
  { id: '1', title: 'Initialize project structure', status: 'completed' as const, description: 'Created monorepo with pnpm workspaces, Turborepo, and TypeScript configuration.', duration: 2400 },
  { id: '2', title: 'Install dependencies', status: 'completed' as const, description: 'Installed Next.js 15, React 19, Tailwind CSS 4, and all peer dependencies.', progress: 100, duration: 8500 },
  { id: '3', title: 'Generate UI components', status: 'running' as const, description: 'Building 19 responsive components with Heroicons and Tailwind CSS.', progress: 65 },
  { id: '4', title: 'Run E2E test suite', status: 'queued' as const, description: 'Playwright tests across 4 viewports: Desktop, Tablet, Mobile, Large Screen.' },
  { id: '5', title: 'Deploy to staging', status: 'queued' as const },
];

const sampleMessages = [
  { id: '1', role: 'user' as const, content: 'Help me build a dashboard', timestamp: Date.now() },
  { id: '2', role: 'assistant' as const, content: 'I\'d be happy to help you build a dashboard! Let me start by analyzing your requirements and setting up the project structure.', timestamp: Date.now(), reasoning: 'User wants a dashboard. Considering Next.js App Router with Server Components for optimal performance.' },
  { id: '3', role: 'user' as const, content: 'Use real-time data with charts', timestamp: Date.now() },
  { id: '4', role: 'assistant' as const, content: 'Great choice! I\'ll integrate SSE for real-time updates and Recharts for the chart widgets. Let me generate the components now.', timestamp: Date.now() },
];

const sampleChunks = [
  { id: '1', title: 'React Best Practices', source: 'docs.react.dev', content: 'React recommends using functional components with hooks for state management. The useEffect hook handles side effects...', relevance: 95 },
  { id: '2', title: 'Tailwind CSS Guide', source: 'tailwindcss.com', content: 'Utility-first CSS framework for rapidly building custom designs. Use responsive prefixes like sm:, md:, lg: for breakpoints...', relevance: 88 },
  { id: '3', title: 'TypeScript Handbook', source: 'typescriptlang.org', content: 'TypeScript adds static type definitions to JavaScript. Use interfaces and types to define data shapes...', relevance: 82 },
];

const sampleInsights = [
  { id: '1', title: 'API Latency', description: 'p99 response time', data: [{ label: 'Mon', value: 120 }, { label: 'Tue', value: 95 }, { label: 'Wed', value: 140 }, { label: 'Thu', value: 110 }, { label: 'Fri', value: 85 }], chartType: 'line' as const },
  { id: '2', title: 'Error Rate', description: 'Last 7 days', data: [{ label: 'Mon', value: 3 }, { label: 'Tue', value: 1 }, { label: 'Wed', value: 5 }, { label: 'Thu', value: 2 }, { label: 'Fri', value: 1 }], chartType: 'bar' as const },
  { id: '3', title: 'Token Usage', description: 'Daily average', data: [{ label: 'Mon', value: 4500 }, { label: 'Tue', value: 5200 }, { label: 'Wed', value: 3800 }, { label: 'Thu', value: 6100 }, { label: 'Fri', value: 4900 }], chartType: 'area' as const },
];

const sampleProperties = [
  { id: '1', label: 'Font Size', type: 'slider' as const, value: 16, min: 10, max: 32, step: 1 },
  { id: '2', label: 'Dark Mode', type: 'toggle' as const, value: false },
  { id: '3', label: 'Accent Color', type: 'color' as const, value: '#6366f1' },
  { id: '4', label: 'Font Family', type: 'select' as const, value: 'Inter', options: ['Inter', 'Roboto', 'SF Pro', 'JetBrains Mono'] },
];

const sampleDiffHunks = [
  {
    id: 'h1',
    lines: [
      { type: 'unchanged' as const, content: 'import React from "react";', oldLineNumber: 1, newLineNumber: 1 },
      { type: 'remove' as const, content: 'import { useState } from "react";', oldLineNumber: 2 },
      { type: 'add' as const, content: 'import { useState, useEffect } from "react";', newLineNumber: 2 },
      { type: 'unchanged' as const, content: '', oldLineNumber: 3, newLineNumber: 3 },
      { type: 'remove' as const, content: 'function App() {', oldLineNumber: 4 },
      { type: 'add' as const, content: 'export default function App() {', newLineNumber: 4 },
      { type: 'unchanged' as const, content: '  const [count, setCount] = useState(0);', oldLineNumber: 5, newLineNumber: 5 },
      { type: 'add' as const, content: '  useEffect(() => { document.title = `Count: ${count}`; }, [count]);', newLineNumber: 6 },
      { type: 'unchanged' as const, content: '  return <div>{count}</div>;', oldLineNumber: 6, newLineNumber: 7 },
    ],
  },
];

const sampleRecordColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
];

const sampleRecordData = [
  { id: '1', name: 'Alice Johnson', email: 'alice@stellix.dev', role: 'Engineer', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@stellix.dev', role: 'Designer', status: 'Active' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@stellix.dev', role: 'PM', status: 'Away' },
  { id: '4', name: 'Diana Prince', email: 'diana@stellix.dev', role: 'Engineer', status: 'Active' },
  { id: '5', name: 'Eve Wilson', email: 'eve@stellix.dev', role: 'QA', status: 'Offline' },
];

const sampleFilterChips = [
  { id: 'Active', label: 'Active', count: 3 },
  { id: 'Away', label: 'Away', count: 1 },
  { id: 'Offline', label: 'Offline', count: 1 },
];

function StatefulFineTuneCard() {
  const [properties, setProperties] = React.useState<Array<{ id: string; label: string; type: 'slider' | 'color' | 'toggle' | 'select'; value: number | string | boolean; min?: number; max?: number; step?: number; options?: string[] }>>(sampleProperties);
  return (
    <FineTuneCard
      title="Appearance"
      properties={properties}
      onChange={(id, value) => {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, value } : p)),
        );
      }}
    />
  );
}

function DarkModeToggle() {
  const [dark, setDark] = React.useState(false);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-field px-3 py-1.5 text-xs font-medium text-ink-2 hover:text-ink hover:bg-line transition-colors"
      aria-label="Toggle dark mode"
      data-testid="dark-mode-toggle"
    >
      {dark ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      )}
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-canvas transition-colors duration-300">
      <header className="border-b border-line bg-surface px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">Stellix UI Material</h1>
            <p className="mt-1 text-sm text-ink-2">19 components · Web + React Native · Fully responsive</p>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:px-6 md:px-8">
        {/* Loading State */}
        <Section title="Loading State" id="loading-state">
          <div className="grid gap-4 sm:grid-cols-3">
            <LoadingState variant="drive" label="Drive variant" />
            <LoadingState variant="dots" label="Dots variant" />
            <LoadingState variant="orbit" label="Orbit variant" />
          </div>
        </Section>

        {/* Thinking */}
        <Section title="Thinking" id="thinking">
          <Thinking steps={sampleThinkingSteps} defaultOpen />
        </Section>

        {/* Streaming Text */}
        <Section title="Streaming Text" id="streaming-text">
          <StreamingText
            text="This is a streaming text demo. Each word appears one by one, simulating an AI response being generated in real-time. The component supports inline citations, follow-up suggestions, and a blinking cursor effect."
            citations={[
              { id: '1', label: 'React Docs', url: '#' },
              { id: '2', label: 'Next.js Guide', url: '#' },
            ]}
            followUps={['Tell me more about streaming', 'How does SSR work?', 'Show me an example']}
          />
        </Section>

        {/* Approval Card */}
        <Section title="Approval Card" id="approval-card">
          <ApprovalCard
            title="Deploy to Production?"
            description="The agent wants to deploy the latest changes to production."
            options={[
              { id: '1', label: 'Deploy now', description: 'Push changes immediately' },
              { id: '2', label: 'Schedule for later', description: 'Deploy during maintenance window' },
              { id: '3', label: 'Deploy to staging first', description: 'Test in staging environment' },
            ]}
            allowCustom
          />
        </Section>

        {/* Tool Chips */}
        <Section title="Tool Chips" id="tool-chips">
          <ToolChips tools={sampleTools} />
        </Section>

        {/* Task Rows */}
        <Section title="Task Rows" id="task-rows">
          <TaskRows tasks={sampleTasks} />
        </Section>

        {/* Chat */}
        <Section title="Chat" id="chat">
          <div className="h-80">
            <Chat messages={sampleMessages} tabs={['Chat', 'History']} />
          </div>
        </Section>

        {/* Prompt Bar */}
        <Section title="Prompt Bar" id="prompt-bar">
          <PromptBar
            sources={[
              { id: '1', name: 'project-docs', type: 'doc' },
              { id: '2', name: 'codebase', type: 'file' },
            ]}
            commands={[
              { id: '1', name: 'search', description: 'Search the codebase' },
              { id: '2', name: 'deploy', description: 'Deploy to production' },
            ]}
            models={[
              { id: '1', name: 'Claude Opus', provider: 'Anthropic' },
              { id: '2', name: 'Claude Sonnet', provider: 'Anthropic' },
            ]}
            enableDictation
          />
        </Section>

        {/* Recommendation Card */}
        <Section title="Recommendation Card" id="recommendation-card">
          <RecommendationCard
            title="Use Server Components"
            description="Based on the page structure, Server Components would reduce client-side JavaScript by ~40%."
            confidence={87}
            alternatives={[
              { id: '1', label: 'Keep Client Components', confidence: 45 },
              { id: '2', label: 'Hybrid Approach', confidence: 72 },
            ]}
          />
        </Section>

        {/* Context Cards */}
        <Section title="Context Cards" id="context-cards">
          <ContextCards chunks={sampleChunks} />
        </Section>

        {/* Code Block */}
        <Section title="Code Block" id="code-block">
          <CodeBlock
            code={`import { LoadingState, Chat } from '@stellix/ui-web';

export default function Dashboard() {
  return (
    <div className="flex gap-4">
      <LoadingState variant="orbit" />
      <Chat messages={[]} />
    </div>
  );
}`}
            language="tsx"
            streaming
            showLineNumbers
          />
        </Section>

        {/* Insight Cards */}
        <Section title="Insight Cards" id="insight-cards">
          <InsightCards insights={sampleInsights} />
        </Section>

        {/* Diff Table */}
        <Section title="Diff Table" id="diff-table">
          <DiffTable hunks={sampleDiffHunks} onAccept={(id) => console.log('accept', id)} onReject={(id) => console.log('reject', id)} />
        </Section>

        {/* Records Table */}
        <Section title="Records Table" id="records-table">
          <RecordsTable columns={sampleRecordColumns} data={sampleRecordData} selectable />
        </Section>

        {/* Filter Table */}
        <Section title="Filter Table" id="filter-table">
          <FilterTable filters={sampleFilterChips} data={sampleRecordData} columns={sampleRecordColumns} />
        </Section>

        {/* Fine-tune Card */}
        <Section title="Fine-tune Card" id="fine-tune-card">
          <StatefulFineTuneCard />
        </Section>

        {/* Selection Actions */}
        <Section title="Selection Actions" id="selection-actions">
          <SelectionActions onAction={(action, text) => console.log(action, text)}>
            <div className="rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6" data-testid="selectable-text">
              <p className="text-sm leading-relaxed text-ink-2 sm:text-base">
                Try selecting any part of this text to see the action toolbar appear.
                The toolbar provides options to <strong>Rewrite</strong>, <strong>Summarize</strong>, <strong>Explain</strong>, or <strong>Translate</strong> the selected text.
                On mobile devices, a bottom sheet appears instead of a floating toolbar.
              </p>
            </div>
          </SelectionActions>
        </Section>
      </main>

      <footer className="border-t border-line bg-surface px-6 py-4 text-center text-sm text-ink-3">
        Stellix UI Material v0.1.0 — Stellix Private Ltd
      </footer>
    </div>
  );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="mb-4 text-lg font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
