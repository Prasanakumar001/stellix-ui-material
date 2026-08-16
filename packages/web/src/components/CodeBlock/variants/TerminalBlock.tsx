'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ClipboardIcon, CheckIcon, CommandLineIcon } from '@heroicons/react/24/outline';

export type TerminalBlockProps = {
  commands: string[];
  title?: string;
};

export function TerminalBlock({ commands, title = 'Terminal' }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(commands.join('\n')); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-line shadow-card"
      data-testid="terminal-block"
      role="region"
      aria-label="Terminal"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between bg-[#0d1117] px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <CommandLineIcon className="ml-2 h-3.5 w-3.5 text-white/30" />
          <span className="text-xs font-medium text-white/40" data-testid="terminal-title">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors',
            copied ? 'text-[#28c840]' : 'text-white/40 hover:bg-white/10 hover:text-white/70',
          )}
          data-testid="terminal-copy"
        >
          {copied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Terminal body */}
      <div className="overflow-x-auto bg-[#0d1117] px-4 py-4" data-testid="terminal-body">
        <pre className="text-sm font-mono leading-7">
          {commands.map((line, i) => {
            const isCommand = line.startsWith('$ ');
            const isOutput = !isCommand;
            const isLast = i === commands.length - 1;
            return (
              <div key={i} className="flex items-start" data-testid="terminal-line" data-type={isCommand ? 'command' : 'output'}>
                {isCommand ? (
                  <>
                    <span className="mr-2 select-none text-[#28c840]" data-testid="terminal-prompt">$</span>
                    <span className="text-[#cdd9e5]">{line.slice(2)}</span>
                  </>
                ) : (
                  <span className={cn('text-[#8b949e]', isOutput && 'pl-0')}>{line}</span>
                )}
                {isLast && (
                  <span
                    className="ml-0.5 inline-block h-[1.1em] w-2 bg-[#28c840] opacity-100"
                    style={{ animation: 'pulse 1s step-start infinite' }}
                    data-testid="terminal-cursor"
                  />
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
