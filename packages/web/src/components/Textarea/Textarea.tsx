'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@stellix/ui-core';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  error?: string;
  rows?: number;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  error,
  rows = 3,
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const hasError = Boolean(error);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="flex flex-col gap-1" data-testid="textarea-root">
      {label && (
        <label className="text-sm font-medium text-ink" data-testid="textarea-label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={cn(
          'w-full resize-none rounded-lg border bg-surface-field px-3 py-2 text-sm text-ink',
          'placeholder:text-ink-3 focus:outline-none focus:ring-1 transition-colors',
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-line focus:border-accent focus:ring-accent',
        )}
        data-testid="textarea-field"
        aria-invalid={hasError}
        aria-describedby={hasError ? 'textarea-error' : undefined}
      />
      <div className="flex items-center justify-between">
        {hasError ? (
          <p id="textarea-error" className="text-xs text-red-500" data-testid="textarea-error">
            {error}
          </p>
        ) : (
          <span />
        )}
        {maxLength !== undefined && (
          <p
            className={cn(
              'ml-auto text-xs',
              value.length >= maxLength ? 'text-red-500' : 'text-ink-3',
            )}
            data-testid="textarea-char-count"
          >
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
