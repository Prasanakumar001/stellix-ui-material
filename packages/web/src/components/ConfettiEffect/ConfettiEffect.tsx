'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@stellix/ui-core';

interface Particle {
  id: number;
  x: number;
  y: number;
  rot: number;
  color: string;
  shape: 'square' | 'circle';
}

const COLORS = ['#6366f1', '#22c55e', '#3b82f6', '#f97316', '#a855f7'];

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
  className?: string;
}

export function ConfettiEffect({ active, duration = 2000, className }: ConfettiEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const ps: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      rot: Math.random() * 720,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? 'square' : 'circle',
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), duration);
    return () => clearTimeout(t);
  }, [active, duration]);

  if (!particles.length) return null;

  return (
    <div
      data-testid="confetti-effect"
      className={cn('pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden', className)}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn('absolute block h-2.5 w-2.5', p.shape === 'circle' ? 'rounded-full' : 'rounded-sm')}
          style={{
            backgroundColor: p.color,
            animation: `confetti-fly ${duration}ms ease-out forwards`,
            ['--tx' as string]: `${p.x}px`,
            ['--ty' as string]: `${p.y}px`,
            ['--rot' as string]: `${p.rot}deg`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fly {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--tx),var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
