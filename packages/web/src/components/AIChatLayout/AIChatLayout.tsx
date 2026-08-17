'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { PlusIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { ConversationList } from '../ConversationList';
import { Chat } from '../Chat';
import { PromptBar } from '../PromptBar';

const DEFAULT_CONVERSATIONS = [
  {
    id: 'c1',
    title: 'Project Chimera planning',
    preview: 'Lets outline the MoE transformer architecture for Phase 21.',
    date: 'Today',
    model: 'Stellix-3',
    messageCount: 14,
  },
  {
    id: 'c2',
    title: 'Code review assistant',
    preview: 'Can you review the attention layer implementation?',
    date: 'Yesterday',
    model: 'Stellix-2',
    messageCount: 7,
  },
  {
    id: 'c3',
    title: 'Data pipeline debugging',
    preview: 'The tokenizer is producing off-by-one errors on batch edges.',
    date: 'Aug 13',
    model: 'Stellix-3',
    messageCount: 22,
  },
];

const DEFAULT_MESSAGES = [
  {
    id: 'm1',
    role: 'user' as const,
    content: 'Can you outline the key design decisions for a mixture-of-experts transformer?',
    timestamp: 1723900000000 - 90000,
  },
  {
    id: 'm2',
    role: 'assistant' as const,
    content:
      'Sure. The three core decisions are: expert routing strategy (top-k vs. soft), load balancing via auxiliary loss, and expert capacity buffers to prevent token dropping. For Phase 21 I would recommend top-2 routing with a z-loss regulariser.',
    reasoning:
      'The user is asking about MoE architecture. I should cover routing, load balancing, and capacity since those are the main levers. Top-2 routing is well validated at this scale.',
    timestamp: 1723900000000 - 60000,
  },
  {
    id: 'm3',
    role: 'user' as const,
    content: 'What auxiliary loss function works best at the 70B scale?',
    timestamp: 1723900000000 - 30000,
  },
  {
    id: 'm4',
    role: 'assistant' as const,
    content:
      'At 70B, the Switch Transformer auxiliary loss (alpha * sum_i(f_i * p_i)) with alpha around 1e-2 keeps experts balanced without hurting perplexity. Combine it with z-loss (1e-3) to stabilise router logits.',
    reasoning:
      'Switch Transformer auxiliary loss is the standard choice. The user needs concrete hyperparameter guidance for the 70B scale, so I will give specific alpha values.',
    timestamp: 1723900000000,
  },
];

interface AIChatLayoutProps {
  conversations?: typeof DEFAULT_CONVERSATIONS;
  messages?: typeof DEFAULT_MESSAGES;
  onSend?: (text: string) => void;
}

export function AIChatLayout({
  conversations = DEFAULT_CONVERSATIONS,
  messages = DEFAULT_MESSAGES,
  onSend,
}: AIChatLayoutProps) {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? '');

  return (
    <div
      className={cn('flex h-screen w-full overflow-hidden bg-surface-base')}
      data-testid="ai-chat-layout"
    >
      {/* Sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:w-[280px] md:shrink-0 flex-col border-r border-line bg-surface',
        )}
        data-testid="chat-sidebar"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-accent" />
            Conversations
          </div>
          <button
            className="rounded-md p-1 text-ink-3 hover:bg-surface-field hover:text-ink transition-colors"
            data-testid="new-conversation-btn"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <ConversationList
            conversations={conversations}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>
      </aside>

      {/* Main */}
      <main
        className="flex flex-1 flex-col overflow-hidden"
        data-testid="chat-main"
      >
        <div className="flex-1 overflow-hidden p-4">
          <Chat messages={messages} onSend={onSend} />
        </div>
        <div className="border-t border-line p-4" data-testid="chat-promptbar">
          <PromptBar onSubmit={onSend} />
        </div>
      </main>
    </div>
  );
}
