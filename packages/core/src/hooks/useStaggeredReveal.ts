import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseStaggeredRevealReturn {
  /** Number of items currently visible */
  visibleCount: number;
  /** Whether all items have been revealed */
  isComplete: boolean;
  /** Reset to 0 visible */
  reset: () => void;
  /** Show all items immediately */
  showAll: () => void;
  /** Check if a specific index is visible */
  isVisible: (index: number) => boolean;
}

export function useStaggeredReveal(
  totalItems: number,
  delayMs = 80,
  autoStart = true,
): UseStaggeredRevealReturn {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisibleCount(0);
    setIsComplete(false);
  }, []);

  const showAll = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisibleCount(totalItems);
    setIsComplete(true);
  }, [totalItems]);

  const isVisible = useCallback(
    (index: number) => index < visibleCount,
    [visibleCount],
  );

  useEffect(() => {
    if (!autoStart || totalItems <= 0) {
      if (totalItems <= 0) setIsComplete(true);
      return;
    }

    setVisibleCount(0);
    setIsComplete(false);
    let current = 0;

    function revealNext() {
      if (current >= totalItems) {
        setIsComplete(true);
        return;
      }
      current += 1;
      setVisibleCount(current);
      timeoutRef.current = setTimeout(revealNext, delayMs);
    }

    timeoutRef.current = setTimeout(revealNext, delayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [totalItems, delayMs, autoStart]);

  return { visibleCount, isComplete, reset, showAll, isVisible };
}
