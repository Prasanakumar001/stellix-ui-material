'use client';

import React from 'react';
import { cn, type RecommendationCardProps } from '@stellix/ui-core';
import { CheckIcon } from '../Icons';
import {
  XMarkIcon,
  PencilSquareIcon,
  SparklesIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

/* ── Segmented confidence meter ── */
function ConfidenceMeter({ value }: { value: number }) {
  const segments = 5;
  const filled = Math.round((value / 100) * segments);
  const color = value >= 80 ? 'bg-green' : value >= 60 ? 'bg-accent' : value >= 40 ? 'bg-orange' : 'bg-red';

  return (
    <div className="flex items-center gap-1.5" data-testid="confidence-meter">
      <div className="flex gap-0.5">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className={cn('h-2.5 w-5 rounded-sm transition-colors sm:w-6', i < filled ? color : 'bg-surface-field')}
            data-testid="confidence-segment"
          />
        ))}
      </div>
      <span className="text-xs font-semibold tabular-nums text-ink-2" data-testid="confidence-value">{value}%</span>
    </div>
  );
}

/* ── Alternative option row ── */
function AlternativeRow({ label, confidence }: { label: string; confidence: number }) {
  const barColor = confidence >= 70 ? 'bg-accent' : confidence >= 40 ? 'bg-orange' : 'bg-ink-3';
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface-field px-3 py-2.5" data-testid="alternative-row">
      <span className="flex-1 text-sm text-ink">{label}</span>
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-line">
          <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${confidence}%` }} />
        </div>
        <span className="text-xs tabular-nums text-ink-3 w-7 text-right">{confidence}%</span>
      </div>
    </div>
  );
}

/* ── Main RecommendationCard ── */
export function RecommendationCard({
  title,
  description,
  confidence,
  alternatives = [],
  onAccept,
  onReject,
  onModify,
}: RecommendationCardProps) {
  const [showAlts, setShowAlts] = React.useState(true);

  return (
    <div className="animate-fade-up rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6" data-testid="recommendation-card">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <SparklesIcon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-ink" data-testid="rec-title">{title}</h3>
            <ConfidenceMeter value={confidence} />
          </div>
          <p className="mt-1 text-sm text-ink-2 break-words" data-testid="rec-description">{description}</p>
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowAlts(!showAlts)}
            className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-3 hover:text-ink transition-colors"
            data-testid="alternatives-toggle"
          >
            Alternatives ({alternatives.length})
            <ChevronDownIcon className={cn('h-3 w-3 transition-transform', showAlts && 'rotate-180')} />
          </button>
          {showAlts && (
            <div className="space-y-2" data-testid="alternatives-list">
              {alternatives.map((alt) => (
                <AlternativeRow key={alt.id} label={alt.label} confidence={alt.confidence} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 sm:justify-end" data-testid="rec-actions">
        <button
          onClick={onReject}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-field transition-colors sm:flex-none"
          data-testid="rec-reject"
        >
          <XMarkIcon className="h-4 w-4" /> Reject
        </button>
        <button
          onClick={onModify}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-accent/30 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/5 transition-colors sm:flex-none"
          data-testid="rec-modify"
        >
          <PencilSquareIcon className="h-4 w-4" /> Modify
        </button>
        <button
          onClick={onAccept}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors sm:flex-none"
          data-testid="rec-accept"
        >
          <CheckIcon className="h-4 w-4" /> Accept
        </button>
      </div>
    </div>
  );
}
