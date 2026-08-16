'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  className?: string;
}

const tooltipPositions: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowPositions: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 dark:border-t-gray-700 border-x-transparent border-b-transparent border-4',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-700 border-x-transparent border-t-transparent border-4',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 dark:border-l-gray-700 border-y-transparent border-r-transparent border-4',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 dark:border-r-gray-700 border-y-transparent border-l-transparent border-4',
};

export function Tooltip({
  content,
  placement = 'top',
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      data-testid="tooltip-wrapper"
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          data-testid="tooltip"
          role="tooltip"
          data-placement={placement}
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-md',
            'bg-gray-800 dark:bg-gray-700 px-2 py-1 text-xs text-white shadow-md',
            tooltipPositions[placement],
          )}
        >
          {content}
          <span
            data-testid="tooltip-arrow"
            className={cn('absolute block w-0 h-0', arrowPositions[placement])}
          />
        </span>
      )}
    </span>
  );
}
