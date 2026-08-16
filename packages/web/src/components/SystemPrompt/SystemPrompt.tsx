'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { DocumentTextIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Preset {
  label: string;
  value: string;
}

interface SystemPromptProps {
  value: string;
  onChange: (value: string) => void;
  maxTokens: number;
  presets: Preset[];
  className?: string;
}

export function SystemPrompt({ value, onChange, maxTokens, presets, className }: SystemPromptProps) {
  const [open, setOpen] = useState(false);

  const charCount = value.length;
  const tokenEstimate = Math.ceil(charCount / 4);
  const pct = Math.min((tokenEstimate / maxTokens) * 100, 100);

  const isWarning = pct > 80 && pct <= 95;
  const isDanger = pct > 95;

  const barColor = isDanger ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-accent';
  const textColor = isDanger ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-ink-3';

  const handlePreset = (preset: Preset) => {
    onChange(preset.value);
    setOpen(false);
  };

  return (
    <div
      data-testid="system-prompt"
      className={cn('flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 shadow-card', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-4 w-4 text-ink-3" />
          <span className="text-sm font-semibold text-ink">System Prompt</span>
        </div>

        {presets.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              data-testid="preset-toggle"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5',
                'text-xs text-ink-2 hover:bg-surface-field hover:border-ink-3 transition-colors',
              )}
            >
              Presets
              <ChevronDownIcon className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
            </button>
            {open && (
              <div
                data-testid="preset-dropdown"
                className="absolute right-0 top-full z-10 mt-1 min-w-48 rounded-xl border border-line bg-surface shadow-card"
              >
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    data-testid="preset-option"
                    className="flex w-full items-start px-3 py-2.5 text-left text-xs text-ink hover:bg-surface-field transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="system-prompt-textarea"
        rows={5}
        placeholder="You are a helpful assistant..."
        className={cn(
          'w-full resize-y rounded-lg border border-line bg-surface-field px-3 py-2.5',
          'text-sm text-ink placeholder:text-ink-3 leading-relaxed',
          'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
          'transition-colors',
        )}
      />

      <div className="flex items-center justify-between gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-field" data-testid="token-bar">
          <div
            data-testid="token-bar-fill"
            className={cn('h-full transition-all duration-300', barColor)}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={cn('shrink-0 text-xs', textColor)} data-testid="token-estimate">
          ~{tokenEstimate} / {maxTokens} tokens
        </span>
      </div>

      <p className="text-xs text-ink-3" data-testid="char-count">
        {charCount} characters
      </p>
    </div>
  );
}
