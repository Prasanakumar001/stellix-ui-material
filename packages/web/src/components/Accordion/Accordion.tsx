'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    multiple ? defaultOpen : defaultOpen.slice(0, 1),
  );

  const toggle = (id: string) => {
    if (multiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      data-testid="accordion"
      className={cn('divide-y divide-border rounded-lg border border-border overflow-hidden', className)}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} data-testid={`accordion-item-${item.id}`}>
            <button
              data-testid={`accordion-trigger-${item.id}`}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 text-sm font-medium',
                'text-text-primary bg-surface-raised hover:bg-surface-field transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent/50',
              )}
            >
              <span>{item.title}</span>
              <ChevronDownIcon
                data-testid={`accordion-icon-${item.id}`}
                className={cn(
                  'h-4 w-4 text-text-tertiary shrink-0 transition-transform duration-200',
                  isOpen ? 'rotate-180' : 'rotate-0',
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              data-testid={`accordion-content-${item.id}`}
              role="region"
              className={cn(
                'grid transition-all duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 py-3 text-sm text-text-secondary bg-surface-raised">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
