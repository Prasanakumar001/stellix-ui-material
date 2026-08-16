'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn, type ChatProps } from '@stellix/ui-core';
import { PaperAirplaneIcon, UserIcon, SparklesIcon, CheckIcon } from '@heroicons/react/24/outline';

const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function TypingIndicator() {
  return (
    <div className="mt-3 flex items-end gap-2" data-testid="typing-indicator">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10"><SparklesIcon className="h-3.5 w-3.5 text-accent" /></div>
      <div className="rounded-2xl rounded-bl-md bg-surface-field px-4 py-3 flex gap-1">
        {[0,1,2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink-3 animate-bounce" style={{ animationDelay: `${i*150}ms` }} data-testid="typing-dot" />)}
      </div>
    </div>
  );
}

function Bubble({ role, content, isGrouped, isLast }: { role: 'user'|'assistant'; content: string; isGrouped: boolean; isLast: boolean }) {
  const u = role === 'user';
  return (
    <div className={cn('flex gap-2 items-end', u ? 'justify-end' : 'justify-start', isGrouped ? 'mt-0.5' : 'mt-3')} data-testid="bubble-message" data-role={role}>
      {!u && <div className={cn('h-7 w-7 shrink-0 rounded-full bg-accent/10 flex items-center justify-center', isGrouped && 'invisible')} data-testid="assistant-avatar"><SparklesIcon className="h-3.5 w-3.5 text-accent" /></div>}
      <div className={cn('flex flex-col gap-0.5 max-w-[75%] sm:max-w-[60%]', u ? 'items-end' : 'items-start')}>
        <div className={cn('px-4 py-2.5 text-sm leading-relaxed', u ? 'bg-accent text-white rounded-2xl rounded-br-md' : 'bg-surface-field text-ink rounded-2xl rounded-bl-md')} data-testid="bubble-content">{content}</div>
        <div className="flex items-center gap-1 px-1">
          <span className="text-[10px] text-ink-3" data-testid="message-timestamp">{fmt()}</span>
          {u && isLast && (
            <span className="flex shrink-0 items-center" data-testid="read-receipt">
              <CheckIcon className="h-3 w-3 text-accent" /><CheckIcon className="-ml-1.5 h-3 w-3 text-accent" />
            </span>
          )}
        </div>
      </div>
      {u && <div className={cn('h-7 w-7 shrink-0 rounded-full bg-ink/10 flex items-center justify-center', isGrouped && 'invisible')} data-testid="user-avatar"><UserIcon className="h-3.5 w-3.5 text-ink-2" /></div>}
    </div>
  );
}

export function BubbleChat({ messages, onSend }: ChatProps) {
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend?.(input.trim()); setInput(''); setTyping(true);
    setTimeout(() => setTyping(false), 2000);
  };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="bubble-chat">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center"><SparklesIcon className="h-4 w-4 text-accent" /></div>
        <div><p className="text-sm font-semibold text-ink">Stellix AI</p><p className="text-xs text-green">Online</p></div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3" data-testid="bubble-messages" role="log" aria-live="polite">
        {messages.map((m, i) => <Bubble key={m.id} role={m.role} content={m.content} isGrouped={i > 0 && messages[i-1].role === m.role} isLast={i === messages.length-1} />)}
        {typing && <TypingIndicator />}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-line p-3" data-testid="bubble-composer">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." className="flex-1 rounded-full border border-line bg-surface-field px-4 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors" data-testid="bubble-input" />
          <button type="submit" disabled={!input.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-testid="bubble-send">
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
