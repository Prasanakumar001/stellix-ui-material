'use client';

import React, { useEffect } from 'react';
import { cn } from '@stellix/ui-core';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  className,
}: ModalProps) {
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

  return (
    <div
      data-testid="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative z-10 w-full rounded-xl border border-border bg-surface-raised shadow-xl',
          'flex flex-col max-h-[90vh]',
          sizeStyles[size],
          className,
        )}
      >
        <div data-testid="modal-header" className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 id="modal-title" className="text-base font-semibold text-text-primary">
            {title}
          </h2>
          <button
            data-testid="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md p-1 text-text-tertiary hover:text-text-primary hover:bg-surface-field transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div data-testid="modal-body" className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {footer && (
          <div data-testid="modal-footer" className="px-6 py-4 border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
