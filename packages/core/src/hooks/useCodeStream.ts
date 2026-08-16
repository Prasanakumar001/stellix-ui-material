import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCodeStreamReturn {
  displayedLines: string[];
  currentLine: number;
  totalLines: number;
  isComplete: boolean;
  reset: () => void;
  skip: () => void;
  progress: number;
}

export function useCodeStream(code: string, lineDelayMs = 60): UseCodeStreamReturn {
  const allLinesRef = useRef<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    allLinesRef.current = code ? code.split('\n') : [];
  }, [code]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLine(0);
    setIsComplete(false);
  }, []);

  const skip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLine(allLinesRef.current.length);
    setIsComplete(true);
  }, []);

  useEffect(() => {
    setCurrentLine(0);
    setIsComplete(false);

    if (!code || lineDelayMs <= 0) {
      setCurrentLine(allLinesRef.current.length);
      setIsComplete(true);
      return;
    }

    const lines = code.split('\n');
    let line = 0;

    function streamNextLine() {
      if (line >= lines.length) {
        setIsComplete(true);
        return;
      }
      line += 1;
      setCurrentLine(line);
      timeoutRef.current = setTimeout(streamNextLine, lineDelayMs);
    }

    timeoutRef.current = setTimeout(streamNextLine, lineDelayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [code, lineDelayMs]);

  const totalLines = allLinesRef.current.length;
  const displayedLines = allLinesRef.current.slice(0, currentLine);
  const progress = totalLines > 0 ? currentLine / totalLines : 1;

  return { displayedLines, currentLine, totalLines, isComplete, reset, skip, progress };
}
