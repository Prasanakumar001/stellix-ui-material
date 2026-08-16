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
      <div className="flex flex-wrap items-center gap-8">
        <LoadingState variant="drive" label="Processing..." showTimer />
        <LoadingState variant="dots" label="Thinking..." />
        <LoadingState variant="orbit" />
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
    preview: (
      <TaskRows
        expandable
        tasks={[
          { id: '1', title: 'Ingest document corpus', status: 'completed', progress: 100, duration: 1240 },
          { id: '2', title: 'Embed chunks into vector store', status: 'running', progress: 62, description: 'Processing batch 3 of 5' },
          { id: '3', title: 'Fine-tune retrieval model', status: 'queued' },
          { id: '4', title: 'Validate output schema', status: 'failed', description: 'JSON schema mismatch on field "confidence"' },
        ]}
      />
    ),
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
      <CodeBlock
        language="typescript"
        showLineNumbers
        code={`import { CodeBlock } from '@stellix/ui-web';

function App() {
  return (
    <CodeBlock
      language="typescript"
      showLineNumbers
      code={sourceCode}
    />
  );
}`}
      />
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
    preview: (
      <Chat
        tabs={['General', 'Code', 'Data']}
        messages={[
          { id: '1', role: 'user', content: 'What is a mixture of experts model?', timestamp: Date.now() - 60000 },
          {
            id: '2',
            role: 'assistant',
            content:
              'A Mixture of Experts (MoE) is a neural network architecture where different subnetworks ("experts") specialise in different parts of the input space, and a gating mechanism routes each token to the most relevant expert.',
            reasoning: 'The question is about MoE architecture. I should explain routing and sparsity clearly.',
            timestamp: Date.now() - 30000,
          },
          { id: '3', role: 'user', content: 'How does the gating network work?', timestamp: Date.now() - 10000 },
        ]}
        onSend={(msg) => console.log('send', msg)}
      />
    ),
    webCode: `import { Chat } from '@stellix/ui-web';

<Chat
  tabs={['General', 'Code', 'Data']}
  messages={[
    { id: '1', role: 'user',      content: 'What is a mixture of experts model?',  timestamp: Date.now() - 60000 },
    { id: '2', role: 'assistant', content: 'A Mixture of Experts (MoE) is...',     timestamp: Date.now() - 30000,
      reasoning: 'The question is about MoE architecture.' },
    { id: '3', role: 'user',      content: 'How does the gating network work?',    timestamp: Date.now() },
  ]}
  onSend={(message) => sendToApi(message)}
/>`,
    nativeCode: `import { Chat } from '@stellix/ui-native';

<Chat
  messages={[
    { id: '1', role: 'user',      content: 'What is MoE?',                timestamp: Date.now() },
    { id: '2', role: 'assistant', content: 'A Mixture of Experts is...',  timestamp: Date.now() },
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
    ),
    webCode: `import { InsightCards } from '@stellix/ui-web';

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
