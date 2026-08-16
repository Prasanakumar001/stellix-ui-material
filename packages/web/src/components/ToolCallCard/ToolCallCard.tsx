'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import {
  WrenchScrewdriverIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

type ToolStatus = 'running' | 'success' | 'error';

interface ToolCallCardProps {
  name: string;
  status: ToolStatus;
  duration: number;
  input: string;
  output: string;
  className?: string;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

const statusConfig: Record<ToolStatus, { icon: React.ElementType; color: string; label: string }> = {
  running: { icon: ArrowPathIcon, color: 'text-blue-500', label: 'Running' },
  success: { icon: CheckCircleIcon, color: 'text-green-500', label: 'Success' },
  error: { icon: XCircleIcon, color: 'text-red-500', label: 'Error' },
};

function JsonSection({ title, value, testId }: { title: string; value: string; testId: string }) {
  const [open, setOpen] = useState(false);
  let formatted = value;
  try { formatted = JSON.stringify(JSON.parse(value), null, 2); } catch { /* use raw */ }

  return (
    <div className="border-t border-line" data-testid={testId}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-ink-2 hover:bg-surface-field transition-colors"
        data-testid={`${testId}-toggle`}
      >
        {title}
        <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <pre
          data-testid={`${testId}-content`}
          className="overflow-x-auto px-3 pb-3 text-xs leading-relaxed font-mono text-green-400 bg-surface-field/60"
        >
          {formatted}
        </pre>
      )}
    </div>
  );
}

export function ToolCallCard({ name, status, duration, input, output, className }: ToolCallCardProps) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <div
      data-testid="tool-call-card"
      data-status={status}
      className={cn('rounded-xl border border-line bg-surface shadow-card overflow-hidden', className)}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <WrenchScrewdriverIcon className="h-4 w-4 text-ink-3 shrink-0" />
        <span className="flex-1 text-sm font-semibold text-ink font-mono" data-testid="tool-call-name">
          {name}
        </span>
        <span
          data-testid="tool-call-duration"
          className="text-xs text-ink-3"
        >
          {formatDuration(duration)}
        </span>
        <span
          data-testid="tool-call-status"
          className={cn('inline-flex items-center gap-1 text-xs font-medium', cfg.color)}
        >
          <Icon className={cn('h-3.5 w-3.5', status === 'running' && 'animate-spin')} />
          {cfg.label}
        </span>
      </div>
      <JsonSection title="Input" value={input} testId="tool-call-input" />
      <JsonSection title="Output" value={output} testId="tool-call-output" />
    </div>
  );
}
