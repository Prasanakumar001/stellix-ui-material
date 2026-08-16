'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn, type ChatProps } from '@stellix/ui-core';
import {
  PaperAirplaneIcon,
  UserIcon,
  SparklesIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

/* ── Message bubble ── */
function MessageBubble({ role, content, reasoning }: { role: 'user' | 'assistant'; content: string; reasoning?: string }) {
  const [showReasoning, setShowReasoning] = useState(false);
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-2.5 animate-fade-up', isUser ? 'justify-end' : 'justify-start')} data-testid="chat-message" data-role={role}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10" data-testid="assistant-avatar">
          <SparklesIcon className="h-3.5 w-3.5 text-accent" />
        </div>
      )}

      <div className={cn('max-w-[85%] sm:max-w-[70%]')}>
        {/* Reasoning toggle */}
        {reasoning && !isUser && (
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="mb-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-ink-3 hover:bg-surface-field transition-colors"
            data-testid="reasoning-toggle"
          >
            <ChevronDownIcon className={cn('h-3 w-3 transition-transform', showReasoning && 'rotate-180')} />
            Reasoning
          </button>
        )}
        {showReasoning && reasoning && (
          <div className="mb-2 rounded-lg bg-surface-field p-2.5 text-xs text-ink-3 leading-relaxed" data-testid="reasoning-content">
            {reasoning}
          </div>
        )}

        {/* Message content */}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-accent text-white rounded-br-md'
              : 'bg-surface-field text-ink rounded-bl-md',
          )}
          data-testid="message-content"
        >
          {content}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/10" data-testid="user-avatar">
          <UserIcon className="h-3.5 w-3.5 text-ink-2" />
        </div>
      )}
    </div>
  );
}

/* ── Main Chat ── */
export function Chat({ messages, onSend, tabs = [], activeTab: controlledTab }: ChatProps) {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState(controlledTab || tabs[0] || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput('');
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card" data-testid="chat-panel" aria-label="Chat panel">
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex border-b border-line" data-testid="chat-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-colors',
                activeTab === tab ? 'text-accent' : 'text-ink-3 hover:text-ink',
              )}
              data-testid="chat-tab"
              data-active={activeTab === tab}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" data-testid="tab-indicator" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4" data-testid="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} reasoning={msg.reasoning} />
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-ink-3" data-testid="chat-empty">
            <SparklesIcon className="h-8 w-8" />
            <p className="text-sm">Start a conversation</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="border-t border-line p-3" data-testid="chat-composer">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={cn(
              'flex-1 rounded-lg border border-line bg-surface-field px-3 py-2.5',
              'text-sm text-ink placeholder:text-ink-3',
              'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
              'transition-colors',
            )}
            data-testid="chat-input"
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white',
              'hover:bg-accent/90 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
            data-testid="chat-send"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
