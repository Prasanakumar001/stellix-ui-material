import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

describe('useStaggeredReveal', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts with 0 visible items', () => {
    const { result } = renderHook(() => useStaggeredReveal(5, 100));
    expect(result.current.visibleCount).toBe(0);
    expect(result.current.isComplete).toBe(false);
  });

  it('reveals items one by one', () => {
    const { result } = renderHook(() => useStaggeredReveal(3, 100));

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.visibleCount).toBe(1);

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.visibleCount).toBe(2);

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.visibleCount).toBe(3);

    // isComplete fires on the next tick after last item
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isComplete).toBe(true);
  });

  it('isVisible checks correct indices', () => {
    const { result } = renderHook(() => useStaggeredReveal(5, 100));

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.visibleCount).toBe(2);

    expect(result.current.isVisible(0)).toBe(true);
    expect(result.current.isVisible(1)).toBe(true);
    expect(result.current.isVisible(2)).toBe(false);
    expect(result.current.isVisible(4)).toBe(false);
  });

  it('showAll reveals everything instantly', () => {
    const { result } = renderHook(() => useStaggeredReveal(10, 100));

    act(() => result.current.showAll());

    expect(result.current.visibleCount).toBe(10);
    expect(result.current.isComplete).toBe(true);
  });

  it('reset sets visibleCount to 0', () => {
    const { result } = renderHook(() => useStaggeredReveal(5, 100));

    act(() => vi.advanceTimersByTime(300));
    expect(result.current.visibleCount).toBe(3);

    act(() => result.current.reset());
    expect(result.current.visibleCount).toBe(0);
    expect(result.current.isComplete).toBe(false);
  });

  it('does not auto-start when autoStart=false', () => {
    const { result } = renderHook(() => useStaggeredReveal(5, 100, false));

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.visibleCount).toBe(0);
  });

  it('handles 0 items', () => {
    const { result } = renderHook(() => useStaggeredReveal(0, 100));
    expect(result.current.isComplete).toBe(true);
    expect(result.current.visibleCount).toBe(0);
  });
});
