import { useState, useEffect, useCallback, useMemo } from 'react';
import { breakpoints, type Breakpoint } from '@stellix/ui-tokens';

export interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isWeb: boolean;
  isBigScreen: boolean;
  isAtLeast: (bp: Breakpoint) => boolean;
  isAtMost: (bp: Breakpoint) => boolean;
  width: number;
}

const breakpointOrder: Breakpoint[] = ['mobile', 'tablet', 'web', 'bigScreen'];

function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.bigScreen.min) return 'bigScreen';
  if (width >= breakpoints.web.min) return 'web';
  if (width >= breakpoints.tablet.min) return 'tablet';
  return 'mobile';
}

export function useBreakpoint(): UseBreakpointReturn {
  const isSSR = typeof window === 'undefined';

  const [width, setWidth] = useState(() => (isSSR ? 1024 : window.innerWidth));
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint(isSSR ? 1024 : window.innerWidth));

  useEffect(() => {
    if (isSSR) return;

    let rafId: number | null = null;

    function handleResize() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth;
        setWidth(w);
        setBreakpoint(getBreakpoint(w));
      });
    }

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isSSR]);

  const bpIndex = breakpointOrder.indexOf(breakpoint);

  const isAtLeast = useCallback(
    (bp: Breakpoint) => bpIndex >= breakpointOrder.indexOf(bp),
    [bpIndex],
  );

  const isAtMost = useCallback(
    (bp: Breakpoint) => bpIndex <= breakpointOrder.indexOf(bp),
    [bpIndex],
  );

  return useMemo(
    () => ({
      breakpoint,
      isMobile: breakpoint === 'mobile',
      isTablet: breakpoint === 'tablet',
      isWeb: breakpoint === 'web',
      isBigScreen: breakpoint === 'bigScreen',
      isAtLeast,
      isAtMost,
      width,
    }),
    [breakpoint, isAtLeast, isAtMost, width],
  );
}
