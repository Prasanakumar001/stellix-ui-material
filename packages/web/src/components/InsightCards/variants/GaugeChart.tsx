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

  const R = 60;
  const stroke = 10;
  const W = 200;
  const H = 120;
  const cx = W / 2;
  const cy = H - 15; // center at bottom

  // In SVG: x-right, y-down. For upward semicircle:
  // Left point:  (cx - R, cy)
  // Right point:  (cx + R, cy)
  // Arc sweeps UPWARD with sweep-flag=0 (counterclockwise from left to right = up)
  const leftX = cx - R;
  const rightX = cx + R;

  // Track: full upward semicircle from left to right
  const trackPath = `M ${leftX} ${cy} A ${R} ${R} 0 0 1 ${rightX} ${cy}`;

  // Fill: partial arc from left
  // At pct=1, fill goes full semicircle to right
  // Endpoint angle: PI - pct*PI (from left, going clockwise over the top)
  const angle = Math.PI * (1 - pct); // PI=left, 0=right
  const fillEndX = cx + R * Math.cos(angle);
  const fillEndY = cy - R * Math.sin(angle);
  const fillPath = `M ${leftX} ${cy} A ${R} ${R} 0 0 1 ${fillEndX} ${fillEndY}`;

  // Needle
  const needleLen = R - stroke - 6;
  const tipX = cx + needleLen * Math.cos(angle);
  const tipY = cy - needleLen * Math.sin(angle);

  // Color
  const color = pct >= 0.75 ? '#ef4444' : pct >= 0.5 ? '#f97316' : pct >= 0.25 ? '#eab308' : '#22c55e';
  const textColor = pct >= 0.75 ? 'text-red' : pct >= 0.5 ? 'text-orange' : pct >= 0.25 ? 'text-orange' : 'text-green';

  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-4 shadow-card w-full max-w-xs mx-auto" data-testid="gauge-chart">
      <p className="mb-2 text-sm font-semibold text-ink" data-testid="gauge-label">{label}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]" data-testid="gauge-svg">
        {/* Track */}
        <path d={trackPath} fill="none" stroke="var(--color-line, #e5e5e5)" strokeWidth={stroke} strokeLinecap="round" />
        {/* Fill */}
        {pct > 0.01 && (
          <path d={fillPath} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
        )}
        {/* Needle line */}
        <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke={color} strokeWidth={2} strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill="var(--color-surface, #fff)" stroke={color} strokeWidth={2} />
        {/* Min/Max labels */}
        <text x={leftX} y={cy + 14} textAnchor="middle" fontSize="10" fill="var(--color-ink-3, #9a9a9a)">0</text>
        <text x={rightX} y={cy + 14} textAnchor="middle" fontSize="10" fill="var(--color-ink-3, #9a9a9a)">{max}</text>
      </svg>
      <div className="flex flex-col items-center mt-1">
        <span className={cn('text-2xl font-bold tabular-nums', textColor)} data-testid="gauge-value">
          {value}{unit && <span className="ml-0.5 text-base font-medium">{unit}</span>}
        </span>
        <span className="text-xs text-ink-3">{Math.round(pct * 100)}% of {max}</span>
      </div>
    </div>
  );
}
