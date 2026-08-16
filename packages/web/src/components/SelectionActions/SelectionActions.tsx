'use client';

import React, { useRef } from 'react';
import { useTextSelection, cn, type SelectionActionsProps } from '@stellix/ui-core';
import { RewriteIcon, SummarizeIcon, ExplainIcon, TranslateIcon } from '../Icons';

const defaultActions = ['rewrite', 'summarize', 'explain', 'translate'] as const;

const actionConfig: Record<string, { label: string; icon: React.ReactNode; shortcut?: string }> = {
  rewrite: { label: 'Rewrite', icon: <RewriteIcon className="h-3.5 w-3.5" />, shortcut: 'R' },
  summarize: { label: 'Summarize', icon: <SummarizeIcon className="h-3.5 w-3.5" />, shortcut: 'S' },
  explain: { label: 'Explain', icon: <ExplainIcon className="h-3.5 w-3.5" />, shortcut: 'E' },
  translate: { label: 'Translate', icon: <TranslateIcon className="h-3.5 w-3.5" />, shortcut: 'T' },
};

export function SelectionActions({
  actions = [...defaultActions],
  onAction,
  children,
}: SelectionActionsProps & { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { text, rect, isSelected, clear } = useTextSelection(containerRef);

  return (
    <div ref={containerRef} className="relative" data-testid="selection-actions">
      {children}
      {isSelected && rect && (
        <>
          {/* Mobile: Bottom sheet */}
          <div
            className="fixed inset-x-0 bottom-0 z-50 animate-slide-in-bottom border-t border-line bg-surface p-3 shadow-modal sm:hidden"
            data-testid="selection-bottom-sheet"
          >
            <div className="mb-2 text-center text-xs text-ink-3">
              {text.length} characters selected
            </div>
            <div className="grid grid-cols-2 gap-2">
              {actions.map((action) => {
                const cfg = actionConfig[action];
                return (
                  <button
                    key={action}
                    onClick={() => { onAction?.(action, text); clear(); }}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-3',
                      'text-sm font-medium text-ink',
                      'hover:bg-surface-field active:bg-line transition-colors',
                    )}
                    data-testid={`action-${action}`}
                  >
                    {cfg?.icon}
                    {cfg?.label || action}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tablet+: Floating toolbar */}
          <div
            className={cn(
              'hidden sm:flex absolute z-50 animate-pop-in',
              'items-center gap-0.5 rounded-xl border border-line bg-surface p-1 shadow-overlay',
            )}
            style={{
              top: rect.top - 52,
              left: rect.left + rect.width / 2,
              transform: 'translateX(-50%)',
            }}
            data-testid="selection-toolbar"
          >
            {actions.map((action) => {
              const cfg = actionConfig[action];
              return (
                <button
                  key={action}
                  onClick={() => { onAction?.(action, text); clear(); }}
                  className={cn(
                    'group inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5',
                    'text-xs font-medium text-ink',
                    'hover:bg-accent/10 hover:text-accent transition-colors',
                  )}
                  title={cfg?.shortcut ? `${cfg.label} (${cfg.shortcut})` : cfg?.label}
                  data-testid={`action-${action}`}
                >
                  <span className="group-hover:scale-110 transition-transform">{cfg?.icon}</span>
                  {cfg?.label || action}
                </button>
              );
            })}
            {/* Arrow pointer */}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-b border-r border-line bg-surface"
            />
          </div>
        </>
      )}
    </div>
  );
}
