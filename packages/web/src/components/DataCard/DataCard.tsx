'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export interface DataCardProps {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
}

export function DataCard({ label, value, change, changeLabel, icon }: DataCardProps) {
  const isPositive = change >= 0;
  const isZero = change === 0;

  const changeColor = isZero
    ? 'text-ink-3'
    : isPositive
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';

  const changeBg = isZero
    ? 'bg-ink-3/10'
    : isPositive
    ? 'bg-green-500/10'
    : 'bg-red-500/10';

  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-surface p-4 shadow-card',
        'flex flex-col gap-3 animate-fade-up',
      )}
      data-testid="data-card"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-ink-2" data-testid="data-card-label">
          {label}
        </span>
        {icon && (
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
            data-testid="data-card-icon"
          >
            {icon}
          </span>
        )}
      </div>

      <span
        className="text-2xl font-bold text-ink leading-none"
        data-testid="data-card-value"
      >
        {value}
      </span>

      <div
        className={cn('inline-flex items-center gap-1 self-start rounded-full px-2 py-1', changeBg)}
        data-testid="data-card-change"
      >
        {!isZero && (
          isPositive
            ? <ArrowUpIcon className={cn('h-3 w-3', changeColor)} />
            : <ArrowDownIcon className={cn('h-3 w-3', changeColor)} />
        )}
        <span className={cn('text-xs font-medium', changeColor)}>
          {isZero ? '' : isPositive ? '+' : ''}{change}% {changeLabel}
        </span>
      </div>
    </div>
  );
}
