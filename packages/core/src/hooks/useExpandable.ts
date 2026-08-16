import { useState, useCallback, useMemo } from 'react';

export interface UseExpandableReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export function useExpandable(defaultOpen = false): UseExpandableReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(() => ({ isOpen, toggle, open, close }), [isOpen, toggle, open, close]);
}
