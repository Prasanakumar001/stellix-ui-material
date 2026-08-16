'use client';

import React from 'react';
import { useExpandable, cn, truncate, type ContextCardsProps } from '@stellix/ui-core';
import { DocumentIcon } from '../Icons';
import {
  GlobeAltIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

/* ── Relevance meter bar ── */
function RelevanceMeter({ value }: { value: number }) {
  const barColor = value >= 90 ? 'bg-green' : value >= 70 ? 'bg-accent' : value >= 50 ? 'bg-orange' : 'bg-ink-3';
  return (
    <div className="flex items-center gap-2" data-testid="relevance-meter">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-surface-field">
        <div
          className={cn('h-full rounded-full transition-all', barColor)}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
      <span className="text-xs font-medium tabular-nums text-ink-3">{value}%</span>
    </div>
  );
}

/* ── Individual context card ── */
function ContextCard({ chunk, index }: { chunk: ContextCardsProps['chunks'][0]; index: number }) {
  const { isOpen, toggle } = useExpandable(false);
  const isLongContent = chunk.content.length > 120;

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-line bg-surface p-4 shadow-card',
        'transition-all duration-200 hover:shadow-raised hover:border-accent/20',
        'animate-fade-up',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      data-testid="context-card"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <DocumentIcon className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink truncate" data-testid="card-title">{chunk.title}</h4>
          <div className="mt-0.5 flex items-center gap-1.5">
            <GlobeAltIcon className="h-3 w-3 text-ink-3" />
            <span className="text-xs text-ink-3 truncate" data-testid="card-source">{chunk.source}</span>
          </div>
        </div>
      </div>

      {/* Relevance */}
      {chunk.relevance !== undefined && (
        <div className="mt-3">
          <RelevanceMeter value={chunk.relevance} />
        </div>
      )}

      {/* Content */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2" data-testid="card-content">
        {isOpen ? chunk.content : truncate(chunk.content, 120)}
      </p>

      {/* Show more/less toggle */}
      {isLongContent && (
        <button
          onClick={toggle}
          className="mt-2 inline-flex items-center gap-1 self-start text-xs font-medium text-accent hover:text-accent/80 transition-colors"
          data-testid="show-more-btn"
        >
          {isOpen ? 'Show less' : 'Show more'}
          <ChevronDownIcon className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
        </button>
      )}
    </div>
  );
}

/* ── Main ContextCards ── */
export function ContextCards({ chunks }: ContextCardsProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
      )}
      data-testid="context-cards"
    >
      {chunks.map((chunk, i) => (
        <ContextCard key={chunk.id} chunk={chunk} index={i} />
      ))}

      {chunks.length === 0 && (
        <div className="col-span-full flex flex-col items-center gap-2 py-8 text-ink-3">
          <DocumentIcon className="h-8 w-8" />
          <p className="text-sm">No context available</p>
        </div>
      )}
    </div>
  );
}
