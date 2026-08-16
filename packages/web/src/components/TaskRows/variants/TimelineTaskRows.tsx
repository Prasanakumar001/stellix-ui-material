'use client';

import React from 'react';
import { cn, formatElapsed, type TaskRowsProps } from '@stellix/ui-core';
import { CheckIcon, SpinnerIcon, ErrorIcon } from '../../Icons';
import { ClockIcon } from '@heroicons/react/24/outline';

const statusDot: Record<string, { icon: React.ReactNode; ring: string }> = {
  running: { icon: <SpinnerIcon className="h-3.5 w-3.5 animate-spin text-blue" />, ring: 'border-blue bg-blue/10' },
  completed: { icon: <CheckIcon className="h-3.5 w-3.5 text-green" />, ring: 'border-green bg-green/10' },
  failed: { icon: <ErrorIcon className="h-3.5 w-3.5 text-red" />, ring: 'border-red bg-red/10' },
  queued: { icon: <ClockIcon className="h-3.5 w-3.5 text-ink-3" />, ring: 'border-line bg-surface-field' },
};

export function TimelineTaskRows({ tasks }: TaskRowsProps) {
  return (
    <div className="relative pl-8" data-testid="timeline-tasks">
      {/* Vertical line */}
      <div className="absolute left-3.5 top-2 bottom-2 w-px bg-line" />

      {tasks.map((task, i) => {
        const dot = statusDot[task.status];
        return (
          <div key={task.id} className="relative pb-6 last:pb-0 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }} data-testid="timeline-item">
            {/* Dot */}
            <div className={cn('absolute -left-[18px] flex h-7 w-7 items-center justify-center rounded-full border-2', dot.ring)}>
              {dot.icon}
            </div>

            {/* Content */}
            <div className="ml-4">
              <p className={cn('text-sm font-medium', task.status === 'completed' ? 'text-ink-2' : 'text-ink')}>{task.title}</p>
              {task.description && <p className="mt-0.5 text-xs text-ink-3">{task.description}</p>}
              <div className="mt-1 flex items-center gap-3">
                {task.duration !== undefined && task.duration > 0 && (
                  <span className="text-[10px] text-ink-3 tabular-nums">{formatElapsed(task.duration)}</span>
                )}
                {task.progress !== undefined && task.status === 'running' && (
                  <span className="text-[10px] text-accent tabular-nums">{task.progress}%</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
