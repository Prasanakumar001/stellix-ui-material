'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn, type SearchProps } from '@stellix/ui-core';
import { MagnifyingGlassIcon, RecentIcon } from '../Icons';
import {
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function Search({
  results = [],
  placeholder = 'Search...',
  onSearch,
  onSelect,
  recentSearches = [],
}: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) { inputRef.current?.focus(); setHighlightIndex(0); }
    else { setQuery(''); }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[highlightIndex]) {
      onSelect?.(results[highlightIndex]);
      setIsOpen(false);
    }
  };

  // Grouped results by category
  const grouped = results.reduce((acc, r) => {
    const cat = r.category || 'Results';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {} as Record<string, typeof results>);

  let flatIndex = -1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-28" data-testid="search-modal" role="dialog" aria-label="Search" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} data-testid="search-backdrop" />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 w-full animate-pop-in rounded-xl border border-line bg-surface shadow-modal',
          'mx-4 sm:mx-auto sm:max-w-lg',
        )}
        data-testid="search-panel"
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-line px-4">
          <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); setHighlightIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-4 text-sm text-ink placeholder:text-ink-3 focus:outline-none sm:text-base"
            data-testid="search-input"
          />
          {query && (
            <button onClick={() => { setQuery(''); onSearch?.(''); }} className="rounded-md p-1 text-ink-3 hover:text-ink transition-colors">
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden rounded border border-line bg-surface-field px-1.5 py-0.5 text-[10px] font-medium text-ink-3 sm:inline" data-testid="esc-hint">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2" data-testid="search-results" role="listbox" aria-label="Search results">
          {results.length > 0 ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3" data-testid="result-category">
                  {category}
                </p>
                {items.map((result) => {
                  flatIndex++;
                  const idx = flatIndex;
                  return (
                    <button
                      key={result.id}
                      onClick={() => { onSelect?.(result); setIsOpen(false); }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        idx === highlightIndex ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-surface-field',
                      )}
                      data-testid="search-result-item"
                      data-highlighted={idx === highlightIndex}
                    >
                      <DocumentTextIcon className="h-4 w-4 shrink-0 text-ink-3" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-ink-3 truncate">{result.description}</div>
                        )}
                      </div>
                      {result.category && (
                        <span className="shrink-0 rounded bg-surface-field px-1.5 py-0.5 text-[10px] text-ink-3">{result.category}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          ) : query ? (
            <div className="flex flex-col items-center gap-2 py-8" data-testid="empty-state">
              <MagnifyingGlassIcon className="h-8 w-8 text-ink-3" />
              <p className="text-sm text-ink-3">No results for &quot;{query}&quot;</p>
            </div>
          ) : recentSearches.length > 0 ? (
            <div data-testid="recent-searches">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">Recent</p>
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(term); onSearch?.(term); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-surface-field transition-colors"
                  data-testid="recent-item"
                >
                  <RecentIcon className="h-4 w-4 text-ink-3" />
                  {term}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-8">
              <MagnifyingGlassIcon className="h-8 w-8 text-ink-3" />
              <p className="text-sm text-ink-3">Start typing to search...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[10px] text-ink-3">
          <div className="flex gap-3">
            <span><kbd className="rounded border border-line px-1">↑↓</kbd> navigate</span>
            <span><kbd className="rounded border border-line px-1">↵</kbd> select</span>
          </div>
          <span><kbd className="rounded border border-line px-1">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
