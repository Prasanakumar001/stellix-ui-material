'use client';

import React, { useState } from 'react';
import { useStreamingText, cn, type StreamingTextProps } from '@stellix/ui-core';
import {
  ClipboardIcon,
  CheckIcon,
} from '../Icons';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

/* ── Action Toolbar ── */
function ActionToolbar({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 animate-fade-in" data-testid="action-toolbar">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-3 hover:bg-surface-field hover:text-ink transition-colors"
        title="Copy"
      >
        {copied ? <CheckIcon className="h-3.5 w-3.5 text-green" /> : <ClipboardIcon className="h-3.5 w-3.5" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <button
        onClick={() => setLiked(liked === 'up' ? null : 'up')}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          liked === 'up' ? 'bg-green/10 text-green' : 'text-ink-3 hover:bg-surface-field hover:text-ink',
        )}
        title="Helpful"
      >
        <HandThumbUpIcon className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setLiked(liked === 'down' ? null : 'down')}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          liked === 'down' ? 'bg-red/10 text-red' : 'text-ink-3 hover:bg-surface-field hover:text-ink',
        )}
        title="Not helpful"
      >
        <HandThumbDownIcon className="h-3.5 w-3.5" />
      </button>
      <button
        className="rounded-md p-1.5 text-ink-3 hover:bg-surface-field hover:text-ink transition-colors"
        title="Share"
      >
        <ShareIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ── Citation Chip ── */
function CitationChip({ id, label, url }: { id: string; label: string; url?: string }) {
  const Tag = url ? 'a' : 'span';
  return (
    <Tag
      href={url}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 animate-fade-up',
        'bg-surface-field text-xs font-medium',
        'border border-line transition-colors',
        url ? 'text-accent hover:bg-accent/10 hover:border-accent/30 cursor-pointer' : 'text-ink-2',
      )}
      data-testid="citation-chip"
    >
      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
      <span className="text-ink-3">[{id}]</span>
      {label}
    </Tag>
  );
}

/* ── Follow-up Suggestion ── */
function FollowUpButton({ text, index }: { text: string; index: number }) {
  return (
    <button
      className={cn(
        'group flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-left text-sm text-ink',
        'hover:bg-surface-field hover:border-accent/40 hover:shadow-btn transition-all',
        'animate-fade-up',
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      data-testid="follow-up"
    >
      <ChatBubbleLeftIcon className="h-4 w-4 shrink-0 text-ink-3 group-hover:text-accent transition-colors" />
      {text}
    </button>
  );
}

/* ── Main StreamingText ── */
export function StreamingText({
  text,
  citations = [],
  followUps = [],
  speed = 30,
  onComplete,
}: StreamingTextProps) {
  const { displayed, isComplete, progress } = useStreamingText(text, speed);

  React.useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete, onComplete]);

  return (
    <div className="space-y-4" data-testid="streaming-text">
      {/* Streaming text body */}
      <div className="text-sm leading-relaxed text-ink sm:text-base break-words overflow-hidden">
        {displayed.split(' ').filter(Boolean).map((word, i) => (
          <span
            key={i}
            className="inline mr-[0.3em] animate-stream-in"
            style={{ animationDelay: `${i * speed}ms` }}
          >
            {word}
          </span>
        ))}
        {!isComplete && (
          <span className="inline-block h-4 w-0.5 animate-pulse bg-accent align-middle ml-0.5" data-testid="streaming-cursor" />
        )}
      </div>

      {/* Progress bar while streaming */}
      {!isComplete && (
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-surface-field" data-testid="stream-progress">
          <div
            className="h-full rounded-full bg-accent/40 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Citations */}
      {citations.length > 0 && isComplete && (
        <div className="flex flex-wrap gap-2" data-testid="citations">
          {citations.map((citation) => (
            <CitationChip key={citation.id} id={citation.id} label={citation.label} url={citation.url} />
          ))}
        </div>
      )}

      {/* Action toolbar */}
      {isComplete && <ActionToolbar text={text} />}

      {/* Follow-up suggestions */}
      {followUps.length > 0 && isComplete && (
        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap" data-testid="follow-ups">
          {followUps.map((followUp, i) => (
            <FollowUpButton key={i} text={followUp} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
