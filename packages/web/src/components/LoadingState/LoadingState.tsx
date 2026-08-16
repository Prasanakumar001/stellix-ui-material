'use client';

import React from 'react';
import { useTimer, cn, type LoadingStateProps } from '@stellix/ui-core';

/* ── Variant: Drive ── pixel grid that lights up in a sweep pattern */
function DriveLoader() {
  const rows = 4;
  const cols = 5;
  const pixels = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div className="grid grid-cols-5 gap-1.5" role="img" aria-label="Loading animation">
      {pixels.map((i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const delay = (row * 60) + (col * 40);
        return (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-sm bg-accent opacity-0 animate-pixel-on sm:h-3 sm:w-3"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
          />
        );
      })}
    </div>
  );
}

/* ── Variant: Dots ── 3 bouncing dots */
function DotsLoader() {
  return (
    <div className="flex items-center gap-2" role="img" aria-label="Loading animation">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-3 w-3 rounded-full bg-accent sm:h-3.5 sm:w-3.5"
          style={{
            animation: 'dots-bounce 1.4s ease-in-out infinite',
            animationDelay: `${i * 160}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Variant: Orbit ── spinning ring with trailing dot */
function OrbitLoader() {
  return (
    <div className="relative h-10 w-10 sm:h-12 sm:w-12" role="img" aria-label="Loading animation">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-line" />
      {/* Spinning arc */}
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
        style={{ animation: 'spin 1s linear infinite' }}
      />
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      </div>
    </div>
  );
}

/* ── Shimmer bar ── */
function ShimmerBar() {
  return (
    <div className="h-2 w-28 overflow-hidden rounded-full bg-surface-field sm:w-36">
      <div
        className="h-full w-full animate-shimmer-text rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}

/* ── Status text row ── */
function StatusText({ label, showTimer, formatted }: { label?: string; showTimer: boolean; formatted: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:items-start">
      <ShimmerBar />
      {label && (
        <p className="text-sm font-medium text-ink-2 animate-fade-in">{label}</p>
      )}
      {showTimer && (
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-3 tabular-nums">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {formatted}
        </span>
      )}
    </div>
  );
}

/* ── Main Component ── */
export function LoadingState({ variant = 'drive', label, showTimer = true }: LoadingStateProps) {
  const { formatted } = useTimer(true);

  const loaderMap = {
    drive: <DriveLoader />,
    dots: <DotsLoader />,
    orbit: <OrbitLoader />,
  };

  return (
    <div
      role="status"
      aria-label={label || `Loading (${variant} variant)`}
      aria-live="polite"
      className={cn(
        'flex flex-col items-center gap-5 rounded-xl border border-line bg-surface p-6 shadow-card',
        'sm:flex-row sm:gap-6 sm:p-8',
        'md:gap-8',
        'transition-shadow hover:shadow-raised',
      )}
      data-variant={variant}
      data-testid="loading-state"
    >
      {loaderMap[variant]}
      <StatusText label={label} showTimer={showTimer} formatted={formatted} />
    </div>
  );
}
