'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ChatBubbleLeftRightIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface Conversation {
  id: string;
  title: string;
  preview: string;
  date: string;
  model: string;
  messageCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function ConversationList({ conversations, activeId, onSelect, className }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div
        data-testid="conversation-list-empty"
        className={cn('flex flex-col items-center justify-center gap-2 py-10 text-center', className)}
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8 text-ink-3" />
        <p className="text-sm text-ink-3">No conversations yet</p>
      </div>
    );
  }

  return (
    <ul
      data-testid="conversation-list"
      className={cn('divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface', className)}
      role="listbox"
      aria-label="Conversations"
    >
      {conversations.map((conv) => {
        const isActive = conv.id === activeId;
        return (
          <li key={conv.id} role="option" aria-selected={isActive}>
            <button
              onClick={() => onSelect(conv.id)}
              data-testid="conversation-item"
              data-conversation-id={conv.id}
              data-active={isActive}
              className={cn(
                'flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors',
                isActive
                  ? 'bg-accent/5 border-l-2 border-accent'
                  : 'hover:bg-surface-field border-l-2 border-transparent',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'truncate text-sm font-semibold',
                    isActive ? 'text-accent' : 'text-ink',
                  )}
                  data-testid="conversation-title"
                >
                  {conv.title}
                </span>
                <span className="shrink-0 text-xs text-ink-3" data-testid="conversation-date">
                  {conv.date}
                </span>
              </div>

              <p
                className="truncate text-xs text-ink-3 leading-snug"
                data-testid="conversation-preview"
              >
                {conv.preview}
              </p>

              <div className="flex items-center gap-3 mt-0.5">
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-surface-field px-2 py-0.5 text-xs text-ink-2"
                  data-testid="conversation-model"
                >
                  <CpuChipIcon className="h-3 w-3" />
                  {conv.model}
                </span>
                <span className="text-xs text-ink-3" data-testid="conversation-message-count">
                  {conv.messageCount} msgs
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
