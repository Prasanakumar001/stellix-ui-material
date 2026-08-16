'use client';

import React from 'react';
import { cn, type TaskRowsProps, type TaskStatus } from '@stellix/ui-core';

const columnConfig: Record<string, { label: string; color: string; dot: string }> = {
  queued: { label: 'Queued', color: 'text-ink-3', dot: 'bg-ink-3' },
  running: { label: 'Running', color: 'text-blue', dot: 'bg-blue' },
  completed: { label: 'Completed', color: 'text-green', dot: 'bg-green' },
  failed: { label: 'Failed', color: 'text-red', dot: 'bg-red' },
};

const columnOrder: TaskStatus[] = ['queued', 'running', 'completed', 'failed'];

export function KanbanTaskRows({ tasks }: TaskRowsProps) {
  const grouped = columnOrder.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const nonEmpty = columnOrder.filter((s) => grouped[s].length > 0);

  return (
    <div className={cn('grid gap-4', nonEmpty.length === 2 && 'grid-cols-2', nonEmpty.length === 3 && 'grid-cols-3', nonEmpty.length >= 4 && 'grid-cols-2 sm:grid-cols-4')} data-testid="kanban-tasks">
      {nonEmpty.map((status) => {
        const col = columnConfig[status];
        return (
          <div key={status} className="rounded-xl border border-line bg-surface-field/30 p-3" data-testid="kanban-column">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', col.dot)} />
              <span className={cn('text-xs font-semibold uppercase tracking-wide', col.color)}>{col.label}</span>
              <span className="rounded-full bg-surface-field px-1.5 text-[10px] text-ink-3">{grouped[status].length}</span>
            </div>
            <div className="space-y-2">
              {grouped[status].map((task) => (
                <div key={task.id} className="rounded-lg border border-line bg-surface p-3 shadow-btn hover:shadow-card transition-shadow" data-testid="kanban-card">
                  <p className="text-sm font-medium text-ink">{task.title}</p>
                  {task.description && <p className="mt-1 text-xs text-ink-3 line-clamp-2">{task.description}</p>}
                  {task.progress !== undefined && status === 'running' && (
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-field">
                      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${task.progress}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
