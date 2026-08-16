'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@stellix/ui-core';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideRevealProps {
  direction?: Direction;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const OFFSETS: Record<Direction, string> = {
  up:    'translateY(24px)',
  down:  'translateY(-24px)',
  left:  'translateX(24px)',
  right: 'translateX(-24px)',
};

export function SlideReveal({
  direction = 'up',
  delay = 0,
  children,
  className,
}: SlideRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate(0,0)' : OFFSETS[direction],
    transition: 'opacity 500ms ease-out, transform 500ms ease-out',
  };

  return (
    <div
      data-testid="slide-reveal"
      className={cn('', className)}
      style={style}
    >
      {children}
    </div>
  );
}
