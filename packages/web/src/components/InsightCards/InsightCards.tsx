'use client';

import React, { useState } from 'react';
import { cn, type InsightCardsProps, type ChartDataPoint } from '@stellix/ui-core';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

/* ── Mini SVG chart ── */
function MiniChart({ data, type = 'bar' }: { data: ChartDataPoint[]; type?: string }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const width = 200;
  const height = 56;

  if (type === 'bar') {
    const barWidth = (width - (data.length - 1) * 4) / data.length;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full" data-testid="chart-svg">
        {data.map((point, i) => {
          const barHeight = (point.value / maxValue) * height;
          return (
            <rect
              key={i}
              x={i * (barWidth + 4)}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              rx={2}
              className="fill-accent/60 hover:fill-accent transition-colors"
              data-testid="chart-bar"
            >
              <title>{point.label}: {point.value}</title>
            </rect>
          );
        })}
      </svg>
    );
  }

  // Line / area chart
  const points = data.map((d, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * width,
    y: height - (d.value / maxValue) * (height - 4),
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${points[0].x},${height} ${points.map((p) => `L${p.x},${p.y}`).join(' ')} L${points[points.length - 1].x},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full" data-testid="chart-svg">
      {type === 'area' && (
        <path d={areaPath} className="fill-accent/10" />
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          className="fill-surface stroke-accent stroke-2 opacity-0 hover:opacity-100 transition-opacity"
          data-testid="chart-point"
        >
          <title>{data[i].label}: {data[i].value}</title>
        </circle>
      ))}
    </svg>
  );
}

/* ── Trend indicator ── */
function TrendBadge({ data }: { data: ChartDataPoint[] }) {
  if (data.length < 2) return null;
  const last = data[data.length - 1].value;
  const prev = data[data.length - 2].value;
  const diff = last - prev;
  const pct = prev > 0 ? Math.round((diff / prev) * 100) : 0;
  const isUp = diff >= 0;

  return (
    <span className={cn(
      'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium',
      isUp ? 'bg-green/10 text-green' : 'bg-red/10 text-red',
    )} data-testid="trend-badge">
      {isUp ? <ArrowTrendingUpIcon className="h-3 w-3" /> : <ArrowTrendingDownIcon className="h-3 w-3" />}
      {Math.abs(pct)}%
    </span>
  );
}

/* ── Main InsightCards ── */
export function InsightCards({ insights }: InsightCardsProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [cols, setCols] = React.useState(1);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w < 500) setCols(1);
      else if (w < 800) setCols(2);
      else if (w < 1200) setCols(3);
      else setCols(4);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-4 w-full"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      data-testid="insight-cards"
    >
      {insights.map((insight, i) => (
        <div
          key={insight.id}
          className={cn(
            'animate-fade-up rounded-xl border border-line bg-surface p-4 shadow-card',
            'transition-shadow hover:shadow-raised',
          )}
          style={{ animationDelay: `${i * 100}ms` }}
          data-testid="insight-card"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-accent" />
              <h4 className="text-sm font-semibold text-ink" data-testid="insight-title">{insight.title}</h4>
            </div>
            <TrendBadge data={insight.data} />
          </div>
          {insight.description && (
            <p className="mt-1 text-xs text-ink-3" data-testid="insight-description">{insight.description}</p>
          )}
          <div className="mt-3" data-testid="insight-chart">
            <MiniChart data={insight.data} type={insight.chartType} />
          </div>
          {/* Data labels */}
          <div className="mt-2 flex justify-between text-[10px] text-ink-3" data-testid="chart-labels">
            {insight.data.map((d, j) => (
              <span key={j}>{d.label}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
