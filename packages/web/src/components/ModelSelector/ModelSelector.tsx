'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { CheckCircleIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface ModelOption {
  id: string;
  name: string;
  provider: string;
  capabilities: string[];
  costPer1k: number;
}

interface ModelSelectorProps {
  models: ModelOption[];
  selected: string;
  onChange: (id: string) => void;
  className?: string;
}

export function ModelSelector({ models, selected, onChange, className }: ModelSelectorProps) {
  return (
    <div
      data-testid="model-selector"
      className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {models.map((model) => {
        const isSelected = model.id === selected;
        return (
          <button
            key={model.id}
            onClick={() => onChange(model.id)}
            data-testid="model-option"
            data-model-id={model.id}
            data-selected={isSelected}
            className={cn(
              'relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all',
              'hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
              isSelected
                ? 'border-accent bg-accent/5 shadow-btn'
                : 'border-line bg-surface hover:border-ink-3',
            )}
          >
            {isSelected && (
              <CheckCircleIcon
                data-testid="model-selected-icon"
                className="absolute right-3 top-3 h-4 w-4 text-accent"
              />
            )}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-field">
                <CpuChipIcon className="h-4 w-4 text-ink-2" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink leading-tight" data-testid="model-name">
                  {model.name}
                </p>
                <p className="text-xs text-ink-3" data-testid="model-provider">
                  {model.provider}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1" data-testid="model-capabilities">
              {model.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full bg-surface-field px-2 py-0.5 text-xs text-ink-2"
                  data-testid="model-capability-tag"
                >
                  {cap}
                </span>
              ))}
            </div>

            <p className="text-xs text-ink-2" data-testid="model-cost">
              <span className="font-medium text-ink">${model.costPer1k.toFixed(4)}</span>
              {' '}/ 1k tokens
            </p>
          </button>
        );
      })}
    </div>
  );
}
