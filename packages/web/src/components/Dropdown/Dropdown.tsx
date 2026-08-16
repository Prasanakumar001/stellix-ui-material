'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@stellix/ui-core';

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'left', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const actionItems = items.filter((i) => !i.divider);

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [close]);

  useEffect(() => {
    if (open && focusedIndex >= 0) itemRefs.current[focusedIndex]?.focus();
  }, [open, focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) { if (e.key === 'Enter' || e.key === ' ') { setOpen(true); setFocusedIndex(0); } return; }
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIndex((p) => Math.min(p + 1, actionItems.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIndex((p) => Math.max(p - 1, 0)); }
  };

  let actionIdx = -1;

  return (
    <div
      ref={containerRef}
      data-testid="dropdown"
      className={cn('relative inline-block', className)}
      onKeyDown={handleKeyDown}
    >
      <div data-testid="dropdown-trigger" onClick={() => setOpen((o) => !o)} role="button" tabIndex={0}>
        {trigger}
      </div>
      {open && (
        <div
          data-testid="dropdown-menu"
          role="menu"
          className={cn(
            'absolute z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-surface-raised shadow-lg py-1',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <hr key={index} data-testid={`dropdown-divider-${index}`} className="my-1 border-border" />;
            }
            actionIdx++;
            const ai = actionIdx;
            return (
              <button
                key={index}
                ref={(el) => { itemRefs.current[ai] = el; }}
                data-testid={`dropdown-item-${index}`}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { if (!item.disabled) { item.onClick?.(); close(); } }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                  'transition-colors focus:outline-none focus:bg-surface-field',
                  item.disabled
                    ? 'text-text-tertiary cursor-not-allowed'
                    : 'text-text-primary hover:bg-surface-field cursor-pointer',
                )}
              >
                {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
