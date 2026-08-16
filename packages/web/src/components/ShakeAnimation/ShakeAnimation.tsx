'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

interface ShakeAnimationProps {
  shake: boolean;
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export function ShakeAnimation({
  shake,
  children,
  intensity = 6,
  className,
}: ShakeAnimationProps) {
  const px = `${intensity}px`;

  return (
    <div
      data-testid="shake-animation"
      className={cn('', className)}
      style={
        shake
          ? { animation: 'shake-x 400ms ease-out' }
          : undefined
      }
    >
      {children}
      <style>{`
        @keyframes shake-x {
          0%        { transform: translateX(0); }
          15%       { transform: translateX(-${px}); }
          30%       { transform: translateX(${px}); }
          45%       { transform: translateX(-${px}); }
          60%       { transform: translateX(${px}); }
          75%       { transform: translateX(-${px}); }
          90%       { transform: translateX(${px}); }
          100%      { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
