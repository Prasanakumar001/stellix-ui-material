'use client';

import React, { useState } from 'react';
import { useSortable, cn, type RecordsTableProps } from '@stellix/ui-core';
import {
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';

/* ── Sort indicator ── */
function SortIcon({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) {
  if (!active) return <ChevronUpDownIcon className="h-3.5 w-3.5 text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity" />;
  return direction === 'asc'
    ? <ChevronUpIcon className="h-3.5 w-3.5 text-accent" />
    : <ChevronDownIcon className="h-3.5 w-3.5 text-accent" />;
}

/* ── Main RecordsTable ── */
export function RecordsTable({
  columns,
  data,
  selectable = false,
  onSort,
  onSelect,
}: RecordsTableProps) {
  const { sortedData, sortKey, sortDirection, sort } = useSortable(data);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    sort(key);
    onSort?.(key, sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      onSelect?.(Array.from(next));
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
      onSelect?.([]);
    } else {
      const all = new Set(data.map((r) => String(r.id)));
      setSelectedIds(all);
      onSelect?.(Array.from(all));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="records-table">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <TableCellsIcon className="h-4 w-4 text-ink-3" />
          <span className="text-xs font-medium text-ink-2">{sortedData.length} records</span>
        </div>
        {selectedIds.size > 0 && (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent" data-testid="selected-count">
            {selectedIds.size} selected
          </span>
        )}
      </div>

      {/* Mobile: Card view */}
      <div className="block sm:hidden" data-testid="mobile-cards">
        {sortedData.map((row) => (
          <div key={String(row.id)} className="border-b border-line p-4 last:border-b-0" data-testid="record-card">
            {selectable && (
              <div className="mb-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(String(row.id))}
                  onChange={() => handleSelect(String(row.id))}
                  className="accent-accent"
                />
              </div>
            )}
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between py-1">
                <span className="text-xs font-medium text-ink-3">{col.label}</span>
                <span className="text-sm text-ink">{String(row[col.key] ?? '')}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tablet+: Table view */}
      <div className="hidden overflow-x-auto sm:block" data-testid="table-view">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-field">
              {selectable && (
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="accent-accent"
                    data-testid="select-all"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    'group px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-3',
                    col.sortable && 'cursor-pointer select-none hover:text-ink transition-colors',
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  data-testid={`column-header-${col.key}`}
                  aria-sort={col.sortable ? (sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon active={sortKey === col.key} direction={sortDirection} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={String(row.id)}
                className={cn(
                  'border-b border-line last:border-b-0 transition-colors',
                  selectedIds.has(String(row.id)) ? 'bg-accent/5' : 'hover:bg-surface-field',
                )}
                data-testid="table-row"
              >
                {selectable && (
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(String(row.id))}
                      onChange={() => handleSelect(String(row.id))}
                      className="accent-accent"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink" data-testid={`cell-${col.key}`}>
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8 text-ink-3">
          <TableCellsIcon className="h-8 w-8" />
          <p className="text-sm">No records found</p>
        </div>
      )}
    </div>
  );
}
