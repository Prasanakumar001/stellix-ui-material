'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: string;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  striped?: boolean;
  className?: string;
}

const trackSizes: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const labelSizes: Record<ProgressSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color = 'bg-accent',
  label,
  showValue = false,
  indeterminate = false,
  striped = false,
  className,
}: ProgressBarProps) {
  const pct = indeterminate ? 100 : Math.min(100, Math.max(0, (value / max) * 100));
  const displayPct = Math.round((value / max) * 100);

  return (
    <div data-testid="progress-bar" className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className={cn('mb-1 flex items-center justify-between', labelSizes[size])}>
          {label && (
            <span data-testid="progress-label" className="text-text-secondary font-medium">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span data-testid="progress-value" className="text-text-tertiary tabular-nums">
              {displayPct}%
            </span>
          )}
        </div>
      )}
      <div
        data-testid="progress-track"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full overflow-hidden rounded-full bg-surface-field',
          trackSizes[size],
        )}
      >
        <div
          data-testid="progress-fill"
          style={indeterminate ? undefined : { width: `${pct}%` }}
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-in-out',
            color,
            indeterminate && 'animate-[slide_1.5s_ease-in-out_infinite] w-2/5',
            striped && !indeterminate && [
              'bg-stripes',
              'bg-[length:1rem_1rem]',
              '[background-image:linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)]',
            ],
          )}
        />
      </div>
    </div>
  );
}
