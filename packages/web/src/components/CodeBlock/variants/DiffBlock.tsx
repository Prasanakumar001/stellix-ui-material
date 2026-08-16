'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export type DiffLine = { type: 'add' | 'remove' | 'unchanged'; content: string };

export type DiffBlockProps = {
  lines: DiffLine[];
  fileName?: string;
};

const lineConfig = {
  add: {
    bg: 'bg-[#0d2a0d]',
    gutterBg: 'bg-[#0a1f0a]',
    text: 'text-[#7ee787]',
    prefix: '+',
    icon: PlusIcon,
  },
  remove: {
    bg: 'bg-[#2a0d0d]',
    gutterBg: 'bg-[#1f0a0a]',
    text: 'text-[#f87171]',
    prefix: '-',
    icon: MinusIcon,
  },
  unchanged: {
    bg: 'bg-transparent',
    gutterBg: 'bg-[#1e1e1e]',
    text: 'text-[#d4d4d4]',
    prefix: ' ',
    icon: null,
  },
} as const;

export function DiffBlock({ lines, fileName }: DiffBlockProps) {
  const addCount = lines.filter((l) => l.type === 'add').length;
  const removeCount = lines.filter((l) => l.type === 'remove').length;

  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-card" data-testid="diff-block">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          {fileName && (
            <span className="text-xs font-medium text-white/60" data-testid="diff-filename">{fileName}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs font-medium text-[#7ee787]" data-testid="diff-add-count">
            <PlusIcon className="h-3 w-3" />{addCount}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#f87171]" data-testid="diff-remove-count">
            <MinusIcon className="h-3 w-3" />{removeCount}
          </span>
        </div>
      </div>

      {/* Diff body */}
      <div className="overflow-x-auto" data-testid="diff-body">
        <table className="w-full font-mono text-sm" data-testid="diff-table">
          <tbody>
            {lines.map((line, i) => {
              const cfg = lineConfig[line.type];
              const Icon = cfg.icon;
              return (
                <tr key={i} className={cfg.bg} data-testid="diff-line" data-type={line.type}>
                  {/* Line number */}
                  <td className={cn('select-none px-3 py-0.5 text-right text-[10px] tabular-nums text-white/25 w-10', cfg.gutterBg)} data-testid="diff-line-number">
                    {i + 1}
                  </td>
                  {/* Prefix */}
                  <td className={cn('select-none px-2 py-0.5 text-center w-6', cfg.gutterBg, cfg.text)} data-testid="diff-prefix">
                    {Icon ? <Icon className="inline h-3 w-3" /> : <span>{cfg.prefix}</span>}
                  </td>
                  {/* Content */}
                  <td className={cn('py-0.5 pl-2 pr-4 whitespace-pre leading-relaxed', cfg.text)} data-testid="diff-content">
                    {line.content}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-1.5 border-t border-white/10">
        <span className="text-[10px] text-white/30">{lines.length} lines</span>
        <span className="text-[10px] text-[#7ee787]">+{addCount}</span>
        <span className="text-[10px] text-[#f87171]">-{removeCount}</span>
      </div>
    </div>
  );
}
