import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseStreamingTextReturn {
  /** The currently displayed portion of text */
  displayed: string;
  /** Whether the entire text has been revealed */
  isComplete: boolean;
  /** Reset to start streaming again */
  reset: () => void;
  /** Skip to end, show full text immediately */
  skip: () => void;
  /** Progress from 0 to 1 */
  progress: number;
}

export function useStreamingText(text: string, speed = 30): UseStreamingTextReturn {
  const words = useRef<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Recompute words when text changes
  useEffect(() => {
    words.current = text ? text.split(' ') : [];
  }, [text]);

  const reset = useCallback(() => {
    setWordIndex(0);
    setIsComplete(false);
  }, []);

  const skip = useCallback(() => {
    setWordIndex(words.current.length);
    setIsComplete(true);
  }, []);

  useEffect(() => {
    // Reset on new text
    setWordIndex(0);
    setIsComplete(false);

    if (!text) {
      setIsComplete(true);
      return;
    }

    const allWords = text.split(' ');
    let idx = 0;

    function streamNext() {
      if (idx >= allWords.length) {
        setIsComplete(true);
        return;
      }
      idx += 1;
      setWordIndex(idx);
      timeoutRef.current = setTimeout(streamNext, speed);
    }

    timeoutRef.current = setTimeout(streamNext, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, speed]);

  const totalWords = words.current.length;
  const displayed = words.current.slice(0, wordIndex).join(' ');
  const progress = totalWords > 0 ? wordIndex / totalWords : 1;

  return { displayed, isComplete, reset, skip, progress };
}
