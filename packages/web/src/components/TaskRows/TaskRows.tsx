'use client';

import React from 'react';
import { useExpandable, cn, formatElapsed, type TaskRowsProps, type TaskItem } from '@stellix/ui-core';
import { CheckIcon, ChevronDownIcon } from '../Icons';
import { XCircleIcon, ClockIcon, ArrowPathIcon, QueueListIcon } from '@heroicons/react/24/outline';

/* ── Status config ── */
const statusConfig: Record<string, { icon: React.ReactNode; label: string; badge: string; dot: string }> = {
  running: {
    icon: <ArrowPathIcon className="h-3.5 w-3.5 animate-spin" />,
    label: 'Running',
    badge: 'bg-blue/10 text-blue border-blue/20',
    dot: 'bg-blue',
  },
  completed: {
    icon: <CheckIcon className="h-3.5 w-3.5" />,
    label: 'Completed',
    badge: 'bg-green/10 text-green border-green/20',
    dot: 'bg-green',
  },
  failed: {
    icon: <XCircleIcon className="h-3.5 w-3.5" />,
    label: 'Failed',
    badge: 'bg-red/10 text-red border-red/20',
    dot: 'bg-red',
  },
  queued: {
    icon: <ClockIcon className="h-3.5 w-3.5" />,
    label: 'Queued',
    badge: 'bg-ink-3/10 text-ink-3 border-ink-3/20',
    dot: 'bg-ink-3',
  },
};

/* ── Status badge ── */
function StatusBadge({ status }: { status: TaskItem['status'] }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.badge,
      )}
      data-testid={`status-${status}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

/* ── Progress bar ── */
function ProgressBar({ value, status }: { value: number; status: string }) {
  const barColor = status === 'failed' ? 'bg-red' : status === 'completed' ? 'bg-green' : 'bg-accent';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-field sm:w-24">
        {value >= 0 ? (
          <div
            className={cn('h-full rounded-full transition-all duration-500 ease-out', barColor)}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        ) : (
          <div
            className="h-full w-1/3 rounded-full bg-accent"
            style={{ animation: 'progress-indeterminate 1.5s ease-in-out infinite' }}
          />
        )}
      </div>
      {value >= 0 && (
        <span className="text-xs text-ink-3 tabular-nums w-8">{Math.round(value)}%</span>
      )}
    </div>
  );
}

/* ── Individual task row ── */
function TaskRow({ task, expandable, index }: { task: TaskItem; expandable: boolean; index: number }) {
  const { isOpen, toggle } = useExpandable(false);

  return (
    <div
      className={cn(
        'border-b border-line last:border-b-0 animate-fade-up',
        task.status === 'failed' && 'bg-red/[0.02]',
      )}
      style={{ animationDelay: `${index * 60}ms` }}
      data-testid={`task-row-${task.id}`}
    >
      <div
        onClick={expandable && task.description ? toggle : undefined}
        aria-expanded={expandable && task.description ? isOpen : undefined}
        className={cn(
          'flex items-center gap-2 px-4 py-3 overflow-hidden sm:gap-3',
          expandable && task.description && 'cursor-pointer hover:bg-surface-field transition-colors',
        )}
      >
        {/* Status dot */}
        <span className={cn(
          'h-2 w-2 rounded-full shrink-0',
          statusConfig[task.status].dot,
          task.status === 'running' && 'animate-pulse',
        )} />

        {/* Title */}
        <span className={cn(
          'flex-1 min-w-0 truncate text-sm font-medium',
          task.status === 'completed' ? 'text-ink-2' : 'text-ink',
          task.status === 'failed' && 'text-red',
        )}>
          {task.title}
        </span>

        {/* Duration — hidden on mobile */}
        {task.duration !== undefined && task.duration > 0 && (
          <span className="hidden text-xs text-ink-3 tabular-nums shrink-0 md:inline">
            {formatElapsed(task.duration)}
          </span>
        )}

        {/* Progress bar — hidden on small mobile */}
        {task.progress !== undefined && task.status !== 'completed' && (
          <div className="hidden shrink-0 sm:block">
            <ProgressBar value={task.progress} status={task.status} />
          </div>
        )}

        {/* Status badge */}
        <div className="shrink-0">
          <StatusBadge status={task.status} />
        </div>

        {/* Expand chevron */}
        {expandable && task.description && (
          <ChevronDownIcon
            className={cn(
              'h-4 w-4 shrink-0 text-ink-3 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </div>

      {/* Expandable detail */}
      {expandable && task.description && (
        <div
          className="grid transition-all duration-250 ease-out"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4 pl-9">
              <div className="rounded-lg bg-surface-field p-3 text-sm text-ink-2">
                {task.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main TaskRows Component ── */
export function TaskRows({ tasks, expandable = true }: TaskRowsProps) {
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-card"
      data-testid="task-rows"
      role="list"
      aria-label="Task list"
    >
      {/* Header with overall progress */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <QueueListIcon className="h-4 w-4 text-ink-3" />
            <span className="text-xs font-medium text-ink-2">
              {completedCount}/{totalCount} tasks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-field">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-ink-3 tabular-nums">{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Task list */}
      {tasks.map((task, i) => (
        <TaskRow key={task.id} task={task} expandable={expandable} index={i} />
      ))}

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8 text-ink-3">
          <QueueListIcon className="h-8 w-8" />
          <p className="text-sm">No tasks yet</p>
        </div>
      )}
    </div>
  );
}
