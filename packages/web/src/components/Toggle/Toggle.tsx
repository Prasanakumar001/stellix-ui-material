'use client';

import React, { useId } from 'react';
import { cn } from '@stellix/ui-core';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: ToggleProps) {
  const id = useId();

  return (
    <div
      data-testid="toggle-wrapper"
      className={cn('flex items-start gap-3', disabled && 'opacity-50 cursor-not-allowed', className)}
    >
      <button
        id={id}
        data-testid="toggle"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          checked ? 'bg-accent' : 'bg-surface-field',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <span
          data-testid="toggle-thumb"
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm',
            'transform transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
      {(label || description) && (
        <label
          data-testid="toggle-label"
          htmlFor={id}
          className={cn('flex flex-col', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
        >
          {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
          {description && (
            <span data-testid="toggle-description" className="text-xs text-text-secondary mt-0.5">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  );
}
