'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { DiffTable } from '../DiffTable';
import { Chat } from '../Chat';
import { ApprovalCard } from '../ApprovalCard';

const DIFF_HUNKS = [
  {
    id: 'hunk1',
    lines: [
      { type: 'unchanged' as const, content: 'class MultiHeadAttention(nn.Module):', oldLineNumber: 1, newLineNumber: 1 },
      { type: 'unchanged' as const, content: '    def __init__(self, d_model, n_heads):', oldLineNumber: 2, newLineNumber: 2 },
      { type: 'remove' as const, content: '        self.qkv = nn.Linear(d_model, 3 * d_model)', oldLineNumber: 3 },
      { type: 'add' as const, content: '        self.q_proj = nn.Linear(d_model, d_model)', newLineNumber: 3 },
      { type: 'add' as const, content: '        self.k_proj = nn.Linear(d_model, d_model)', newLineNumber: 4 },
      { type: 'add' as const, content: '        self.v_proj = nn.Linear(d_model, d_model)', newLineNumber: 5 },
      { type: 'unchanged' as const, content: '        self.out_proj = nn.Linear(d_model, d_model)', oldLineNumber: 4, newLineNumber: 6 },
    ],
  },
  {
    id: 'hunk2',
    lines: [
      { type: 'unchanged' as const, content: '    def forward(self, x, mask=None):', oldLineNumber: 10, newLineNumber: 12 },
      { type: 'remove' as const, content: '        q, k, v = self.qkv(x).chunk(3, dim=-1)', oldLineNumber: 11 },
      { type: 'add' as const, content: '        q = self.q_proj(x)', newLineNumber: 13 },
      { type: 'add' as const, content: '        k = self.k_proj(x)', newLineNumber: 14 },
      { type: 'add' as const, content: '        v = self.v_proj(x)', newLineNumber: 15 },
      { type: 'unchanged' as const, content: '        scores = torch.matmul(q, k.transpose(-2, -1))', oldLineNumber: 12, newLineNumber: 16 },
    ],
  },
];

const REVIEW_MESSAGES = [
  {
    id: 'rm1',
    role: 'user' as const,
    content: 'Why split qkv into separate projections? The fused version is more memory-efficient.',
    reasoning: undefined,
    timestamp: Date.now() - 300000,
  },
  {
    id: 'rm2',
    role: 'assistant' as const,
    content:
      'Good point. The separate projections add flexibility for per-head dimension scaling and for swapping positional encodings independently on Q and K. ' +
      'That said, if memory is a priority at this scale we can keep a fused projection and split after the linear. Want me to revise the diff?',
    reasoning: 'The reviewer is weighing flexibility vs efficiency. I should acknowledge the trade-off and offer an alternative.',
    timestamp: Date.now() - 240000,
  },
];

const APPROVAL_OPTIONS = [
  { id: 'approve', label: 'Approve', description: 'Merge this change as-is' },
  { id: 'approve_suggestions', label: 'Approve with suggestions', description: 'Merge and apply inline comments' },
  { id: 'request_changes', label: 'Request changes', description: 'Block merge until addressed' },
];

export function CodeReview() {
  return (
    <div className="space-y-6 p-6" data-testid="code-review-layout">
      {/* Diff */}
      <section data-testid="code-review-diff">
        <DiffTable hunks={DIFF_HUNKS} language="python" />
      </section>

      {/* Chat + Approval */}
      <section
        className={cn('grid grid-cols-1 gap-6 md:grid-cols-2')}
        data-testid="code-review-bottom"
      >
        <div data-testid="code-review-chat">
          <h3 className="mb-2 text-sm font-semibold text-ink-2">Review Thread</h3>
          <Chat messages={REVIEW_MESSAGES} />
        </div>
        <div data-testid="code-review-approval">
          <h3 className="mb-2 text-sm font-semibold text-ink-2">Submit Review</h3>
          <ApprovalCard
            title="Review decision"
            description="Choose your review outcome for this pull request."
            options={APPROVAL_OPTIONS}
            type="radio"
          />
        </div>
      </section>
    </div>
  );
}
