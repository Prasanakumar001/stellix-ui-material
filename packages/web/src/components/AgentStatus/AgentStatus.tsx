'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import {
  CpuChipIcon,
  BoltIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PauseCircleIcon,
} from '@heroicons/react/24/outline';

type AgentState = 'idle' | 'thinking' | 'acting' | 'waiting' | 'error';

interface AgentStatusProps {
  state: AgentState;
  label: string;
  duration: number;
  model: string;
  className?: string;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}m ${s}s`;
}

const stateConfig: Record<AgentState, { label: string; icon: React.ElementType; dot: string; card: string }> = {
  idle: {
    label: 'Idle',
    icon: PauseCircleIcon,
    dot: 'bg-ink-3',
    card: 'border-line',
  },
  thinking: {
    label: 'Thinking',
    icon: CpuChipIcon,
    dot: 'bg-blue-500 animate-pulse',
    card: 'border-blue-500/30 bg-blue-500/5',
  },
  acting: {
    label: 'Acting',
    icon: BoltIcon,
    dot: 'bg-accent animate-spin',
    card: 'border-accent/30 bg-accent/5',
  },
  waiting: {
    label: 'Waiting',
    icon: ClockIcon,
    dot: 'bg-yellow-500',
    card: 'border-yellow-500/30 bg-yellow-500/5',
  },
  error: {
    label: 'Error',
    icon: ExclamationCircleIcon,
    dot: 'bg-red-500',
    card: 'border-red-500/30 bg-red-500/5',
  },
};

export function AgentStatus({ state, label, duration, model, className }: AgentStatusProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div
      data-testid="agent-status"
      data-state={state}
      className={cn(
        'flex items-center gap-3 rounded-xl border p-4 shadow-card transition-colors',
        config.card,
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-field">
        <Icon className="h-5 w-5 text-ink-2" data-testid="agent-status-icon" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            data-testid="agent-status-dot"
            className={cn('h-2 w-2 rounded-full shrink-0', config.dot)}
          />
          <span className="text-sm font-semibold text-ink" data-testid="agent-status-label">
            {label}
          </span>
          <span className="text-xs text-ink-3 ml-auto" data-testid="agent-status-state">
            {config.label}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-xs text-ink-2" data-testid="agent-status-model">
            {model}
          </span>
          <span className="text-xs text-ink-3" data-testid="agent-status-duration">
            {formatDuration(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
