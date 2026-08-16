import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from '../hooks/useBreakpoint';

describe('useBreakpoint', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('detects mobile breakpoint', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(375);
    const { result } = renderHook(() => useBreakpoint());

    // Trigger the effect
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.breakpoint).toBe('mobile');
  });

  it('detects tablet breakpoint', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(768);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isTablet).toBe(true);
    expect(result.current.breakpoint).toBe('tablet');
  });

  it('detects web breakpoint', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isWeb).toBe(true);
    expect(result.current.breakpoint).toBe('web');
  });

  it('detects bigScreen breakpoint', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1920);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isBigScreen).toBe(true);
    expect(result.current.breakpoint).toBe('bigScreen');
  });

  it('isAtLeast works correctly', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isAtLeast('mobile')).toBe(true);
    expect(result.current.isAtLeast('tablet')).toBe(true);
    expect(result.current.isAtLeast('web')).toBe(true);
    expect(result.current.isAtLeast('bigScreen')).toBe(false);
  });

  it('isAtMost works correctly', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(768);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isAtMost('mobile')).toBe(false);
    expect(result.current.isAtMost('tablet')).toBe(true);
    expect(result.current.isAtMost('web')).toBe(true);
    expect(result.current.isAtMost('bigScreen')).toBe(true);
  });

  it('returns width value', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1024);
  });
});
