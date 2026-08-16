'use client';

import React from 'react';
import { cn, type FineTuneCardProps } from '@stellix/ui-core';
import {
  AdjustmentsHorizontalIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

/* ── Main FineTuneCard ── */
export function FineTuneCard({ title, properties, onChange }: FineTuneCardProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6" data-testid="finetune-card">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <AdjustmentsHorizontalIcon className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-ink uppercase tracking-wide" data-testid="finetune-title">{title}</h3>
      </div>

      {/* Properties */}
      <div className="space-y-5" data-testid="finetune-properties">
        {properties.map((prop) => (
          <div key={prop.id} data-testid="finetune-property" data-type={prop.type}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-ink-2" data-testid="property-label">{prop.label}</label>
              {prop.type === 'slider' && (
                <span className="rounded-md bg-surface-field px-2 py-0.5 text-xs font-mono text-ink-3 tabular-nums" data-testid="slider-value">
                  {String(prop.value)}
                </span>
              )}
            </div>

            {/* Slider */}
            {prop.type === 'slider' && (
              <div className="space-y-1">
                <input
                  type="range"
                  min={prop.min ?? 0}
                  max={prop.max ?? 100}
                  step={prop.step ?? 1}
                  value={Number(prop.value)}
                  onChange={(e) => onChange?.(prop.id, Number(e.target.value))}
                  className="w-full accent-accent h-1.5 cursor-pointer"
                  data-testid="slider-input"
                  aria-label={prop.label}
                  aria-valuemin={prop.min ?? 0}
                  aria-valuemax={prop.max ?? 100}
                  aria-valuenow={Number(prop.value)}
                />
                <div className="flex justify-between text-[10px] text-ink-3">
                  <span>{prop.min ?? 0}</span>
                  <span>{prop.max ?? 100}</span>
                </div>
              </div>
            )}

            {/* Toggle */}
            {prop.type === 'toggle' && (
              <button
                onClick={() => onChange?.(prop.id, !prop.value)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  prop.value ? 'bg-accent' : 'bg-line-strong',
                )}
                data-testid="toggle-input"
                data-checked={Boolean(prop.value)}
                role="switch"
                aria-checked={Boolean(prop.value)}
                aria-label={prop.label}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-btn transition-transform',
                    prop.value && 'translate-x-5',
                  )}
                />
              </button>
            )}

            {/* Color picker */}
            {prop.type === 'color' && (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={String(prop.value)}
                  onChange={(e) => onChange?.(prop.id, e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded-lg border border-line"
                  data-testid="color-input"
                  aria-label={prop.label}
                />
                <span className="rounded-md bg-surface-field px-2 py-0.5 text-xs font-mono text-ink-3" data-testid="color-value">
                  {String(prop.value)}
                </span>
              </div>
            )}

            {/* Select */}
            {prop.type === 'select' && prop.options && (
              <div className="relative">
                <select
                  value={String(prop.value)}
                  onChange={(e) => onChange?.(prop.id, e.target.value)}
                  className={cn(
                    'w-full appearance-none rounded-lg border border-line bg-surface-field pl-3 pr-8 py-2.5',
                    'text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
                    'transition-colors cursor-pointer',
                  )}
                  data-testid="select-input"
                >
                  {prop.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronUpDownIcon className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3 pointer-events-none" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
