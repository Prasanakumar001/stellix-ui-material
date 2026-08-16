import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStreamingText } from '../hooks/useStreamingText';

describe('useStreamingText', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts with empty displayed text', () => {
    const { result } = renderHook(() => useStreamingText('hello world', 50));
    expect(result.current.displayed).toBe('');
    expect(result.current.isComplete).toBe(false);
  });

  it('streams words one by one', () => {
    const { result } = renderHook(() => useStreamingText('hello world test', 50));

    act(() => vi.advanceTimersByTime(50));
    expect(result.current.displayed).toBe('hello');

    act(() => vi.advanceTimersByTime(50));
    expect(result.current.displayed).toBe('hello world');

    // After all words + one extra tick for isComplete
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.displayed).toBe('hello world test');
    expect(result.current.isComplete).toBe(true);
  });

  it('completes and progress reaches 1', () => {
    const { result } = renderHook(() => useStreamingText('a b c', 50));

    // Stream all words + completion tick
    act(() => vi.advanceTimersByTime(250));

    expect(result.current.progress).toBe(1);
    expect(result.current.isComplete).toBe(true);
  });

  it('skip() shows full text immediately', () => {
    const { result } = renderHook(() => useStreamingText('hello world test', 50));

    act(() => result.current.skip());

    expect(result.current.displayed).toBe('hello world test');
    expect(result.current.isComplete).toBe(true);
    expect(result.current.progress).toBe(1);
  });

  it('handles empty text', () => {
    const { result } = renderHook(() => useStreamingText('', 50));
    expect(result.current.isComplete).toBe(true);
    expect(result.current.displayed).toBe('');
  });

  it('handles single word', () => {
    const { result } = renderHook(() => useStreamingText('hello', 50));

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.displayed).toBe('hello');
    expect(result.current.isComplete).toBe(true);
  });

  it('resets when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useStreamingText(text, 50),
      { initialProps: { text: 'hello world' } },
    );

    act(() => vi.advanceTimersByTime(150));
    expect(result.current.displayed).toBe('hello world');

    rerender({ text: 'new text here' });
    expect(result.current.displayed).toBe('');
    expect(result.current.isComplete).toBe(false);
  });
});
