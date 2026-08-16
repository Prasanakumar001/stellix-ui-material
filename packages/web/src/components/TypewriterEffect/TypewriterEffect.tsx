'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@stellix/ui-core';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({
  text,
  speed = 40,
  onComplete,
  className,
}: TypewriterEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let index = 0;
    const tick = () => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index < text.length) {
        const t = setTimeout(tick, speed);
        return () => clearTimeout(t);
      } else {
        setDone(true);
        onComplete?.();
      }
    };
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [text, speed, onComplete]);

  return (
    <span
      data-testid="typewriter-effect"
      className={cn('inline', className)}
      aria-label={text}
    >
      {displayed}
      {!done && (
        <span
          data-testid="typewriter-cursor"
          aria-hidden="true"
          style={{ animation: 'typewriter-blink 1s step-start infinite' }}
        >
          |
        </span>
      )}
      <style>{`
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
