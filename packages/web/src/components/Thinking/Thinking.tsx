'use client';

import React from 'react';
import { useExpandable, useStaggeredReveal, cn, type ThinkingProps, type ThinkingStep } from '@stellix/ui-core';
import {
  StepsIcon,
  ReasoningIcon,
  SearchTraceIcon,
  CodingIcon,
  ThinkingGearIcon,
  ChevronDownIcon,
} from '../Icons';

/* ── Trace type config ── */
const traceConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  steps: {
    icon: <StepsIcon className="h-4 w-4" />,
    color: 'text-accent bg-accent/10',
    label: 'Steps',
  },
  reasoning: {
    icon: <ReasoningIcon className="h-4 w-4" />,
    color: 'text-purple bg-purple/10',
    label: 'Reasoning',
  },
  search: {
    icon: <SearchTraceIcon className="h-4 w-4" />,
    color: 'text-blue bg-blue/10',
    label: 'Search',
  },
  coding: {
    icon: <CodingIcon className="h-4 w-4" />,
    color: 'text-green bg-green/10',
    label: 'Coding',
  },
};

/* ── Trace type badge ── */
function TraceBadge({ type }: { type: string }) {
  const config = traceConfig[type] || { icon: null, color: 'text-ink-3 bg-surface-field', label: type };
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium', config.color)}>
      {config.icon}
      {config.label}
    </span>
  );
}

/* ── Individual trace item ── */
function TraceItem({ step, index }: { step: ThinkingStep; index: number }) {
  const { isOpen, toggle } = useExpandable(false);

  return (
    <div
      className="border-b border-line last:border-b-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
      data-testid={`trace-item-${step.type}`}
    >
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={`${step.type} trace — ${step.status || 'pending'}`}
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
          'hover:bg-surface-field focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:rounded-lg',
        )}
      >
        <TraceBadge type={step.type} />
        <span className="flex-1 text-sm font-medium text-ink sm:text-base">
          {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
        </span>

        {/* Active indicator */}
        {step.status === 'active' && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
        )}

        {/* Completed indicator */}
        {step.status === 'completed' && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green/10">
            <svg className="h-3 w-3 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}

        {/* Timestamp */}
        {step.timestamp && (
          <span className="text-xs text-ink-3 tabular-nums hidden sm:inline">
            {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        )}

        <ChevronDownIcon
          className={cn(
            'h-4 w-4 text-ink-3 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Expandable content */}
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 sm:px-6">
            <div className="rounded-lg bg-surface-field p-3 text-sm leading-relaxed text-ink-2">
              {step.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Thinking Component ── */
export function Thinking({ steps, defaultOpen = false }: ThinkingProps) {
  const { isOpen, toggle } = useExpandable(defaultOpen);
  const { visibleCount } = useStaggeredReveal(steps.length, 80, isOpen);

  const activeCount = steps.filter((s) => s.status === 'active').length;
  const completedCount = steps.filter((s) => s.status === 'completed').length;

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-card"
      data-testid="thinking-panel"
    >
      {/* Header */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={`Thinking panel — ${steps.length} steps`}
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3 text-left',
          'hover:bg-surface-field transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        )}
      >
        <ThinkingGearIcon className={cn('h-5 w-5 text-accent', activeCount > 0 && 'animate-spin')} />
        <span className="flex-1 text-sm font-semibold text-ink">Thinking</span>

        {/* Step counter badges */}
        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
              {completedCount} done
            </span>
          )}
          {activeCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {activeCount} active
            </span>
          )}
          <span className="text-xs text-ink-3">{steps.length} steps</span>
        </div>

        <ChevronDownIcon
          className={cn(
            'h-4 w-4 text-ink-3 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Progress bar */}
      {steps.length > 0 && (
        <div className="h-0.5 w-full bg-surface-field">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      )}

      {/* Expandable trace list */}
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          {steps.map((step, i) => (
            <TraceItem
              key={step.id}
              step={step}
              index={i}
            />
          ))}

          {/* Empty state */}
          {steps.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-ink-3">
              No thinking steps to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
