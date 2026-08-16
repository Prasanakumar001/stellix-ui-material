'use client';

import React, { useState } from 'react';
import { useCodeStream, cn, type CodeBlockProps } from '@stellix/ui-core';
import { ClipboardIcon, CheckIcon } from '../Icons';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

/* ── Simple token-based syntax coloring ── */
function tokenize(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const patterns: [RegExp, string][] = [
    [/\/\/.*$/gm, 'text-[#6a9955]'],
    [/(['"`])(?:(?!\1|\\).|\\.)*\1/g, 'text-[#ce9178]'],
    [/\b(import|export|from|const|let|var|function|return|if|else|for|while|class|type|interface|async|await|default|new|typeof|extends|implements)\b/g, 'text-[#c586c0]'],
    [/\b(true|false|null|undefined|NaN|Infinity)\b/g, 'text-[#569cd6]'],
    [/\b(\d+\.?\d*)\b/g, 'text-[#b5cea8]'],
    [/[{}()\[\]]/g, 'text-[#ffd700]'],
    [/[<>]/g, 'text-[#808080]'],
    [/=>/g, 'text-[#c586c0]'],
  ];

  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    let earliestMatch: { index: number; length: number; text: string; className: string } | null = null;

    for (const [pattern, className] of patterns) {
      pattern.lastIndex = 0;
      const match = pattern.exec(remaining);
      if (match && (!earliestMatch || match.index < earliestMatch.index)) {
        earliestMatch = { index: match.index, length: match[0].length, text: match[0], className };
      }
    }

    if (!earliestMatch) {
      tokens.push(<span key={key++} className="text-[#d4d4d4]">{remaining}</span>);
      break;
    }

    if (earliestMatch.index > 0) {
      tokens.push(<span key={key++} className="text-[#d4d4d4]">{remaining.slice(0, earliestMatch.index)}</span>);
    }
    tokens.push(<span key={key++} className={earliestMatch.className}>{earliestMatch.text}</span>);
    remaining = remaining.slice(earliestMatch.index + earliestMatch.length);
  }

  return tokens;
}

/* ── Main CodeBlock ── */
export function CodeBlock({
  code,
  language = 'typescript',
  streaming = false,
  showLineNumbers = true,
  onCopy,
}: CodeBlockProps) {
  const { displayedLines, isComplete, progress } = useCodeStream(code, streaming ? 60 : 0);
  const [copied, setCopied] = useState(false);

  const lines = streaming ? displayedLines : code.split('\n');
  const totalLines = code.split('\n').length;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch { /* noop */ }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-card" data-testid="code-block" role="region" aria-label="Code block">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1e1e1e] px-4 py-2">
        <div className="flex items-center gap-2">
          <CodeBracketIcon className="h-3.5 w-3.5 text-white/40" />
          <span className="text-xs font-medium text-white/50" data-testid="code-language">{language}</span>
          {streaming && !isComplete && (
            <span className="text-xs text-white/30 tabular-nums">{lines.length}/{totalLines} lines</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors',
            copied ? 'text-green' : 'text-white/50 hover:bg-white/10 hover:text-white/80',
          )}
          data-testid="copy-button"
        >
          {copied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Streaming progress bar */}
      {streaming && !isComplete && (
        <div className="h-0.5 w-full bg-[#2d2d2d]" data-testid="code-progress">
          <div
            className="h-full bg-accent/60 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Code area */}
      <div className="overflow-x-auto bg-[#1e1e1e] p-4" data-testid="code-area">
        <pre className="text-sm leading-relaxed font-mono">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn('flex', streaming && 'animate-fade-in')}
              style={streaming ? { animationDelay: `${i * 40}ms` } : undefined}
              data-testid="code-line"
            >
              {showLineNumbers && (
                <span className="mr-6 inline-block w-6 select-none text-right text-white/20 shrink-0" data-testid="line-number">
                  {i + 1}
                </span>
              )}
              <code className="flex-1 whitespace-pre">{tokenize(line)}</code>
            </div>
          ))}
          {streaming && !isComplete && (
            <div className="flex items-center mt-0.5">
              {showLineNumbers && <span className="mr-6 inline-block w-6" />}
              <span className="inline-block h-4 w-1.5 animate-pulse bg-accent" data-testid="code-cursor" />
            </div>
          )}
        </pre>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 bg-[#1e1e1e] px-4 py-1.5">
        <span className="text-[10px] text-white/30">{lines.length} lines</span>
        <span className="text-[10px] text-white/30">UTF-8</span>
      </div>
    </div>
  );
}
