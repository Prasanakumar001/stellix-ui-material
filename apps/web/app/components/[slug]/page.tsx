'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ComponentPage } from '../ComponentPage';
import {
  LoadingState,
  Thinking,
  TaskRows,
  StreamingText,
  CodeBlock,
  ContextCards,
  ApprovalCard,
  PromptBar,
  SelectionActions,
  DiffTable,
  RecordsTable,
  FilterTable,
  Chat,
  SidebarNav,
  RecommendationCard,
  InsightCards,
  ToolChips,
  FineTuneCard,
  // Phase 10 variants
  PulseLoader, SkeletonLoader, ProgressLoader, WaveLoader, TypingLoader,
  CapsuleTaskRows, KanbanTaskRows, TimelineTaskRows,
  BubbleChat, ThreadChat, AgentChat,
  TerminalBlock, MultiFileBlock, DiffBlock,
  DonutChart, GaugeChart,
  MultiStepApproval,
  ComparisonCard,
  // Phase 11 components
  Button, Badge, Avatar, Tag, Tooltip, Toggle,
  Input, Textarea, Select, Checkbox, Radio, Switch,
  Toast, Alert, ProgressBar, Spinner, SkeletonBlock, EmptyState, StepIndicator,
  Tabs, Breadcrumb, Pagination, Dropdown, Modal, Drawer, Accordion,
  DataCard, TimelineView, FileTree, JSONViewer, MarkdownView, Changelog, ActivityFeed,
  AgentStatus, ToolCallCard, ModelSelector, TokenCounter, ConversationList, SystemPrompt,
  // Phase 12 compositions
  AIChatLayout, DashboardLayout, AgentWorkbench, CodeReview, DataExplorer, OnboardingWizard,
  // Phase 13 animations
  GlimmEffect, GlidingHighlight, MorphTransition, ConfettiEffect,
  TypewriterEffect, NumberTicker, ProgressRing, RippleEffect, ShakeAnimation, SlideReveal,
  // Phase 14 themes
  ThemeSwitcher, ThemeBuilder,
} from '@stellix/ui-web';

// --- Search is rendered inline to avoid fixed-position overlay escaping preview ---
function SearchPreview() {
  const [open, setOpen] = React.useState(false);
  const results = [
    { id: '1', title: 'LoadingState', description: 'Animated loading indicators', category: 'Feedback' },
    { id: '2', title: 'TaskRows', description: 'Multi-step task progress', category: 'Feedback' },
    { id: '3', title: 'StreamingText', description: 'Token-by-token text reveal', category: 'Content' },
    { id: '4', title: 'CodeBlock', description: 'Syntax-highlighted code', category: 'Content' },
    { id: '5', title: 'Chat', description: 'Conversational UI thread', category: 'Navigation' },
  ];
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm text-ink-2 hover:bg-surface-field transition-colors"
      >
        <span>Search components...</span>
        <kbd className="rounded bg-surface-field px-1.5 py-0.5 text-[10px] font-mono text-ink-3">Cmd+K</kbd>
      </button>
      {open && (
        <div className="rounded-xl border border-line bg-surface shadow-modal overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <svg className="h-4 w-4 text-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input autoFocus className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3" placeholder="Search components..." />
          </div>
          <div className="p-2">
            {results.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-field cursor-pointer">
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">{r.title}</div>
                  <div className="text-xs text-ink-3">{r.description}</div>
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">{r.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Registry -------------------------------------------------------------------

type PropsRow = { name: string; type: string; default: string; description: string };

interface ComponentConfig {
  title: string;
  description: string;
  category: string;
  preview: React.ReactNode;
  webCode: string;
  nativeCode: string;
  propsTable: PropsRow[];
}

const componentRegistry: Record<string, ComponentConfig> = {
  // -- Feedback ------------------------------------------------------------------
  'loading-state': {
    title: 'LoadingState',
    description:
      'Animated loading indicators with three variants - pixel-grid Drive, bouncing Dots, and spinning Orbit - plus an optional elapsed timer and label.',
    category: 'Feedback',
    preview: (
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Original Variants</p>
          <div className="flex flex-wrap items-center gap-6">
            <LoadingState variant="drive" label="Drive" showTimer />
            <LoadingState variant="dots" label="Dots" />
            <LoadingState variant="orbit" label="Orbit" />
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">New Variants</p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4">
              <PulseLoader />
              <span className="text-xs text-ink-3">Pulse</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4">
              <ProgressLoader />
              <span className="text-xs text-ink-3">Progress</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4">
              <WaveLoader />
              <span className="text-xs text-ink-3">Wave</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4">
              <TypingLoader />
              <span className="text-xs text-ink-3">Typing</span>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Skeleton</p>
          <div className="rounded-xl border border-line bg-surface p-4">
            <SkeletonLoader />
          </div>
        </div>
      </div>
    ),
    webCode: `import { LoadingState } from '@stellix/ui-web';

// Drive (pixel grid) with timer
<LoadingState variant="drive" label="Processing..." showTimer />

// Bouncing dots
<LoadingState variant="dots" label="Thinking..." />

// Orbit spinner (no label)
<LoadingState variant="orbit" />`,
    nativeCode: `import { LoadingState } from '@stellix/ui-native';

// Drive with timer
<LoadingState variant="drive" label="Processing..." showTimer />

// Dots
<LoadingState variant="dots" label="Thinking..." />

// Orbit
<LoadingState variant="orbit" />`,
    propsTable: [
      { name: 'variant', type: "'drive' | 'dots' | 'orbit'", default: "'drive'", description: 'Visual style of the loader.' },
      { name: 'label', type: 'string', default: '-', description: 'Optional text shown below the animation.' },
      { name: 'showTimer', type: 'boolean', default: 'false', description: 'Display an elapsed-time counter.' },
    ],
  },

  thinking: {
    title: 'Thinking',
    description:
      'Expandable trace panel that surfaces an AI model\"s internal reasoning steps - supports steps, reasoning, search and coding trace types with active/completed states.',
    category: 'Feedback',
    preview: (
      <Thinking
        defaultOpen
        steps={[
          { id: '1', type: 'steps', content: 'Breaking the problem into sub-tasks.', status: 'completed' },
          { id: '2', type: 'reasoning', content: 'Evaluating trade-offs between approaches.', status: 'active' },
          { id: '3', type: 'search', content: 'Querying internal knowledge base for relevant docs.', status: 'completed' },
          { id: '4', type: 'coding', content: 'Generating TypeScript implementation.', status: 'active' },
        ]}
      />
    ),
    webCode: `import { Thinking } from '@stellix/ui-web';

<Thinking
  defaultOpen
  steps={[
    { id: '1', type: 'steps',     content: 'Breaking the problem into sub-tasks.',           status: 'completed' },
    { id: '2', type: 'reasoning', content: 'Evaluating trade-offs between approaches.',       status: 'active' },
    { id: '3', type: 'search',    content: 'Querying internal knowledge base.',               status: 'completed' },
    { id: '4', type: 'coding',    content: 'Generating TypeScript implementation.',           status: 'active' },
  ]}
/>`,
    nativeCode: `import { Thinking } from '@stellix/ui-native';

<Thinking
  defaultOpen
  steps={[
    { id: '1', type: 'steps',     content: 'Breaking the problem into sub-tasks.',     status: 'completed' },
    { id: '2', type: 'reasoning', content: 'Evaluating trade-offs.',                   status: 'active' },
    { id: '3', type: 'search',    content: 'Querying knowledge base.',                 status: 'completed' },
    { id: '4', type: 'coding',    content: 'Generating TypeScript implementation.',    status: 'active' },
  ]}
/>`,
    propsTable: [
      { name: 'steps', type: 'ThinkingStep[]', default: '[]', description: 'Array of trace steps to display.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Expand the panel on first render.' },
    ],
  },

  'task-rows': {
    title: 'TaskRows',
    description:
      'A list of agent task rows with status badges (running, completed, failed, queued), animated progress bars, and optionally expandable detail drawers.',
    category: 'Feedback',
    preview: (() => {
      const tasks = [
        { id: '1', title: 'Ingest document corpus', status: 'completed' as const, progress: 100, duration: 1240 },
        { id: '2', title: 'Embed chunks into vector store', status: 'running' as const, progress: 62, description: 'Processing batch 3 of 5' },
        { id: '3', title: 'Fine-tune retrieval model', status: 'queued' as const },
        { id: '4', title: 'Validate output schema', status: 'failed' as const, description: 'JSON schema mismatch on field "confidence"' },
      ];
      return (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">List (Default)</p>
            <TaskRows expandable tasks={tasks} />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Capsule</p>
            <CapsuleTaskRows tasks={tasks} />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Kanban</p>
            <KanbanTaskRows tasks={tasks} />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Timeline</p>
            <TimelineTaskRows tasks={tasks} />
          </div>
        </div>
      );
    })(),
    webCode: `import { TaskRows } from '@stellix/ui-web';

<TaskRows
  expandable
  tasks={[
    { id: '1', title: 'Ingest document corpus',       status: 'completed', progress: 100, duration: 1240 },
    { id: '2', title: 'Embed chunks into vector store', status: 'running',   progress: 62,  description: 'Processing batch 3 of 5' },
    { id: '3', title: 'Fine-tune retrieval model',    status: 'queued' },
    { id: '4', title: 'Validate output schema',       status: 'failed',    description: 'JSON schema mismatch on field "confidence"' },
  ]}
/>`,
    nativeCode: `import { TaskRows } from '@stellix/ui-native';

<TaskRows
  expandable
  tasks={[
    { id: '1', title: 'Ingest document corpus',       status: 'completed', progress: 100 },
    { id: '2', title: 'Embed chunks into vector store', status: 'running',   progress: 62 },
    { id: '3', title: 'Fine-tune retrieval model',    status: 'queued' },
    { id: '4', title: 'Validate output schema',       status: 'failed' },
  ]}
/>`,
    propsTable: [
      { name: 'tasks', type: 'TaskItem[]', default: '[]', description: 'Task definitions to render.' },
      { name: 'expandable', type: 'boolean', default: 'false', description: 'Allow rows to expand and show description.' },
    ],
  },

  // -- Content -------------------------------------------------------------------
  'streaming-text': {
    title: 'StreamingText',
    description:
      'Streams text token-by-token with a configurable speed, inline citation chips, follow-up question suggestions, and a post-stream action toolbar (copy, like, share).',
    category: 'Content',
    preview: (
      <StreamingText
        speed={30}
        text="Stellix UI Material is a production-ready component library designed for agentic AI interfaces. It ships 19 cross-platform components, 11 headless hooks, and full dark-mode support out of the box."
        citations={[
          { id: '1', label: 'Docs', url: 'https://stellix.dev' },
          { id: '2', label: 'GitHub' },
        ]}
        followUps={['How do I install it?', 'Which framework is supported?']}
      />
    ),
    webCode: `import { StreamingText } from '@stellix/ui-web';

<StreamingText
  speed={30}
  text="Stellix UI Material ships 19 components for agentic AI interfaces."
  citations={[
    { id: '1', label: 'Docs', url: 'https://stellix.dev' },
    { id: '2', label: 'GitHub' },
  ]}
  followUps={['How do I install it?', 'Which framework is supported?']}
/>`,
    nativeCode: `import { StreamingText } from '@stellix/ui-native';

<StreamingText
  speed={30}
  text="Stellix UI Material ships 19 components for agentic AI interfaces."
  citations={[{ id: '1', label: 'Docs', url: 'https://stellix.dev' }]}
  followUps={['How do I install it?']}
/>`,
    propsTable: [
      { name: 'text', type: 'string', default: '-', description: 'Full text to stream.' },
      { name: 'speed', type: 'number', default: '40', description: 'Characters revealed per second.' },
      { name: 'citations', type: 'Citation[]', default: '[]', description: 'Inline source chips appended after the text.' },
      { name: 'followUps', type: 'string[]', default: '[]', description: 'Suggested follow-up questions shown after streaming completes.' },
      { name: 'onComplete', type: '() => void', default: '-', description: 'Callback fired when streaming finishes.' },
    ],
  },

  'code-block': {
    title: 'CodeBlock',
    description:
      'A dark-themed syntax-highlighted code block with optional streaming mode, line numbers, copy button, and language label.',
    category: 'Content',
    preview: (
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Default</p>
          <CodeBlock language="typescript" showLineNumbers code={`const greeting = 'Hello, Stellix!';\nconsole.log(greeting);`} />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Terminal</p>
          <TerminalBlock commands={['$ npm install @stellix/ui-web', 'added 42 packages in 3.2s', '$ npm run dev', 'ready - started server on http://localhost:3000']} />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Multi-File</p>
          <MultiFileBlock files={[{ name: 'App.tsx', language: 'tsx', code: `export default function App() {\n  return <div>Hello</div>;\n}` }, { name: 'index.ts', language: 'ts', code: `export { App } from './App';` }]} />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Diff</p>
          <DiffBlock lines={[{ type: 'unchanged', content: 'const name = "Stellix";' }, { type: 'remove', content: 'const version = "0.1.0";' }, { type: 'add', content: 'const version = "0.1.4";' }, { type: 'unchanged', content: 'export { name, version };' }]} />
        </div>
      </div>
    ),
    webCode: `import { CodeBlock } from '@stellix/ui-web';

// Static render with line numbers
<CodeBlock
  language="typescript"
  showLineNumbers
  code={sourceCode}
/>

// Streaming mode (animates in line by line)
<CodeBlock
  language="python"
  streaming
  code={generatedCode}
  onCopy={() => console.log('copied')}
/>`,
    nativeCode: `import { CodeBlock } from '@stellix/ui-native';

<CodeBlock
  language="typescript"
  showLineNumbers
  code={sourceCode}
/>`,
    propsTable: [
      { name: 'code', type: 'string', default: '-', description: 'Source code string to display.' },
      { name: 'language', type: 'string', default: "'typescript'", description: 'Language label shown in the header.' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Animate lines in one-by-one.' },
      { name: 'showLineNumbers', type: 'boolean', default: 'true', description: 'Toggle line number gutter.' },
      { name: 'onCopy', type: '() => void', default: '-', description: 'Callback fired after copy button click.' },
    ],
  },

  'context-cards': {
    title: 'ContextCards',
    description:
      'A grid of retrieved-context cards showing title, source, relevance percentage, and a truncated content preview that can be expanded inline.',
    category: 'Content',
    preview: (
      <ContextCards
        chunks={[
          {
            id: '1',
            title: 'Transformer Architecture Overview',
            source: 'arxiv.org/abs/1706.03762',
            content:
              'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The Transformer model eschews recurrence entirely and relies instead on an attention mechanism.',
            relevance: 94,
          },
          {
            id: '2',
            title: 'Mixture of Experts Scaling',
            source: 'arxiv.org/abs/2101.03961',
            content:
              'Switch Transformer demonstrates that sparsely gated MoE models can dramatically increase model capacity while keeping the computation constant by routing each token to a single expert.',
            relevance: 78,
          },
          {
            id: '3',
            title: 'Retrieval-Augmented Generation',
            source: 'ai.meta.com/research/rag',
            content:
              'RAG combines a retrieval component with a generation model, enabling the system to retrieve relevant documents from an external knowledge source before generating a response.',
            relevance: 61,
          },
        ]}
      />
    ),
    webCode: `import { ContextCards } from '@stellix/ui-web';

<ContextCards
  chunks={[
    {
      id: '1',
      title: 'Transformer Architecture Overview',
      source: 'arxiv.org/abs/1706.03762',
      content: 'The dominant sequence transduction models are based on...',
      relevance: 94,
    },
    {
      id: '2',
      title: 'Mixture of Experts Scaling',
      source: 'arxiv.org/abs/2101.03961',
      content: 'Switch Transformer demonstrates that sparsely gated...',
      relevance: 78,
    },
  ]}
/>`,
    nativeCode: `import { ContextCards } from '@stellix/ui-native';

<ContextCards
  chunks={[
    { id: '1', title: 'Transformer Overview', source: 'arxiv.org', content: 'Attention is all you need...', relevance: 94 },
    { id: '2', title: 'MoE Scaling',          source: 'arxiv.org', content: 'Sparse gating reduces compute...', relevance: 78 },
  ]}
/>`,
    propsTable: [
      { name: 'chunks', type: 'ContextChunk[]', default: '-', description: 'Array of retrieved context items to render.' },
    ],
  },

  // -- Forms ---------------------------------------------------------------------
  'approval-card': {
    title: 'ApprovalCard',
    description:
      'A human-in-the-loop approval widget with radio or checkbox option selection, optional risk level badge, custom text input, and approve / reject callbacks.',
    category: 'Forms',
    preview: (
      <ApprovalCard
        title="Deploy to production?"
        description="The agent wants to push the compiled build to the production cluster. This action is irreversible."
        type="radio"
        options={[
          { id: 'approve', label: 'Approve', description: 'Proceed with deployment immediately.' },
          { id: 'staging', label: 'Deploy to staging first', description: 'Run smoke tests before going live.' },
          { id: 'reject', label: 'Reject', description: 'Cancel the deployment entirely.' },
        ]}
        onApprove={(selected) => console.log('approved', selected)}
        onReject={() => console.log('rejected')}
      />
    ),
    webCode: `import { ApprovalCard } from '@stellix/ui-web';

<ApprovalCard
  title="Deploy to production?"
  description="The agent wants to push the compiled build to the production cluster."
  type="radio"
  options={[
    { id: 'approve',  label: 'Approve',                   description: 'Proceed with deployment immediately.' },
    { id: 'staging',  label: 'Deploy to staging first',   description: 'Run smoke tests before going live.' },
    { id: 'reject',   label: 'Reject',                    description: 'Cancel the deployment entirely.' },
  ]}
  onApprove={(selected) => console.log('approved', selected)}
  onReject={() => console.log('rejected')}
/>`,
    nativeCode: `import { ApprovalCard } from '@stellix/ui-native';

<ApprovalCard
  title="Deploy to production?"
  type="radio"
  options={[
    { id: 'approve', label: 'Approve' },
    { id: 'reject',  label: 'Reject' },
  ]}
  onApprove={(ids) => console.log(ids)}
  onReject={() => console.log('rejected')}
/>`,
    propsTable: [
      { name: 'title', type: 'string', default: '-', description: 'Heading text for the card.' },
      { name: 'description', type: 'string', default: '-', description: 'Supporting detail shown below the title.' },
      { name: 'options', type: 'ApprovalOption[]', default: '-', description: 'Selectable choices to show.' },
      { name: 'type', type: "'radio' | 'checkbox'", default: "'radio'", description: 'Single or multi-select mode.' },
      { name: 'allowCustom', type: 'boolean', default: 'false', description: 'Show a free-text input option.' },
      { name: 'onApprove', type: '(selected: string[]) => void', default: '-', description: 'Fired with selected option IDs on approve.' },
      { name: 'onReject', type: '() => void', default: '-', description: 'Fired when the user clicks Reject.' },
    ],
  },

  'prompt-bar': {
    title: 'PromptBar',
    description:
      'A rich chat input bar with auto-growing textarea, source picker (@), slash-command palette (/), model selector, dictation toggle, and submit button.',
    category: 'Forms',
    preview: (
      <PromptBar
        placeholder="Ask the agent anything..."
        sources={[
          { id: 's1', name: 'README.md', type: 'file' },
          { id: 's2', name: 'API Reference', type: 'doc' },
          { id: 's3', name: 'https://stellix.dev', type: 'url' },
        ]}
        commands={[
          { id: 'c1', name: '/summarize', description: 'Summarise the current context', shortcut: 'S' },
          { id: 'c2', name: '/explain', description: 'Explain selected code', shortcut: 'E' },
          { id: 'c3', name: '/refactor', description: 'Refactor selected code', shortcut: 'R' },
        ]}
        models={[
          { id: 'm1', name: 'Chimera-70B', provider: 'Stellix' },
          { id: 'm2', name: 'GPT-4o', provider: 'OpenAI' },
          { id: 'm3', name: 'Claude 3.5', provider: 'Anthropic' },
        ]}
        onSubmit={(value) => console.log('submit', value)}
      />
    ),
    webCode: `import { PromptBar } from '@stellix/ui-web';

<PromptBar
  placeholder="Ask the agent anything..."
  sources={[
    { id: 's1', name: 'README.md',           type: 'file' },
    { id: 's2', name: 'API Reference',       type: 'doc' },
    { id: 's3', name: 'https://stellix.dev', type: 'url' },
  ]}
  commands={[
    { id: 'c1', name: '/summarize', description: 'Summarise context', shortcut: 'S' },
    { id: 'c2', name: '/explain',   description: 'Explain code',      shortcut: 'E' },
  ]}
  models={[
    { id: 'm1', name: 'Chimera-70B', provider: 'Stellix' },
    { id: 'm2', name: 'GPT-4o',      provider: 'OpenAI' },
  ]}
  onSubmit={(value) => handleSend(value)}
/>`,
    nativeCode: `import { PromptBar } from '@stellix/ui-native';

<PromptBar
  placeholder="Ask anything..."
  models={[{ id: 'm1', name: 'Chimera-70B', provider: 'Stellix' }]}
  onSubmit={(value) => handleSend(value)}
/>`,
    propsTable: [
      { name: 'placeholder', type: 'string', default: "'Ask anything...'", description: 'Textarea placeholder text.' },
      { name: 'sources', type: 'SourceItem[]', default: '[]', description: 'Items shown in the @ source picker.' },
      { name: 'commands', type: 'CommandItem[]', default: '[]', description: 'Items shown in the / command palette.' },
      { name: 'models', type: 'ModelOption[]', default: '[]', description: 'Models available in the model switcher.' },
      { name: 'onSubmit', type: '(value: string, files?: File[]) => void', default: '-', description: 'Fired on submit with the typed message and any attachments.' },
      { name: 'enableDictation', type: 'boolean', default: 'false', description: 'Show the dictation microphone button.' },
    ],
  },

  'selection-actions': {
    title: 'SelectionActions',
    description:
      'Wraps any text content and shows a floating action toolbar (desktop) or bottom sheet (mobile) whenever the user selects text, offering rewrite, summarize, explain, and translate actions.',
    category: 'Forms',
    preview: (
      <SelectionActions
        actions={['rewrite', 'summarize', 'explain', 'translate']}
        onAction={(action, text) => console.log(action, text)}
      >
        <p className="text-sm leading-relaxed text-ink-2 select-text">
          Select any portion of this paragraph to trigger the floating action toolbar. The
          component uses the browser&apos;s native Selection API to detect highlighted text and
          positions the toolbar relative to the selection rectangle. On mobile devices a bottom
          sheet appears instead.
        </p>
      </SelectionActions>
    ),
    webCode: `import { SelectionActions } from '@stellix/ui-web';

<SelectionActions
  actions={['rewrite', 'summarize', 'explain', 'translate']}
  onAction={(action, selectedText) => {
    console.log(\`\${action}: \${selectedText}\`);
  }}
>
  <p>Select any part of this text to trigger the toolbar.</p>
</SelectionActions>`,
    nativeCode: `import { SelectionActions } from '@stellix/ui-native';

<SelectionActions
  actions={['rewrite', 'summarize', 'explain']}
  onAction={(action, text) => console.log(action, text)}
>
  <Text>Select any part of this text to trigger the bottom sheet.</Text>
</SelectionActions>`,
    propsTable: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Content inside which text selection is tracked.' },
      { name: 'actions', type: 'SelectionAction[]', default: "['rewrite','summarize','explain','translate']", description: 'Actions to show in the toolbar.' },
      { name: 'onAction', type: '(action, text) => void', default: '-', description: 'Fired with the action key and selected text.' },
    ],
  },

  // -- Tables --------------------------------------------------------------------
  'diff-table': {
    title: 'DiffTable',
    description:
      'Renders code diffs in unified or split view with added/removed line counts, accept/reject hunk actions, and syntax-highlighted monospace display.',
    category: 'Tables',
    preview: (
      <DiffTable
        mode="unified"
        hunks={[
          {
            id: 'h1',
            lines: [
              { type: 'unchanged', content: 'export function greet(name: string) {', oldLineNumber: 1, newLineNumber: 1 },
              { type: 'remove', content: "  return 'Hello, ' + name;", oldLineNumber: 2 },
              { type: 'add', content: '  return `Hello, ${name}!`;', newLineNumber: 2 },
              { type: 'unchanged', content: '}', oldLineNumber: 3, newLineNumber: 3 },
            ],
          },
        ]}
        onAccept={(id) => console.log('accept', id)}
        onReject={(id) => console.log('reject', id)}
      />
    ),
    webCode: `import { DiffTable } from '@stellix/ui-web';

<DiffTable
  mode="unified"
  hunks={[
    {
      id: 'h1',
      lines: [
        { type: 'unchanged', content: 'export function greet(name: string) {', oldLineNumber: 1, newLineNumber: 1 },
        { type: 'remove',    content: "  return 'Hello, ' + name;",            oldLineNumber: 2 },
        { type: 'add',       content: '  return \`Hello, \${name}!\`;',           newLineNumber: 2 },
        { type: 'unchanged', content: '}',                                     oldLineNumber: 3, newLineNumber: 3 },
      ],
    },
  ]}
  onAccept={(hunkId) => applyHunk(hunkId)}
  onReject={(hunkId) => dismissHunk(hunkId)}
/>`,
    nativeCode: `import { DiffTable } from '@stellix/ui-native';

<DiffTable
  mode="unified"
  hunks={[
    {
      id: 'h1',
      lines: [
        { type: 'unchanged', content: 'function greet(name) {' },
        { type: 'remove',    content: "  return 'Hi ' + name;" },
        { type: 'add',       content: '  return \`Hi \${name}!\`;' },
        { type: 'unchanged', content: '}' },
      ],
    },
  ]}
/>`,
    propsTable: [
      { name: 'hunks', type: 'DiffHunk[]', default: '-', description: 'Array of diff hunks to render.' },
      { name: 'mode', type: "'unified' | 'split'", default: "'unified'", description: 'Diff display mode.' },
      { name: 'onAccept', type: '(hunkId: string) => void', default: '-', description: 'Fired when the user clicks Accept on a hunk.' },
      { name: 'onReject', type: '(hunkId: string) => void', default: '-', description: 'Fired when the user clicks Reject on a hunk.' },
    ],
  },

  'records-table': {
    title: 'RecordsTable',
    description:
      'A sortable, optionally selectable data table with a mobile card view fallback, column header sort indicators, and a selected-count badge.',
    category: 'Tables',
    preview: (
      <RecordsTable
        selectable
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'role', label: 'Role', sortable: true },
          { key: 'status', label: 'Status' },
          { key: 'joined', label: 'Joined', sortable: true },
        ]}
        data={[
          { id: '1', name: 'Ada Lovelace', role: 'Engineer', status: 'Active', joined: '2023-01-15' },
          { id: '2', name: 'Alan Turing', role: 'Researcher', status: 'Active', joined: '2023-03-20' },
          { id: '3', name: 'Grace Hopper', role: 'Engineer', status: 'Inactive', joined: '2022-11-01' },
          { id: '4', name: 'John von Neumann', role: 'Architect', status: 'Active', joined: '2024-06-30' },
        ]}
        onSelect={(ids) => console.log('selected', ids)}
        onSort={(key, dir) => console.log('sort', key, dir)}
      />
    ),
    webCode: `import { RecordsTable } from '@stellix/ui-web';

<RecordsTable
  selectable
  columns={[
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role',   sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'joined', label: 'Joined', sortable: true },
  ]}
  data={[
    { id: '1', name: 'Ada Lovelace',      role: 'Engineer',   status: 'Active',   joined: '2023-01-15' },
    { id: '2', name: 'Alan Turing',        role: 'Researcher', status: 'Active',   joined: '2023-03-20' },
    { id: '3', name: 'Grace Hopper',       role: 'Engineer',   status: 'Inactive', joined: '2022-11-01' },
  ]}
  onSelect={(ids) => console.log('selected', ids)}
  onSort={(key, direction) => console.log(key, direction)}
/>`,
    nativeCode: `import { RecordsTable } from '@stellix/ui-native';

<RecordsTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
  ]}
  data={[
    { id: '1', name: 'Ada Lovelace', role: 'Engineer' },
    { id: '2', name: 'Alan Turing',  role: 'Researcher' },
  ]}
/>`,
    propsTable: [
      { name: 'columns', type: 'TableColumn[]', default: '-', description: 'Column definitions including key, label, and sortable flag.' },
      { name: 'data', type: 'Record<string, unknown>[]', default: '-', description: 'Row data; each row must have an id field.' },
      { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row checkboxes and select-all header.' },
      { name: 'onSort', type: '(key, direction) => void', default: '-', description: 'Fired when a sortable column header is clicked.' },
      { name: 'onSelect', type: '(ids: string[]) => void', default: '-', description: 'Fired with selected row IDs when selection changes.' },
    ],
  },

  'filter-table': {
    title: 'FilterTable',
    description:
      'A table with a horizontally scrollable filter-chip bar above it. Active chips filter the displayed rows; chips show optional result counts.',
    category: 'Tables',
    preview: (
      <FilterTable
        filters={[
          { id: 'all', label: 'All', count: 5, active: true },
          { id: 'active', label: 'Active', count: 3 },
          { id: 'inactive', label: 'Inactive', count: 1 },
          { id: 'pending', label: 'Pending', count: 1 },
        ]}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' },
          { key: 'updated', label: 'Updated' },
        ]}
        data={[
          { id: '1', name: 'Project Alpha', status: 'active', updated: '2 hours ago' },
          { id: '2', name: 'Project Beta', status: 'inactive', updated: '3 days ago' },
          { id: '3', name: 'Project Gamma', status: 'active', updated: '1 day ago' },
          { id: '4', name: 'Project Delta', status: 'pending', updated: '5 hours ago' },
          { id: '5', name: 'Project Epsilon', status: 'active', updated: '30 minutes ago' },
        ]}
        onFilterChange={(active) => console.log('filters', active)}
      />
    ),
    webCode: `import { FilterTable } from '@stellix/ui-web';

<FilterTable
  filters={[
    { id: 'all',      label: 'All',      count: 5, active: true },
    { id: 'active',   label: 'Active',   count: 3 },
    { id: 'inactive', label: 'Inactive', count: 1 },
    { id: 'pending',  label: 'Pending',  count: 1 },
  ]}
  columns={[
    { key: 'name',    label: 'Name' },
    { key: 'status',  label: 'Status' },
    { key: 'updated', label: 'Updated' },
  ]}
  data={rows}
  onFilterChange={(activeFilters) => console.log(activeFilters)}
/>`,
    nativeCode: `import { FilterTable } from '@stellix/ui-native';

<FilterTable
  filters={[
    { id: 'active',   label: 'Active',   count: 3, active: true },
    { id: 'inactive', label: 'Inactive', count: 1 },
  ]}
  columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]}
  data={rows}
/>`,
    propsTable: [
      { name: 'filters', type: 'FilterChip[]', default: '-', description: 'Filter chip definitions with optional count and active state.' },
      { name: 'columns', type: 'TableColumn[]', default: '-', description: 'Column definitions for the embedded table.' },
      { name: 'data', type: 'Record<string, unknown>[]', default: '-', description: 'Full dataset; filtered client-side by status/type field.' },
      { name: 'onFilterChange', type: '(activeFilters: string[]) => void', default: '-', description: 'Fired with the array of active filter IDs when selection changes.' },
    ],
  },

  // -- Navigation ----------------------------------------------------------------
  chat: {
    title: 'Chat',
    description:
      'A full conversation thread with user and assistant message bubbles, optional reasoning disclosure, auto-scroll, tab support, and an inline send input.',
    category: 'Navigation',
    preview: (() => {
      const msgs = [
        { id: '1', role: 'user' as const, content: 'What is a mixture of experts model?', timestamp: 1723900000000 - 60000 },
        { id: '2', role: 'assistant' as const, content: 'A Mixture of Experts (MoE) routes each token to specialized subnetworks via a gating mechanism.', reasoning: 'The question is about MoE architecture.', timestamp: 1723900000000 - 30000 },
        { id: '3', role: 'user' as const, content: 'How does the gating network work?', timestamp: 1723900000000 - 10000 },
      ];
      return (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Default Chat</p>
            <div className="h-64"><Chat tabs={['General', 'Code']} messages={msgs} /></div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Bubble Chat (WhatsApp-style)</p>
            <div className="h-64"><BubbleChat tabs={[]} messages={msgs} /></div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Thread Chat (Slack-style)</p>
            <div className="h-64"><ThreadChat tabs={[]} messages={msgs} /></div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Agent Chat (Tool calls)</p>
            <div className="h-64"><AgentChat tabs={[]} messages={msgs} /></div>
          </div>
        </div>
      );
    })(),
    webCode: `import { Chat } from '@stellix/ui-web';

<Chat
  tabs={['General', 'Code', 'Data']}
  messages={[
    { id: '1', role: 'user',      content: 'What is a mixture of experts model?',  timestamp: 1723900000000 - 60000 },
    { id: '2', role: 'assistant', content: 'A Mixture of Experts (MoE) is...',     timestamp: 1723900000000 - 30000,
      reasoning: 'The question is about MoE architecture.' },
    { id: '3', role: 'user',      content: 'How does the gating network work?',    timestamp: 1723900000000 },
  ]}
  onSend={(message) => sendToApi(message)}
/>`,
    nativeCode: `import { Chat } from '@stellix/ui-native';

<Chat
  messages={[
    { id: '1', role: 'user',      content: 'What is MoE?',                timestamp: 1723900000000 },
    { id: '2', role: 'assistant', content: 'A Mixture of Experts is...',  timestamp: 1723900000000 },
  ]}
  onSend={(msg) => sendToApi(msg)}
/>`,
    propsTable: [
      { name: 'messages', type: 'ChatMessage[]', default: '-', description: 'Array of conversation messages.' },
      { name: 'onSend', type: '(message: string) => void', default: '-', description: 'Fired when the user submits a new message.' },
      { name: 'tabs', type: 'string[]', default: '[]', description: 'Optional tab labels shown above the thread.' },
      { name: 'activeTab', type: 'string', default: 'tabs[0]', description: 'Controlled active tab value.' },
    ],
  },

  search: {
    title: 'Search',
    description:
      'A Cmd+K command palette with backdrop, keyboard navigation, grouped results, recent searches, and a clear button - renders as a fixed-position modal.',
    category: 'Navigation',
    preview: <SearchPreview />,
    webCode: `import { Search } from '@stellix/ui-web';

// Search renders as a full-screen modal triggered by Cmd+K.
// Wrap your app root and pass results reactively.

<Search
  placeholder="Search components..."
  recentSearches={['LoadingState', 'Chat']}
  results={[
    { id: '1', title: 'LoadingState', description: 'Animated loading indicators', category: 'Feedback' },
    { id: '2', title: 'Chat',         description: 'Conversation thread UI',      category: 'Navigation' },
    { id: '3', title: 'CodeBlock',    description: 'Syntax-highlighted code',     category: 'Content' },
  ]}
  onSearch={(query) => fetchResults(query)}
  onSelect={(result) => router.push(\`/components/\${result.id}\`)}
/>`,
    nativeCode: `import { Search } from '@stellix/ui-native';

<Search
  placeholder="Search..."
  results={[
    { id: '1', title: 'LoadingState', category: 'Feedback' },
    { id: '2', title: 'Chat',         category: 'Navigation' },
  ]}
  onSearch={(query) => fetchResults(query)}
  onSelect={(result) => navigation.navigate('ComponentDetail', { slug: result.id })}
/>`,
    propsTable: [
      { name: 'results', type: 'SearchResult[]', default: '[]', description: 'Results to show in the panel, grouped by category.' },
      { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text.' },
      { name: 'recentSearches', type: 'string[]', default: '[]', description: 'Recent search terms shown when the query is empty.' },
      { name: 'onSearch', type: '(query: string) => void', default: '-', description: 'Fired on every keystroke.' },
      { name: 'onSelect', type: '(result: SearchResult) => void', default: '-', description: 'Fired when a result is clicked or Enter-keyed.' },
    ],
  },

  'sidebar-nav': {
    title: 'SidebarNav',
    description:
      'A collapsible sidebar with nested nav groups, active-state highlighting, optional search input, and an icon-only collapsed mode for space-constrained layouts.',
    category: 'Navigation',
    preview: (
      <div className="h-96 w-64 overflow-auto rounded-xl border border-line">
        <SidebarNav
          items={[
            { id: 'overview', label: 'Overview', icon: 'home', href: '/', active: false },
            { id: 'setup', label: 'Setup', icon: 'doc', href: '/setup' },
            {
              id: 'components', label: 'Components', icon: 'folder', href: '#',
              children: [
                { id: 'loading-state', label: 'LoadingState', href: '/components/loading-state', active: true },
                { id: 'thinking', label: 'Thinking', href: '/components/thinking' },
                { id: 'task-rows', label: 'TaskRows', href: '/components/task-rows' },
              ],
            },
            { id: 'settings', label: 'Settings', icon: 'settings', href: '/settings' },
          ]}
        />
      </div>
    ),
    webCode: `import { SidebarNav } from '@stellix/ui-web';

<SidebarNav
  items={[
    { id: 'overview',    label: 'Overview',    icon: 'home',    href: '/' },
    { id: 'setup',       label: 'Setup',       icon: 'doc',     href: '/setup' },
    {
      id: 'components',  label: 'Components',  icon: 'folder',  href: '#',
      children: [
        { id: 'loading-state', label: 'LoadingState', href: '/components/loading-state', active: true },
        { id: 'thinking',      label: 'Thinking',     href: '/components/thinking' },
      ],
    },
    { id: 'settings', label: 'Settings', icon: 'settings', href: '/settings' },
  ]}
  onSearch={(query) => console.log(query)}
/>`,
    nativeCode: `import { SidebarNav } from '@stellix/ui-native';

<SidebarNav
  items={[
    { id: 'home',       label: 'Home',       icon: 'home',     href: '/' },
    { id: 'components', label: 'Components', icon: 'folder',   href: '/components' },
    { id: 'settings',   label: 'Settings',   icon: 'settings', href: '/settings' },
  ]}
/>`,
    propsTable: [
      { name: 'items', type: 'NavItem[]', default: '-', description: 'Top-level nav items; each may have a children array for nesting.' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Render icon-only collapsed mode.' },
      { name: 'onSearch', type: '(query: string) => void', default: '-', description: 'Enables the search bar when provided.' },
    ],
  },

  // -- Cards & Controls ----------------------------------------------------------
  'recommendation-card': {
    title: 'RecommendationCard',
    description:
      'Presents an AI recommendation with a confidence meter, alternatives list with comparative bars, and accept / reject / modify action buttons.',
    category: 'Cards & Controls',
    preview: (
      <RecommendationCard
        title="Switch to GPT-4o-mini for batch jobs"
        description="Based on your usage pattern, 73% of your API calls are classification tasks under 512 tokens. GPT-4o-mini would reduce cost by ~60% with <2% quality regression."
        confidence={87}
        alternatives={[
          { id: 'a1', label: 'Keep GPT-4o', confidence: 52 },
          { id: 'a2', label: 'Use Claude Haiku', confidence: 78 },
          { id: 'a3', label: 'Fine-tune a smaller model', confidence: 41 },
        ]}
        onAccept={() => console.log('accepted')}
        onReject={() => console.log('rejected')}
        onModify={() => console.log('modify')}
      />
    ),
    webCode: `import { RecommendationCard } from '@stellix/ui-web';

<RecommendationCard
  title="Switch to GPT-4o-mini for batch jobs"
  description="73% of your calls are classification tasks. GPT-4o-mini reduces cost by ~60%."
  confidence={87}
  alternatives={[
    { id: 'a1', label: 'Keep GPT-4o',               confidence: 52 },
    { id: 'a2', label: 'Use Claude Haiku',           confidence: 78 },
    { id: 'a3', label: 'Fine-tune a smaller model',  confidence: 41 },
  ]}
  onAccept={() => applyRecommendation()}
  onReject={() => dismissRecommendation()}
  onModify={() => openModifyDrawer()}
/>`,
    nativeCode: `import { RecommendationCard } from '@stellix/ui-native';

<RecommendationCard
  title="Switch to GPT-4o-mini"
  description="Reduces cost by ~60% with <2% quality regression."
  confidence={87}
  alternatives={[{ id: 'a1', label: 'Keep GPT-4o', confidence: 52 }]}
  onAccept={() => applyRecommendation()}
  onReject={() => dismissRecommendation()}
/>`,
    propsTable: [
      { name: 'title', type: 'string', default: '-', description: 'Short recommendation heading.' },
      { name: 'description', type: 'string', default: '-', description: 'Supporting explanation.' },
      { name: 'confidence', type: 'number', default: '-', description: 'Confidence score 0-100 shown as a segmented bar.' },
      { name: 'alternatives', type: 'Alternative[]', default: '[]', description: 'Alternative options with their own confidence scores.' },
      { name: 'onAccept', type: '() => void', default: '-', description: 'Fired when Accept is clicked.' },
      { name: 'onReject', type: '() => void', default: '-', description: 'Fired when Reject is clicked.' },
      { name: 'onModify', type: '() => void', default: '-', description: 'Fired when Modify is clicked.' },
    ],
  },

  'insight-cards': {
    title: 'InsightCards',
    description:
      'A responsive grid of metric cards each with a title, description, trend indicator, and a mini inline SVG chart (bar, line, or area).',
    category: 'Cards & Controls',
    preview: (
      <div>
      <InsightCards
        insights={[
          {
            id: 'i1',
            title: 'API Requests',
            description: 'Total requests this week',
            chartType: 'bar',
            data: [
              { label: 'Mon', value: 1200 },
              { label: 'Tue', value: 1850 },
              { label: 'Wed', value: 1600 },
              { label: 'Thu', value: 2200 },
              { label: 'Fri', value: 1900 },
              { label: 'Sat', value: 800 },
              { label: 'Sun', value: 600 },
            ],
          },
          {
            id: 'i2',
            title: 'Latency (p95)',
            description: 'Milliseconds over 7 days',
            chartType: 'line',
            data: [
              { label: 'Mon', value: 120 },
              { label: 'Tue', value: 135 },
              { label: 'Wed', value: 98 },
              { label: 'Thu', value: 145 },
              { label: 'Fri', value: 110 },
              { label: 'Sat', value: 90 },
              { label: 'Sun', value: 88 },
            ],
          },
          {
            id: 'i3',
            title: 'Token Usage',
            description: 'Tokens consumed (millions)',
            chartType: 'area',
            data: [
              { label: 'Mon', value: 4.2 },
              { label: 'Tue', value: 5.8 },
              { label: 'Wed', value: 5.1 },
              { label: 'Thu', value: 7.3 },
              { label: 'Fri', value: 6.9 },
              { label: 'Sat', value: 3.1 },
              { label: 'Sun', value: 2.7 },
            ],
          },
        ]}
      />
      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Donut Chart</p>
        <DonutChart segments={[{ label: 'Web', value: 45, color: 'var(--color-accent)' }, { label: 'Mobile', value: 30, color: 'var(--color-green)' }, { label: 'API', value: 25, color: 'var(--color-orange)' }]} centerLabel="Traffic" />
      </div>
      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">Gauge Chart</p>
        <GaugeChart value={73} max={100} label="CPU Usage" />
      </div>
    </div>
    ),
    webCode: `import { InsightCards, DonutChart, GaugeChart } from '@stellix/ui-web';

<InsightCards
  insights={[
    {
      id: 'i1',
      title: 'API Requests',
      description: 'Total requests this week',
      chartType: 'bar',
      data: [
        { label: 'Mon', value: 1200 },
        { label: 'Tue', value: 1850 },
        { label: 'Wed', value: 2200 },
        { label: 'Thu', value: 1900 },
      ],
    },
    {
      id: 'i2',
      title: 'Latency (p95)',
      description: 'Milliseconds over 7 days',
      chartType: 'line',
      data: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 135 },
        { label: 'Wed', value: 98 },
      ],
    },
  ]}
/>`,
    nativeCode: `import { InsightCards } from '@stellix/ui-native';

<InsightCards
  insights={[
    {
      id: 'i1',
      title: 'API Requests',
      chartType: 'bar',
      data: [{ label: 'Mon', value: 1200 }, { label: 'Tue', value: 1850 }],
    },
  ]}
/>`,
    propsTable: [
      { name: 'insights', type: 'InsightItem[]', default: '-', description: 'Array of insight card definitions.' },
    ],
  },

  'tool-chips': {
    title: 'ToolChips',
    description:
      'A list of agent tool-call chips showing name, status (running / success / error), optional file reference, diff counts, and an expandable summary.',
    category: 'Cards & Controls',
    preview: (
      <ToolChips
        tools={[
          { id: 't1', name: 'read_file', status: 'success', file: 'src/index.ts', summary: 'Read 142 lines.' },
          { id: 't2', name: 'edit_file', status: 'success', file: 'src/utils.ts', additions: 12, deletions: 3, summary: 'Refactored formatDate helper.' },
          { id: 't3', name: 'run_tests', status: 'running', summary: 'Running jest --coverage...' },
          { id: 't4', name: 'lint_code', status: 'error', summary: 'ESLint found 2 errors in src/App.tsx.' },
        ]}
      />
    ),
    webCode: `import { ToolChips } from '@stellix/ui-web';

<ToolChips
  tools={[
    { id: 't1', name: 'read_file',  status: 'success', file: 'src/index.ts',  summary: 'Read 142 lines.' },
    { id: 't2', name: 'edit_file',  status: 'success', file: 'src/utils.ts',  additions: 12, deletions: 3,
      summary: 'Refactored formatDate helper.' },
    { id: 't3', name: 'run_tests',  status: 'running', summary: 'Running jest --coverage...' },
    { id: 't4', name: 'lint_code',  status: 'error',   summary: 'ESLint found 2 errors.' },
  ]}
/>`,
    nativeCode: `import { ToolChips } from '@stellix/ui-native';

<ToolChips
  tools={[
    { id: 't1', name: 'read_file', status: 'success', file: 'src/index.ts' },
    { id: 't2', name: 'run_tests', status: 'running' },
    { id: 't3', name: 'lint_code', status: 'error' },
  ]}
/>`,
    propsTable: [
      { name: 'tools', type: 'ToolCall[]', default: '-', description: 'Array of tool-call objects to render as chips.' },
    ],
  },

  'fine-tune-card': {
    title: 'FineTuneCard',
    description:
      'A configuration panel for model or generation parameters, supporting slider, toggle, color picker, and select controls with live value display.',
    category: 'Cards & Controls',
    preview: (
      <FineTuneCard
        title="Generation Parameters"
        properties={[
          { id: 'temperature', label: 'Temperature', type: 'slider', value: 0.7, min: 0, max: 2, step: 0.1 },
          { id: 'top_p', label: 'Top-P', type: 'slider', value: 0.9, min: 0, max: 1, step: 0.05 },
          { id: 'max_tokens', label: 'Max Tokens', type: 'slider', value: 2048, min: 256, max: 8192, step: 256 },
          { id: 'stream', label: 'Streaming', type: 'toggle', value: true },
          { id: 'format', label: 'Output Format', type: 'select', value: 'json', options: ['json', 'markdown', 'plain'] },
        ]}
        onChange={(id, value) => console.log('changed', id, value)}
      />
    ),
    webCode: `import { FineTuneCard } from '@stellix/ui-web';

<FineTuneCard
  title="Generation Parameters"
  properties={[
    { id: 'temperature', label: 'Temperature', type: 'slider', value: 0.7,  min: 0, max: 2,    step: 0.1 },
    { id: 'top_p',       label: 'Top-P',        type: 'slider', value: 0.9,  min: 0, max: 1,    step: 0.05 },
    { id: 'max_tokens',  label: 'Max Tokens',   type: 'slider', value: 2048, min: 256, max: 8192, step: 256 },
    { id: 'stream',      label: 'Streaming',    type: 'toggle', value: true },
    { id: 'format',      label: 'Output Format',type: 'select', value: 'json', options: ['json','markdown','plain'] },
  ]}
  onChange={(id, value) => updateParam(id, value)}
/>`,
    nativeCode: `import { FineTuneCard } from '@stellix/ui-native';

<FineTuneCard
  title="Generation Parameters"
  properties={[
    { id: 'temperature', label: 'Temperature', type: 'slider', value: 0.7, min: 0, max: 2, step: 0.1 },
    { id: 'stream',      label: 'Streaming',   type: 'toggle', value: true },
  ]}
  onChange={(id, value) => updateParam(id, value)}
/>`,
    propsTable: [
      { name: 'title', type: 'string', default: '-', description: 'Heading for the control panel.' },
      { name: 'properties', type: 'PropertyControl[]', default: '-', description: 'Array of control definitions (slider, toggle, select, color).' },
      { name: 'onChange', type: '(id: string, value: number | string | boolean) => void', default: '-', description: 'Fired whenever any control value changes.' },
    ],
  },

  // -- Primitives ----------------------------------------------------------------
  button: {
    title: 'Button',
    description: 'A versatile button component with five variants, three sizes, loading state, and icon support.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" loading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    ),
    webCode: `import { Button } from '@stellix/ui-web';

<Button variant="primary">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline">Export</Button>
<Button variant="primary" loading>Saving...</Button>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'", default: "'primary'", description: 'Visual style of the button.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls padding and font size.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables interaction.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents clicks and applies muted styling.' },
      { name: 'onClick', type: '() => void', default: '-', description: 'Click handler.' },
    ],
  },

  badge: {
    title: 'Badge',
    description: 'A compact status or label chip with color variants and optional dot indicator.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge color="default">Default</Badge>
        <Badge color="blue">Info</Badge>
        <Badge color="green">Success</Badge>
        <Badge color="yellow">Warning</Badge>
        <Badge color="red">Error</Badge>
        <Badge color="purple">Beta</Badge>
        <Badge color="green" dot>Live</Badge>
      </div>
    ),
    webCode: `import { Badge } from '@stellix/ui-web';

<Badge color="default">Default</Badge>
<Badge color="blue">Info</Badge>
<Badge color="green">Success</Badge>
<Badge color="yellow">Warning</Badge>
<Badge color="red">Error</Badge>
<Badge color="green" dot>Live</Badge>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'color', type: "'default' | 'blue' | 'green' | 'yellow' | 'red' | 'purple'", default: "'default'", description: 'Color scheme of the badge.' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Show a small pulsing dot before the label.' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Badge label content.' },
    ],
  },

  avatar: {
    title: 'Avatar',
    description: 'User avatar with image, initials fallback, status ring, and size variants.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <Avatar size="xs" initials="AL" />
        <Avatar size="sm" initials="AT" status="online" />
        <Avatar size="md" initials="GH" status="away" />
        <Avatar size="lg" src="https://i.pravatar.cc/80?img=3" alt="User" status="busy" />
        <Avatar size="xl" initials="JN" />
      </div>
    ),
    webCode: `import { Avatar } from '@stellix/ui-web';

<Avatar size="sm" initials="AL" />
<Avatar size="md" src="/avatars/user.png" alt="Ada Lovelace" status="online" />
<Avatar size="lg" initials="AT" status="away" />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'src', type: 'string', default: '-', description: 'Image URL for the avatar.' },
      { name: 'initials', type: 'string', default: '-', description: 'Fallback initials shown when no image is provided.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the avatar circle.' },
      { name: 'status', type: "'online' | 'away' | 'busy' | 'offline'", default: '-', description: 'Status indicator ring color.' },
    ],
  },

  tag: {
    title: 'Tag',
    description: 'A removable or static label tag for categorization and filtering.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Tag>TypeScript</Tag>
        <Tag color="blue">React</Tag>
        <Tag color="green" removable onRemove={() => {}}>Next.js</Tag>
        <Tag color="purple" removable onRemove={() =>{}}>Tailwind</Tag>
        <Tag color="orange">Node.js</Tag>
      </div>
    ),
    webCode: `import { Tag } from '@stellix/ui-web';

<Tag>TypeScript</Tag>
<Tag color="blue">React</Tag>
<Tag color="green" removable onRemove={() => removeTag('nextjs')}>Next.js</Tag>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'color', type: "'default' | 'blue' | 'green' | 'purple' | 'orange' | 'red'", default: "'default'", description: 'Tag color scheme.' },
      { name: 'removable', type: 'boolean', default: 'false', description: 'Show a remove (x) button.' },
      { name: 'onRemove', type: '() => void', default: '-', description: 'Called when the remove button is clicked.' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Tag label.' },
    ],
  },

  tooltip: {
    title: 'Tooltip',
    description: 'A lightweight tooltip that appears on hover with configurable placement.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-wrap items-center gap-6 py-6">
        <Tooltip content="Save your changes" placement="top">
          <Button variant="outline" size="sm">Hover me (top)</Button>
        </Tooltip>
        <Tooltip content="Opens in a new tab" placement="bottom">
          <Button variant="outline" size="sm">Hover me (bottom)</Button>
        </Tooltip>
        <Tooltip content="Copy to clipboard" placement="right">
          <Button variant="ghost" size="sm">Hover me (right)</Button>
        </Tooltip>
      </div>
    ),
    webCode: `import { Tooltip } from '@stellix/ui-web';

<Tooltip content="Save your changes" placement="top">
  <Button variant="outline">Save</Button>
</Tooltip>

<Tooltip content="Opens in a new tab" placement="bottom">
  <a href="#">External link</a>
</Tooltip>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'content', type: 'ReactNode', default: '-', description: 'Tooltip text or content.' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement relative to the trigger.' },
      { name: 'delay', type: 'number', default: '300', description: 'Delay in ms before showing the tooltip.' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Trigger element.' },
    ],
  },

  toggle: {
    title: 'Toggle',
    description: 'A toggle button that switches between active and inactive states, useful for toolbar actions.',
    category: 'Primitives',
    preview: (
      <div className="flex flex-col gap-4">
        <Toggle checked={true} onChange={() => {}} label="Dark Mode" description="Enable dark theme" />
        <Toggle checked={false} onChange={() => {}} label="Notifications" description="Receive email alerts" />
      </div>
    ),
    webCode: `import { Toggle } from '@stellix/ui-web';

const [bold, setBold] = useState(false);

<Toggle pressed={bold} onPressedChange={setBold}>Bold</Toggle>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'pressed', type: 'boolean', default: 'false', description: 'Controlled pressed state.' },
      { name: 'onPressedChange', type: '(pressed: boolean) => void', default: '-', description: 'Fired when the toggle state changes.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Toggle label or icon.' },
    ],
  },

  input: {
    title: 'Input',
    description: 'A styled text input with optional label, helper text, error state, and leading/trailing adornments.',
    category: 'Primitives',
    preview: (
      <div className="space-y-4 max-w-sm">
        <Input label="Email address" placeholder="you@example.com" type="email" />
        <Input label="API Key" placeholder="sk-..." type="password" helperText="Keep this secret." />
        <Input label="Username" placeholder="ada_lovelace" error="Username is already taken." />
        <Input label="Search" placeholder="Search docs..." leadingIcon="search" />
      </div>
    ),
    webCode: `import { Input } from '@stellix/ui-web';

<Input label="Email" placeholder="you@example.com" type="email" />
<Input label="API Key" type="password" helperText="Keep this secret." />
<Input label="Username" error="Username is already taken." />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'label', type: 'string', default: '-', description: 'Label displayed above the input.' },
      { name: 'error', type: 'string', default: '-', description: 'Error message shown below; applies error styling.' },
      { name: 'helperText', type: 'string', default: '-', description: 'Helper text shown below the input.' },
      { name: 'leadingIcon', type: 'string', default: '-', description: 'Icon name to show inside the left edge.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    ],
  },

  textarea: {
    title: 'Textarea',
    description: 'A multi-line text input with auto-resize, character count, and error state.',
    category: 'Primitives',
    preview: (
      <div className="space-y-4 max-w-sm">
        <Textarea label="System prompt" placeholder="You are a helpful assistant..." value="" onChange={() => {}} rows={3} />
        <Textarea label="Notes" placeholder="Add context..." value="Some notes here." onChange={() => {}} maxLength={300} rows={3} />
      </div>
    ),
    webCode: `import { Textarea } from '@stellix/ui-web';

<Textarea
  label="System prompt"
  placeholder="You are a helpful assistant..."
  rows={4}
  autoResize
/>

<Textarea
  label="Notes"
  maxLength={300}
  showCount
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'label', type: 'string', default: '-', description: 'Label displayed above the textarea.' },
      { name: 'rows', type: 'number', default: '3', description: 'Initial visible row count.' },
      { name: 'autoResize', type: 'boolean', default: 'false', description: 'Expand height as content grows.' },
      { name: 'maxLength', type: 'number', default: '-', description: 'Character limit.' },
      { name: 'showCount', type: 'boolean', default: 'false', description: 'Display remaining character count.' },
    ],
  },

  select: {
    title: 'Select',
    description: 'A styled select dropdown with label, placeholder, and option groups.',
    category: 'Primitives',
    preview: (
      <div className="space-y-4 max-w-sm">
        <Select
          label="Model"
          placeholder="Choose a model..."
          options={[
            { value: 'chimera-70b', label: 'Chimera-70B' },
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'claude-3-5', label: 'Claude 3.5 Sonnet' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
          ]}
        />
        <Select
          label="Output format"
          options={[
            { value: 'json', label: 'JSON' },
            { value: 'markdown', label: 'Markdown' },
            { value: 'plain', label: 'Plain text' },
          ]}
          defaultValue="json"
        />
      </div>
    ),
    webCode: `import { Select } from '@stellix/ui-web';

<Select
  label="Model"
  placeholder="Choose a model..."
  options={[
    { value: 'chimera-70b', label: 'Chimera-70B' },
    { value: 'gpt-4o',      label: 'GPT-4o' },
  ]}
  onChange={(val) => setModel(val)}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'options', type: 'SelectOption[]', default: '-', description: 'Array of { value, label } objects.' },
      { name: 'label', type: 'string', default: '-', description: 'Label shown above the select.' },
      { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder when no value is selected.' },
      { name: 'defaultValue', type: 'string', default: '-', description: 'Initially selected value (uncontrolled).' },
      { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Fired when selection changes.' },
    ],
  },

  checkbox: {
    title: 'Checkbox',
    description: 'An accessible checkbox with label, indeterminate state, and error display.',
    category: 'Primitives',
    preview: (
      <div className="space-y-3">
        <Checkbox checked={true} onChange={() => {}} label="Agree to terms" />
        <Checkbox checked={false} onChange={() => {}} label="Newsletter" />
        <Checkbox checked={false} indeterminate={true} onChange={() => {}} label="Select all" />
      </div>
    ),
    webCode: `import { Checkbox } from '@stellix/ui-web';

const [enabled, setEnabled] = useState(true);

<Checkbox
  checked={enabled}
  onChange={setEnabled}
  label="Enable streaming responses"
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled checked state.' },
      { name: 'onChange', type: '(checked: boolean) => void', default: '-', description: 'Fired when the checkbox is toggled.' },
      { name: 'label', type: 'string', default: '-', description: 'Label text shown beside the checkbox.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows the indeterminate dash state.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    ],
  },

  radio: {
    title: 'Radio',
    description: 'A radio group for single-option selection with accessible keyboard navigation.',
    category: 'Primitives',
    preview: (
      <Radio
        name="plan"
        value="pro"
        onChange={() => {}}
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro', description: 'For teams' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />
    ),
    webCode: `import { Radio } from '@stellix/ui-web';

const [model, setModel] = useState('gpt4o');

<Radio
  name="model"
  value={model}
  onChange={setModel}
  options={[
    { value: 'chimera', label: 'Chimera-70B', description: 'Best quality.' },
    { value: 'gpt4o',   label: 'GPT-4o',      description: 'Balanced.' },
    { value: 'haiku',   label: 'Claude Haiku', description: 'Fastest.' },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'options', type: 'RadioOption[]', default: '-', description: 'Array of { value, label, description? } items.' },
      { name: 'value', type: 'string', default: '-', description: 'Currently selected value.' },
      { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Fired when selection changes.' },
      { name: 'name', type: 'string', default: '-', description: 'HTML name attribute for the group.' },
    ],
  },

  switch: {
    title: 'Switch',
    description: 'An accessible on/off switch control with label and optional helper text.',
    category: 'Primitives',
    preview: (
      <div className="space-y-4">
        <Switch checked={true} onChange={() => {}} label="Notifications" size="md" />
        <Switch checked={false} onChange={() => {}} label="Dark mode" size="sm" />
        <Switch checked={false} onChange={() => {}} label="Beta features" size="lg" />
      </div>
    ),
    webCode: `import { Switch } from '@stellix/ui-web';

const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable dark mode"
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled on/off state.' },
      { name: 'onChange', type: '(checked: boolean) => void', default: '-', description: 'Fired when toggled.' },
      { name: 'label', type: 'string', default: '-', description: 'Label shown beside the switch.' },
      { name: 'helperText', type: 'string', default: '-', description: 'Supporting text shown below the label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
    ],
  },

  // -- Feedback ------------------------------------------------------------------
  toast: {
    title: 'Toast',
    description: 'Non-blocking notification toasts with success, error, warning, and info variants, auto-dismiss, and action buttons.',
    category: 'Feedback',
    preview: (
      <div className="space-y-3">
        <Toast variant="success" title="Changes saved" description="Your settings have been updated successfully." />
        <Toast variant="error" title="Upload failed" description="The file exceeds the 10 MB size limit." />
        <Toast variant="warning" title="Rate limit approaching" description="You have used 90% of your monthly quota." />
        <Toast variant="info" title="New version available" description="Stellix UI 2.1.0 is ready to install." action={{ label: 'Update now', onClick: () => {} }} />
      </div>
    ),
    webCode: `import { Toast } from '@stellix/ui-web';

<Toast variant="success" title="Changes saved" description="Settings updated." />
<Toast variant="error"   title="Upload failed" description="File exceeds limit." />
<Toast
  variant="info"
  title="New version available"
  action={{ label: 'Update now', onClick: () => install() }}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Determines icon and color.' },
      { name: 'title', type: 'string', default: '-', description: 'Bold heading of the toast.' },
      { name: 'description', type: 'string', default: '-', description: 'Supporting detail text.' },
      { name: 'action', type: '{ label: string; onClick: () => void }', default: '-', description: 'Optional inline action button.' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss timeout in ms. Pass 0 to disable.' },
    ],
  },

  alert: {
    title: 'Alert',
    description: 'An inline alert banner for page-level feedback with optional dismiss button.',
    category: 'Feedback',
    preview: (
      <div className="space-y-3">
        <Alert variant="info" title="API key expiring soon" description="Your API key expires in 7 days. Rotate it to avoid downtime." />
        <Alert variant="success" title="Deployment complete" description="v2.4.0 is live on all regions." dismissible />
        <Alert variant="warning" title="Deprecated endpoint" description="The v1 API will be removed on 2027-01-01." />
        <Alert variant="error" title="Service disruption" description="The embeddings endpoint is experiencing elevated latency." />
      </div>
    ),
    webCode: `import { Alert } from '@stellix/ui-web';

<Alert variant="info"    title="API key expiring soon" description="Rotate it to avoid downtime." />
<Alert variant="success" title="Deployment complete"   description="v2.4.0 is live." dismissible />
<Alert variant="error"   title="Service disruption"    description="Elevated latency on embeddings." />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Color and icon set.' },
      { name: 'title', type: 'string', default: '-', description: 'Alert heading.' },
      { name: 'description', type: 'string', default: '-', description: 'Detail message.' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show a close button.' },
    ],
  },

  'progress-bar': {
    title: 'ProgressBar',
    description: 'A horizontal progress bar with labeled value, animated fill, and color variants.',
    category: 'Feedback',
    preview: (
      <div className="space-y-4 max-w-md">
        <ProgressBar value={72} label="Uploading..." showValue />
        <ProgressBar value={45} color="green" label="Training" showValue />
        <ProgressBar value={90} color="orange" label="Disk usage" showValue />
        <ProgressBar value={100} color="blue" label="Complete" showValue />
        <ProgressBar indeterminate label="Processing..." />
      </div>
    ),
    webCode: `import { ProgressBar } from '@stellix/ui-web';

<ProgressBar value={72} label="Uploading..." showValue />
<ProgressBar value={45} color="green" label="Training" showValue />
<ProgressBar indeterminate label="Processing..." />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'value', type: 'number', default: '0', description: 'Progress value 0-100.' },
      { name: 'color', type: "'default' | 'green' | 'orange' | 'blue' | 'red'", default: "'default'", description: 'Fill color.' },
      { name: 'label', type: 'string', default: '-', description: 'Label shown above the bar.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show numeric percentage.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show animated indeterminate state.' },
    ],
  },

  spinner: {
    title: 'Spinner',
    description: 'A simple circular loading spinner in multiple sizes and colors.',
    category: 'Feedback',
    preview: (
      <div className="flex flex-wrap items-center gap-6">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" color="green" />
        <Spinner size="xl" color="accent" />
      </div>
    ),
    webCode: `import { Spinner } from '@stellix/ui-web';

<Spinner size="sm" />
<Spinner size="md" color="green" />
<Spinner size="lg" color="accent" />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Diameter of the spinner.' },
      { name: 'color', type: "'default' | 'accent' | 'green' | 'red'", default: "'default'", description: 'Stroke color.' },
    ],
  },

  'skeleton-block': {
    title: 'SkeletonBlock',
    description: 'Placeholder skeleton shapes for loading states - text lines, rectangles, and circles.',
    category: 'Feedback',
    preview: (
      <div className="space-y-6 max-w-sm">
        <div className="flex items-center gap-3">
          <SkeletonBlock shape="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <SkeletonBlock height={14} width="60%" />
            <SkeletonBlock height={12} width="40%" />
          </div>
        </div>
        <SkeletonBlock height={120} />
        <div className="space-y-2">
          <SkeletonBlock height={12} />
          <SkeletonBlock height={12} width="85%" />
          <SkeletonBlock height={12} width="70%" />
        </div>
      </div>
    ),
    webCode: `import { SkeletonBlock } from '@stellix/ui-web';

// Circle avatar placeholder
<SkeletonBlock shape="circle" width={40} height={40} />

// Image placeholder
<SkeletonBlock height={200} />

// Text lines
<SkeletonBlock height={14} />
<SkeletonBlock height={14} width="80%" />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'shape', type: "'rect' | 'circle'", default: "'rect'", description: 'Shape of the skeleton block.' },
      { name: 'width', type: "number | string", default: "'100%'", description: 'Width (px or CSS value).' },
      { name: 'height', type: 'number', default: '16', description: 'Height in pixels.' },
      { name: 'animate', type: 'boolean', default: 'true', description: 'Enable shimmer animation.' },
    ],
  },

  'empty-state': {
    title: 'EmptyState',
    description: 'A centered empty state illustration with title, description, and optional CTA button.',
    category: 'Feedback',
    preview: (
      <div className="space-y-8">
        <EmptyState
          icon="inbox"
          title="No conversations yet"
          description="Start a new conversation to see it appear here."
          action={{ label: 'New conversation', onClick: () => {} }}
        />
        <EmptyState
          icon="search"
          title="No results found"
          description="Try adjusting your search or filter to find what you are looking for."
        />
      </div>
    ),
    webCode: `import { EmptyState } from '@stellix/ui-web';

<EmptyState
  icon="inbox"
  title="No conversations yet"
  description="Start a new conversation to see it appear here."
  action={{ label: 'New conversation', onClick: () => openNew() }}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'icon', type: 'string', default: '-', description: 'Icon name to display above the title.' },
      { name: 'title', type: 'string', default: '-', description: 'Primary heading.' },
      { name: 'description', type: 'string', default: '-', description: 'Supporting detail text.' },
      { name: 'action', type: '{ label: string; onClick: () => void }', default: '-', description: 'Optional CTA button.' },
    ],
  },

  'step-indicator': {
    title: 'StepIndicator',
    description: 'A horizontal step progress indicator for multi-step flows with completed, active, and upcoming states.',
    category: 'Feedback',
    preview: (
      <div className="space-y-8">
        <StepIndicator
          steps={[
            { id: '1', label: 'Account' },
            { id: '2', label: 'Profile' },
            { id: '3', label: 'Billing' },
            { id: '4', label: 'Review' },
          ]}
          currentStep={2}
        />
        <StepIndicator
          steps={[
            { id: '1', label: 'Ingest' },
            { id: '2', label: 'Embed' },
            { id: '3', label: 'Index' },
          ]}
          currentStep={3}
        />
      </div>
    ),
    webCode: `import { StepIndicator } from '@stellix/ui-web';

<StepIndicator
  steps={[
    { id: '1', label: 'Account' },
    { id: '2', label: 'Profile' },
    { id: '3', label: 'Billing' },
    { id: '4', label: 'Review' },
  ]}
  currentStep={2}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'steps', type: '{ id: string; label: string }[]', default: '-', description: 'Ordered step definitions.' },
      { name: 'currentStep', type: 'number', default: '1', description: '1-based index of the active step.' },
      { name: 'onStepClick', type: '(index: number) => void', default: '-', description: 'Allows clicking completed steps to navigate back.' },
    ],
  },

  // -- Layout --------------------------------------------------------------------
  tabs: {
    title: 'Tabs',
    description: 'An accessible tab bar with animated underline indicator and lazy-mounted panels.',
    category: 'Layout',
    preview: (
      <div className="space-y-4">
        <Tabs
          tabs={[{ id: 'overview', label: 'Overview' }, { id: 'api', label: 'API' }, { id: 'examples', label: 'Examples' }]}
          activeTab="overview"
          onChange={() => {}}
        />
        <Tabs
          tabs={[{ id: 'overview', label: 'Overview' }, { id: 'api', label: 'API' }, { id: 'examples', label: 'Examples' }]}
          activeTab="api"
          onChange={() => {}}
          variant="pill"
        />
        <Tabs
          tabs={[{ id: 'overview', label: 'Overview' }, { id: 'api', label: 'API' }, { id: 'examples', label: 'Examples' }]}
          activeTab="examples"
          onChange={() => {}}
          variant="bordered"
        />
      </div>
    ),
    webCode: `import { Tabs } from '@stellix/ui-web';

const [tab, setTab] = useState('overview');

<Tabs
  value={tab}
  onChange={setTab}
  tabs={[
    { value: 'overview',   label: 'Overview',       content: <Overview /> },
    { value: 'api',        label: 'API Reference',  content: <ApiDocs /> },
    { value: 'changelog',  label: 'Changelog',      content: <Changelog /> },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'tabs', type: '{ value: string; label: string; content: ReactNode }[]', default: '-', description: 'Tab definitions including panel content.' },
      { name: 'value', type: 'string', default: '-', description: 'Controlled active tab value.' },
      { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Fired when a tab is clicked.' },
    ],
  },

  breadcrumb: {
    title: 'Breadcrumb',
    description: 'A navigational breadcrumb trail with optional truncation for deep paths.',
    category: 'Layout',
    preview: (
      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Layout', href: '/components?category=layout' },
            { label: 'Breadcrumb' },
          ]}
        />
        <Breadcrumb
          items={[
            { label: 'Projects', href: '/projects' },
            { label: 'Chimera', href: '/projects/chimera' },
            { label: 'Training runs', href: '/projects/chimera/runs' },
            { label: 'Run #42', href: '/projects/chimera/runs/42' },
            { label: 'Metrics' },
          ]}
          maxItems={3}
        />
      </div>
    ),
    webCode: `import { Breadcrumb } from '@stellix/ui-web';

<Breadcrumb
  items={[
    { label: 'Home',       href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'items', type: '{ label: string; href?: string }[]', default: '-', description: 'Ordered crumb items. Last item is the current page.' },
      { name: 'maxItems', type: 'number', default: '-', description: 'Truncate with ellipsis beyond this count.' },
      { name: 'separator', type: 'ReactNode', default: "'/'", description: 'Custom separator between crumbs.' },
    ],
  },

  pagination: {
    title: 'Pagination',
    description: 'A pagination control with page number buttons, prev/next arrows, and optional page size selector.',
    category: 'Layout',
    preview: (
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={() => {}}
      />
    ),
    webCode: `import { Pagination } from '@stellix/ui-web';

const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'page', type: 'number', default: '1', description: 'Current page (1-based).' },
      { name: 'totalPages', type: 'number', default: '-', description: 'Total number of pages.' },
      { name: 'onPageChange', type: '(page: number) => void', default: '-', description: 'Fired when a page is selected.' },
      { name: 'siblings', type: 'number', default: '1', description: 'Number of sibling pages shown around the current page.' },
    ],
  },

  dropdown: {
    title: 'Dropdown',
    description: 'A context menu or action dropdown with keyboard navigation and optional icons.',
    category: 'Layout',
    preview: (
      <Dropdown
        trigger={<Button variant="outline">Actions</Button>}
        items={[
          { id: 'edit', label: 'Edit', icon: 'pencil', onClick: () => {} },
          { id: 'duplicate', label: 'Duplicate', icon: 'copy', onClick: () => {} },
          { id: 'divider', type: 'divider' },
          { id: 'archive', label: 'Archive', icon: 'archive', onClick: () => {} },
          { id: 'delete', label: 'Delete', icon: 'trash', variant: 'danger', onClick: () => {} },
        ]}
      />
    ),
    webCode: `import { Dropdown } from '@stellix/ui-web';

<Dropdown
  trigger={<Button variant="outline">Actions</Button>}
  items={[
    { id: 'edit',      label: 'Edit',      icon: 'pencil',  onClick: () => editItem() },
    { id: 'duplicate', label: 'Duplicate', icon: 'copy',    onClick: () => duplicateItem() },
    { id: 'divider',   type: 'divider' },
    { id: 'delete',    label: 'Delete',    icon: 'trash',   variant: 'danger', onClick: () => deleteItem() },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'trigger', type: 'ReactNode', default: '-', description: 'Element that opens the dropdown on click.' },
      { name: 'items', type: 'DropdownItem[]', default: '-', description: 'Menu items, including optional dividers.' },
      { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start'", default: "'bottom-start'", description: 'Preferred open direction.' },
    ],
  },

  modal: {
    title: 'Modal',
    description: 'An accessible dialog with backdrop, focus trap, and configurable size.',
    category: 'Layout',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <Button variant="primary" size="md">Open Modal</Button>
        <p className="text-xs text-ink-3">Modal renders as an overlay — trigger via button in your app.</p>
      </div>
    ),
    webCode: `import { Modal } from '@stellix/ui-web';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deployment"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={deploy}>Deploy</Button>
    </>
  }
>
  <p>This will push changes to production.</p>
</Modal>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility.' },
      { name: 'onClose', type: '() => void', default: '-', description: 'Fired on backdrop click or Escape key.' },
      { name: 'title', type: 'string', default: '-', description: 'Modal heading.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Controls max width.' },
      { name: 'footer', type: 'ReactNode', default: '-', description: 'Content in the modal footer (action buttons).' },
    ],
  },

  drawer: {
    title: 'Drawer',
    description: 'A slide-in panel from any edge of the viewport with configurable width.',
    category: 'Layout',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <Button variant="outline" size="md">Open Drawer</Button>
        <p className="text-xs text-ink-3">Drawer renders as an overlay — trigger via button in your app.</p>
      </div>
    ),
    webCode: `import { Drawer } from '@stellix/ui-web';

const [open, setOpen] = useState(false);

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Agent settings"
  side="right"
>
  <SettingsForm />
</Drawer>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility.' },
      { name: 'onClose', type: '() => void', default: '-', description: 'Fired on overlay click or Escape key.' },
      { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Edge from which the drawer slides in.' },
      { name: 'title', type: 'string', default: '-', description: 'Drawer header title.' },
      { name: 'width', type: 'string', default: "'400px'", description: 'Width for left/right drawers.' },
    ],
  },

  accordion: {
    title: 'Accordion',
    description: 'Collapsible content sections with smooth animation and single or multiple open modes.',
    category: 'Layout',
    preview: (
      <Accordion
        type="single"
        items={[
          { id: '1', title: 'What is Chimera?', content: 'Chimera is Stellix Private Ltd\'s flagship MoE transformer model, designed for enterprise agentic AI workloads with multimodal input and tool-use capabilities.' },
          { id: '2', title: 'How do I install Stellix UI?', content: 'Run npm install @stellix/ui-web in your Next.js project, then wrap your app with the StelixProvider component.' },
          { id: '3', title: 'Is there a React Native version?', content: 'Yes - all components are available in @stellix/ui-native with the same API surface.' },
        ]}
      />
    ),
    webCode: `import { Accordion } from '@stellix/ui-web';

<Accordion
  type="single"
  items={[
    { id: '1', title: 'What is Chimera?',        content: 'Chimera is our flagship MoE model...' },
    { id: '2', title: 'How do I install?',        content: 'Run npm install @stellix/ui-web...' },
    { id: '3', title: 'Is there a native build?', content: 'Yes - @stellix/ui-native has the same API.' },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'items', type: '{ id: string; title: string; content: ReactNode }[]', default: '-', description: 'Accordion section definitions.' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or many panels can be open at once.' },
      { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'IDs of panels open by default.' },
    ],
  },

  // -- Data Display --------------------------------------------------------------
  'data-card': {
    title: 'DataCard',
    description: 'A metric card displaying a key figure, label, trend indicator, and optional sparkline.',
    category: 'Data Display',
    preview: (
      <div className="grid grid-cols-2 gap-4">
        <DataCard label="Total requests" value="2.4M" trend={12.5} trendDirection="up" />
        <DataCard label="Avg latency" value="142ms" trend={-8.3} trendDirection="down" />
        <DataCard label="Error rate" value="0.12%" trend={2.1} trendDirection="up" trendBad />
        <DataCard label="Active agents" value="7" />
      </div>
    ),
    webCode: `import { DataCard } from '@stellix/ui-web';

<DataCard label="Total requests" value="2.4M" trend={12.5} trendDirection="up" />
<DataCard label="Avg latency"    value="142ms" trend={-8.3} trendDirection="down" />
<DataCard label="Error rate"     value="0.12%" trend={2.1} trendDirection="up" trendBad />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'label', type: 'string', default: '-', description: 'Metric label.' },
      { name: 'value', type: 'string | number', default: '-', description: 'Primary metric value.' },
      { name: 'trend', type: 'number', default: '-', description: 'Percentage change to display.' },
      { name: 'trendDirection', type: "'up' | 'down'", default: '-', description: 'Direction of the trend arrow.' },
      { name: 'trendBad', type: 'boolean', default: 'false', description: 'Invert color so up-trend shows as red.' },
    ],
  },

  'timeline-view': {
    title: 'TimelineView',
    description: 'A vertical timeline of events with timestamps, icons, and optional detail expansion.',
    category: 'Data Display',
    preview: (
      <TimelineView
        items={[
          { id: '1', title: 'Model training started', description: 'Phase 1 of 4 - dataset ingestion', date: '2026-08-15 09:00', status: 'completed' },
          { id: '2', title: 'Checkpoint saved', description: 'Step 10,000 - loss: 1.42', date: '2026-08-15 10:30', status: 'completed' },
          { id: '3', title: 'Evaluation running', description: 'MMLU benchmark in progress', date: '2026-08-15 11:00', status: 'active' },
          { id: '4', title: 'Deployment scheduled', description: 'Pending evaluation pass', date: '2026-08-15 12:00', status: 'upcoming' },
        ]}
      />
    ),
    webCode: `import { TimelineView } from '@stellix/ui-web';

<TimelineView
  events={[
    { id: '1', title: 'Training started',   description: 'Phase 1 - ingestion',  timestamp: '2026-08-15T09:00:00Z', status: 'completed' },
    { id: '2', title: 'Checkpoint saved',   description: 'Step 10k - loss: 1.42', timestamp: '2026-08-15T10:30:00Z', status: 'completed' },
    { id: '3', title: 'Evaluation running', description: 'MMLU benchmark',        timestamp: '2026-08-15T11:00:00Z', status: 'active' },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'events', type: 'TimelineEvent[]', default: '-', description: 'Ordered array of timeline events.' },
      { name: 'showTimestamps', type: 'boolean', default: 'true', description: 'Display formatted timestamps beside events.' },
    ],
  },

  'file-tree': {
    title: 'FileTree',
    description: 'An expandable file system tree with file-type icons and selection state.',
    category: 'Data Display',
    preview: (
      <FileTree
        items={[
          { name: 'src', type: 'folder', children: [
            { name: 'components', type: 'folder', children: [
              { name: 'Button.tsx', type: 'file' },
              { name: 'Badge.tsx', type: 'file' },
            ]},
            { name: 'hooks', type: 'folder', children: [
              { name: 'useTheme.ts', type: 'file' },
            ]},
            { name: 'index.ts', type: 'file' },
          ]},
          { name: 'package.json', type: 'file' },
          { name: 'tsconfig.json', type: 'file' },
        ]}
      />
    ),
    webCode: `import { FileTree } from '@stellix/ui-web';

<FileTree
  nodes={[
    { id: 'src', name: 'src', type: 'folder', children: [
      { id: 'app', name: 'app', type: 'folder', children: [
        { id: 'page', name: 'page.tsx', type: 'file' },
      ]},
    ]},
    { id: 'pkg', name: 'package.json', type: 'file' },
  ]}
  onSelect={(node) => openFile(node.id)}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'nodes', type: 'FileNode[]', default: '-', description: 'Tree of file and folder nodes.' },
      { name: 'defaultExpanded', type: 'string[]', default: '[]', description: 'IDs of folders expanded by default.' },
      { name: 'onSelect', type: '(node: FileNode) => void', default: '-', description: 'Fired when a node is clicked.' },
    ],
  },

  'json-viewer': {
    title: 'JSONViewer',
    description: 'A collapsible, syntax-highlighted JSON tree with copy and expand-all controls.',
    category: 'Data Display',
    preview: (
      <JSONViewer
        data={{
          model: 'chimera-70b',
          usage: { prompt_tokens: 512, completion_tokens: 248, total_tokens: 760 },
          choices: [{ index: 0, message: { role: 'assistant', content: 'Hello, how can I help?' }, finish_reason: 'stop' }],
          created: 1723680000,
        }}
        defaultExpanded
      />
    ),
    webCode: `import { JSONViewer } from '@stellix/ui-web';

<JSONViewer
  data={{
    model: 'chimera-70b',
    usage: { prompt_tokens: 512, completion_tokens: 248 },
    choices: [{ message: { role: 'assistant', content: 'Hello!' } }],
  }}
  defaultExpanded
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'data', type: 'unknown', default: '-', description: 'Any JSON-serializable value to display.' },
      { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Expand all nodes on first render.' },
      { name: 'maxDepth', type: 'number', default: '3', description: 'Maximum initially expanded depth.' },
    ],
  },

  'markdown-view': {
    title: 'MarkdownView',
    description: 'A styled Markdown renderer with code highlighting, table support, and link handling.',
    category: 'Data Display',
    preview: (
      <MarkdownView
        content={`## Stellix UI Material\n\nA **production-ready** component library for agentic AI interfaces.\n\n- 39 cross-platform components\n- Full dark mode support\n- TypeScript first\n\n\`\`\`ts\nimport { Button } from '@stellix/ui-web';\n\`\`\``}
      />
    ),
    webCode: `import { MarkdownView } from '@stellix/ui-web';

<MarkdownView
  content={\`## Hello\n\nThis is **bold** and this is \\\`code\\\`.\n\n- Item 1\n- Item 2\`}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'content', type: 'string', default: '-', description: 'Markdown string to render.' },
      { name: 'sanitize', type: 'boolean', default: 'true', description: 'Strip unsafe HTML before rendering.' },
      { name: 'onLinkClick', type: '(href: string) => void', default: '-', description: 'Intercept link clicks.' },
    ],
  },

  changelog: {
    title: 'Changelog',
    description: 'A versioned changelog list with release date, version badge, and categorized entries.',
    category: 'Data Display',
    preview: (
      <Changelog
        entries={[
          {
            version: '2.1.0',
            date: '2026-08-15',
            changes: [
              { type: 'feat', description: '39 Phase 11 components including Button, Badge, and Avatar.' },
              { type: 'fix', description: 'Reduced bundle size by 18% via tree-shaking improvements.' },
            ],
          },
          {
            version: '2.0.0',
            date: '2026-07-01',
            changes: [
              { type: 'feat', description: 'Phase 10 variants - PulseLoader, WaveLoader, AgentChat, and more.' },
              { type: 'fix', description: 'Search modal z-index conflict on nested portals.' },
              { type: 'breaking', description: 'Renamed FineTuneCard onChange signature - value is now typed.' },
            ],
          },
        ]}
      />
    ),
    webCode: `import { Changelog } from '@stellix/ui-web';

<Changelog
  releases={[
    {
      version: '2.1.0',
      date: '2026-08-15',
      entries: [
        { type: 'added',    text: '39 new Phase 11 components.' },
        { type: 'improved', text: 'Reduced bundle size by 18%.' },
      ],
    },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'releases', type: 'Release[]', default: '-', description: 'Ordered array of release objects.' },
    ],
  },

  'activity-feed': {
    title: 'ActivityFeed',
    description: 'A chronological feed of user and system activity events with actor avatars and timestamps.',
    category: 'Data Display',
    preview: (
      <ActivityFeed
        items={[
          { id: '1', user: { name: 'Ada Lovelace' }, action: 'deployed', target: 'Chimera-70B v2.1', timestamp: '2 minutes ago' },
          { id: '2', user: { name: 'Alan Turing' }, action: 'commented on', target: 'Training run #42', timestamp: '15 minutes ago' },
          { id: '3', user: { name: 'System' }, action: 'auto-scaled', target: 'Worker pool to 8 instances', timestamp: '1 hour ago' },
          { id: '4', user: { name: 'Grace Hopper' }, action: 'approved', target: 'PR #187 - add token counter', timestamp: '3 hours ago' },
        ]}
      />
    ),
    webCode: `import { ActivityFeed } from '@stellix/ui-web';

<ActivityFeed
  events={[
    { id: '1', actor: { name: 'Ada Lovelace', initials: 'AL' }, action: 'deployed', target: 'v2.1', timestamp: '2m ago' },
    { id: '2', actor: { name: 'System', initials: 'SY' },       action: 'scaled',   target: 'Workers x8', timestamp: '1h ago' },
  ]}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'events', type: 'ActivityEvent[]', default: '-', description: 'Feed events to display.' },
      { name: 'onLoadMore', type: '() => void', default: '-', description: 'Called when the user scrolls to the bottom.' },
    ],
  },

  // -- AI / Agent ----------------------------------------------------------------
  'agent-status': {
    title: 'AgentStatus',
    description: 'Displays the current state of an AI agent - idle, thinking, executing, or error - with an animated indicator.',
    category: 'AI / Agent',
    preview: (
      <div className="space-y-3">
        <AgentStatus state="idle" label="Agent ready" model="Chimera-70B" duration={0} />
        <AgentStatus state="thinking" label="Analyzing request" model="Chimera-70B" duration={2400} />
        <AgentStatus state="acting" label="Calling read_file" model="Chimera-70B" duration={5200} />
        <AgentStatus state="error" label="Tool call failed" model="Chimera-70B" duration={8100} />
      </div>
    ),
    webCode: `import { AgentStatus } from '@stellix/ui-web';

<AgentStatus status="idle"      label="Chimera-70B" />
<AgentStatus status="thinking"  label="Chimera-70B" detail="Analyzing request..." />
<AgentStatus status="executing" label="Chimera-70B" detail="Calling tool: read_file" />
<AgentStatus status="error"     label="Chimera-70B" detail="Tool call failed" />`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'status', type: "'idle' | 'thinking' | 'executing' | 'error'", default: "'idle'", description: 'Current agent state.' },
      { name: 'label', type: 'string', default: '-', description: 'Agent or model name.' },
      { name: 'detail', type: 'string', default: '-', description: 'Additional status detail text.' },
    ],
  },

  'tool-call-card': {
    title: 'ToolCallCard',
    description: 'A detailed card showing a single tool call with input parameters, output, and execution status.',
    category: 'AI / Agent',
    preview: (
      <div className="space-y-4">
        <ToolCallCard
          name="read_file"
          status="success"
          input='{"path": "src/components/Button.tsx", "encoding": "utf-8"}'
          output='"142 lines read successfully."'
          duration={82}
        />
        <ToolCallCard
          name="search_web"
          status="running"
          input='{"query": "Stellix UI installation guide", "max_results": 5}'
          output=""
          duration={0}
        />
        <ToolCallCard
          name="run_shell"
          status="error"
          input='{"command": "npm test"}'
          output='"Error: 3 tests failed."'
          duration={4200}
        />
      </div>
    ),
    webCode: `import { ToolCallCard } from '@stellix/ui-web';

<ToolCallCard
  toolName="read_file"
  status="success"
  input={{ path: 'src/index.ts' }}
  output="142 lines read."
  duration={82}
/>

<ToolCallCard
  toolName="search_web"
  status="running"
  input={{ query: 'docs', max_results: 5 }}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'toolName', type: 'string', default: '-', description: 'Name of the tool being called.' },
      { name: 'status', type: "'running' | 'success' | 'error'", default: "'running'", description: 'Execution status.' },
      { name: 'input', type: 'Record<string, unknown>', default: '-', description: 'Input parameters passed to the tool.' },
      { name: 'output', type: 'string', default: '-', description: 'Tool output or error message.' },
      { name: 'duration', type: 'number', default: '-', description: 'Execution time in milliseconds.' },
    ],
  },

  'model-selector': {
    title: 'ModelSelector',
    description: 'A rich model picker showing provider, context window, cost, and capability badges.',
    category: 'AI / Agent',
    preview: (
      <ModelSelector
        value="chimera-70b"
        models={[
          { id: 'chimera-70b', name: 'Chimera-70B', provider: 'Stellix', contextWindow: 128000, costPer1k: 0.002, capabilities: ['tools', 'vision', 'reasoning'] },
          { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', contextWindow: 128000, costPer1k: 0.005, capabilities: ['tools', 'vision'] },
          { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', contextWindow: 200000, costPer1k: 0.003, capabilities: ['tools', 'vision', 'reasoning'] },
          { id: 'gemini-pro-2', name: 'Gemini 2.0 Pro', provider: 'Google', contextWindow: 1000000, costPer1k: 0.0035, capabilities: ['tools', 'vision'] },
        ]}
        onChange={(id) => console.log('model', id)}
      />
    ),
    webCode: `import { ModelSelector } from '@stellix/ui-web';

<ModelSelector
  value={selectedModel}
  models={[
    { id: 'chimera-70b',       name: 'Chimera-70B',        provider: 'Stellix',    contextWindow: 128000, costPer1k: 0.002 },
    { id: 'gpt-4o',            name: 'GPT-4o',             provider: 'OpenAI',     contextWindow: 128000, costPer1k: 0.005 },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet',  provider: 'Anthropic',  contextWindow: 200000, costPer1k: 0.003 },
  ]}
  onChange={(id) => setSelectedModel(id)}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'models', type: 'ModelOption[]', default: '-', description: 'Available models with metadata.' },
      { name: 'value', type: 'string', default: '-', description: 'Currently selected model ID.' },
      { name: 'onChange', type: '(id: string) => void', default: '-', description: 'Fired when the user selects a model.' },
    ],
  },

  'token-counter': {
    title: 'TokenCounter',
    description: 'Displays prompt, completion, and total token counts with a visual usage bar against the context limit.',
    category: 'AI / Agent',
    preview: (
      <div className="space-y-4 max-w-sm">
        <TokenCounter
          prompt={3240}
          completion={512}
          contextLimit={128000}
          model="Chimera-70B"
        />
        <TokenCounter
          prompt={185000}
          completion={4096}
          contextLimit={200000}
          model="Claude 3.5 Sonnet"
          warning
        />
      </div>
    ),
    webCode: `import { TokenCounter } from '@stellix/ui-web';

<TokenCounter
  prompt={3240}
  completion={512}
  contextLimit={128000}
  model="Chimera-70B"
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'prompt', type: 'number', default: '0', description: 'Number of prompt tokens.' },
      { name: 'completion', type: 'number', default: '0', description: 'Number of completion tokens.' },
      { name: 'contextLimit', type: 'number', default: '-', description: 'Maximum context window size for the model.' },
      { name: 'model', type: 'string', default: '-', description: 'Model name label.' },
      { name: 'warning', type: 'boolean', default: 'false', description: 'Highlight when approaching context limit.' },
    ],
  },

  'conversation-list': {
    title: 'ConversationList',
    description: 'A sidebar list of past conversations with search, pinning, and delete actions.',
    category: 'AI / Agent',
    preview: (
      <div className="h-96 w-72 overflow-auto rounded-xl border border-line">
        <ConversationList
          conversations={[
            { id: '1', title: 'Refactor auth module', lastMessage: 'Here is the updated code...', timestamp: '2 min ago', pinned: true },
            { id: '2', title: 'MoE architecture deep-dive', lastMessage: 'The gating network routes tokens to...', timestamp: '1 hr ago' },
            { id: '3', title: 'Debug slow query', lastMessage: 'Try adding an index on user_id.', timestamp: 'Yesterday' },
            { id: '4', title: 'Write unit tests for API', lastMessage: 'I have generated 12 test cases.', timestamp: '2 days ago' },
          ]}
          activeId="2"
          onSelect={(id) => console.log('select', id)}
          onDelete={(id) => console.log('delete', id)}
          onPin={(id) => console.log('pin', id)}
        />
      </div>
    ),
    webCode: `import { ConversationList } from '@stellix/ui-web';

<ConversationList
  conversations={[
    { id: '1', title: 'Refactor auth module',   lastMessage: 'Here is the updated code...', timestamp: '2m ago', pinned: true },
    { id: '2', title: 'MoE architecture',       lastMessage: 'The gating network...',        timestamp: '1h ago' },
  ]}
  activeId={activeConversation}
  onSelect={(id) => setActiveConversation(id)}
  onDelete={(id) => deleteConversation(id)}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'conversations', type: 'Conversation[]', default: '-', description: 'List of conversation summaries.' },
      { name: 'activeId', type: 'string', default: '-', description: 'Currently selected conversation ID.' },
      { name: 'onSelect', type: '(id: string) => void', default: '-', description: 'Fired when a conversation is clicked.' },
      { name: 'onDelete', type: '(id: string) => void', default: '-', description: 'Fired when delete is triggered.' },
      { name: 'onPin', type: '(id: string) => void', default: '-', description: 'Fired when pin/unpin is triggered.' },
    ],
  },

  'system-prompt': {
    title: 'SystemPrompt',
    description: 'An editable system prompt card with token count, template picker, and version history.',
    category: 'AI / Agent',
    preview: (
      <SystemPrompt
        value="You are Chimera, a helpful enterprise AI assistant built by Stellix Private Ltd. You have access to tools for reading files, searching the web, and running code. Always respond in the user's language and cite your sources."
        maxTokens={2048}
        presets={[
          { label: 'Helpful assistant', value: 'You are a helpful AI assistant.' },
          { label: 'Senior engineer', value: 'You are a senior software engineer who writes clean, tested code.' },
          { label: 'Data analyst', value: 'You are a data analyst who explains findings clearly with charts.' },
        ]}
        onChange={(val) => console.log('prompt', val)}
      />
    ),
    webCode: `import { SystemPrompt } from '@stellix/ui-web';

const [prompt, setPrompt] = useState('You are a helpful assistant.');

<SystemPrompt
  value={prompt}
  tokenCount={tokenize(prompt).length}
  templates={[
    { id: 'helpful', name: 'Helpful assistant', prompt: 'You are a helpful AI assistant.' },
    { id: 'coder',   name: 'Senior engineer',   prompt: 'You are a senior software engineer.' },
  ]}
  onChange={setPrompt}
/>`,
    nativeCode: `Same API - import from @stellix/ui-native`,
    propsTable: [
      { name: 'value', type: 'string', default: '-', description: 'Current system prompt text.' },
      { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Fired on every edit.' },
      { name: 'tokenCount', type: 'number', default: '-', description: 'Token count to display.' },
      { name: 'templates', type: '{ id: string; name: string; prompt: string }[]', default: '[]', description: 'Preset templates available in the picker.' },
    ],
  },

  // ═══════════════════════════════════════
  // Phase 12 — Composition Patterns
  // ═══════════════════════════════════════

  'ai-chat-layout': {
    title: 'AIChatLayout',
    description: 'Full-page AI chat layout with conversation sidebar, chat thread, and prompt composer bar.',
    category: 'Compositions',
    preview: (
      <div className="h-[500px] rounded-xl border border-line overflow-hidden">
        <AIChatLayout />
      </div>
    ),
    webCode: `import { AIChatLayout } from '@stellix/ui-web';

<AIChatLayout
  conversations={[...]}
  messages={[...]}
  onSend={(msg) => handleSend(msg)}
/>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { name: 'conversations', type: 'ConversationItem[]', default: 'sample data', description: 'List of past conversations for sidebar.' },
      { name: 'messages', type: 'ChatMessage[]', default: 'sample data', description: 'Messages for the main chat thread.' },
      { name: 'onSend', type: '(msg: string) => void', default: '-', description: 'Fired when user sends a message.' },
    ],
  },

  'dashboard-layout': {
    title: 'DashboardLayout',
    description: 'Analytics dashboard with metric cards, charts, task list, and activity feed.',
    category: 'Compositions',
    preview: <DashboardLayout />,
    webCode: `import { DashboardLayout } from '@stellix/ui-web';

<DashboardLayout />`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [],
  },

  'agent-workbench': {
    title: 'AgentWorkbench',
    description: 'AI agent workspace with status bar, thinking panel, tool chips, streaming output, and approval card.',
    category: 'Compositions',
    preview: <AgentWorkbench />,
    webCode: `import { AgentWorkbench } from '@stellix/ui-web';

<AgentWorkbench />`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [],
  },

  'code-review': {
    title: 'CodeReview',
    description: 'Code review layout with diff viewer, review chat thread, and approval actions.',
    category: 'Compositions',
    preview: <CodeReview />,
    webCode: `import { CodeReview } from '@stellix/ui-web';

<CodeReview />`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [],
  },

  'data-explorer': {
    title: 'DataExplorer',
    description: 'Data exploration layout with filter chips, sortable records table, and insight charts.',
    category: 'Compositions',
    preview: <DataExplorer />,
    webCode: `import { DataExplorer } from '@stellix/ui-web';

<DataExplorer />`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [],
  },

  'onboarding-wizard': {
    title: 'OnboardingWizard',
    description: 'Multi-step onboarding flow with step indicator, dynamic content, and navigation buttons.',
    category: 'Compositions',
    preview: <OnboardingWizard />,
    webCode: `import { OnboardingWizard } from '@stellix/ui-web';

<OnboardingWizard />`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [],
  },

  'glimm-effect': {
    title: 'GlimmEffect',
    description: 'Shimmer / glimmer highlight that sweeps across wrapped content to draw attention or indicate loading.',
    category: 'Animations',
    preview: <GlimmEffect active><div className="rounded-xl border border-line bg-surface p-8 text-center text-ink">Hover to see shimmer</div></GlimmEffect>,
    webCode: `import { GlimmEffect } from '@stellix/ui-web';

<GlimmEffect active>
  <div className="rounded-xl border border-line bg-surface p-8 text-center text-ink">
    Hover to see shimmer
  </div>
</GlimmEffect>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'active', type: 'boolean', default: 'false', description: 'Enable the shimmer sweep animation.' },
      { prop: 'duration', type: 'number', default: '1200', description: 'Duration of one sweep cycle in ms.' },
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Content to wrap with the shimmer effect.' },
    ],
  },

  'gliding-highlight': {
    title: 'GlidingHighlight',
    description: 'Animated pill that slides between tab/nav items, providing a smooth active-state indicator.',
    category: 'Animations',
    preview: <GlidingHighlight items={[{id: 'a', label: 'Overview'}, {id: 'b', label: 'API'}, {id: 'c', label: 'Examples'}, {id: 'd', label: 'FAQ'}]} activeId="b" onChange={() => {}} />,
    webCode: `import { GlidingHighlight } from '@stellix/ui-web';

<GlidingHighlight
  items={[
    { id: 'a', label: 'Overview' },
    { id: 'b', label: 'API' },
    { id: 'c', label: 'Examples' },
    { id: 'd', label: 'FAQ' },
  ]}
  activeId="b"
  onChange={(id) => setActive(id)}
/>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'items', type: '{ id: string; label: string }[]', default: '—', description: 'List of navigation items.' },
      { prop: 'activeId', type: 'string', default: '—', description: 'ID of the currently active item.' },
      { prop: 'onChange', type: '(id: string) => void', default: '—', description: 'Callback when user selects a different item.' },
    ],
  },

  'morph-transition': {
    title: 'MorphTransition',
    description: 'Smooth fade/scale transition triggered when its key prop changes, ideal for route or state changes.',
    category: 'Animations',
    preview: <MorphTransition transitionKey="demo"><div className="rounded-xl border border-line bg-surface p-6 text-center text-ink">Content fades in</div></MorphTransition>,
    webCode: `import { MorphTransition } from '@stellix/ui-web';

<MorphTransition transitionKey={currentView}>
  <div className="rounded-xl border border-line bg-surface p-6 text-center text-ink">
    Content fades in
  </div>
</MorphTransition>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'transitionKey', type: 'string | number', default: '—', description: 'Changing this value triggers the transition.' },
      { prop: 'duration', type: 'number', default: '300', description: 'Transition duration in ms.' },
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Content to transition.' },
    ],
  },

  'confetti-effect': {
    title: 'ConfettiEffect',
    description: 'Burst of confetti particles over wrapped content — perfect for success states and celebrations.',
    category: 'Animations',
    preview: <ConfettiEffect active={false}><div className="rounded-xl border border-line bg-surface p-6 text-center text-ink text-sm">Click the Preview tab to trigger</div></ConfettiEffect>,
    webCode: `import { ConfettiEffect } from '@stellix/ui-web';

<ConfettiEffect active={showConfetti}>
  <div className="rounded-xl border border-line bg-surface p-6 text-center text-ink text-sm">
    Click the Preview tab to trigger
  </div>
</ConfettiEffect>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'active', type: 'boolean', default: 'false', description: 'Set to true to fire the confetti burst.' },
      { prop: 'count', type: 'number', default: '80', description: 'Number of confetti particles.' },
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Content beneath the confetti layer.' },
    ],
  },

  'typewriter-effect': {
    title: 'TypewriterEffect',
    description: 'Types out a string character-by-character with a blinking cursor, mimicking a terminal or live narration.',
    category: 'Animations',
    preview: <TypewriterEffect text="Stellix UI Material ships 92 components for Next.js and React Native." speed={40} />,
    webCode: `import { TypewriterEffect } from '@stellix/ui-web';

<TypewriterEffect
  text="Stellix UI Material ships 92 components for Next.js and React Native."
  speed={40}
/>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'text', type: 'string', default: '—', description: 'The string to type out.' },
      { prop: 'speed', type: 'number', default: '50', description: 'Delay in ms between each character.' },
      { prop: 'loop', type: 'boolean', default: 'false', description: 'Restart from the beginning after finishing.' },
    ],
  },

  'number-ticker': {
    title: 'NumberTicker',
    description: 'Animates a numeric value counting up (or down) to the target, with optional prefix, suffix, and decimals.',
    category: 'Animations',
    preview: <div className="flex gap-8"><NumberTicker value={1456} prefix="" suffix=" tests" /><NumberTicker value={92} suffix=" components" /><NumberTicker value={99.9} suffix="%" decimals={1} /></div>,
    webCode: `import { NumberTicker } from '@stellix/ui-web';

<div className="flex gap-8">
  <NumberTicker value={1456} suffix=" tests" />
  <NumberTicker value={92} suffix=" components" />
  <NumberTicker value={99.9} suffix="%" decimals={1} />
</div>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'value', type: 'number', default: '—', description: 'Target numeric value to animate to.' },
      { prop: 'suffix', type: 'string', default: "''", description: 'Text appended after the number.' },
      { prop: 'decimals', type: 'number', default: '0', description: 'Number of decimal places to display.' },
    ],
  },

  'progress-ring': {
    title: 'ProgressRing',
    description: 'Circular SVG progress indicator with an optional center label, configurable size and stroke width.',
    category: 'Animations',
    preview: <div className="flex gap-6"><ProgressRing value={75} label="75%" /><ProgressRing value={45} size={48} strokeWidth={3} /><ProgressRing value={100} label="Done" /></div>,
    webCode: `import { ProgressRing } from '@stellix/ui-web';

<div className="flex gap-6">
  <ProgressRing value={75} label="75%" />
  <ProgressRing value={45} size={48} strokeWidth={3} />
  <ProgressRing value={100} label="Done" />
</div>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'value', type: 'number', default: '—', description: 'Progress percentage (0–100).' },
      { prop: 'size', type: 'number', default: '64', description: 'Diameter of the ring in px.' },
      { prop: 'strokeWidth', type: 'number', default: '4', description: 'Thickness of the progress arc.' },
    ],
  },

  'ripple-effect': {
    title: 'RippleEffect',
    description: 'Material-style ink ripple that radiates from the pointer on click, wrapping any interactive element.',
    category: 'Animations',
    preview: <RippleEffect><button className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white">Click for ripple</button></RippleEffect>,
    webCode: `import { RippleEffect } from '@stellix/ui-web';

<RippleEffect>
  <button className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white">
    Click for ripple
  </button>
</RippleEffect>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'color', type: 'string', default: "'rgba(255,255,255,0.35)'", description: 'Color of the ripple overlay.' },
      { prop: 'duration', type: 'number', default: '500', description: 'Ripple expand duration in ms.' },
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Element that receives the ripple on click.' },
    ],
  },

  'shake-animation': {
    title: 'ShakeAnimation',
    description: 'Horizontal shake animation applied to wrapped content — ideal for invalid form inputs or error states.',
    category: 'Animations',
    preview: <ShakeAnimation shake={false}><div className="rounded-lg border-2 border-red bg-red/5 p-4 text-center text-sm text-red">Invalid input - set shake=true to trigger</div></ShakeAnimation>,
    webCode: `import { ShakeAnimation } from '@stellix/ui-web';

<ShakeAnimation shake={hasError}>
  <div className="rounded-lg border-2 border-red bg-red/5 p-4 text-center text-sm text-red">
    Invalid input - set shake=true to trigger
  </div>
</ShakeAnimation>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'shake', type: 'boolean', default: 'false', description: 'Trigger the shake animation when true.' },
      { prop: 'intensity', type: 'number', default: '6', description: 'Pixel offset for the shake displacement.' },
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Content to apply the shake to.' },
    ],
  },

  'slide-reveal': {
    title: 'SlideReveal',
    description: 'Slides content into view from a chosen direction when it enters the viewport, with an optional delay.',
    category: 'Animations',
    preview: <div className="space-y-3"><SlideReveal direction="up" delay={0}><div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides up</div></SlideReveal><SlideReveal direction="right" delay={200}><div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides right</div></SlideReveal><SlideReveal direction="left" delay={400}><div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides left</div></SlideReveal></div>,
    webCode: `import { SlideReveal } from '@stellix/ui-web';

<div className="space-y-3">
  <SlideReveal direction="up" delay={0}>
    <div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides up</div>
  </SlideReveal>
  <SlideReveal direction="right" delay={200}>
    <div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides right</div>
  </SlideReveal>
  <SlideReveal direction="left" delay={400}>
    <div className="rounded-lg border border-line bg-surface p-3 text-sm text-ink">Slides left</div>
  </SlideReveal>
</div>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { prop: 'direction', type: "'up' | 'down' | 'left' | 'right'", default: "'up'", description: 'Direction the content slides in from.' },
      { prop: 'delay', type: 'number', default: '0', description: 'Delay in ms before the animation starts.' },
      { prop: 'children', type: 'ReactNode', default: '-', description: 'Content to reveal.' },
    ],
  },

  // Phase 14 - Themes
  'theme-switcher': {
    title: 'ThemeSwitcher',
    description: 'Pick from 8 preset themes - light, dark, midnight, sunset, forest, ocean, monochrome, and high-contrast. Instantly applies CSS variable overrides.',
    category: 'Themes',
    preview: <ThemeSwitcher />,
    webCode: `import { ThemeSwitcher } from '@stellix/ui-web';

<ThemeSwitcher />

// Or target a specific element:
const ref = useRef(null);
<div ref={ref}>
  <ThemeSwitcher target={ref} />
  <YourContent />
</div>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { name: 'target', type: 'RefObject<HTMLElement>', default: 'document.documentElement', description: 'Element to apply theme CSS variables to.' },
    ],
  },

  'theme-builder': {
    title: 'ThemeBuilder',
    description: 'Custom theme builder with color pickers for every design token. Build your own theme by adjusting accent, text, surface, border, and status colors in real-time.',
    category: 'Themes',
    preview: <ThemeBuilder />,
    webCode: `import { ThemeBuilder } from '@stellix/ui-web';

<ThemeBuilder />

// Or target a specific container:
const ref = useRef(null);
<div ref={ref}>
  <ThemeBuilder target={ref} />
</div>`,
    nativeCode: 'Same API - import from @stellix/ui-native',
    propsTable: [
      { name: 'target', type: 'RefObject<HTMLElement>', default: 'document.documentElement', description: 'Element to apply custom CSS variables to.' },
    ],
  },
};

// --- Page ---------------------------------------------------------------------

export default function ComponentSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const config = componentRegistry[slug];

  if (!config) {
    notFound();
  }

  return (
    <ComponentPage
      title={config.title}
      description={config.description}
      category={config.category}
      webCode={config.webCode}
      nativeCode={config.nativeCode}
      propsTable={config.propsTable}
    >
      {config.preview}
    </ComponentPage>
  );
}
