'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { themePresets, applyTheme } from './presets';
import { SwatchIcon, CheckIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher({ target }: { target?: React.RefObject<HTMLElement | null> }) {
  const [active, setActive] = useState('light');

  const apply = (key: string) => {
    setActive(key);
    const el = target?.current || document.documentElement;
    applyTheme(el, themePresets[key]);
  };

  return (
    <div className="space-y-3" data-testid="theme-switcher">
      <div className="flex items-center gap-2">
        <SwatchIcon className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold text-ink">Theme Presets</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(themePresets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => apply(key)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all',
              active === key
                ? 'border-accent bg-accent/10 text-accent shadow-btn'
                : 'border-line bg-surface text-ink-2 hover:border-ink-3 hover:bg-surface-field',
            )}
            data-testid="theme-preset-btn"
            data-theme-key={key}
          >
            <span
              className="h-4 w-4 shrink-0 rounded-full border border-line"
              style={{ backgroundColor: preset.tokens['--color-accent'] }}
            />
            <span className="flex-1 truncate font-medium">{preset.name}</span>
            {active === key && <CheckIcon className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink-3">{themePresets[active].description}</p>
    </div>
  );
}
