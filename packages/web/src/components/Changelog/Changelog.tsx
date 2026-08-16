'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { TagIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export type ChangeType = 'feat' | 'fix' | 'breaking' | 'docs';

export interface ChangeEntry {
  type: ChangeType;
  description: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangeEntry[];
}

export interface ChangelogProps {
  entries: ChangelogEntry[];
}

const typeBadge: Record<ChangeType, { label: string; className: string }> = {
  feat: { label: 'Feature', className: 'bg-accent/10 text-accent border-accent/20' },
  fix: { label: 'Fix', className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  breaking: { label: 'Breaking', className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
  docs: { label: 'Docs', className: 'bg-ink-3/10 text-ink-3 border-line' },
};

function TypeBadge({ type }: { type: ChangeType }) {
  const { label, className } = typeBadge[type];
  return (
    <span
      className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', className)}
      data-testid="changelog-type-badge"
      data-type={type}
    >
      {label}
    </span>
  );
}

export function Changelog({ entries }: ChangelogProps) {
  return (
    <div className="flex flex-col gap-6" data-testid="changelog">
      {entries.map((entry) => (
        <div
          key={entry.version}
          className="rounded-xl border border-line bg-surface p-4 shadow-card"
          data-testid="changelog-entry"
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-line pb-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-base font-bold text-ink"
              data-testid="changelog-version"
            >
              <TagIcon className="h-4 w-4 text-accent" />
              {entry.version}
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs text-ink-3"
              data-testid="changelog-date"
            >
              <CalendarDaysIcon className="h-3.5 w-3.5" />
              {entry.date}
            </span>
          </div>

          <ul className="flex flex-col gap-2" data-testid="changelog-changes">
            {entry.changes.map((change, i) => (
              <li key={i} className="flex items-start gap-2" data-testid="changelog-change-item">
                <TypeBadge type={change.type} />
                <span className="text-sm text-ink-2 leading-relaxed">{change.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
