'use client';

import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="w-full max-w-xs space-y-3" role="img" aria-label="Loading content">
      <div className="h-3 w-3/4 rounded-md bg-surface-field animate-shimmer-text" style={{ background: 'linear-gradient(90deg, var(--color-surface-field) 25%, var(--color-line) 50%, var(--color-surface-field) 75%)', backgroundSize: '200% 100%' }} />
      <div className="h-3 w-full rounded-md bg-surface-field animate-shimmer-text" style={{ background: 'linear-gradient(90deg, var(--color-surface-field) 25%, var(--color-line) 50%, var(--color-surface-field) 75%)', backgroundSize: '200% 100%', animationDelay: '100ms' }} />
      <div className="h-3 w-5/6 rounded-md bg-surface-field animate-shimmer-text" style={{ background: 'linear-gradient(90deg, var(--color-surface-field) 25%, var(--color-line) 50%, var(--color-surface-field) 75%)', backgroundSize: '200% 100%', animationDelay: '200ms' }} />
      <div className="h-3 w-2/3 rounded-md bg-surface-field animate-shimmer-text" style={{ background: 'linear-gradient(90deg, var(--color-surface-field) 25%, var(--color-line) 50%, var(--color-surface-field) 75%)', backgroundSize: '200% 100%', animationDelay: '300ms' }} />
    </div>
  );
}
