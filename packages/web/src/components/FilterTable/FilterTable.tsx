'use client';

import React, { useState, useMemo } from 'react';
import { cn, type FilterTableProps } from '@stellix/ui-core';
import {
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

/* ── Filter chip ── */
function FilterChipButton({
  filter,
  active,
  onToggle,
}: {
  filter: { id: string; label: string; count?: number };
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
        active
          ? 'border-accent bg-accent/10 text-accent shadow-btn'
          : 'border-line bg-surface text-ink-2 hover:border-ink-3 hover:bg-surface-field',
      )}
      data-testid="filter-chip"
      data-active={active}
    >
      {filter.label}
      {filter.count !== undefined && (
        <span className={cn(
          'rounded-full px-1.5 text-xs tabular-nums',
          active ? 'bg-accent/20 text-accent' : 'bg-surface-field text-ink-3',
        )} data-testid="filter-count">
          {filter.count}
        </span>
      )}
    </button>
  );
}

/* ── Main FilterTable ── */
export function FilterTable({ filters, data, columns, onFilterChange }: FilterTableProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(filters.filter((f) => f.active).map((f) => f.id)),
  );

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      onFilterChange?.(Array.from(next));
      return next;
    });
  };

  const clearAll = () => {
    setActiveFilters(new Set());
    onFilterChange?.([]);
  };

  const filteredData = useMemo(() => {
    if (activeFilters.size === 0) return data;
    return data.filter((row) => activeFilters.has(String(row.status || row.type || '')));
  }, [data, activeFilters]);

  return (
    <div className="space-y-4" data-testid="filter-table">
      {/* Filter chips bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" data-testid="filter-bar">
        <FunnelIcon className="h-4 w-4 shrink-0 text-ink-3" />
        <div className="flex gap-2">
          {filters.map((filter) => (
            <FilterChipButton
              key={filter.id}
              filter={filter}
              active={activeFilters.has(filter.id)}
              onToggle={() => toggleFilter(filter.id)}
            />
          ))}
        </div>
        {activeFilters.size > 0 && (
          <button
            onClick={clearAll}
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-3 hover:text-ink hover:bg-surface-field transition-colors"
            data-testid="clear-filters"
          >
            <XMarkIcon className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="text-xs text-ink-3" data-testid="result-count">
        {filteredData.length} of {data.length} results
      </div>

      {/* Mobile: Cards */}
      <div className="block space-y-3 sm:hidden" data-testid="filter-cards">
        {filteredData.map((row, i) => (
          <div key={i} className="animate-fade-up rounded-lg border border-line bg-surface p-3" data-testid="filter-card">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between py-0.5">
                <span className="text-xs font-medium text-ink-3">{col.label}</span>
                <span className="text-sm text-ink">{String(row[col.key] ?? '')}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tablet+: Table */}
      <div className="hidden overflow-hidden rounded-xl border border-line bg-surface shadow-card sm:block" data-testid="filter-table-view">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-field">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-3" data-testid={`filter-col-${col.key}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-b-0 hover:bg-surface-field transition-colors" data-testid="filter-row">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink">
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-ink-3">
                  No results match the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
