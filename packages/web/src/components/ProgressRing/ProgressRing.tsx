'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type ProgressRingVariant = 'default' | 'dashboard' | 'gradient' | 'segmented';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  variant?: ProgressRingVariant;
  title?: string;
  subtitle?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  segments?: number;
  className?: string;
}

const statusColors: Record<string, string> = {
  success: '#22c55e',
  warning: '#f97316',
  error: '#ef4444',
  info: '#3b82f6',
};

const statusBg: Record<string, string> = {
  success: 'bg-green/10',
  warning: 'bg-orange/10',
  error: 'bg-red/10',
  info: 'bg-blue/10',
};

const statusText: Record<string, string> = {
  success: 'text-green',
  warning: 'text-orange',
  error: 'text-red',
  info: 'text-blue',
};

function RingSvg({
  size,
  strokeWidth,
  clamped,
  ringColor,
  trackOpacity = 0.15,
}: {
  size: number;
  strokeWidth: number;
  clamped: number;
  ringColor: string;
  trackOpacity?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-valuenow={clamped} role="progressbar">
      <circle
        cx={center} cy={center} r={radius}
        fill="none" stroke={ringColor} strokeWidth={strokeWidth}
        opacity={trackOpacity}
      />
      <circle
        cx={center} cy={center} r={radius}
        fill="none" stroke={ringColor} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 600ms ease' }}
      />
    </svg>
  );
}

function SegmentedRingSvg({
  size,
  strokeWidth,
  clamped,
  ringColor,
  segments,
}: {
  size: number;
  strokeWidth: number;
  clamped: number;
  ringColor: string;
  segments: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const gapAngle = 4;
  const segAngle = (360 - gapAngle * segments) / segments;
  const segLen = (segAngle / 360) * circumference;
  const gapLen = (gapAngle / 360) * circumference;
  const filledSegments = Math.round((clamped / 100) * segments);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-valuenow={clamped} role="progressbar">
      {Array.from({ length: segments }, (_, i) => {
        const rotation = -90 + i * (segAngle + gapAngle);
        const isFilled = i < filledSegments;
        return (
          <circle
            key={i}
            cx={center} cy={center} r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${segLen} ${circumference - segLen}`}
            strokeDashoffset={0}
            opacity={isFilled ? 1 : 0.15}
            transform={`rotate(${rotation} ${center} ${center})`}
            style={{ transition: 'opacity 400ms ease' }}
          />
        );
      })}
    </svg>
  );
}

export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 4,
  color = '#6366f1',
  label,
  variant = 'default',
  title,
  subtitle,
  status,
  segments = 8,
  className,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const ringColor = status ? statusColors[status] : color;

  if (variant === 'dashboard') {
    const dashSize = size || 96;
    const dashStroke = strokeWidth || 6;
    const innerSpace = dashSize - dashStroke * 2 - 16;
    const fontSize = Math.max(12, Math.min(20, innerSpace * 0.45));
    return (
      <div
        data-testid="progress-ring"
        data-variant="dashboard"
        className={cn(
          'flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-5 shadow-card min-w-[160px]',
          className,
        )}
      >
        <div className="relative inline-flex items-center justify-center" style={{ width: dashSize, height: dashSize }}>
          <RingSvg size={dashSize} strokeWidth={dashStroke} clamped={clamped} ringColor={ringColor} />
          <div className="absolute flex flex-col items-center">
            <span className="font-bold tabular-nums text-ink" style={{ fontSize }}>{clamped}%</span>
          </div>
        </div>
        {(title || subtitle) && (
          <div className="flex flex-col items-center text-center">
            {title && <span className="text-sm font-semibold text-ink">{title}</span>}
            {subtitle && <span className="text-xs text-ink-3">{subtitle}</span>}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'gradient') {
    const gradSize = size || 80;
    const gradStroke = strokeWidth || 5;
    const radius = (gradSize - gradStroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clamped / 100) * circumference;
    const center = gradSize / 2;
    const gradId = `grad-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <div
        data-testid="progress-ring"
        data-variant="gradient"
        className={cn('relative inline-flex flex-col items-center gap-2', className)}
      >
        <div className="relative" style={{ width: gradSize, height: gradSize }}>
          <svg width={gradSize} height={gradSize} viewBox={`0 0 ${gradSize} ${gradSize}`} aria-valuenow={clamped} role="progressbar">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <circle
              cx={center} cy={center} r={radius}
              fill="none" stroke="currentColor" strokeWidth={gradStroke}
              className="text-line opacity-30"
            />
            <circle
              cx={center} cy={center} r={radius}
              fill="none" stroke={`url(#${gradId})`} strokeWidth={gradStroke}
              strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              transform={`rotate(-90 ${center} ${center})`}
              style={{ transition: 'stroke-dashoffset 600ms ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
              {clamped}%
            </span>
          </div>
        </div>
        {label && <span className="text-xs font-medium text-ink-2">{label}</span>}
      </div>
    );
  }

  if (variant === 'segmented') {
    const segSize = size || 80;
    const segStroke = strokeWidth || 5;
    return (
      <div
        data-testid="progress-ring"
        data-variant="segmented"
        className={cn(
          'inline-flex flex-col items-center gap-2',
          status && 'rounded-xl p-4 ' + (statusBg[status] || ''),
          className,
        )}
      >
        <div className="relative" style={{ width: segSize, height: segSize }}>
          <SegmentedRingSvg size={segSize} strokeWidth={segStroke} clamped={clamped} ringColor={ringColor} segments={segments} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-lg font-bold tabular-nums', status ? statusText[status] : 'text-ink')}>
              {clamped}%
            </span>
          </div>
        </div>
        {label && <span className="text-xs font-medium text-ink-2">{label}</span>}
      </div>
    );
  }

  // default
  return (
    <div
      data-testid="progress-ring"
      data-variant="default"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <RingSvg size={size} strokeWidth={strokeWidth} clamped={clamped} ringColor={ringColor} />
      <span data-testid="progress-ring-label" className="absolute text-xs font-medium text-ink">
        {label ?? `${clamped}%`}
      </span>
    </div>
  );
}
