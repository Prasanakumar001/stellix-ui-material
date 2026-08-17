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
  BeakerIcon,
  CommandLineIcon,
  SwatchIcon,
  CpuChipIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Components', value: '77+' },
  { label: 'Hooks', value: '11' },
  { label: 'Tests', value: '520+' },
  { label: 'Bundle (web)', value: '150 KB' },
  { label: 'Native Components', value: '40' },
  { label: 'Themes', value: '8' },
];

const whyStellix = [
  {
    icon: DevicePhoneMobileIcon,
    title: 'Cross-Platform Parity',
    desc: 'Same API for web and native — ship to both platforms from one codebase. No platform-specific wrappers needed.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise-Grade',
    desc: '77+ components, 8 themes, WCAG AA accessible. Built for teams that need reliability and scale.',
  },
  {
    icon: CpuChipIcon,
    title: 'AI-Native Components',
    desc: 'Purpose-built for AI/agent UIs: Chat, Thinking, StreamingText, ToolChips, AgentStatus, and more.',
  },
  {
    icon: MoonIcon,
    title: 'Zero Config Dark Mode',
    desc: '8 theme presets including Midnight, Sunset, Ocean, and Forest. One-click toggle with full token swap.',
  },
  {
    icon: BeakerIcon,
    title: 'Production Tested',
    desc: '520+ E2E tests across 4 viewports: Desktop, Tablet, Mobile, and Large Screen. Nothing ships untested.',
  },
  {
    icon: CubeTransparentIcon,
    title: 'Tree-Shakeable & Tiny',
    desc: 'Import only what you need — unused code is excluded. Web bundle starts at 150 KB.',
  },
];

const categories = [
  { name: 'Feedback', count: 3, href: '/components/loading-state', components: ['LoadingState', 'Thinking', 'TaskRows'] },
  { name: 'Content', count: 3, href: '/components/streaming-text', components: ['StreamingText', 'CodeBlock', 'ContextCards'] },
  { name: 'Forms', count: 3, href: '/components/approval-card', components: ['ApprovalCard', 'PromptBar', 'SelectionActions'] },
  { name: 'Tables', count: 3, href: '/components/diff-table', components: ['DiffTable', 'RecordsTable', 'FilterTable'] },
  { name: 'Navigation', count: 3, href: '/components/chat', components: ['Chat', 'Search', 'SidebarNav'] },
  { name: 'Cards & Controls', count: 4, href: '/components/recommendation-card', components: ['RecommendationCard', 'InsightCards', 'ToolChips', 'FineTuneCard'] },
  { name: 'Primitives', count: 12, href: '/components/loading-state', components: ['Button', 'Input', 'Badge', 'Avatar', 'Tooltip', 'Toggle', '...'] },
  { name: 'Feedback UI', count: 7, href: '/components/loading-state', components: ['Toast', 'Alert', 'Skeleton', 'Progress', 'Spinner', '...'] },
  { name: 'Layout', count: 7, href: '/components/loading-state', components: ['Stack', 'Grid', 'Divider', 'Container', 'Card', '...'] },
  { name: 'Data Display', count: 7, href: '/components/diff-table', components: ['DataTable', 'List', 'Timeline', 'Stat', 'GaugeChart', '...'] },
  { name: 'AI / Agent', count: 6, href: '/components/chat', components: ['Chat', 'Thinking', 'StreamingText', 'ToolChips', 'AgentStatus', 'ContextCards'] },
  { name: 'Compositions', count: 6, href: '/components/recommendation-card', components: ['Dashboard', 'InsightCards', 'FineTuneCard', 'ApprovalCard', '...'] },
  { name: 'Animations', count: 10, href: '/components/loading-state', components: ['FadeIn', 'SlideUp', 'Pulse', 'Shimmer', 'TypeWriter', '...'] },
  { name: 'Themes', count: 2, href: '/theme-playground', components: ['ThemeProvider', 'ThemePlayground'] },
];

const packages = [
  { name: '@stellix/ui-web', purpose: '77+ web components (Tailwind + Heroicons)', size: '150 KB', components: '77+' },
  { name: '@stellix/ui-native', purpose: '40 React Native components (NativeWind)', size: '41 KB', components: '40' },
  { name: '@stellix/ui-core', purpose: '11 headless hooks + TypeScript types', size: '10.5 KB', components: '11 hooks' },
  { name: '@stellix/ui-tokens', purpose: 'Design tokens, 8 themes, CSS variables', size: '4.6 KB', components: '8 themes' },
];

export default function OverviewPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <SparklesIcon className="h-9 w-9 text-accent" />
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Stellix UI Material</h1>
        </div>
        <p className="text-base text-ink-2 sm:text-lg leading-relaxed max-w-2xl">
          A production-ready, cross-platform component library with 77+ responsive components,
          11 headless hooks, 8 theme presets, and full WCAG AA accessibility — built for
          Next.js, React Native, and AI-powered interfaces.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/components/loading-state"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Browse Components <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface-field transition-colors"
          >
            Quick Setup
          </Link>
          <Link
            href="/theme-playground"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface-field transition-colors"
          >
            <SwatchIcon className="h-4 w-4" /> Theme Playground
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-surface p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-xs text-ink-3">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Get Started in 30 Seconds */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
          <CommandLineIcon className="h-5 w-5 text-accent" />
          Get Started in 30 Seconds
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-line bg-[#1e1e1e] px-5 py-3 font-mono text-sm text-[#d4d4d4]">
            <span className="text-ink-3">$</span> npm install <span className="text-accent">@stellix/ui-web @stellix/ui-tokens</span>
          </div>
          <div className="rounded-xl border border-line bg-[#1e1e1e] px-5 py-4 font-mono text-sm text-[#d4d4d4] leading-relaxed overflow-x-auto">
            <div className="text-[#c586c0]">import</div>
            <div className="pl-4">
              <span className="text-[#9cdcfe]">{'{ Chat, StreamingText, ThemeProvider }'}</span>
            </div>
            <div>
              <span className="text-[#c586c0]">from </span>
              <span className="text-[#ce9178]">&apos;@stellix/ui-web&apos;</span>
              <span className="text-[#d4d4d4]">;</span>
            </div>
            <div className="mt-3 text-[#6a9955]">{'// Wrap your app with ThemeProvider for dark mode + themes'}</div>
            <div>
              <span className="text-[#569cd6]">{'<'}</span>
              <span className="text-[#4ec9b0]">ThemeProvider</span>
              <span className="text-[#9cdcfe]"> theme</span>
              <span className="text-[#d4d4d4]">=</span>
              <span className="text-[#ce9178]">&quot;midnight&quot;</span>
              <span className="text-[#569cd6]">{'>'}</span>
            </div>
            <div className="pl-4">
              <span className="text-[#569cd6]">{'<'}</span>
              <span className="text-[#4ec9b0]">Chat</span>
              <span className="text-[#9cdcfe]"> messages</span>
              <span className="text-[#d4d4d4]">=</span>
              <span className="text-[#569cd6]">{'{messages}'}</span>
              <span className="text-[#9cdcfe]"> onSend</span>
              <span className="text-[#d4d4d4]">=</span>
              <span className="text-[#569cd6]">{'{handleSend}'}</span>
              <span className="text-[#569cd6]">{' />'}</span>
            </div>
            <div>
              <span className="text-[#569cd6]">{'</'}</span>
              <span className="text-[#4ec9b0]">ThemeProvider</span>
              <span className="text-[#569cd6]">{'>'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Stellix UI? */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-ink flex items-center gap-2">
          <BoltIcon className="h-5 w-5 text-accent" />
          Why Stellix UI?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyStellix.map((f) => (
            <div key={f.title} className="rounded-xl border border-line bg-surface p-5 shadow-card hover:shadow-raised hover:border-accent/30 transition-all">
              <f.icon className="h-6 w-6 text-accent mb-3" />
              <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-xs text-ink-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Component Categories */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
          <Squares2X2Icon className="h-5 w-5 text-accent" />
          Component Categories
        </h2>
        <p className="mb-6 text-sm text-ink-2">
          77+ components across 14 categories, from low-level primitives to high-level AI compositions.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <p className="mt-2 text-xs text-ink-3 line-clamp-1">{cat.components.join(' · ')}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                View components <ArrowRightIcon className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
          <CubeTransparentIcon className="h-5 w-5 text-accent" />
          Packages
        </h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Package</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Purpose</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Includes</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.name} className="border-b border-line last:border-b-0 hover:bg-surface-field transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-accent">{pkg.name}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-2">{pkg.purpose}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-3">{pkg.components}</td>
                  <td className="px-4 py-2.5 text-xs font-medium text-ink-3">{pkg.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Support */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-accent" />
          Platform Support
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <h3 className="text-sm font-semibold text-ink mb-3">Web</h3>
            <ul className="space-y-2 text-xs text-ink-2">
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> Next.js 14+ (App Router & Pages)</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> Tailwind CSS v3 / v4</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> React 18+ with Server Components</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> TypeScript-first, full type coverage</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <h3 className="text-sm font-semibold text-ink mb-3">Native</h3>
            <ul className="space-y-2 text-xs text-ink-2">
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> React Native 0.73+</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> Expo SDK 50+</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> NativeWind v4 styling</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">&#10003;</span> iOS & Android with shared API</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-line pt-6 text-center text-xs text-ink-3">
        Stellix UI Material v0.1.5 — Stellix Private Ltd
      </div>
    </div>
  );
}
