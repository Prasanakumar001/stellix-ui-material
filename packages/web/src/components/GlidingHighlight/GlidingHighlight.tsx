'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { cn } from '@stellix/ui-core';

interface Item {
  id: string;
  label: string;
}

interface GlidingHighlightProps {
  items: Item[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function GlidingHighlight({
  items,
  activeId,
  onChange,
  className,
}: GlidingHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const btn = itemRefs.current[activeId];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setHighlight({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [activeId, items]);

  return (
    <div
      data-testid="gliding-highlight"
      ref={containerRef}
      className={cn('relative flex items-center gap-1', className)}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 h-full rounded-lg bg-accent/10 transition-all duration-200 ease-out"
        style={{ left: highlight.left, width: highlight.width }}
      />
      {items.map((item) => (
        <button
          key={item.id}
          ref={(el) => { itemRefs.current[item.id] = el; }}
          data-testid={`gliding-highlight-item-${item.id}`}
          onClick={() => onChange(item.id)}
          className={cn(
            'relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
            item.id === activeId ? 'text-accent' : 'text-text-secondary hover:text-text-primary',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
