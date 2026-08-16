import { useState, useMemo, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface UseSortableReturn<T> {
  sortedData: T[];
  sortKey: string | null;
  sortDirection: SortDirection;
  sort: (key: string) => void;
  resetSort: () => void;
  isSorted: boolean;
  isSortedBy: (key: string) => boolean;
}

export function useSortable<T extends Record<string, unknown>>(
  data: T[],
  defaultKey?: string,
  defaultDirection: SortDirection = 'asc',
): UseSortableReturn<T> {
  const [sortKey, setSortKey] = useState<string | null>(defaultKey ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultDirection);

  const sort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    },
    [sortKey],
  );

  const resetSort = useCallback(() => {
    setSortKey(null);
    setSortDirection('asc');
  }, []);

  const isSortedBy = useCallback(
    (key: string) => sortKey === key,
    [sortKey],
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  return {
    sortedData,
    sortKey,
    sortDirection,
    sort,
    resetSort,
    isSorted: sortKey !== null,
    isSortedBy,
  };
}
