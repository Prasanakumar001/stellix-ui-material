'use client';

import React from 'react';

export function PulseLoader() {
  return (
    <div className="relative h-12 w-12 sm:h-14 sm:w-14" role="img" aria-label="Loading">
      <div className="absolute inset-0 rounded-full border-2 border-accent/30" />
      <div className="absolute inset-0 rounded-full border-2 border-accent/60" style={{ animation: 'pulse-ring 1.5s ease-out infinite' }} />
      <div className="absolute inset-0 rounded-full border-2 border-accent/30" style={{ animation: 'pulse-ring 1.5s ease-out infinite 0.5s' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
      </div>
    </div>
  );
}
