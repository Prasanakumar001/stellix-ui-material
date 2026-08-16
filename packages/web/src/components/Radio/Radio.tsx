'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function Radio({ options, value, onChange, name }: RadioProps) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" data-testid="radio-root">
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <label
            key={opt.value}
            className="flex cursor-pointer items-start gap-3"
            data-testid="radio-option"
          >
            <div className="relative mt-0.5 shrink-0">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
                data-testid="radio-input"
              />
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors',
                  isSelected ? 'border-accent' : 'border-line bg-surface-field',
                )}
                data-testid="radio-circle"
              >
                {isSelected && (
                  <div
                    className="h-2 w-2 rounded-full bg-accent"
                    data-testid="radio-dot"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-accent' : 'text-ink',
                )}
                data-testid="radio-label"
              >
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-xs text-ink-3" data-testid="radio-description">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
