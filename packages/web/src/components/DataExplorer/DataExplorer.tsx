'use client';

import React from 'react';
import { cn } from '@stellix/ui-core';
import { FilterTable } from '../FilterTable';
import { RecordsTable } from '../RecordsTable';
import { InsightCards } from '../InsightCards';

const FILTERS = [
  { id: 'all', label: 'All', count: 142, active: false },
  { id: 'completed', label: 'Completed', count: 87, active: false },
  { id: 'running', label: 'Running', count: 31, active: false },
  { id: 'failed', label: 'Failed', count: 24, active: false },
];

const COLUMNS = [
  { key: 'job', label: 'Job Name', sortable: true },
  { key: 'model', label: 'Model', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'tokens', label: 'Tokens', sortable: true },
  { key: 'duration', label: 'Duration', sortable: true },
];

const RECORDS = [
  { id: 'r1', job: 'legal-v3 fine-tune', model: 'Stellix-2', status: 'Completed', tokens: '2.1B', duration: '4h 12m' },
  { id: 'r2', job: 'medical-ner pretraining', model: 'Stellix-3', status: 'Running', tokens: '8.4B', duration: '11h 03m' },
  { id: 'r3', job: 'code-instruct RLHF', model: 'Stellix-3', status: 'Completed', tokens: '1.3B', duration: '2h 48m' },
  { id: 'r4', job: 'multilingual embed', model: 'Stellix-2', status: 'Failed', tokens: '0.6B', duration: '1h 05m' },
  { id: 'r5', job: 'summarisation SFT', model: 'Stellix-3', status: 'Completed', tokens: '900M', duration: '1h 55m' },
  { id: 'r6', job: 'reasoning MoE v4', model: 'Stellix-3', status: 'Running', tokens: '14.2B', duration: '22h 17m' },
];

const CHART_INSIGHTS = [
  {
    id: 'ci1',
    title: 'Jobs per Model',
    description: 'Distribution of training jobs by model family',
    chartType: 'bar' as const,
    data: [
      { label: 'Stellix-1', value: 18 },
      { label: 'Stellix-2', value: 54 },
      { label: 'Stellix-3', value: 70 },
    ],
  },
  {
    id: 'ci2',
    title: 'Token Volume (weekly)',
    description: 'Billions of tokens processed per day',
    chartType: 'area' as const,
    data: [
      { label: 'Mon', value: 42 },
      { label: 'Tue', value: 55 },
      { label: 'Wed', value: 49 },
      { label: 'Thu', value: 63 },
      { label: 'Fri', value: 60 },
      { label: 'Sat', value: 28 },
      { label: 'Sun', value: 21 },
    ],
  },
  {
    id: 'ci3',
    title: 'Status Breakdown',
    description: 'Jobs by terminal status this month',
    chartType: 'bar' as const,
    data: [
      { label: 'Completed', value: 87 },
      { label: 'Running', value: 31 },
      { label: 'Failed', value: 24 },
    ],
  },
];

export function DataExplorer() {
  return (
    <div className="space-y-6 p-6" data-testid="data-explorer-layout">
      {/* Filters */}
      <section data-testid="data-explorer-filters">
        <FilterTable
          filters={FILTERS}
          data={RECORDS}
          columns={COLUMNS}
        />
      </section>

      {/* Records */}
      <section data-testid="data-explorer-records">
        <h3 className="mb-3 text-sm font-semibold text-ink-2">Training Jobs</h3>
        <RecordsTable
          columns={COLUMNS}
          data={RECORDS}
          selectable
        />
      </section>

      {/* Charts */}
      <section data-testid="data-explorer-insights">
        <h3 className="mb-3 text-sm font-semibold text-ink-2">Aggregate Insights</h3>
        <InsightCards insights={CHART_INSIGHTS} />
      </section>
    </div>
  );
}
