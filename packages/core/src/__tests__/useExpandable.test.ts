import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExpandable } from '../hooks/useExpandable';

describe('useExpandable', () => {
  it('defaults to closed', () => {
    const { result } = renderHook(() => useExpandable());
    expect(result.current.isOpen).toBe(false);
  });

  it('respects defaultOpen=true', () => {
    const { result } = renderHook(() => useExpandable(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('toggles state', () => {
    const { result } = renderHook(() => useExpandable(false));

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('opens explicitly', () => {
    const { result } = renderHook(() => useExpandable(false));

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    // Calling open again should be idempotent
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes explicitly', () => {
    const { result } = renderHook(() => useExpandable(true));

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);

    // Calling close again should be idempotent
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('returns stable function references', () => {
    const { result, rerender } = renderHook(() => useExpandable(false));

    const firstToggle = result.current.toggle;
    const firstOpen = result.current.open;
    const firstClose = result.current.close;

    rerender();

    expect(result.current.toggle).toBe(firstToggle);
    expect(result.current.open).toBe(firstOpen);
    expect(result.current.close).toBe(firstClose);
  });
});
