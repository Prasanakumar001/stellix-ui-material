'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@stellix/ui-core';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function RippleEffect({
  children,
  color = 'rgba(99,102,241,0.3)',
  className,
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  return (
    <div
      data-testid="ripple-effect"
      ref={containerRef}
      onClick={handleClick}
      className={cn('relative overflow-hidden', className)}
    >
      {children}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            left: rp.x,
            top: rp.y,
            width: rp.size,
            height: rp.size,
            backgroundColor: color,
            animation: 'ripple-expand 600ms ease-out forwards',
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          0%   { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
