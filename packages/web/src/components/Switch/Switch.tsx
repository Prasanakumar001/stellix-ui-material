'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: SwitchSize;
  disabled?: boolean;
}

const trackSize: Record<SwitchSize, string> = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11',
};

const thumbSize: Record<SwitchSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

const thumbTranslate: Record<SwitchSize, string> = {
  sm: 'translate-x-3.5',
  md: 'translate-x-[1.125rem]',
  lg: 'translate-x-[1.375rem]',
};

export function Switch({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
}: SwitchProps) {
  return (
    <div
      className={cn('flex items-start gap-3', disabled && 'cursor-not-allowed opacity-50')}
      data-testid="switch-root"
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          trackSize[size],
          checked ? 'bg-accent' : 'bg-line',
          disabled && 'cursor-not-allowed',
        )}
        data-testid="switch-track"
      >
        <span
          className={cn(
            'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform',
            thumbSize[size],
            checked ? thumbTranslate[size] : 'translate-x-0',
          )}
          data-testid="switch-thumb"
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-ink" data-testid="switch-label">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-ink-3" data-testid="switch-description">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
