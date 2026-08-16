'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { themePresets } from './presets';
import { PaintBrushIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const tokenLabels: Record<string, string> = {
  '--color-accent': 'Accent',
  '--color-ink': 'Text',
  '--color-ink-2': 'Text Secondary',
  '--color-ink-3': 'Text Muted',
  '--color-surface': 'Surface',
  '--color-surface-field': 'Field',
  '--color-surface-canvas': 'Canvas',
  '--color-line': 'Border',
  '--color-line-strong': 'Border Strong',
  '--color-green': 'Green',
  '--color-red': 'Red',
  '--color-orange': 'Orange',
  '--color-blue': 'Blue',
  '--color-purple': 'Purple',
};

export function ThemeBuilder({ target }: { target?: React.RefObject<HTMLElement | null> }) {
  const [tokens, setTokens] = useState({ ...themePresets.light.tokens });

  const update = (key: string, value: string) => {
    setTokens((prev) => ({ ...prev, [key]: value }));
    const el = target?.current || document.documentElement;
    el.style.setProperty(key, value);
  };

  const reset = () => {
    const defaults = themePresets.light.tokens;
    setTokens({ ...defaults });
    const el = target?.current || document.documentElement;
    for (const [k, v] of Object.entries(defaults)) {
      el.style.setProperty(k, v);
    }
  };

  return (
    <div className="space-y-4" data-testid="theme-builder">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PaintBrushIcon className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-ink">Theme Builder</span>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-3 hover:bg-surface-field hover:text-ink transition-colors"
          data-testid="theme-reset"
        >
          <ArrowPathIcon className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(tokenLabels).map(([key, label]) => (
          <div key={key} className="space-y-1" data-testid="theme-token">
            <label className="text-xs font-medium text-ink-2">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tokens[key] || '#000000'}
                onChange={(e) => update(key, e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-line"
                data-testid="theme-color-input"
              />
              <span className="font-mono text-[10px] text-ink-3">{tokens[key]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
