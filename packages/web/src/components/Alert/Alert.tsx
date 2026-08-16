'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const borderStyles: Record<AlertVariant, string> = {
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
  success: 'border-green-500 bg-green-50 dark:bg-green-950/30',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30',
  error: 'border-red-500 bg-red-50 dark:bg-red-950/30',
};

const titleStyles: Record<AlertVariant, string> = {
  info: 'text-blue-800 dark:text-blue-300',
  success: 'text-green-800 dark:text-green-300',
  warning: 'text-yellow-800 dark:text-yellow-300',
  error: 'text-red-800 dark:text-red-300',
};

const iconStyles: Record<AlertVariant, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const defaultIcons: Record<AlertVariant, React.ElementType> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
};

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
}: AlertProps) {
  const DefaultIcon = defaultIcons[variant];

  return (
    <div
      data-testid="alert"
      data-variant={variant}
      role="alert"
      className={cn(
        'flex gap-3 rounded-r-lg border-l-4 p-4',
        borderStyles[variant],
        className,
      )}
    >
      <span data-testid="alert-icon" className={cn('shrink-0 mt-0.5', iconStyles[variant])}>
        {icon ?? <DefaultIcon className="h-5 w-5" />}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <p data-testid="alert-title" className={cn('text-sm font-semibold', titleStyles[variant])}>
            {title}
          </p>
        )}
        {children && (
          <div
            data-testid="alert-content"
            className={cn('text-sm text-text-secondary', title && 'mt-1')}
          >
            {children}
          </div>
        )}
      </div>
      {dismissible && onDismiss && (
        <button
          data-testid="alert-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 rounded p-0.5 text-text-tertiary hover:text-text-primary hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
