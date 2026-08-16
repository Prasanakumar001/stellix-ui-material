'use client';

import React from 'react';
import { cn, type TaskRowsProps } from '@stellix/ui-core';
import { CheckIcon, SpinnerIcon, ErrorIcon } from '../../Icons';
import { ClockIcon } from '@heroicons/react/24/outline';

const statusIcon: Record<string, React.ReactNode> = {
  running: <SpinnerIcon className="h-3.5 w-3.5 animate-spin text-blue" />,
  completed: <CheckIcon className="h-3.5 w-3.5 text-green" />,
  failed: <ErrorIcon className="h-3.5 w-3.5 text-red" />,
  queued: <ClockIcon className="h-3.5 w-3.5 text-ink-3" />,
};

const statusBg: Record<string, string> = {
  running: 'border-blue/20 bg-blue/5',
  completed: 'border-green/20 bg-green/5',
  failed: 'border-red/20 bg-red/5',
  queued: 'border-line bg-surface-field/50',
};

export function CapsuleTaskRows({ tasks }: TaskRowsProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="capsule-tasks">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-shadow hover:shadow-btn',
            statusBg[task.status],
          )}
          data-testid="capsule-task"
        >
          {statusIcon[task.status]}
          <span className="text-ink">{task.title}</span>
          {task.progress !== undefined && task.status === 'running' && (
            <span className="text-xs text-ink-3 tabular-nums">{task.progress}%</span>
          )}
        </div>
      ))}
    </div>
  );
}
