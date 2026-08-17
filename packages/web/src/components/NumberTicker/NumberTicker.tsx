'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@stellix/ui-core';

type NumberTickerVariant = 'default' | 'card' | 'gradient' | 'badge';

interface NumberTickerProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  variant?: NumberTickerVariant;
  label?: string;
  trend?: 'up' | 'down';
  color?: string;
  className?: string;
}

export function NumberTicker({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  variant = 'default',
  label,
  trend,
  color,
  className,
}: NumberTickerProps) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(from + (value - from) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  const formatted = current.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;
  const trendColor = trend === 'up' ? 'text-green' : trend === 'down' ? 'text-red' : '';

  if (variant === 'card') {
    return (
      <div
        data-testid="number-ticker"
        data-variant="card"
        className={cn(
          'flex flex-col gap-1 rounded-xl border border-line bg-surface p-5 shadow-card min-w-[140px]',
          className,
        )}
      >
        {label && <span className="text-xs font-medium text-ink-3 uppercase tracking-wide">{label}</span>}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums text-ink" aria-live="polite">
            {prefix}{formatted}{suffix}
          </span>
          {trendArrow && (
            <span className={cn('text-sm font-semibold', trendColor)}>{trendArrow}</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div
        data-testid="number-ticker"
        data-variant="gradient"
        className={cn(
          'flex flex-col items-center gap-1 rounded-2xl p-6 min-w-[160px]',
          'bg-gradient-to-br from-accent/20 via-purple/10 to-blue/20',
          className,
        )}
      >
        <span
          className="text-4xl font-extrabold tabular-nums bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent"
          aria-live="polite"
        >
          {prefix}{formatted}{suffix}
        </span>
        {label && <span className="text-sm font-medium text-ink-2">{label}</span>}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <span
        data-testid="number-ticker"
        data-variant="badge"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
          'bg-accent/10 text-accent',
          className,
        )}
        aria-live="polite"
      >
        <span className="text-lg font-bold tabular-nums">{prefix}{formatted}{suffix}</span>
        {label && <span className="text-xs font-medium">{label}</span>}
        {trendArrow && (
          <span className={cn('text-xs font-semibold', trendColor)}>{trendArrow}</span>
        )}
      </span>
    );
  }

  // default
  return (
    <span
      data-testid="number-ticker"
      data-variant="default"
      className={cn('tabular-nums text-2xl font-bold text-ink', className)}
      aria-live="polite"
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
