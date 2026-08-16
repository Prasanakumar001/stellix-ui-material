'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@stellix/ui-core';

interface MorphTransitionProps {
  transitionKey: string;
  children: React.ReactNode;
  className?: string;
}

export function MorphTransition({
  transitionKey,
  children,
  className,
}: MorphTransitionProps) {
  const [current, setCurrent] = useState({ key: transitionKey, node: children, phase: 'in' as 'in' | 'out' });
  const prevKey = useRef(transitionKey);

  useEffect(() => {
    if (transitionKey === prevKey.current) return;
    prevKey.current = transitionKey;
    setCurrent((c) => ({ ...c, phase: 'out' }));
    const timer = setTimeout(() => {
      setCurrent({ key: transitionKey, node: children, phase: 'in' });
    }, 300);
    return () => clearTimeout(timer);
  }, [transitionKey, children]);

  const style: React.CSSProperties =
    current.phase === 'in'
      ? { opacity: 1, transform: 'scale(1)', transition: 'opacity 300ms ease, transform 300ms ease' }
      : { opacity: 0, transform: 'scale(0.95)', transition: 'opacity 300ms ease, transform 300ms ease' };

  return (
    <div
      data-testid="morph-transition"
      className={cn('', className)}
      style={style}
    >
      {current.node}
    </div>
  );
}
