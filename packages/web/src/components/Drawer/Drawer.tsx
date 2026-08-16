'use client';

import React, { useEffect } from 'react';
import { cn } from '@stellix/ui-core';
import { XMarkIcon } from '@heroicons/react/24/outline';

type DrawerSide = 'left' | 'right' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title: string;
  children: React.ReactNode;
  size?: DrawerSize;
  className?: string;
}

const sideStyles: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 h-full',
  right: 'inset-y-0 right-0 h-full',
  bottom: 'inset-x-0 bottom-0 w-full',
};

const sizeWidth: Record<DrawerSize, string> = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
};

const sizeHeight: Record<DrawerSize, string> = {
  sm: 'max-h-[40vh]',
  md: 'max-h-[60vh]',
  lg: 'max-h-[80vh]',
};

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  size = 'md',
  className,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const isBottom = side === 'bottom';

  return (
    <div data-testid="drawer-overlay" className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        data-testid="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute z-10 bg-surface-raised border-border shadow-xl flex flex-col',
          sideStyles[side],
          isBottom ? cn('border-t', sizeHeight[size]) : cn('border', isBottom ? '' : side === 'left' ? 'border-r' : 'border-l', sizeWidth[size]),
          className,
        )}
      >
        <div data-testid="drawer-header" className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 id="drawer-title" className="text-base font-semibold text-text-primary">
            {title}
          </h2>
          <button
            data-testid="drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-md p-1 text-text-tertiary hover:text-text-primary hover:bg-surface-field transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div data-testid="drawer-body" className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
