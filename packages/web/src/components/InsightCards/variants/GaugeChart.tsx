'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

export type GaugeChartProps = {
  value: number;
  max: number;
  label: string;
  unit?: string;
};

export function GaugeChart({ value, max, label, unit = '' }: GaugeChartProps) {
  const pct = Math.min(Math.max(value / (max || 1), 0), 1);

  // Semicircle from left (180deg) to right (0deg)
  const R = 70;
  const stroke = 10;
  const cx = 100;
  const cy = 85;

  // Arc path helper (angles in radians, 0=right, PI=left)
  const arc = (startDeg: number, endDeg: number, r: number) => {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy - r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy - r * Math.sin(e);
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`;
  };

  // Track: full semicircle 180 -> 0
  const trackPath = arc(180, 0, R);

  // Fill: 180 -> (180 - pct*180)
  const fillDeg = 180 - pct * 180;
  const fillPath = arc(180, fillDeg, R);

  // Needle tip position
  const needleAngle = (fillDeg * Math.PI) / 180;
  const needleLen = R - stroke - 8;
  const tipX = cx + needleLen * Math.cos(needleAngle);
  const tipY = cy - needleLen * Math.sin(needleAngle);

  // Color
  const color = pct >= 0.75 ? '#ef4444' : pct >= 0.5 ? '#f97316' : pct >= 0.25 ? '#eab308' : '#22c55e';
  const textColor = pct >= 0.75 ? 'text-red' : pct >= 0.5 ? 'text-orange' : pct >= 0.25 ? 'text-orange' : 'text-green';

  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-4 shadow-card w-full max-w-xs mx-auto" data-testid="gauge-chart">
      <p className="mb-2 text-sm font-semibold text-ink" data-testid="gauge-label">{label}</p>
      <svg viewBox="0 0 200 100" className="w-full max-w-[200px]" data-testid="gauge-svg">
        {/* Track */}
        <path d={trackPath} fill="none" stroke="var(--color-line, #e5e5e5)" strokeWidth={stroke} strokeLinecap="round" />
        {/* Fill */}
        {pct > 0.01 && (
          <path d={fillPath} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
        )}
        {/* Needle */}
        <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke={color} strokeWidth={2.5} strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill="var(--color-surface, #fff)" stroke={color} strokeWidth={2} />
        {/* Min/Max */}
        <text x={cx - R - 2} y={cy + 14} textAnchor="middle" fontSize="9" fill="var(--color-ink-3, #9a9a9a)">0</text>
        <text x={cx + R + 2} y={cy + 14} textAnchor="middle" fontSize="9" fill="var(--color-ink-3, #9a9a9a)">{max}</text>
      </svg>
      {/* Value */}
      <div className="flex flex-col items-center mt-1">
        <span className={cn('text-2xl font-bold tabular-nums', textColor)} data-testid="gauge-value">
          {value}{unit && <span className="ml-0.5 text-base font-medium">{unit}</span>}
        </span>
        <span className="text-xs text-ink-3">{Math.round(pct * 100)}% of {max}</span>
      </div>
    </div>
  );
}
