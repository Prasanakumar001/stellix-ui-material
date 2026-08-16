'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { FolderIcon, FolderOpenIcon, DocumentIcon } from '@heroicons/react/24/outline';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export interface FileTreeProps {
  items: FileNode[];
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === 'folder';

  const handleClick = () => {
    if (isFolder) setOpen((prev) => !prev);
  };

  return (
    <li data-testid="file-tree-node" data-type={node.type}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm',
          'text-ink-2 hover:bg-surface-field hover:text-ink transition-colors',
          !isFolder && 'cursor-default',
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        data-testid="file-tree-row"
        aria-expanded={isFolder ? open : undefined}
      >
        {isFolder ? (
          open
            ? <FolderOpenIcon className="h-4 w-4 shrink-0 text-accent" />
            : <FolderIcon className="h-4 w-4 shrink-0 text-accent" />
        ) : (
          <DocumentIcon className="h-4 w-4 shrink-0 text-ink-3" />
        )}
        <span className="truncate" data-testid="file-tree-name">{node.name}</span>
      </button>

      {isFolder && open && node.children && node.children.length > 0 && (
        <ul data-testid="file-tree-children">
          {node.children.map((child, i) => (
            <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function FileTree({ items }: FileTreeProps) {
  return (
    <ul
      className="rounded-xl border border-line bg-surface p-2 font-mono"
      data-testid="file-tree"
      role="tree"
    >
      {items.map((item, i) => (
        <TreeNode key={`${item.name}-${i}`} node={item} depth={0} />
      ))}
    </ul>
  );
}
