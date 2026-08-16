'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { AgentStatus } from '../AgentStatus';
import { Thinking } from '../Thinking';
import { ToolChips } from '../ToolChips';
import { StreamingText } from '../StreamingText';
import { ApprovalCard } from '../ApprovalCard';

const THINKING_STEPS = [
  {
    id: 's1',
    type: 'reasoning' as const,
    content: 'The user wants to refactor the attention module. I should first read the current implementation, identify coupling, then propose a clean abstraction.',
    status: 'completed' as const,
    timestamp: Date.now() - 12000,
  },
  {
    id: 's2',
    type: 'search' as const,
    content: 'Searching codebase for all references to MultiHeadAttention and cross-attention layers.',
    status: 'completed' as const,
    timestamp: Date.now() - 9000,
  },
  {
    id: 's3',
    type: 'steps' as const,
    content: 'Plan: (1) extract query/key/value projections into separate module, (2) decouple positional encoding, (3) update all callers.',
    status: 'active' as const,
    timestamp: Date.now() - 4000,
  },
];

const TOOL_CALLS = [
  { id: 'tc1', name: 'read_file', status: 'success' as const, file: 'src/model/attention.py', additions: 0, deletions: 0, summary: 'Read 284 lines' },
  { id: 'tc2', name: 'search_codebase', status: 'success' as const, summary: 'Found 12 references across 6 files' },
  { id: 'tc3', name: 'write_file', status: 'running' as const, file: 'src/model/attention_refactored.py', additions: 310, deletions: 0 },
];

const STREAMING_OUTPUT =
  'I have analysed the attention module and identified three areas of tight coupling. ' +
  'The refactored version separates the QKV projection layer, positional encoding, and attention computation into distinct submodules. ' +
  'This will reduce parameter count by ~2% and make it straightforward to swap in rotary or ALiBi position encodings without touching the core attention logic. ' +
  'The new file `attention_refactored.py` is ready for review.';

const APPROVAL_OPTIONS = [
  { id: 'apply', label: 'Apply refactoring', description: 'Write the new file and update all imports' },
  { id: 'apply_tests', label: 'Apply and run tests', description: 'Apply changes then execute the test suite' },
  { id: 'discard', label: 'Discard', description: 'Do not apply any changes' },
];

export function AgentWorkbench() {
  return (
    <div className="flex flex-col gap-4 p-6" data-testid="agent-workbench">
      {/* Status bar */}
      <div data-testid="workbench-status">
        <AgentStatus
          state="acting"
          label="Refactoring attention module"
          duration={16400}
          model="Stellix-3"
        />
      </div>

      {/* Two-column grid */}
      <div
        className={cn('grid grid-cols-1 gap-4 md:grid-cols-2')}
        data-testid="workbench-grid"
      >
        {/* Left: Thinking + ToolChips */}
        <div className="flex flex-col gap-4" data-testid="workbench-left">
          <div data-testid="workbench-thinking">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Reasoning
            </h3>
            <Thinking steps={THINKING_STEPS} defaultOpen />
          </div>
          <div data-testid="workbench-tools">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Tool Calls
            </h3>
            <ToolChips tools={TOOL_CALLS} />
          </div>
        </div>

        {/* Right: StreamingText + ApprovalCard */}
        <div className="flex flex-col gap-4" data-testid="workbench-right">
          <div data-testid="workbench-output">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Agent Output
            </h3>
            <StreamingText text={STREAMING_OUTPUT} speed={18} />
          </div>
          <div data-testid="workbench-approval">
            <ApprovalCard
              title="Apply changes?"
              description="The agent has prepared a refactoring proposal. Choose how to proceed."
              options={APPROVAL_OPTIONS}
              type="radio"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
