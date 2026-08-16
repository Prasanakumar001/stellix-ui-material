'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface JSONViewerProps {
  data: unknown;
  collapsed?: boolean;
  depth?: number;
}

function ValueNode({ value, depth }: { value: unknown; depth: number }) {
  const [open, setOpen] = useState(depth < 2);

  if (value === null) {
    return <span className="text-ink-3" data-testid="json-null">null</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-blue-500 dark:text-blue-400" data-testid="json-boolean">{String(value)}</span>;
  }
  if (typeof value === 'number') {
    return <span className="text-green-600 dark:text-green-400" data-testid="json-number">{value}</span>;
  }
  if (typeof value === 'string') {
    return <span className="text-orange-500 dark:text-orange-400" data-testid="json-string">&quot;{value}&quot;</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-ink-2">{'[]'}</span>;
    return (
      <span data-testid="json-array">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="inline-flex items-center gap-0.5 text-ink-2 hover:text-ink transition-colors"
          data-testid="json-toggle"
        >
          {open ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronRightIcon className="h-3 w-3" />}
          {'['}
          {!open && <span className="text-xs text-ink-3">{value.length}</span>}
          {!open && ']'}
        </button>
        {open && (
          <span className="block pl-4">
            {value.map((item, i) => (
              <span key={i} className="block">
                <ValueNode value={item} depth={depth + 1} />
                {i < value.length - 1 && <span className="text-ink-3">,</span>}
              </span>
            ))}
            <span className="text-ink-2">{']'}</span>
          </span>
        )}
      </span>
    );
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-ink-2">&#123;&#125;</span>;
    return (
      <span data-testid="json-object">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="inline-flex items-center gap-0.5 text-ink-2 hover:text-ink transition-colors"
          data-testid="json-toggle"
        >
          {open ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronRightIcon className="h-3 w-3" />}
          &#123;
          {!open && <span className="text-xs text-ink-3">{entries.length}</span>}
          {!open && '}'}
        </button>
        {open && (
          <span className="block pl-4">
            {entries.map(([k, v], i) => (
              <span key={k} className="block">
                <span className="text-accent font-medium" data-testid="json-key">&quot;{k}&quot;</span>
                <span className="text-ink-3">: </span>
                <ValueNode value={v} depth={depth + 1} />
                {i < entries.length - 1 && <span className="text-ink-3">,</span>}
              </span>
            ))}
            <span className="text-ink-2">&#125;</span>
          </span>
        )}
      </span>
    );
  }

  return <span className="text-ink-2">{String(value)}</span>;
}

export function JSONViewer({ data, collapsed = false, depth = 0 }: JSONViewerProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-surface p-4 font-mono text-sm leading-relaxed overflow-auto',
      )}
      data-testid="json-viewer"
    >
      <ValueNode value={data} depth={collapsed ? 999 : depth} />
    </div>
  );
}
