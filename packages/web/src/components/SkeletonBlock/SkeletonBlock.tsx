'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

interface SkeletonBlockProps {
  variant?: SkeletonVariant;
  lines?: number;
  width?: string;
  height?: string;
  className?: string;
}

const shimmer = 'animate-pulse bg-surface-field dark:bg-surface-field/60';

const lineWidths = ['w-full', 'w-4/5', 'w-11/12', 'w-3/4', 'w-5/6'];

function SkeletonLine({ index, last }: { index: number; last: boolean }) {
  return (
    <div
      data-testid="skeleton-line"
      className={cn(
        'h-3 rounded',
        shimmer,
        last ? 'w-2/3' : lineWidths[index % lineWidths.length],
      )}
    />
  );
}

export function SkeletonBlock({
  variant = 'rectangle',
  lines = 3,
  width,
  height,
  className,
}: SkeletonBlockProps) {
  if (variant === 'text') {
    return (
      <div
        data-testid="skeleton-block"
        data-variant="text"
        className={cn('flex flex-col gap-2', className)}
        style={{ width }}
      >
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonLine key={i} index={i} last={i === lines - 1} />
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div
        data-testid="skeleton-block"
        data-variant="circle"
        className={cn('rounded-full shrink-0', shimmer, className)}
        style={{ width: width ?? '3rem', height: height ?? '3rem' }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        data-testid="skeleton-block"
        data-variant="card"
        className={cn('rounded-xl border border-border p-4 space-y-3', className)}
        style={{ width }}
      >
        <div className="flex items-center gap-3">
          <div className={cn('h-10 w-10 rounded-full shrink-0', shimmer)} />
          <div className="flex-1 space-y-1.5">
            <div className={cn('h-3 w-2/3 rounded', shimmer)} />
            <div className={cn('h-2.5 w-1/3 rounded', shimmer)} />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cn('h-3 rounded', shimmer, lineWidths[i % lineWidths.length])} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="skeleton-block"
      data-variant="rectangle"
      className={cn('rounded-lg', shimmer, className)}
      style={{ width: width ?? '100%', height: height ?? '6rem' }}
    />
  );
}
