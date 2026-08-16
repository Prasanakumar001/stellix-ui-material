import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCodeStream } from '../hooks/useCodeStream';

const sampleCode = `const a = 1;
const b = 2;
console.log(a + b);`;

describe('useCodeStream', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts with 0 lines displayed', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 50));
    expect(result.current.currentLine).toBe(0);
    expect(result.current.displayedLines).toEqual([]);
    expect(result.current.isComplete).toBe(false);
  });

  it('streams lines one by one', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 50));

    act(() => vi.advanceTimersByTime(50));
    expect(result.current.currentLine).toBe(1);
    expect(result.current.displayedLines).toEqual(['const a = 1;']);

    act(() => vi.advanceTimersByTime(50));
    expect(result.current.currentLine).toBe(2);

    // Last line + completion tick
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.currentLine).toBe(3);
    expect(result.current.isComplete).toBe(true);
  });

  it('completes with all lines visible', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 50));

    // Advance enough for all lines + completion
    act(() => vi.advanceTimersByTime(250));

    expect(result.current.isComplete).toBe(true);
    expect(result.current.displayedLines).toHaveLength(3);
    expect(result.current.progress).toBe(1);
  });

  it('skip shows all lines immediately', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 50));

    act(() => result.current.skip());

    expect(result.current.isComplete).toBe(true);
    expect(result.current.displayedLines).toHaveLength(3);
    expect(result.current.progress).toBe(1);
  });

  it('reset sets back to 0', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 50));

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.currentLine).toBe(2);

    act(() => result.current.reset());
    expect(result.current.currentLine).toBe(0);
    expect(result.current.isComplete).toBe(false);
  });

  it('shows all lines immediately when lineDelayMs=0', () => {
    const { result } = renderHook(() => useCodeStream(sampleCode, 0));
    expect(result.current.isComplete).toBe(true);
    expect(result.current.displayedLines).toHaveLength(3);
  });

  it('handles empty code', () => {
    const { result } = renderHook(() => useCodeStream('', 50));
    expect(result.current.isComplete).toBe(true);
  });
});
