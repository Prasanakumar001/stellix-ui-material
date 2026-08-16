'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TagProps {
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Tag({
  color,
  removable = false,
  onRemove,
  icon,
  children,
  className,
}: TagProps) {
  const isCustomColor = color && color !== 'accent';

  return (
    <span
      data-testid="tag"
      style={isCustomColor ? { backgroundColor: `${color}1a`, color } : undefined}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        !isCustomColor && 'bg-accent/10 text-accent',
        className,
      )}
    >
      {icon && (
        <span data-testid="tag-icon" className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {removable && (
        <button
          data-testid="tag-remove"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove tag"
        >
          <XMarkIcon className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
