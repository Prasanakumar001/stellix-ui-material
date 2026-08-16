'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
};

const statusDotSizes: Record<AvatarSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3 w-3',
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  return (
    <span data-testid="avatar" data-size={size} className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'flex items-center justify-center rounded-full overflow-hidden',
          'bg-accent/10 text-accent font-medium select-none',
          sizeStyles[size],
        )}
      >
        {src ? (
          <img
            data-testid="avatar-image"
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <span data-testid="avatar-initials">
            {initials ? initials.slice(0, 2).toUpperCase() : alt.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      {status && (
        <span
          data-testid="avatar-status"
          data-status={status}
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-surface-base',
            statusDotSizes[size],
            statusColors[status],
          )}
        />
      )}
    </span>
  );
}
