'use client';

import React, { useState } from 'react';
import { cn, type ChatProps } from '@stellix/ui-core';
import { PaperAirplaneIcon, UserIcon, SparklesIcon, WrenchScrewdriverIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

type TStatus = 'thinking'|'acting'|'done';
type AMsg = { id: string; role: 'user'|'assistant'|'tool'; content: string; toolName?: string; toolOutput?: string; status?: TStatus; step?: number; total?: number };

const statusCfg = {
  thinking: { label: 'Thinking', cls: 'bg-orange/10 text-orange border-orange/20', Icon: ArrowPathIcon },
  acting:   { label: 'Acting',   cls: 'bg-accent/10 text-accent border-accent/20',  Icon: WrenchScrewdriverIcon },
  done:     { label: 'Done',     cls: 'bg-green/10 text-green border-green/20',      Icon: CheckCircleIcon },
};

function ToolCard({ m }: { m: AMsg }) {
  const [open, setOpen] = useState(false);
  const cfg = statusCfg[m.status ?? 'done'];
  return (
    <div className="rounded-lg border border-line bg-surface-field p-3" data-testid="tool-card" data-tool={m.toolName}>
      <div className="flex items-center gap-2">
        <WrenchScrewdriverIcon className="h-4 w-4 text-ink-3" />
        <span className="flex-1 text-xs font-semibold text-ink">{m.toolName}</span>
        {m.step != null && <span className="text-[10px] tabular-nums text-ink-3" data-testid="step-indicator">{m.step}/{m.total}</span>}
        <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium', cfg.cls)} data-testid="status-badge">
          <cfg.Icon className="h-3 w-3" />{cfg.label}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-ink-2">{m.content}</p>
      {m.toolOutput && <button onClick={() => setOpen(!open)} className="mt-2 text-[10px] font-medium text-accent hover:underline" data-testid="tool-output-toggle">{open ? 'Hide output' : 'Show output'}</button>}
      {open && m.toolOutput && <pre className="mt-2 overflow-x-auto rounded-md bg-[#1e1e1e] p-2 text-[10px] text-[#d4d4d4] font-mono" data-testid="tool-output">{m.toolOutput}</pre>}
    </div>
  );
}

export function AgentChat({ messages, onSend }: ChatProps) {
  const [input, setInput] = useState('');
  const augmented: AMsg[] = messages.flatMap((m, i) => {
    const base: AMsg = { id: m.id, role: m.role, content: m.content };
    if (m.role === 'assistant' && i % 2 === 1) return [
      { id: `${m.id}-t1`, role: 'tool', content: 'Searching knowledge base...', toolName: 'search_kb', toolOutput: '{"results":[{"score":0.95}]}', status: 'done', step: 1, total: 2 },
      { id: `${m.id}-t2`, role: 'tool', content: 'Generating response...', toolName: 'generate_text', status: 'done', step: 2, total: 2 },
      base,
    ];
    return [base];
  });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim()) return; onSend?.(input.trim()); setInput(''); };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="agent-chat">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <SparklesIcon className="h-5 w-5 text-accent" />
        <p className="text-sm font-semibold text-ink">Agent Mode</p>
        <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">Active</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4" data-testid="agent-messages" role="log" aria-live="polite">
        {augmented.map((m) => m.role === 'tool' ? <ToolCard key={m.id} m={m} /> : (
          <div key={m.id} className={cn('flex gap-2', m.role === 'user' ? 'justify-end' : 'justify-start')} data-testid="agent-message" data-role={m.role}>
            {m.role === 'assistant' && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10"><SparklesIcon className="h-3.5 w-3.5 text-accent" /></div>}
            <div className={cn('max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[65%]', m.role === 'user' ? 'bg-accent text-white rounded-br-md' : 'bg-surface-field text-ink rounded-bl-md')} data-testid="agent-content">{m.content}</div>
            {m.role === 'user' && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/10"><UserIcon className="h-3.5 w-3.5 text-ink-2" /></div>}
          </div>
        ))}
        {augmented.length === 0 && <div className="flex flex-col items-center gap-2 py-8 text-ink-3" data-testid="agent-empty"><WrenchScrewdriverIcon className="h-8 w-8" /><p className="text-sm">Agent ready</p></div>}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-line p-3" data-testid="agent-composer">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the agent..." className="flex-1 rounded-lg border border-line bg-surface-field px-3 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors" data-testid="agent-input" />
          <button type="submit" disabled={!input.trim()} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-testid="agent-send"><PaperAirplaneIcon className="h-4 w-4" /></button>
        </div>
      </form>
    </div>
  );
}
