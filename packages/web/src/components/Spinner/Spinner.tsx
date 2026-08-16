'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
};

const labelSizes: Record<SpinnerSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
};

export function Spinner({
  size = 'md',
  color = 'border-accent',
  label,
  className,
}: SpinnerProps) {
  return (
    <div
      data-testid="spinner"
      data-size={size}
      className={cn('inline-flex flex-col items-center gap-2', className)}
    >
      <span
        data-testid="spinner-circle"
        role="status"
        aria-label={label ?? 'Loading'}
        className={cn(
          'block rounded-full border-current border-t-transparent animate-spin',
          sizeStyles[size],
          color,
        )}
      />
      {label && (
        <span
          data-testid="spinner-label"
          className={cn('text-text-secondary', labelSizes[size])}
        >
          {label}
        </span>
      )}
    </div>
  );
}
