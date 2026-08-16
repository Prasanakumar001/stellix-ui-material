'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

export interface MarkdownViewProps {
  content: string;
  className?: string;
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const raw = match[0];
    if (raw.startsWith('`')) {
      parts.push(<code key={key++} className="rounded bg-surface-field px-1 py-0.5 font-mono text-[0.85em] text-accent">{raw.slice(1, -1)}</code>);
    } else if (raw.startsWith('**')) {
      parts.push(<strong key={key++} className="font-semibold text-ink">{raw.slice(2, -2)}</strong>);
    } else if (raw.startsWith('*')) {
      parts.push(<em key={key++} className="italic text-ink-2">{raw.slice(1, -1)}</em>);
    } else {
      const lm = raw.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (lm) {
        parts.push(<a key={key++} href={lm[2]} className="text-accent underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">{lm[1]}</a>);
      }
    }
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function parseLine(line: string, index: number): React.ReactNode {
  if (/^### /.test(line)) return <h3 key={index} className="mt-3 text-base font-semibold text-ink">{line.slice(4)}</h3>;
  if (/^## /.test(line)) return <h2 key={index} className="mt-4 text-lg font-semibold text-ink">{line.slice(3)}</h2>;
  if (/^# /.test(line)) return <h1 key={index} className="mt-5 text-xl font-bold text-ink">{line.slice(2)}</h1>;
  if (/^- /.test(line)) return <li key={index} className="ml-4 list-disc text-ink-2">{parseInline(line.slice(2))}</li>;
  if (line.trim() === '') return <div key={index} className="h-3" />;
  return <p key={index} className="text-sm text-ink-2 leading-relaxed">{parseInline(line)}</p>;
}

export function MarkdownView({ content, className }: MarkdownViewProps) {
  const blocks: React.ReactNode[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    if (lines[i].startsWith('```')) {
      const lang = lines[i].slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(
        <pre key={i} className="my-3 overflow-auto rounded-lg border border-line bg-surface-field p-3 font-mono text-xs text-ink-2" data-lang={lang || undefined}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else {
      blocks.push(parseLine(lines[i], i));
    }
    i++;
  }

  return (
    <div className={cn('flex flex-col gap-1', className)} data-testid="markdown-view">
      {blocks}
    </div>
  );
}
