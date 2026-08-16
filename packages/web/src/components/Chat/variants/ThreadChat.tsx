'use client';

import React, { useState } from 'react';
import { cn, type ChatProps } from '@stellix/ui-core';
import { PaperAirplaneIcon, UserIcon, SparklesIcon, ChatBubbleLeftRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type TMsg = { id: string; role: 'user'|'assistant'; content: string; replies?: TMsg[] };

function ReplyThread({ replies }: { replies: TMsg[] }) {
  return (
    <div className="mt-2 space-y-2 border-l-2 border-accent/20 pl-3" data-testid="reply-thread">
      {replies.map((r) => (
        <div key={r.id} className="flex gap-2" data-testid="reply-message">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-field">
            {r.role === 'user' ? <UserIcon className="h-3 w-3 text-ink-2" /> : <SparklesIcon className="h-3 w-3 text-accent" />}
          </div>
          <div>
            <span className="text-[10px] font-semibold text-ink-3">{r.role === 'user' ? 'You' : 'Stellix AI'}</span>
            <p className="text-sm text-ink" data-testid="reply-content">{r.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThreadRow({ msg }: { msg: TMsg }) {
  const [open, setOpen] = useState(false);
  const count = msg.replies?.length ?? 0;
  return (
    <div className="rounded-lg border border-line bg-surface-field/50 p-3" data-testid="thread-row">
      <div className="flex gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-field">
          {msg.role === 'user' ? <UserIcon className="h-3.5 w-3.5 text-ink-2" /> : <SparklesIcon className="h-3.5 w-3.5 text-accent" />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-ink">{msg.role === 'user' ? 'You' : 'Stellix AI'}</span>
          <p className="mt-0.5 text-sm text-ink leading-relaxed" data-testid="thread-content">{msg.content}</p>
          {count > 0 && (
            <button onClick={() => setOpen(!open)} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors" data-testid="thread-toggle">
              <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
              <span className="rounded-full bg-accent/10 px-1.5 py-0.5 tabular-nums">{count}</span>
              {count === 1 ? 'reply' : 'replies'}
              <ChevronDownIcon className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
            </button>
          )}
          {open && msg.replies && <ReplyThread replies={msg.replies} />}
        </div>
      </div>
    </div>
  );
}

export function ThreadChat({ messages, onSend }: ChatProps) {
  const [input, setInput] = useState('');
  const threaded: TMsg[] = messages.map((m, i) => ({
    id: m.id, role: m.role, content: m.content,
    replies: i % 3 === 2 ? [{ id: `${m.id}-r1`, role: 'assistant' as const, content: 'Thread reply here.' }] : [],
  }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!input.trim()) return; onSend?.(input.trim()); setInput('');
  };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="thread-chat">
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink"># general</p>
        <p className="text-xs text-ink-3">{threaded.length} messages</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4" data-testid="thread-messages" role="log" aria-live="polite">
        {threaded.map((m) => <ThreadRow key={m.id} msg={m} />)}
        {threaded.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-ink-3" data-testid="thread-empty">
            <ChatBubbleLeftRightIcon className="h-8 w-8" /><p className="text-sm">No messages yet</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-line p-3" data-testid="thread-composer">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send a message..." className="flex-1 rounded-lg border border-line bg-surface-field px-3 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors" data-testid="thread-input" />
          <button type="submit" disabled={!input.trim()} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-testid="thread-send">
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
