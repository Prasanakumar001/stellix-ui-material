'use client';

import React from 'react';
import { useExpandable, cn, type ToolChipsProps, type ToolCall } from '@stellix/ui-core';
import { SuccessIcon, ErrorIcon, SpinnerIcon, ChevronDownIcon } from '../Icons';
import {
  DocumentTextIcon,
  PlusIcon,
  MinusIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

/* ── Status config ── */
const statusStyles = {
  running: { chip: 'border-blue/30 bg-blue/5', label: 'Running' },
  success: { chip: 'border-green/30 bg-green/5', label: 'Done' },
  error: { chip: 'border-red/30 bg-red/5', label: 'Error' },
};

function StatusIcon({ status }: { status: ToolCall['status'] }) {
  if (status === 'running') return <SpinnerIcon className="h-3.5 w-3.5 animate-spin text-blue" />;
  if (status === 'success') return <SuccessIcon className="h-3.5 w-3.5 text-green" />;
  return <ErrorIcon className="h-3.5 w-3.5 text-red" />;
}

/* ── Single tool chip ── */
function ToolChip({ tool }: { tool: ToolCall }) {
  const { isOpen, toggle } = useExpandable(false);
  const style = statusStyles[tool.status];

  return (
    <div className="animate-fade-up" data-testid="tool-chip" data-status={tool.status}>
      <button
        onClick={toggle}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
          style.chip,
          'hover:shadow-btn',
        )}
        data-testid="tool-chip-btn"
      >
        <StatusIcon status={tool.status} />
        <WrenchScrewdriverIcon className="h-3.5 w-3.5 text-ink-3" />
        <span className="text-ink">{tool.name}</span>
        {tool.file && (
          <>
            <span className="text-ink-3">·</span>
            <span className="flex items-center gap-1 text-ink-3">
              <DocumentTextIcon className="h-3 w-3" />
              <span className="max-w-24 truncate text-xs">{tool.file}</span>
            </span>
          </>
        )}
        {(tool.summary || tool.additions || tool.deletions) && (
          <ChevronDownIcon className={cn('h-3 w-3 text-ink-3 transition-transform ml-1', isOpen && 'rotate-180')} />
        )}
      </button>

      {/* Expanded detail */}
      {isOpen && (tool.summary || tool.additions !== undefined || tool.deletions !== undefined) && (
        <div className="mt-2 rounded-lg border border-line bg-surface-field p-3 animate-fade-in" data-testid="tool-detail">
          {tool.summary && (
            <p className="text-sm text-ink-2">{tool.summary}</p>
          )}
          {(tool.additions !== undefined || tool.deletions !== undefined) && (
            <div className="mt-2 flex items-center gap-3 text-xs font-medium" data-testid="diff-counts">
              {tool.additions !== undefined && (
                <span className="inline-flex items-center gap-1 text-green">
                  <PlusIcon className="h-3 w-3" />
                  {tool.additions}
                </span>
              )}
              {tool.deletions !== undefined && (
                <span className="inline-flex items-center gap-1 text-red">
                  <MinusIcon className="h-3 w-3" />
                  {tool.deletions}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main ToolChips ── */
export function ToolChips({ tools }: ToolChipsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" data-testid="tool-chips">
      {tools.map((tool) => (
        <ToolChip key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
