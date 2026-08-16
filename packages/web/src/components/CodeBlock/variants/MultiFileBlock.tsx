'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ClipboardIcon, CheckIcon, DocumentIcon } from '@heroicons/react/24/outline';

export type MultiFileBlockProps = {
  files: Array<{ name: string; code: string; language: string }>;
};

function tokenizeLine(line: string): React.ReactNode[] {
  const patterns: [RegExp, string][] = [
    [/\/\/.*$/gm, '#6a9955'],
    [/(['"`])(?:(?!\1|\\).|\\.)*\1/g, '#ce9178'],
    [/\b(import|export|from|const|let|var|function|return|if|else|class|type|interface|async|await|default)\b/g, '#c586c0'],
    [/\b(true|false|null|undefined)\b/g, '#569cd6'],
    [/\b\d+\.?\d*\b/g, '#b5cea8'],
  ];
  const tokens: React.ReactNode[] = [];
  let rem = line; let k = 0;
  while (rem.length > 0) {
    let best: { i: number; len: number; text: string; color: string } | null = null;
    for (const [re, color] of patterns) { re.lastIndex = 0; const m = re.exec(rem); if (m && (!best || m.index < best.i)) best = { i: m.index, len: m[0].length, text: m[0], color }; }
    if (!best) { tokens.push(<span key={k++} style={{ color: '#d4d4d4' }}>{rem}</span>); break; }
    if (best.i > 0) tokens.push(<span key={k++} style={{ color: '#d4d4d4' }}>{rem.slice(0, best.i)}</span>);
    tokens.push(<span key={k++} style={{ color: best.color }}>{best.text}</span>);
    rem = rem.slice(best.i + best.len);
  }
  return tokens;
}

export function MultiFileBlock({ files }: MultiFileBlockProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = files[activeIdx] ?? files[0];

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(active.code); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-card" data-testid="multi-file-block">
      {/* Tab bar */}
      <div className="flex items-center overflow-x-auto border-b border-white/10 bg-[#252526]" data-testid="file-tabs" role="tablist">
        {files.map((f, i) => (
          <button
            key={f.name}
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => setActiveIdx(i)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-r border-white/10 px-4 py-2.5 text-xs font-medium transition-colors',
              i === activeIdx
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-accent'
                : 'bg-[#252526] text-white/50 hover:bg-[#2d2d2d] hover:text-white/70',
            )}
            data-testid="file-tab"
            data-active={i === activeIdx}
          >
            <DocumentIcon className="h-3 w-3" />
            {f.name}
          </button>
        ))}
        <div className="ml-auto flex items-center px-3">
          <button
            onClick={handleCopy}
            className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors', copied ? 'text-green' : 'text-white/40 hover:bg-white/10 hover:text-white/70')}
            data-testid="multi-file-copy"
          >
            {copied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Language badge */}
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-1 border-b border-white/5">
        <span className="text-[10px] text-white/30" data-testid="file-language">{active.language}</span>
        <span className="text-[10px] text-white/20">{active.code.split('\n').length} lines</span>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto bg-[#1e1e1e] p-4" data-testid="file-content" role="tabpanel">
        <pre className="text-sm font-mono leading-relaxed">
          {active.code.split('\n').map((line, i) => (
            <div key={i} className="flex" data-testid="code-line">
              <span className="mr-5 inline-block w-5 shrink-0 select-none text-right text-white/20 tabular-nums">{i + 1}</span>
              <code className="flex-1 whitespace-pre">{tokenizeLine(line)}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
