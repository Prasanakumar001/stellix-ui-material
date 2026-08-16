import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer, formatElapsed } from '../hooks/useTimer';

describe('formatElapsed', () => {
  it('formats 0ms as 0s', () => {
    expect(formatElapsed(0)).toBe('0s');
  });

  it('formats seconds correctly', () => {
    expect(formatElapsed(5000)).toBe('5s');
    expect(formatElapsed(59000)).toBe('59s');
  });

  it('formats minutes and seconds', () => {
    expect(formatElapsed(60000)).toBe('1m 0s');
    expect(formatElapsed(90000)).toBe('1m 30s');
    expect(formatElapsed(125000)).toBe('2m 5s');
  });

  it('handles negative values gracefully', () => {
    expect(formatElapsed(-1000)).toBe('0s');
  });
});

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts automatically when autoStart is true', () => {
    const { result } = renderHook(() => useTimer(true));
    expect(result.current.running).toBe(true);
    expect(result.current.elapsed).toBe(0);
  });

  it('does not start when autoStart is false', () => {
    const { result } = renderHook(() => useTimer(false));
    expect(result.current.running).toBe(false);
  });

  it('increments elapsed time', () => {
    const { result } = renderHook(() => useTimer(true));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.elapsed).toBeGreaterThanOrEqual(900);
  });

  it('stops and resumes', () => {
    const { result } = renderHook(() => useTimer(true));

    act(() => {
      vi.advanceTimersByTime(500);
    });

    act(() => {
      result.current.stop();
    });

    expect(result.current.running).toBe(false);
    const elapsedWhenStopped = result.current.elapsed;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should not have increased while stopped
    expect(result.current.elapsed).toBe(elapsedWhenStopped);

    act(() => {
      result.current.start();
    });

    expect(result.current.running).toBe(true);
  });

  it('resets elapsed to 0', () => {
    const { result } = renderHook(() => useTimer(true));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.elapsed).toBeGreaterThan(0);

    act(() => {
      result.current.reset();
    });

    expect(result.current.elapsed).toBe(0);
  });

  it('returns formatted string', () => {
    const { result } = renderHook(() => useTimer(false));
    expect(result.current.formatted).toBe('0s');
  });
});
