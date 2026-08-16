'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronUpDownIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SelectOption { value: string; label: string; group?: string; }
interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}

export function Select({ label, options, value, onChange, placeholder = 'Select an option', searchable = false }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = searchable ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1" ref={ref} data-testid="select-root">
      {label && (
        <label className="text-sm font-medium text-ink" data-testid="select-label">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-line bg-surface-field px-3 py-2 text-sm transition-colors hover:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        data-testid="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={cn(selected ? 'text-ink' : 'text-ink-3')}>{selected ? selected.label : placeholder}</span>
        <ChevronUpDownIcon className="h-4 w-4 shrink-0 text-ink-3" />
      </button>
      {open && (
        <div className="z-20 mt-1 rounded-lg border border-line bg-surface shadow-modal" data-testid="select-dropdown" role="listbox">
          {searchable && (
            <div className="flex items-center gap-2 border-b border-line px-3 py-2" data-testid="select-search">
              <MagnifyingGlassIcon className="h-4 w-4 shrink-0 text-ink-3" />
              <input
                autoFocus value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter..."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none"
                data-testid="select-search-input"
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.map((opt) => (
              <button
                key={opt.value} type="button" role="option" aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false); setSearch(''); }}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                  opt.value === value ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-surface-field',
                )}
                data-testid="select-option"
              >
                {opt.label}
                {opt.value === value && <CheckIcon className="h-4 w-4" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-center text-sm text-ink-3" data-testid="select-empty">No options found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
