'use client';

import React, { useEffect } from 'react';
import { cn } from '@stellix/ui-core';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message: string;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  autoDismiss?: number;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-500 bg-green-50 dark:bg-green-950/40',
  error: 'border-red-500 bg-red-50 dark:bg-red-950/40',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/40',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/40',
};

const iconStyles: Record<ToastVariant, string> = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

const actionStyles: Record<ToastVariant, string> = {
  success: 'text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200',
  error: 'text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200',
  warning: 'text-yellow-700 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200',
  info: 'text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200',
};

const icons: Record<ToastVariant, React.ElementType> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

export function Toast({
  variant = 'info',
  title,
  message,
  onDismiss,
  action,
  autoDismiss,
  className,
}: ToastProps) {
  const Icon = icons[variant];

  useEffect(() => {
    if (!autoDismiss || !onDismiss) return;
    const timer = setTimeout(onDismiss, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  return (
    <div
      data-testid="toast"
      data-variant={variant}
      role="alert"
      className={cn(
        'flex w-80 gap-3 rounded-lg border-l-4 p-4 shadow-lg',
        'bg-surface-panel text-text-primary',
        variantStyles[variant],
        className,
      )}
    >
      <Icon data-testid="toast-icon" className={cn('h-5 w-5 shrink-0 mt-0.5', iconStyles[variant])} />
      <div className="flex-1 min-w-0">
        <p data-testid="toast-title" className="text-sm font-semibold">{title}</p>
        <p data-testid="toast-message" className="mt-0.5 text-sm text-text-secondary">{message}</p>
        {action && (
          <button
            data-testid="toast-action"
            onClick={action.onClick}
            className={cn('mt-2 text-xs font-medium underline-offset-2 hover:underline focus:outline-none', actionStyles[variant])}
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          data-testid="toast-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-0.5 text-text-tertiary hover:text-text-primary hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
