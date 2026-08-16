'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn, type PromptBarProps } from '@stellix/ui-core';
import { DictationIcon, DocumentIcon, CheckIcon } from '../Icons';
import {
  AtSymbolIcon,
  CommandLineIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';

/* ── Popover menu wrapper ── */
function Popover({
  open,
  onClose,
  children,
  anchor = 'left',
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchor?: 'left' | 'right';
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className={cn(
          'absolute bottom-full mb-2 z-50 w-full rounded-xl border border-line bg-surface p-2 shadow-overlay animate-pop-in',
          'sm:w-72',
          anchor === 'right' && 'right-0 left-auto sm:w-56',
        )}
        role="menu"
        data-testid="popover-menu"
      >
        {children}
      </div>
    </>
  );
}

/* ── Character counter ── */
function CharCount({ count, max = 4000 }: { count: number; max?: number }) {
  if (count === 0) return null;
  const isNearLimit = count > max * 0.9;
  return (
    <span className={cn('text-[10px] tabular-nums', isNearLimit ? 'text-red' : 'text-ink-3')} data-testid="char-count">
      {count}/{max}
    </span>
  );
}

/* ── Main PromptBar ── */
export function PromptBar({
  placeholder = 'Ask anything...',
  sources = [],
  commands = [],
  models = [],
  onSubmit,
  enableDictation = false,
}: PromptBarProps) {
  const [value, setValue] = useState('');
  const [showSources, setShowSources] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]?.name || '');
  const [sourceSearch, setSourceSearch] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      onSubmit?.(value.trim());
      setValue('');
    }
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const filteredSources = sources.filter((s) =>
    s.name.toLowerCase().includes(sourceSearch.toLowerCase()),
  );

  const closeAll = () => {
    setShowSources(false);
    setShowCommands(false);
    setShowModels(false);
    setSourceSearch('');
  };

  return (
    <div className="relative" data-testid="prompt-bar">
      <div
        className={cn(
          'flex flex-col rounded-xl border border-line bg-surface shadow-card',
          'focus-within:border-accent focus-within:shadow-raised',
          'transition-all duration-200',
        )}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className={cn(
            'w-full resize-none bg-transparent px-4 pt-3 pb-2',
            'text-sm text-ink placeholder:text-ink-3',
            'focus:outline-none',
            'sm:text-base',
          )}
          style={{ minHeight: '44px', maxHeight: '160px' }}
          data-testid="prompt-textarea"
          aria-label="Message composer"
        />

        {/* Toolbar */}
        <div className="flex items-center gap-1 border-t border-line px-2 py-1.5 sm:gap-1.5 sm:px-3">
          {/* @ Sources */}
          <button
            onClick={() => { closeAll(); setShowSources(true); }}
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors',
              showSources ? 'bg-accent/10 text-accent' : 'text-ink-3 hover:bg-surface-field hover:text-ink',
            )}
            title="Add source (@)"
            data-testid="sources-btn"
          >
            <AtSymbolIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sources</span>
          </button>

          {/* / Commands */}
          <button
            onClick={() => { closeAll(); setShowCommands(true); }}
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors',
              showCommands ? 'bg-accent/10 text-accent' : 'text-ink-3 hover:bg-surface-field hover:text-ink',
            )}
            title="Commands (/)"
            data-testid="commands-btn"
          >
            <CommandLineIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Commands</span>
          </button>

          {/* Model picker */}
          {models.length > 0 && (
            <button
              onClick={() => { closeAll(); setShowModels(true); }}
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors',
                showModels ? 'bg-accent/10 text-accent' : 'text-ink-2 hover:bg-surface-field',
              )}
              data-testid="model-picker-btn"
            >
              <SparklesIcon className="h-3.5 w-3.5" />
              <span className="truncate max-w-20">{selectedModel || 'Model'}</span>
              <ChevronUpDownIcon className="h-3 w-3 text-ink-3" />
            </button>
          )}

          {/* Dictation */}
          {enableDictation && (
            <button
              className="rounded-md p-1.5 text-ink-3 hover:bg-surface-field hover:text-ink transition-colors"
              title="Voice input"
              data-testid="dictation-btn"
            >
              <DictationIcon className="h-4 w-4" />
            </button>
          )}

          <div className="flex-1" />

          {/* Char count */}
          <CharCount count={value.length} />

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white',
              'bg-accent hover:bg-accent/90 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
            data-testid="send-btn"
          >
            <PaperAirplaneIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* ── Sources popover ── */}
      <Popover open={showSources} onClose={() => { setShowSources(false); setSourceSearch(''); }}>
        <div className="mb-2 flex items-center gap-2 rounded-lg border border-line bg-surface-field px-3 py-1.5">
          <MagnifyingGlassIcon className="h-3.5 w-3.5 text-ink-3" />
          <input
            type="text"
            value={sourceSearch}
            onChange={(e) => setSourceSearch(e.target.value)}
            placeholder="Search sources..."
            className="flex-1 bg-transparent text-xs text-ink placeholder:text-ink-3 focus:outline-none"
            autoFocus
            data-testid="source-search"
          />
        </div>
        {filteredSources.length > 0 ? (
          filteredSources.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setValue((v) => v + '@' + s.name + ' ');
                setShowSources(false);
                setSourceSearch('');
                textareaRef.current?.focus();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-field transition-colors"
              data-testid="source-item"
            >
              <DocumentIcon className="h-4 w-4 text-ink-3" />
              <span className="flex-1 text-left">{s.name}</span>
              <span className="rounded bg-surface-field px-1.5 py-0.5 text-[10px] text-ink-3">{s.type}</span>
            </button>
          ))
        ) : (
          <p className="py-3 text-center text-xs text-ink-3">No sources found</p>
        )}
      </Popover>

      {/* ── Commands popover ── */}
      <Popover open={showCommands} onClose={() => setShowCommands(false)}>
        {commands.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setValue('/' + c.name + ' ');
              setShowCommands(false);
              textareaRef.current?.focus();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-field transition-colors"
            data-testid="command-item"
          >
            <HashtagIcon className="h-4 w-4 text-ink-3" />
            <div className="flex-1 text-left">
              <span className="font-medium">/{c.name}</span>
              {c.description && <span className="ml-2 text-xs text-ink-3">{c.description}</span>}
            </div>
            {c.shortcut && (
              <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-3">{c.shortcut}</kbd>
            )}
          </button>
        ))}
      </Popover>

      {/* ── Model picker popover ── */}
      <Popover open={showModels} onClose={() => setShowModels(false)} anchor="right">
        <p className="mb-1 px-2 text-[10px] font-medium uppercase text-ink-3">Select model</p>
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedModel(m.name);
              setShowModels(false);
            }}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
              selectedModel === m.name ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-surface-field',
            )}
            data-testid="model-item"
          >
            <SparklesIcon className="h-4 w-4" />
            <span className="flex-1 text-left font-medium">{m.name}</span>
            {selectedModel === m.name && <CheckIcon className="h-4 w-4" />}
          </button>
        ))}
      </Popover>
    </div>
  );
}
