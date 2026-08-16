'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className,
}: PaginationProps) {
  const pages = showPageNumbers ? getPageNumbers(currentPage, totalPages) : [];
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const btnBase = cn(
    'inline-flex items-center justify-center h-9 min-w-[2.25rem] px-2 rounded-md text-sm',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50',
  );

  return (
    <nav data-testid="pagination" aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        data-testid="pagination-prev"
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className={cn(btnBase, 'text-text-secondary hover:bg-surface-field disabled:opacity-40 disabled:cursor-not-allowed')}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {showPageNumbers && pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            data-testid="pagination-ellipsis"
            className="inline-flex items-center justify-center h-9 w-9 text-sm text-text-tertiary"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            data-testid={`pagination-page-${page}`}
            onClick={() => onPageChange(page as number)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              btnBase,
              page === currentPage
                ? 'bg-accent text-white font-medium'
                : 'text-text-secondary hover:bg-surface-field',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        data-testid="pagination-next"
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className={cn(btnBase, 'text-text-secondary hover:bg-surface-field disabled:opacity-40 disabled:cursor-not-allowed')}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
