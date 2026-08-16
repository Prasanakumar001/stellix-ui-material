'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@stellix/ui-core';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  indeterminate = false,
  disabled = false,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isActive = checked || indeterminate;

  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3',
        disabled && 'cursor-not-allowed opacity-50',
      )}
      data-testid="checkbox-root"
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          data-testid="checkbox-input"
          aria-checked={indeterminate ? 'mixed' : checked}
        />
        <div
          className={cn(
            'flex h-4 w-4 items-center justify-center rounded border-2 transition-colors',
            isActive
              ? 'border-accent bg-accent'
              : 'border-line bg-surface-field',
          )}
          data-testid="checkbox-box"
        >
          {indeterminate ? (
            <MinusIcon className="h-2.5 w-2.5 stroke-[3] text-white" />
          ) : checked ? (
            <CheckIcon className="h-2.5 w-2.5 stroke-[3] text-white" />
          ) : null}
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-ink" data-testid="checkbox-label">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-ink-3" data-testid="checkbox-description">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
