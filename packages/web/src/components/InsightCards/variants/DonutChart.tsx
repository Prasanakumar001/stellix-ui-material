'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';

export type DonutSegment = { label: string; value: number; color: string };

export type DonutChartProps = {
  segments: DonutSegment[];
  centerLabel: string;
};

export function DonutChart({ segments, centerLabel }: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = segments.reduce((s, g) => s + g.value, 0);
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const innerR = 38;
  const stroke = r - innerR;
  const circumference = 2 * Math.PI * (r - stroke / 2);

  let cumulative = 0;
  const arcs = segments.map((seg, i) => {
    const pct = total > 0 ? seg.value / total : 0;
    const dashArray = circumference * pct;
    const dashOffset = -(circumference * cumulative);
    const arc = { ...seg, pct, dashArray, dashOffset, idx: i };
    cumulative += pct;
    return arc;
  });

  const hoveredSeg = hovered !== null ? segments[hovered] : null;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card w-full max-w-sm mx-auto sm:flex-row sm:items-start" data-testid="donut-chart">
      {/* SVG */}
      <div className="relative shrink-0" data-testid="donut-svg-wrapper">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg]"
          data-testid="donut-svg"
          aria-label="Donut chart"
        >
          {total === 0 && (
            <circle cx={cx} cy={cy} r={r - stroke / 2} fill="none" strokeWidth={stroke} className="stroke-surface-field" />
          )}
          {arcs.map((arc) => (
            <circle
              key={arc.idx}
              cx={cx}
              cy={cy}
              r={r - stroke / 2}
              fill="none"
              stroke={arc.color}
              strokeWidth={hovered === arc.idx ? stroke + 4 : stroke}
              strokeDasharray={`${arc.dashArray} ${circumference}`}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-width 0.2s ease' }}
              className="cursor-pointer"
              onMouseEnter={() => setHovered(arc.idx)}
              onMouseLeave={() => setHovered(null)}
              data-testid="donut-segment"
              data-label={arc.label}
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" data-testid="donut-center">
          {hoveredSeg ? (
            <>
              <span className="text-lg font-bold tabular-nums text-ink" data-testid="donut-hovered-value">
                {Math.round((hoveredSeg.value / (total || 1)) * 100)}%
              </span>
              <span className="max-w-[70px] text-center text-[10px] text-ink-3 leading-tight">{hoveredSeg.label}</span>
            </>
          ) : (
            <span className="text-center text-xs font-semibold text-ink" data-testid="donut-center-label">{centerLabel}</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 min-w-0" data-testid="donut-legend">
        {segments.map((seg, i) => {
          const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
          return (
            <div
              key={i}
              className={cn('flex items-center gap-2 rounded-md px-2 py-1 transition-colors', hovered === i && 'bg-surface-field')}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-testid="legend-item"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="flex-1 truncate text-xs text-ink">{seg.label}</span>
              <span className="tabular-nums text-xs font-semibold text-ink-2">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
