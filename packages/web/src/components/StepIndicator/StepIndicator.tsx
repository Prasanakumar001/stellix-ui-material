'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { CheckIcon } from '@heroicons/react/24/outline';

type Orientation = 'horizontal' | 'vertical';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep?: number;
  orientation?: Orientation;
  className?: string;
}

function StepCircle({ index, state }: { index: number; state: 'completed' | 'active' | 'upcoming' }) {
  return (
    <div
      data-testid="step-circle"
      data-state={state}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
        state === 'completed' && 'bg-accent text-white',
        state === 'active' && 'border-2 border-accent bg-surface-panel text-accent ring-4 ring-accent/20',
        state === 'upcoming' && 'border-2 border-border bg-surface-panel text-text-tertiary',
      )}
    >
      {state === 'completed' ? (
        <CheckIcon className="h-4 w-4 stroke-2" />
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  );
}

export function StepIndicator({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  className,
}: StepIndicatorProps) {
  const getState = (i: number) => {
    if (i < currentStep) return 'completed';
    if (i === currentStep) return 'active';
    return 'upcoming';
  };

  if (orientation === 'vertical') {
    return (
      <ol data-testid="step-indicator" data-orientation="vertical" className={cn('flex flex-col', className)}>
        {steps.map((step, i) => (
          <li key={i} data-testid="step-item" className="flex gap-4">
            <div className="flex flex-col items-center">
              <StepCircle index={i} state={getState(i)} />
              {i < steps.length - 1 && (
                <div className={cn('mt-1 w-0.5 flex-1 min-h-6', i < currentStep ? 'bg-accent' : 'bg-border')} />
              )}
            </div>
            <div className={cn('pb-6', i === steps.length - 1 && 'pb-0')}>
              <p className={cn('text-sm font-medium', getState(i) === 'upcoming' ? 'text-text-tertiary' : 'text-text-primary')}>
                {step.label}
              </p>
              {step.description && (
                <p data-testid="step-description" className="mt-0.5 text-xs text-text-secondary">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol data-testid="step-indicator" data-orientation="horizontal" className={cn('flex items-start', className)}>
      {steps.map((step, i) => (
        <li key={i} data-testid="step-item" className="flex flex-1 items-start">
          <div className="flex flex-col items-center flex-1">
            <div className="flex w-full items-center">
              {i === 0 ? (
                <div className="h-0.5 flex-1" />
              ) : (
                <div className={cn('h-0.5 flex-1', i <= currentStep ? 'bg-accent' : 'bg-border')} />
              )}
              <StepCircle index={i} state={getState(i)} />
              {i === steps.length - 1 ? (
                <div className="h-0.5 flex-1" />
              ) : (
                <div className={cn('h-0.5 flex-1', i < currentStep ? 'bg-accent' : 'bg-border')} />
              )}
            </div>
            <div className="mt-2 text-center px-1">
              <p className={cn('text-xs font-medium', getState(i) === 'upcoming' ? 'text-text-tertiary' : 'text-text-primary')}>
                {step.label}
              </p>
              {step.description && (
                <p data-testid="step-description" className="mt-0.5 text-xs text-text-secondary">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
