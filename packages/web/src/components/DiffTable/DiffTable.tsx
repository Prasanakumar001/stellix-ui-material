'use client';

import React, { useState } from 'react';
import { cn, type DiffTableProps, type DiffLine } from '@stellix/ui-core';
import { CheckIcon } from '../Icons';
import {
  XMarkIcon,
  ArrowsRightLeftIcon,
  Bars3BottomLeftIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

/* ── Mode toggle ── */
function ModeToggle({ mode, onChange }: { mode: 'split' | 'unified'; onChange: (m: 'split' | 'unified') => void }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-surface-field p-0.5" data-testid="mode-toggle">
      <button
        onClick={() => onChange('unified')}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
          mode === 'unified' ? 'bg-surface text-ink shadow-btn' : 'text-ink-3 hover:text-ink',
        )}
        data-testid="mode-unified"
      >
        <Bars3BottomLeftIcon className="h-3.5 w-3.5" />
        Unified
      </button>
      <button
        onClick={() => onChange('split')}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
          mode === 'split' ? 'bg-surface text-ink shadow-btn' : 'text-ink-3 hover:text-ink',
        )}
        data-testid="mode-split"
      >
        <ArrowsRightLeftIcon className="h-3.5 w-3.5" />
        Split
      </button>
    </div>
  );
}

/* ── Diff stat ── */
function DiffStat({ hunks }: { hunks: DiffTableProps['hunks'] }) {
  let adds = 0, removes = 0;
  for (const h of hunks) for (const l of h.lines) {
    if (l.type === 'add') adds++;
    if (l.type === 'remove') removes++;
  }
  return (
    <div className="flex items-center gap-3 text-xs" data-testid="diff-stat">
      <span className="inline-flex items-center gap-1 text-green"><PlusIcon className="h-3 w-3" />{adds}</span>
      <span className="inline-flex items-center gap-1 text-red"><MinusIcon className="h-3 w-3" />{removes}</span>
    </div>
  );
}

/* ── Line indicator ── */
function LineIndicator({ type }: { type: DiffLine['type'] }) {
  if (type === 'add') return <span className="text-green font-bold">+</span>;
  if (type === 'remove') return <span className="text-red font-bold">−</span>;
  return <span className="text-ink-3"> </span>;
}

/* ── Main DiffTable ── */
export function DiffTable({ hunks, mode: initialMode = 'unified', onAccept, onReject }: DiffTableProps) {
  const [mode, setMode] = useState(initialMode);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="diff-table">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2.5">
        <DiffStat hunks={hunks} />
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* Diff content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono" data-testid="diff-content" aria-label="Code diff">
          <tbody>
            {hunks.map((hunk) => (
              <React.Fragment key={hunk.id}>
                {/* Hunk header */}
                <tr>
                  <td
                    colSpan={mode === 'split' ? 4 : 4}
                    className="bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent"
                    data-testid="hunk-header"
                  >
                    @@ Changes @@
                  </td>
                </tr>

                {/* Lines */}
                {hunk.lines.map((line, i) => (
                  <tr
                    key={`${hunk.id}-${i}`}
                    className={cn(
                      'transition-colors',
                      line.type === 'add' && 'bg-green/5 hover:bg-green/10',
                      line.type === 'remove' && 'bg-red/5 hover:bg-red/10',
                      line.type === 'unchanged' && 'hover:bg-surface-field',
                    )}
                    data-testid={`diff-line-${line.type}`}
                  >
                    {mode === 'split' ? (
                      <>
                        <td className="w-10 select-none border-r border-line px-2 py-0.5 text-right text-xs text-ink-3">
                          {line.type !== 'add' ? (line.oldLineNumber ?? '') : ''}
                        </td>
                        <td className={cn(
                          'w-1/2 border-r border-line px-3 py-0.5 whitespace-pre',
                          line.type === 'remove' && 'bg-red/10 text-ink',
                          line.type === 'add' && 'text-ink-3',
                          line.type === 'unchanged' && 'text-ink-2',
                        )}>
                          {line.type !== 'add' ? line.content : ''}
                        </td>
                        <td className="w-10 select-none border-r border-line px-2 py-0.5 text-right text-xs text-ink-3">
                          {line.type !== 'remove' ? (line.newLineNumber ?? '') : ''}
                        </td>
                        <td className={cn(
                          'w-1/2 px-3 py-0.5 whitespace-pre',
                          line.type === 'add' && 'bg-green/10 text-ink',
                          line.type === 'remove' && 'text-ink-3',
                          line.type === 'unchanged' && 'text-ink-2',
                        )}>
                          {line.type !== 'remove' ? line.content : ''}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="w-10 select-none px-2 py-0.5 text-right text-xs text-ink-3" data-testid="old-line-num">
                          {line.oldLineNumber ?? ''}
                        </td>
                        <td className="w-10 select-none px-2 py-0.5 text-right text-xs text-ink-3" data-testid="new-line-num">
                          {line.newLineNumber ?? ''}
                        </td>
                        <td className="w-6 select-none py-0.5 text-center text-xs">
                          <LineIndicator type={line.type} />
                        </td>
                        <td className={cn(
                          'px-3 py-0.5 whitespace-pre',
                          line.type === 'unchanged' && 'text-ink-2',
                        )}>
                          {line.content}
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {/* Hunk actions */}
                {(onAccept || onReject) && (
                  <tr>
                    <td colSpan={4} className="border-t border-line px-4 py-2">
                      <div className="flex justify-end gap-2" data-testid="hunk-actions">
                        {onReject && (
                          <button
                            onClick={() => onReject(hunk.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red/20 px-3 py-1.5 text-xs font-medium text-red hover:bg-red/10 transition-colors"
                            data-testid="reject-hunk"
                          >
                            <XMarkIcon className="h-3 w-3" /> Reject
                          </button>
                        )}
                        {onAccept && (
                          <button
                            onClick={() => onAccept(hunk.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-green/20 px-3 py-1.5 text-xs font-medium text-green hover:bg-green/10 transition-colors"
                            data-testid="accept-hunk"
                          >
                            <CheckIcon className="h-3 w-3" /> Accept
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
