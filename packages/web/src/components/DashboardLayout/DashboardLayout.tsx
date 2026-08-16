'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { ChartBarIcon, UsersIcon, CpuChipIcon, BoltIcon } from '@heroicons/react/24/outline';
import { DataCard } from '../DataCard';
import { InsightCards } from '../InsightCards';
import { TaskRows } from '../TaskRows';
import { ActivityFeed } from '../ActivityFeed';

const DATA_CARDS = [
  { label: 'Total Requests', value: '1.24M', change: 12.4, changeLabel: 'vs last week', icon: <BoltIcon className="h-4 w-4" /> },
  { label: 'Active Users', value: '8,302', change: 5.1, changeLabel: 'vs last week', icon: <UsersIcon className="h-4 w-4" /> },
  { label: 'Avg Latency', value: '142ms', change: -8.3, changeLabel: 'vs last week', icon: <ChartBarIcon className="h-4 w-4" /> },
  { label: 'GPU Utilisation', value: '73%', change: 2.0, changeLabel: 'vs last week', icon: <CpuChipIcon className="h-4 w-4" /> },
];

const INSIGHTS = [
  {
    id: 'ins1',
    title: 'Daily Requests',
    description: 'API calls over the past 7 days',
    chartType: 'bar' as const,
    data: [
      { label: 'Mon', value: 142000 },
      { label: 'Tue', value: 178000 },
      { label: 'Wed', value: 165000 },
      { label: 'Thu', value: 210000 },
      { label: 'Fri', value: 198000 },
      { label: 'Sat', value: 90000 },
      { label: 'Sun', value: 76000 },
    ],
  },
  {
    id: 'ins2',
    title: 'Token Throughput',
    description: 'Tokens per second',
    chartType: 'line' as const,
    data: [
      { label: 'Mon', value: 3200 },
      { label: 'Tue', value: 3800 },
      { label: 'Wed', value: 3600 },
      { label: 'Thu', value: 4200 },
      { label: 'Fri', value: 4100 },
      { label: 'Sat', value: 2100 },
      { label: 'Sun', value: 1900 },
    ],
  },
  {
    id: 'ins3',
    title: 'Error Rate',
    description: 'Errors per 10k requests',
    chartType: 'area' as const,
    data: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 9 },
      { label: 'Wed', value: 14 },
      { label: 'Thu', value: 7 },
      { label: 'Fri', value: 11 },
      { label: 'Sat', value: 5 },
      { label: 'Sun', value: 4 },
    ],
  },
];

const TASKS = [
  { id: 't1', title: 'Fine-tune Stellix-3 on customer corpus', status: 'running' as const, progress: 62, duration: 7200000 },
  { id: 't2', title: 'Deploy updated embedding model', status: 'queued' as const },
  { id: 't3', title: 'Benchmark MoE routing latency', status: 'completed' as const, duration: 3400000 },
  { id: 't4', title: 'Evaluate RLHF reward model v2', status: 'failed' as const },
];

const ACTIVITY = [
  { id: 'a1', user: { name: 'Priya Nair' }, action: 'deployed', target: 'Stellix-3 v1.2.0', timestamp: '2m ago' },
  { id: 'a2', user: { name: 'Rahul Menon' }, action: 'approved', target: 'RLHF reward model PR', timestamp: '18m ago' },
  { id: 'a3', user: { name: 'Ananya Rao' }, action: 'started fine-tune job on', target: 'legal-v3 corpus', timestamp: '1h ago' },
  { id: 'a4', user: { name: 'Dev Sharma' }, action: 'updated config for', target: 'token budget limits', timestamp: '3h ago' },
];

export function DashboardLayout() {
  return (
    <div className="space-y-6 p-6" data-testid="dashboard-layout">
      {/* Metric cards */}
      <section data-testid="dashboard-metrics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DATA_CARDS.map((card) => (
            <DataCard key={card.label} {...card} />
          ))}
        </div>
      </section>

      {/* Charts */}
      <section data-testid="dashboard-insights">
        <InsightCards insights={INSIGHTS} />
      </section>

      {/* Tasks + Activity */}
      <section
        className={cn('grid grid-cols-1 gap-6 md:grid-cols-2')}
        data-testid="dashboard-bottom"
      >
        <div data-testid="dashboard-tasks">
          <h3 className="mb-3 text-sm font-semibold text-ink-2">Active Tasks</h3>
          <TaskRows tasks={TASKS} />
        </div>
        <div data-testid="dashboard-activity">
          <h3 className="mb-3 text-sm font-semibold text-ink-2">Recent Activity</h3>
          <ActivityFeed items={ACTIVITY} />
        </div>
      </section>
    </div>
  );
}
