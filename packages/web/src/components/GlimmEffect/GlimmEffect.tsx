'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

interface GlimmEffectProps {
  active: boolean;
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function GlimmEffect({
  active,
  children,
  color = 'rgba(99,102,241,0.45)',
  className,
}: GlimmEffectProps) {
  return (
    <div
      data-testid="glimm-effect"
      className={cn('relative overflow-hidden inline-block', className)}
    >
      {children}
      {active && (
        <span
          data-testid="glimm-effect-overlay"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(120deg, transparent 0%, ${color} 50%, transparent 100%)`,
            backgroundSize: '300% 100%',
            animation: 'glimm-sweep 1.5s linear forwards',
          }}
        />
      )}
      <style>{`
        @keyframes glimm-sweep {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
