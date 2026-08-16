'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50',
  secondary: 'bg-surface-field text-text-primary hover:bg-surface-field/80 focus:ring-surface-field',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-field/50 focus:ring-surface-field',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50',
  outline: 'border border-border bg-transparent text-text-primary hover:bg-surface-field/50 focus:ring-border',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      data-testid="button"
      data-variant={variant}
      data-size={size}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {loading ? (
        <ArrowPathIcon
          data-testid="button-spinner"
          className={cn('animate-spin shrink-0', size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5')}
        />
      ) : (
        icon && (
          <span data-testid="button-icon" className="shrink-0">
            {icon}
          </span>
        )
      )}
      {children && <span>{children}</span>}
    </button>
  );
}
