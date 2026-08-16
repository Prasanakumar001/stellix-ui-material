'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { CheckCircleIcon, ClockIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'active' | 'upcoming';
}

export interface TimelineViewProps {
  items: TimelineItem[];
}

const statusStyles: Record<string, string> = {
  completed: 'bg-green-500/15 border-green-500 text-green-600 dark:text-green-400',
  active: 'bg-accent/15 border-accent text-accent',
  upcoming: 'bg-ink-3/10 border-line text-ink-3',
};

const defaultIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircleIcon className="h-4 w-4" />,
  active: <EllipsisHorizontalCircleIcon className="h-4 w-4" />,
  upcoming: <ClockIcon className="h-4 w-4" />,
};

export function TimelineView({ items }: TimelineViewProps) {
  return (
    <ol className="relative flex flex-col gap-0" data-testid="timeline-view">
      {items.map((item, index) => {
        const status = item.status ?? 'upcoming';
        const isLast = index === items.length - 1;
        return (
          <li key={item.id} className="flex gap-4" data-testid="timeline-item" data-status={status}>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
                  statusStyles[status],
                )}
                data-testid="timeline-dot"
              >
                {item.icon ?? defaultIcons[status]}
              </span>
              {!isLast && (
                <span className="mt-1 w-px flex-1 bg-line" data-testid="timeline-connector" />
              )}
            </div>

            <div className={cn('pb-6 min-w-0', isLast && 'pb-0')}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-ink" data-testid="timeline-title">
                  {item.title}
                </span>
                <span className="text-xs text-ink-3" data-testid="timeline-date">
                  {item.date}
                </span>
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-ink-2 leading-relaxed" data-testid="timeline-description">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
