import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTimerReturn {
  /** Elapsed time in milliseconds */
  elapsed: number;
  /** Whether the timer is currently running */
  running: boolean;
  /** Start or resume the timer */
  start: () => void;
  /** Pause the timer */
  stop: () => void;
  /** Reset elapsed to 0 (does not stop the timer) */
  reset: () => void;
  /** Human-readable formatted string e.g. "1m 23s" */
  formatted: string;
}

export function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function useTimer(autoStart = true): UseTimerReturn {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(autoStart);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setElapsed(0);
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return { elapsed, running, start, stop, reset, formatted: formatElapsed(elapsed) };
}
