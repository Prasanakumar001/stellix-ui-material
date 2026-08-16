'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  const defaultSeparator = (
    <ChevronRightIcon data-testid="breadcrumb-separator" className="h-4 w-4 text-text-tertiary shrink-0" />
  );
  const sep = separator ?? defaultSeparator;

  return (
    <nav data-testid="breadcrumb" aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 min-w-0 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <span aria-hidden="true" className="shrink-0">
                  {sep}
                </span>
              )}
              {isLast ? (
                <span
                  data-testid={`breadcrumb-item-${index}`}
                  aria-current="page"
                  className="text-sm text-text-primary font-medium truncate max-w-[160px]"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  data-testid={`breadcrumb-item-${index}`}
                  href={item.href}
                  className={cn(
                    'text-sm text-text-secondary hover:text-text-primary transition-colors',
                    'truncate max-w-[160px] focus:outline-none focus:ring-2 focus:ring-accent/50 rounded',
                  )}
                  title={item.label}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  data-testid={`breadcrumb-item-${index}`}
                  className="text-sm text-text-secondary truncate max-w-[160px]"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
