'use client';

import React from 'react';

export function WaveLoader() {
  return (
    <div className="flex items-end gap-1 h-8" role="img" aria-label="Loading">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-accent sm:w-2"
          style={{
            animation: 'wave-bar 1.2s ease-in-out infinite',
            animationDelay: `${i * 100}ms`,
            height: '100%',
          }}
        />
      ))}
    </div>
  );
}
