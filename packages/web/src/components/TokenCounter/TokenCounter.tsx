'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ExclamationTriangleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface TokenCounterProps {
  prompt: number;
  completion: number;
  limit: number;
  costPer1k: number;
  className?: string;
}

function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function TokenCounter({ prompt, completion, limit, costPer1k, className }: TokenCounterProps) {
  const total = prompt + completion;
  const pct = Math.min((total / limit) * 100, 100);
  const promptPct = Math.min((prompt / limit) * 100, 100);
  const completionPct = Math.min((completion / limit) * 100, 100 - promptPct);
  const cost = ((total / 1000) * costPer1k).toFixed(4);

  const isWarning = pct > 80 && pct <= 95;
  const isDanger = pct > 95;

  const barColor = isDanger
    ? 'text-red-500'
    : isWarning
    ? 'text-orange-500'
    : 'text-ink-2';

  return (
    <div
      data-testid="token-counter"
      className={cn('rounded-xl border border-line bg-surface p-4 shadow-card', className)}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-sm font-semibold text-ink">Token Usage</span>
        <div className="flex items-center gap-1.5">
          {(isWarning || isDanger) && (
            <ExclamationTriangleIcon
              data-testid="token-warning-icon"
              className={cn('h-4 w-4', isDanger ? 'text-red-500' : 'text-orange-500')}
            />
          )}
          <span className={cn('text-xs font-medium', barColor)} data-testid="token-pct">
            {pct.toFixed(1)}% of limit
          </span>
        </div>
      </div>

      <div
        data-testid="token-bar"
        className="h-3 w-full overflow-hidden rounded-full bg-surface-field"
      >
        <div className="flex h-full">
          <div
            data-testid="token-bar-prompt"
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${promptPct}%` }}
          />
          <div
            data-testid="token-bar-completion"
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div data-testid="token-prompt">
          <p className="text-xs text-ink-3">Prompt</p>
          <p className="text-sm font-semibold text-blue-500">{formatTokens(prompt)}</p>
        </div>
        <div data-testid="token-completion">
          <p className="text-xs text-ink-3">Completion</p>
          <p className="text-sm font-semibold text-green-500">{formatTokens(completion)}</p>
        </div>
        <div data-testid="token-total">
          <p className="text-xs text-ink-3">Total</p>
          <p className={cn('text-sm font-semibold', barColor)}>{formatTokens(total)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-3">
        <CurrencyDollarIcon className="h-3.5 w-3.5 text-ink-3" />
        <span className="text-xs text-ink-3">Est. cost:</span>
        <span className="text-xs font-medium text-ink" data-testid="token-cost">
          ${cost}
        </span>
      </div>
    </div>
  );
}
