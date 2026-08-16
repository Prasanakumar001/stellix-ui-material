'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  type?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  prefixIcon,
  suffixIcon,
  disabled = false,
  type = 'text',
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1" data-testid="input-root">
      {label && (
        <label className="text-sm font-medium text-ink" data-testid="input-label">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border bg-surface-field px-3 py-2 transition-colors',
          hasError
            ? 'border-red-500 focus-within:ring-1 focus-within:ring-red-500'
            : 'border-line focus-within:border-accent focus-within:ring-1 focus-within:ring-accent',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        data-testid="input-wrapper"
      >
        {prefixIcon && (
          <span className="shrink-0 text-ink-3" data-testid="input-prefix-icon">
            {prefixIcon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none disabled:cursor-not-allowed"
          data-testid="input-field"
          aria-invalid={hasError}
          aria-describedby={hasError ? 'input-error' : helperText ? 'input-helper' : undefined}
        />
        {suffixIcon && (
          <span className="shrink-0 text-ink-3" data-testid="input-suffix-icon">
            {suffixIcon}
          </span>
        )}
      </div>
      {hasError && (
        <p id="input-error" className="text-xs text-red-500" data-testid="input-error">
          {error}
        </p>
      )}
      {!hasError && helperText && (
        <p id="input-helper" className="text-xs text-ink-3" data-testid="input-helper">
          {helperText}
        </p>
      )}
    </div>
  );
}
