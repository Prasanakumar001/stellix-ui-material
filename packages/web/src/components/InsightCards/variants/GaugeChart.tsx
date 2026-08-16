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

  // SVG semicircle gauge params
  const W = 200;
  const H = 110;
  const cx = W / 2;
  const cy = H - 10;
  const R = 80;
  const trackWidth = 14;

  // Arc from 180deg to 0deg (left to right semicircle)
  const startAngle = Math.PI; // left
  const endAngle = 0;         // right
  const spanAngle = Math.PI;

  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  });

  const rMid = R - trackWidth / 2;
  const trackStart = toXY(startAngle, rMid);
  const trackEnd = toXY(endAngle, rMid);

  const fillAngle = startAngle - pct * spanAngle;
  const fillEnd = toXY(fillAngle, rMid);
  const largeArc = pct > 0.5 ? 1 : 0;

  // Needle
  const needleAngle = startAngle - pct * spanAngle;
  const needleTip = toXY(needleAngle, R - trackWidth - 4);
  const needleBase1 = toXY(needleAngle + Math.PI / 2, 5);
  const needleBase2 = toXY(needleAngle - Math.PI / 2, 5);

  // Color by pct
  const color = pct >= 0.75 ? '#ef4444' : pct >= 0.5 ? '#f97316' : pct >= 0.25 ? '#eab308' : '#22c55e';
  const textColor = pct >= 0.75 ? 'text-red' : pct >= 0.5 ? 'text-orange' : pct >= 0.25 ? 'text-yellow' : 'text-green';

  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-4 shadow-card" data-testid="gauge-chart">
      <p className="mb-1 text-sm font-semibold text-ink" data-testid="gauge-label">{label}</p>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} data-testid="gauge-svg" aria-label={`Gauge: ${value} of ${max}`}>
        {/* Track */}
        <path
          d={`M ${trackStart.x} ${trackStart.y} A ${rMid} ${rMid} 0 0 1 ${trackEnd.x} ${trackEnd.y}`}
          fill="none"
          stroke="var(--color-surface-field, #e5e7eb)"
          strokeWidth={trackWidth}
          strokeLinecap="round"
          data-testid="gauge-track"
        />
        {/* Fill arc */}
        {pct > 0 && (
          <path
            d={`M ${trackStart.x} ${trackStart.y} A ${rMid} ${rMid} 0 ${largeArc} 1 ${fillEnd.x} ${fillEnd.y}`}
            fill="none"
            stroke={color}
            strokeWidth={trackWidth}
            strokeLinecap="round"
            data-testid="gauge-fill"
            style={{ transition: 'all 0.4s ease' }}
          />
        )}
        {/* Needle */}
        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
          fill={color}
          data-testid="gauge-needle"
          style={{ transition: 'all 0.4s ease' }}
        />
        <circle cx={cx} cy={cy} r={5} fill="var(--color-surface, #fff)" stroke={color} strokeWidth={2} />
        {/* Min/max labels */}
        <text x={trackStart.x - 4} y={cy + 16} textAnchor="middle" fontSize="9" fill="var(--color-ink-3, #9ca3af)">0</text>
        <text x={trackEnd.x + 4} y={cy + 16} textAnchor="middle" fontSize="9" fill="var(--color-ink-3, #9ca3af)">{max}</text>
      </svg>
      {/* Value readout */}
      <div className="flex flex-col items-center -mt-2">
        <span className={cn('text-3xl font-bold tabular-nums', textColor)} data-testid="gauge-value">
          {value}
          {unit && <span className="ml-0.5 text-lg font-medium">{unit}</span>}
        </span>
        <span className="text-xs text-ink-3">{Math.round(pct * 100)}% of {max}{unit}</span>
      </div>
    </div>
  );
}
