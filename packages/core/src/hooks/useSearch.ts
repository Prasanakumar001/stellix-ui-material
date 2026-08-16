import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface UseSearchReturn<T> {
  query: string;
  setQuery: (q: string) => void;
  results: T[];
  isSearching: boolean;
  resultCount: number;
  clear: () => void;
  hasQuery: boolean;
}

export function useSearch<T>(
  items: T[],
  filterFn: (item: T, query: string) => boolean,
  debounceMs = 200,
): UseSearchReturn<T> {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(items);
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterFnRef = useRef(filterFn);
  filterFnRef.current = filterFn;

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setQuery('');
    setResults(items);
    setIsSearching(false);
  }, [items]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults(items);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const filtered = items.filter((item) => filterFnRef.current(item, trimmed));
      setResults(filtered);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, items, debounceMs]);

  const hasQuery = query.trim().length > 0;

  return useMemo(
    () => ({ query, setQuery, results, isSearching, resultCount: results.length, clear, hasQuery }),
    [query, results, isSearching, clear, hasQuery],
  );
}
