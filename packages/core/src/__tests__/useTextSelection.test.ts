import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTextSelection } from '../hooks/useTextSelection';

describe('useTextSelection', () => {
  it('initializes with no selection', () => {
    const { result } = renderHook(() => useTextSelection());
    expect(result.current.isSelected).toBe(false);
    expect(result.current.text).toBe('');
    expect(result.current.rect).toBeNull();
  });

  it('clear resets state', () => {
    const { result } = renderHook(() => useTextSelection());

    act(() => result.current.clear());

    expect(result.current.isSelected).toBe(false);
    expect(result.current.text).toBe('');
  });

  it('handles undefined containerRef', () => {
    const { result } = renderHook(() => useTextSelection(undefined));
    expect(result.current.isSelected).toBe(false);
  });
});
