import { useState, useEffect, useCallback, useRef } from 'react';

export interface TextSelectionState {
  text: string;
  rect: { top: number; left: number; width: number; height: number } | null;
  isSelected: boolean;
}

export interface UseTextSelectionReturn extends TextSelectionState {
  clear: () => void;
}

export function useTextSelection(
  containerRef?: React.RefObject<HTMLElement | null>,
): UseTextSelectionReturn {
  const [state, setState] = useState<TextSelectionState>({
    text: '',
    rect: null,
    isSelected: false,
  });

  const clear = useCallback(() => {
    setState({ text: '', rect: null, isSelected: false });
    if (typeof window !== 'undefined') {
      window.getSelection()?.removeAllRanges();
    }
  }, []);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    function handleSelectionChange() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.rangeCount) {
          setState({ text: '', rect: null, isSelected: false });
          return;
        }

        const container = containerRef?.current;
        if (container && !container.contains(selection.anchorNode)) {
          return;
        }

        const text = selection.toString().trim();
        if (!text) {
          setState({ text: '', rect: null, isSelected: false });
          return;
        }

        const range = selection.getRangeAt(0);
        const domRect = range.getBoundingClientRect();

        setState({
          text,
          rect: {
            top: domRect.top,
            left: domRect.left,
            width: domRect.width,
            height: domRect.height,
          },
          isSelected: true,
        });
      });
    }

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return { ...state, clear };
}
