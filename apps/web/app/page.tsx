'use client';

import React from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  DevicePhoneMobileIcon,
  MoonIcon,
  ShieldCheckIcon,
  CubeTransparentIcon,
  BoltIcon,
  Squares2X2Icon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Components', value: '19' },
  { label: 'Hooks', value: '11' },
  { label: 'Tests', value: '1,456' },
  { label: 'Bundle (web)', value: '51 KB' },
];

const features = [
  { icon: Squares2X2Icon, title: '19 Components', desc: 'Feedback, Content, Forms, Tables, Navigation, Cards & Controls' },
  { icon: DevicePhoneMobileIcon, title: 'Responsive', desc: 'Mobile, Tablet, Web, Big Screen — every component adapts' },
  { icon: MoonIcon, title: 'Dark Mode', desc: 'Full token swap with CSS variables, one-click toggle' },
  { icon: ShieldCheckIcon, title: 'Accessible', desc: 'WCAG 2.1 AA, ARIA, keyboard nav, focus-visible, reduced motion' },
  { icon: CubeTransparentIcon, title: 'Tree-Shakeable', desc: 'Import only what you need, unused code excluded' },
  { icon: BoltIcon, title: 'Cross-Platform', desc: 'Web (Next.js + Tailwind) and React Native (Expo + NativeWind)' },
];

const categories = [
  { name: 'Feedback', count: 3, href: '/components/loading-state', components: ['LoadingState', 'Thinking', 'TaskRows'] },
  { name: 'Content', count: 3, href: '/components/streaming-text', components: ['StreamingText', 'CodeBlock', 'ContextCards'] },
  { name: 'Forms', count: 3, href: '/components/approval-card', components: ['ApprovalCard', 'PromptBar', 'SelectionActions'] },
  { name: 'Tables', count: 3, href: '/components/diff-table', components: ['DiffTable', 'RecordsTable', 'FilterTable'] },
  { name: 'Navigation', count: 3, href: '/components/chat', components: ['Chat', 'Search', 'SidebarNav'] },
  { name: 'Cards & Controls', count: 4, href: '/components/recommendation-card', components: ['RecommendationCard', 'InsightCards', 'ToolChips', 'FineTuneCard'] },
];

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Stellix UI Material</h1>
        </div>
        <p className="text-base text-ink-2 sm:text-lg leading-relaxed max-w-2xl">
          A production-ready, cross-platform component library with 19 responsive components,
          11 headless hooks, dark mode, and full accessibility — built for Next.js and React Native.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/components/loading-state"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Browse Components <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-field transition-colors"
          >
            Quick Setup
          </Link>
        </div>
      </div>

      {/* Install */}
      <div className="rounded-xl border border-line bg-[#1e1e1e] px-4 py-3 font-mono text-sm text-[#d4d4d4]">
        <span className="text-ink-3">$</span> npm install <span className="text-accent">@stellix/ui-web</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-surface p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-xs text-ink-3">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-line bg-surface p-4 shadow-card hover:shadow-raised transition-shadow">
              <f.icon className="h-6 w-6 text-accent mb-2" />
              <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-xs text-ink-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Component Categories */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Components</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-xl border border-line bg-surface p-4 shadow-card hover:shadow-raised hover:border-accent/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">{cat.name}</h3>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">{cat.count}</span>
              </div>
              <p className="mt-2 text-xs text-ink-3">{cat.components.join(' · ')}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                View components <ArrowRightIcon className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Packages</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Package</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Purpose</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '@stellix/ui-web', purpose: '19 web components (Tailwind + Heroicons)', size: '51 KB' },
                { name: '@stellix/ui-native', purpose: '19 React Native components (NativeWind)', size: '22 KB' },
                { name: '@stellix/ui-core', purpose: '11 headless hooks + TypeScript types', size: '9.2 KB' },
                { name: '@stellix/ui-tokens', purpose: 'Design tokens (colors, shadows, spacing)', size: '3.4 KB' },
              ].map((pkg) => (
                <tr key={pkg.name} className="border-b border-line last:border-b-0 hover:bg-surface-field">
                  <td className="px-4 py-2.5 font-mono text-xs text-accent">{pkg.name}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-2">{pkg.purpose}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-3">{pkg.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-line pt-6 text-center text-xs text-ink-3">
        Stellix UI Material v0.1.3 — Stellix Private Ltd
      </div>
    </div>
  );
}
