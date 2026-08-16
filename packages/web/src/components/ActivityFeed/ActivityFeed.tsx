'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export interface ActivityUser {
  name: string;
  avatar?: string;
}

export interface ActivityItem {
  id: string;
  user: ActivityUser;
  action: string;
  target: string;
  timestamp: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Avatar({ user }: { user: ActivityUser }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="h-8 w-8 rounded-full object-cover border border-line"
        data-testid="activity-avatar-img"
      />
    );
  }
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent border border-accent/20"
      data-testid="activity-avatar-initials"
      aria-label={user.name}
    >
      {getInitials(user.name)}
    </span>
  );
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <ul className="flex flex-col divide-y divide-line" data-testid="activity-feed">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
          data-testid="activity-item"
        >
          <Avatar user={item.user} />

          <div className="min-w-0 flex-1">
            <p className="text-sm text-ink leading-snug">
              <span className="font-medium" data-testid="activity-user-name">
                {item.user.name}
              </span>
              <span className="text-ink-2" data-testid="activity-action"> {item.action} </span>
              <span className="font-medium text-accent" data-testid="activity-target">
                {item.target}
              </span>
            </p>
            <time
              className="mt-0.5 block text-xs text-ink-3"
              data-testid="activity-timestamp"
            >
              {item.timestamp}
            </time>
          </div>

          <UserCircleIcon className="h-4 w-4 shrink-0 text-ink-3 mt-1" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
