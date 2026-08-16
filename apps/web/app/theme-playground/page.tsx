'use client';

import React, { useRef } from 'react';
import {
  ThemeSwitcher,
  Button,
  Badge,
  Alert,
  ProgressBar,
  DataCard,
  Avatar,
} from '@stellix/ui-web';
import { BoltIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function ThemePlaygroundPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Theme Playground</h1>
        <p className="mt-2 text-sm text-ink-2">
          Switch theme presets above and see how every component responds instantly below.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
        <ThemeSwitcher target={containerRef} />
      </div>

      <div ref={containerRef} className="space-y-8 rounded-xl border border-line bg-surface p-6 shadow-card transition-all duration-300">
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>Success</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="error" dot>Error</Badge>
            <Badge variant="info" dot>Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="error">Offline</Badge>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Alerts</h2>
          <div className="space-y-3">
            <Alert variant="info" title="Information">
              This is an informational message for the user.
            </Alert>
            <Alert variant="success" title="Operation complete">
              Your data has been saved successfully.
            </Alert>
            <Alert variant="warning" title="Heads up" dismissible>
              Review this before proceeding further.
            </Alert>
            <Alert variant="error" title="Something went wrong">
              The request failed. Please try again.
            </Alert>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Progress Bars</h2>
          <div className="space-y-4">
            <ProgressBar value={80} max={100} label="Upload progress" showValue />
            <ProgressBar value={45} max={100} size="sm" label="Model training" showValue />
            <ProgressBar value={60} max={100} size="lg" label="Processing" showValue />
            <ProgressBar indeterminate label="Loading data..." />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Data Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DataCard
              label="Total Requests"
              value="1,284,920"
              change={12.4}
              changeLabel="vs last week"
              icon={<BoltIcon className="h-4 w-4" />}
            />
            <DataCard
              label="Avg Latency"
              value="142ms"
              change={-8.2}
              changeLabel="vs last week"
              icon={<SparklesIcon className="h-4 w-4" />}
            />
            <DataCard
              label="Uptime"
              value="99.98%"
              change={0}
              changeLabel="stable"
              icon={<ShieldCheckIcon className="h-4 w-4" />}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-3">Avatars</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar initials="SX" size="sm" status="online" />
            <Avatar initials="AB" size="md" status="online" />
            <Avatar initials="JD" size="lg" status="away" />
            <Avatar initials="PK" size="xl" status="offline" />
            <div className="ml-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-ink-2">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-xs text-ink-2">Away</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                <span className="text-xs text-ink-2">Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
