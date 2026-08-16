'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export type MultiStepApprovalStep = {
  title: string;
  options: Array<{ id: string; label: string }>;
};

export type MultiStepApprovalProps = {
  steps: MultiStepApprovalStep[];
  onComplete: (selections: Record<string, string>) => void;
};

export function MultiStepApproval({ steps, onComplete }: MultiStepApprovalProps) {
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const step = steps[current];
  const total = steps.length;
  const stepKey = `step_${current}`;
  const hasSelection = !!selections[stepKey];
  const isLast = current === total - 1;

  const handleSelect = (optionId: string) => {
    setSelections((prev) => ({ ...prev, [stepKey]: optionId }));
  };

  const handleNext = () => {
    if (isLast) { onComplete(selections); return; }
    setCurrent((c) => c + 1);
  };

  const handlePrev = () => setCurrent((c) => c - 1);

  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6" data-testid="multi-step-approval">
      {/* Step counter */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-3" data-testid="step-counter">
          Step {current + 1} of {total}
        </span>
        <CheckCircleIcon className="h-5 w-5 text-accent/40" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-ink sm:text-lg" data-testid="step-title">{step.title}</h3>
      <p className="mt-0.5 text-sm text-ink-3">Select one option to continue</p>

      {/* Options */}
      <div className="mt-4 space-y-2" data-testid="step-options" role="radiogroup" aria-label={step.title}>
        {step.options.map((opt) => {
          const selected = selections[stepKey] === opt.id;
          return (
            <div
              key={opt.id}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onClick={() => handleSelect(opt.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(opt.id); } }}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all duration-150',
                selected ? 'border-accent bg-accent/5 shadow-sm' : 'border-line hover:border-ink-3 hover:bg-surface-field/50',
              )}
              data-testid="step-option"
              data-selected={selected}
            >
              <div className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors', selected ? 'border-accent bg-accent' : 'border-ink-3')}>
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <span className={cn('text-sm font-medium', selected ? 'text-accent' : 'text-ink')}>{opt.label}</span>
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5" data-testid="pagination-dots">
        {steps.map((_, i) => (
          <span
            key={i}
            className={cn('h-1.5 rounded-full transition-all duration-200', i === current ? 'w-5 bg-accent' : i < current ? 'w-1.5 bg-accent/40' : 'w-1.5 bg-line')}
            data-testid="pagination-dot"
            data-active={i === current}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center gap-2" data-testid="step-nav">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-field disabled:opacity-40 disabled:cursor-not-allowed transition-colors sm:flex-none"
          data-testid="prev-btn"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!hasSelection}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:flex-none"
          data-testid="next-btn"
        >
          {isLast ? 'Complete' : 'Next'}
          {!isLast && <ChevronRightIcon className="h-4 w-4" />}
          {isLast && <CheckCircleIcon className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
