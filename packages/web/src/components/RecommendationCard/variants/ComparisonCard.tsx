'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { CheckIcon, XMarkIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export type ComparisonOption = { title: string; features: string[]; confidence: number };
export type ComparisonCardProps = { optionA: ComparisonOption; optionB: ComparisonOption; onSelect: (o: 'a'|'b') => void };

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-green' : value >= 60 ? 'bg-accent' : value >= 40 ? 'bg-orange' : 'bg-red';
  return (
    <div className="flex items-center gap-2" data-testid="confidence-bar">
      <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="tabular-nums text-xs font-semibold text-ink-2 w-8 text-right">{value}%</span>
    </div>
  );
}

function Panel({ opt, side, other, chosen, onPick }: { opt: ComparisonOption; side: 'a'|'b'; other: string[]; chosen: boolean; onPick: () => void }) {
  const unique = opt.features.filter((f) => !other.includes(f));
  const missing = other.filter((f) => !opt.features.includes(f));
  return (
    <div className={cn('flex flex-col rounded-xl border-2 p-4 transition-all', chosen ? 'border-accent bg-accent/5 shadow-btn' : 'border-line bg-surface hover:border-ink-3')} data-testid={`option-${side}`} data-selected={chosen}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', chosen ? 'bg-accent/10' : 'bg-surface-field')}>
            <SparklesIcon className={cn('h-4 w-4', chosen ? 'text-accent' : 'text-ink-3')} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Option {side.toUpperCase()}</span>
            <h4 className="text-sm font-semibold text-ink" data-testid={`option-${side}-title`}>{opt.title}</h4>
          </div>
        </div>
        {chosen && <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent" data-testid="selected-badge">Selected</span>}
      </div>
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1"><ChartBarIcon className="h-3 w-3 text-ink-3" /><span className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">Confidence</span></div>
        <ConfidenceBar value={opt.confidence} />
      </div>
      <ul className="flex-1 space-y-1.5 mb-4" data-testid={`option-${side}-features`}>
        {opt.features.map((f, i) => {
          const diff = unique.includes(f);
          return <li key={i} className={cn('flex items-start gap-2 rounded-md px-2 py-1 text-xs', diff && 'bg-accent/5')} data-testid="feature-item" data-unique={diff}><CheckIcon className={cn('mt-0.5 h-3 w-3 shrink-0', diff ? 'text-accent' : 'text-ink-3')} /><span className={cn(diff ? 'font-medium text-ink' : 'text-ink-2')}>{f}</span></li>;
        })}
        {missing.map((f, i) => <li key={`m${i}`} className="flex items-start gap-2 px-2 py-1 text-xs opacity-40" data-testid="missing-feature"><XMarkIcon className="mt-0.5 h-3 w-3 shrink-0 text-ink-3" /><span className="text-ink-3 line-through">{f}</span></li>)}
      </ul>
      <button onClick={onPick} className={cn('w-full rounded-lg py-2.5 text-sm font-medium transition-colors', chosen ? 'bg-accent text-white hover:bg-accent/90' : 'border border-line text-ink hover:bg-surface-field')} data-testid={`pick-${side}-btn`}>{chosen ? 'Chosen' : `Pick ${side.toUpperCase()}`}</button>
    </div>
  );
}

export function ComparisonCard({ optionA, optionB, onSelect }: ComparisonCardProps) {
  const [sel, setSel] = useState<'a'|'b'|null>(null);
  const pick = (o: 'a'|'b') => { setSel(o); onSelect(o); };
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6" data-testid="comparison-card">
      <h3 className="mb-4 text-base font-semibold text-ink" data-testid="comparison-title">Compare Options</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="comparison-grid">
        <Panel opt={optionA} side="a" other={optionB.features} chosen={sel === 'a'} onPick={() => pick('a')} />
        <Panel opt={optionB} side="b" other={optionA.features} chosen={sel === 'b'} onPick={() => pick('b')} />
      </div>
      {sel && <p className="mt-3 text-center text-xs text-ink-3" data-testid="comparison-result">You selected Option {sel.toUpperCase()} - {sel === 'a' ? optionA.title : optionB.title}</p>}
    </div>
  );
}
