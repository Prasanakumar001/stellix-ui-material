'use client';

import React from 'react';

export function TypingLoader() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-surface-field px-4 py-3" role="img" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-ink-3"
          style={{
            animation: 'typing-dot 1.4s ease-in-out infinite',
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}
