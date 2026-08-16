import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../hooks/useSearch';

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Avocado' },
];

const filterFn = (item: Item, query: string) =>
  item.name.toLowerCase().includes(query.toLowerCase());

describe('useSearch', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns all items when query is empty', () => {
    const { result } = renderHook(() => useSearch(items, filterFn));
    expect(result.current.results).toEqual(items);
    expect(result.current.hasQuery).toBe(false);
    expect(result.current.resultCount).toBe(4);
  });

  it('filters items after debounce', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 100));

    act(() => result.current.setQuery('a'));

    // Before debounce — still searching
    expect(result.current.isSearching).toBe(true);

    act(() => vi.advanceTimersByTime(100));

    // After debounce — filtered
    expect(result.current.isSearching).toBe(false);
    expect(result.current.resultCount).toBe(3); // Apple, Banana (has 'a'), Avocado
    expect(result.current.hasQuery).toBe(true);
  });

  it('returns empty when no matches', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 100));

    act(() => result.current.setQuery('xyz'));
    act(() => vi.advanceTimersByTime(100));

    expect(result.current.results).toEqual([]);
    expect(result.current.resultCount).toBe(0);
  });

  it('clear resets to all items', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 100));

    act(() => result.current.setQuery('ban'));
    act(() => vi.advanceTimersByTime(100));

    expect(result.current.resultCount).toBe(1);

    act(() => result.current.clear());

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual(items);
    expect(result.current.hasQuery).toBe(false);
  });

  it('handles whitespace-only query as empty', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 100));

    act(() => result.current.setQuery('   '));
    act(() => vi.advanceTimersByTime(100));

    expect(result.current.results).toEqual(items);
    expect(result.current.hasQuery).toBe(false);
  });

  it('debounces rapid query changes', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 200));

    act(() => result.current.setQuery('a'));
    act(() => vi.advanceTimersByTime(50));
    act(() => result.current.setQuery('av'));
    act(() => vi.advanceTimersByTime(50));
    act(() => result.current.setQuery('avo'));
    act(() => vi.advanceTimersByTime(200));

    // Should match only the final query
    expect(result.current.resultCount).toBe(1); // Avocado
  });
});
