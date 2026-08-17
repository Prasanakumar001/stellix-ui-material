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
    <div className="animate-fade-up rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6 w-full max-w-full overflow-hidden" data-testid="recommendation-card">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <SparklesIcon className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-base font-semibold text-ink" data-testid="rec-title">{title}</h3>
        </div>
        <ConfidenceMeter value={confidence} />
        <p className="text-sm text-ink-2 leading-relaxed" data-testid="rec-description">{description}</p>
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
      <div className="mt-4 grid grid-cols-3 gap-2 w-full" data-testid="rec-actions">
        <button
          onClick={onReject}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-line px-1 py-2 text-xs font-medium text-ink hover:bg-surface-field transition-colors sm:px-3 sm:py-2.5 sm:text-sm"
          data-testid="rec-reject"
        >
          <XMarkIcon className="h-3.5 w-3.5 shrink-0" /> <span>Reject</span>
        </button>
        <button
          onClick={onModify}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-accent/30 px-1 py-2 text-xs font-medium text-accent hover:bg-accent/5 transition-colors sm:px-3 sm:py-2.5 sm:text-sm"
          data-testid="rec-modify"
        >
          <PencilSquareIcon className="h-3.5 w-3.5 shrink-0" /> <span>Modify</span>
        </button>
        <button
          onClick={onAccept}
          className="inline-flex items-center justify-center gap-1 rounded-lg bg-accent px-1 py-2 text-xs font-medium text-white hover:bg-accent/90 transition-colors sm:px-3 sm:py-2.5 sm:text-sm"
          data-testid="rec-accept"
        >
          <CheckIcon className="h-3.5 w-3.5 shrink-0" /> <span>Accept</span>
        </button>
      </div>
    </div>
  );
}
