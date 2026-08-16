'use client';

import React, { useState } from 'react';
import { useExpandable, cn, type SidebarNavProps, type NavItem } from '@stellix/ui-core';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from '../Icons';
import {
  HomeIcon,
  FolderIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

/* ── Default icon for nav items ── */
const defaultIcons: Record<string, React.ReactNode> = {
  home: <HomeIcon className="h-4 w-4" />,
  folder: <FolderIcon className="h-4 w-4" />,
  settings: <Cog6ToothIcon className="h-4 w-4" />,
  doc: <DocumentTextIcon className="h-4 w-4" />,
};

/* ── Nav group with collapsible children ── */
function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { isOpen, toggle } = useExpandable(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div data-testid="nav-group">
      <a
        href={item.href}
        onClick={hasChildren ? (e) => { e.preventDefault(); toggle(); } : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          item.active
            ? 'bg-accent/10 text-accent font-medium'
            : 'text-ink-2 hover:bg-surface-field hover:text-ink',
          collapsed && 'justify-center px-2',
        )}
        title={collapsed ? item.label : undefined}
        data-testid="nav-item"
        data-active={item.active || false}
      >
        <span className="shrink-0">{defaultIcons[item.icon || ''] || <DocumentTextIcon className="h-4 w-4" />}</span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {hasChildren && (
              <ChevronDownIcon className={cn('h-3 w-3 text-ink-3 transition-transform', isOpen && 'rotate-180')} />
            )}
          </>
        )}
      </a>

      {hasChildren && !collapsed && (
        <div
          className="grid transition-all duration-200 ease-out"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="ml-4 mt-1 space-y-0.5 border-l border-line pl-3">
              {item.children!.map((child) => (
                <a
                  key={child.id}
                  href={child.href}
                  className={cn(
                    'block rounded-md px-2 py-1.5 text-sm transition-colors',
                    child.active
                      ? 'text-accent font-medium bg-accent/5'
                      : 'text-ink-3 hover:text-ink hover:bg-surface-field',
                  )}
                  data-testid="nav-child"
                  data-active={child.active || false}
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main SidebarNav ── */
export function SidebarNav({ items, onSearch, collapsed = false }: SidebarNavProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className={cn('flex h-full flex-col', collapsed ? 'w-14' : 'w-60 lg:w-70')} data-testid="sidebar-content">
      {!collapsed && onSearch && (
        <div className="p-3" data-testid="sidebar-search">
          <div className="flex items-center gap-2 rounded-lg border border-line bg-surface-field px-3 py-2">
            <MagnifyingGlassIcon className="h-4 w-4 text-ink-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); onSearch(e.target.value); }}
              placeholder="Quick search..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none"
              data-testid="sidebar-search-input"
            />
          </div>
        </div>
      )}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2" data-testid="sidebar-nav">
        {items.map((item) => (
          <NavGroup key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </div>
  );

  return (
    <div data-testid="sidebar-nav-root">
      {/* Mobile: Hamburger + Drawer */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-40 rounded-lg border border-line bg-surface p-2 shadow-card"
          data-testid="hamburger-btn"
        >
          <Bars3Icon className="h-5 w-5 text-ink" />
        </button>
        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)} data-testid="drawer-overlay" />
            <div className="fixed inset-y-0 left-0 z-50 w-64 border-r border-line bg-surface shadow-modal animate-slide-in-right" data-testid="mobile-drawer">
              <div className="flex items-center justify-between border-b border-line p-3">
                <span className="text-sm font-semibold text-ink">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-ink-3 hover:text-ink hover:bg-surface-field transition-colors" data-testid="drawer-close">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {content}
            </div>
          </>
        )}
      </div>

      {/* Tablet+: Persistent sidebar */}
      <aside className="hidden border-r border-line bg-surface sm:block" data-testid="sidebar-desktop">
        {content}
      </aside>
    </div>
  );
}
