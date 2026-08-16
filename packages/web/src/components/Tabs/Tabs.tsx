'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';

type TabVariant = 'default' | 'pill' | 'bordered';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: TabVariant;
  className?: string;
}

const tabListVariant: Record<TabVariant, string> = {
  default: 'border-b border-border',
  pill: 'bg-surface-field rounded-lg p-1 gap-1',
  bordered: 'border border-border rounded-lg p-1 gap-1',
};

const tabItemBase = 'inline-flex items-center gap-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer';

const tabItemVariant: Record<TabVariant, { active: string; inactive: string }> = {
  default: {
    active: 'border-b-2 border-accent text-accent pb-2 px-1',
    inactive: 'border-b-2 border-transparent text-text-secondary hover:text-text-primary pb-2 px-1',
  },
  pill: {
    active: 'bg-accent text-white rounded-md px-3 py-1.5',
    inactive: 'text-text-secondary hover:text-text-primary rounded-md px-3 py-1.5',
  },
  bordered: {
    active: 'border border-border bg-surface-raised text-text-primary rounded-md px-3 py-1.5',
    inactive: 'text-text-secondary hover:text-text-primary rounded-md px-3 py-1.5',
  },
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className,
}: TabsProps) {
  return (
    <div
      data-testid="tabs"
      data-variant={variant}
      role="tablist"
      className={cn(
        'flex items-center',
        tabListVariant[variant],
        variant === 'default' ? 'gap-4' : '',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            data-testid={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              tabItemBase,
              isActive
                ? tabItemVariant[variant].active
                : tabItemVariant[variant].inactive,
            )}
          >
            {tab.icon && (
              <span data-testid={`tab-icon-${tab.id}`} className="h-4 w-4 shrink-0">
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
