'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { InboxIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-testid="empty-state"
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 px-6 text-center',
        className,
      )}
    >
      <div
        data-testid="empty-state-icon"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-field text-text-tertiary"
      >
        {icon ?? <InboxIcon className="h-8 w-8" />}
      </div>
      <div className="space-y-1.5 max-w-xs">
        <h3
          data-testid="empty-state-title"
          className="text-base font-semibold text-text-primary"
        >
          {title}
        </h3>
        {description && (
          <p
            data-testid="empty-state-description"
            className="text-sm text-text-secondary leading-relaxed"
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          data-testid="empty-state-action"
          onClick={action.onClick}
          className={cn(
            'mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2',
            'bg-accent text-white text-sm font-medium',
            'hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2',
            'transition-colors',
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
