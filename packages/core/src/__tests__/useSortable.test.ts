import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSortable } from '../hooks/useSortable';

const data = [
  { id: '1', name: 'Charlie', age: 30 },
  { id: '2', name: 'Alice', age: 25 },
  { id: '3', name: 'Bob', age: 35 },
];

describe('useSortable', () => {
  it('returns data unsorted by default', () => {
    const { result } = renderHook(() => useSortable(data));
    expect(result.current.sortedData).toEqual(data);
    expect(result.current.sortKey).toBeNull();
    expect(result.current.isSorted).toBe(false);
  });

  it('sorts ascending by string key', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));

    expect(result.current.sortedData[0].name).toBe('Alice');
    expect(result.current.sortedData[1].name).toBe('Bob');
    expect(result.current.sortedData[2].name).toBe('Charlie');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.isSorted).toBe(true);
  });

  it('toggles to descending on second click', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));
    act(() => result.current.sort('name'));

    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('Charlie');
    expect(result.current.sortedData[2].name).toBe('Alice');
  });

  it('sorts by numeric key', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('age'));

    expect(result.current.sortedData[0].age).toBe(25);
    expect(result.current.sortedData[1].age).toBe(30);
    expect(result.current.sortedData[2].age).toBe(35);
  });

  it('resets sort to original order', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));
    act(() => result.current.resetSort());

    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortedData).toEqual(data);
    expect(result.current.isSorted).toBe(false);
  });

  it('switches key resets direction to asc', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));
    act(() => result.current.sort('name')); // desc
    act(() => result.current.sort('age')); // new key, resets to asc

    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortKey).toBe('age');
  });

  it('isSortedBy returns correct values', () => {
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));

    expect(result.current.isSortedBy('name')).toBe(true);
    expect(result.current.isSortedBy('age')).toBe(false);
  });

  it('handles defaultKey and defaultDirection', () => {
    const { result } = renderHook(() => useSortable(data, 'age', 'desc'));

    expect(result.current.sortKey).toBe('age');
    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].age).toBe(35);
  });

  it('handles null values in sort', () => {
    const dataWithNulls = [
      { id: '1', name: 'Charlie', score: null as unknown as number },
      { id: '2', name: 'Alice', score: 90 },
      { id: '3', name: 'Bob', score: 85 },
    ];

    const { result } = renderHook(() => useSortable(dataWithNulls));

    act(() => result.current.sort('score'));

    // null should sort to end
    expect(result.current.sortedData[2].name).toBe('Charlie');
  });

  it('does not mutate original data', () => {
    const original = [...data];
    const { result } = renderHook(() => useSortable(data));

    act(() => result.current.sort('name'));

    expect(data).toEqual(original);
  });
});
