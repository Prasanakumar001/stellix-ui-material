'use client';

import React, { useState, useEffect } from 'react';

export function ProgressLoader({ value }: { value?: number }) {
  const [progress, setProgress] = useState(value ?? 0);

  useEffect(() => {
    if (value !== undefined) { setProgress(value); return; }
    const interval = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + Math.random() * 8));
    }, 400);
    return () => clearInterval(interval);
  }, [value]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-14 w-14 sm:h-16 sm:w-16" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="var(--color-line)" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={radius} fill="none"
          stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold tabular-nums text-ink">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
