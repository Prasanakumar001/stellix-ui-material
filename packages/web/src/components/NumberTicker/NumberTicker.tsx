'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@stellix/ui-core';

interface NumberTickerProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function NumberTicker({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
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

  return (
    <span
      data-testid="number-ticker"
      className={cn('tabular-nums', className)}
      aria-live="polite"
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
