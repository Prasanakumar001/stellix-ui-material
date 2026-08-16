'use client';

import React, { useState } from 'react';
import {
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  TvIcon,
  ClipboardIcon,
  CheckIcon,
  CodeBracketIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const viewports = [
  { id: 'mobile', label: 'Mobile', icon: DevicePhoneMobileIcon, width: 375 },
  { id: 'tablet', label: 'Tablet', icon: DeviceTabletIcon, width: 768 },
  { id: 'web', label: 'Web', icon: ComputerDesktopIcon, width: 1280 },
  { id: 'large', label: 'Large', icon: TvIcon, width: 1920 },
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-field transition-colors"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-green" /> : <ClipboardIcon className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  return (
    <div className="rounded-xl border border-line overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
        <span className="text-xs font-medium text-ink-3">{title}</span>
        <CopyButton code={code} />
      </div>
      <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
        <code className="text-[#d4d4d4]">{code}</code>
      </pre>
    </div>
  );
}

export function ComponentPage({
  title,
  description,
  category,
  children,
  webCode,
  nativeCode,
  propsTable,
}: {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  webCode: string;
  nativeCode: string;
  propsTable?: Array<{ name: string; type: string; default: string; description: string }>;
}) {
  const [activeTab, setActiveTab] = useState<'preview' | 'web' | 'native'>('preview');
  const [viewport, setViewport] = useState('web');

  const selectedViewport = viewports.find((v) => v.id === viewport)!;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{category}</span>
        </div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-ink-2 sm:text-base leading-relaxed">{description}</p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 rounded-xl border border-line bg-surface-field/50 p-1">
        {[
          { id: 'preview', label: 'Preview', icon: EyeIcon },
          { id: 'web', label: 'Web Code', icon: CodeBracketIcon },
          { id: 'native', label: 'Native Code', icon: DevicePhoneMobileIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'preview' | 'web' | 'native')}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-surface text-ink shadow-btn' : 'text-ink-3 hover:text-ink'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Preview tab */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Viewport selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-3">Preview:</span>
            <div className="flex rounded-lg border border-line bg-surface-field/50 p-0.5">
              {viewports.map((vp) => (
                <button
                  key={vp.id}
                  onClick={() => setViewport(vp.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewport === vp.id ? 'bg-surface text-ink shadow-btn' : 'text-ink-3 hover:text-ink'
                  }`}
                  title={`${vp.label} (${vp.width}px)`}
                >
                  <vp.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{vp.label}</span>
                </button>
              ))}
            </div>
            <span className="text-[10px] text-ink-3 tabular-nums">{selectedViewport.width}px</span>
          </div>

          {/* Preview container */}
          <div className="rounded-xl border border-line bg-surface-canvas p-2 overflow-hidden">
            <div
              className="mx-auto rounded-lg border border-line bg-surface p-6 transition-all duration-300 overflow-auto"
              style={{ maxWidth: selectedViewport.width, minHeight: 200 }}
            >
              {children}
            </div>
          </div>
        </div>
      )}

      {/* Web code tab */}
      {activeTab === 'web' && (
        <div className="space-y-4">
          <CodeBlock title="Next.js / React — @stellix/ui-web" code={webCode} />
        </div>
      )}

      {/* Native code tab */}
      {activeTab === 'native' && (
        <div className="space-y-4">
          <CodeBlock title="React Native / Expo — @stellix/ui-native" code={nativeCode} />
        </div>
      )}

      {/* Props table */}
      {propsTable && propsTable.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-field">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Prop</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Default</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-ink-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsTable.map((prop) => (
                  <tr key={prop.name} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-2.5 font-mono text-xs text-accent">{prop.name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-2">{prop.type}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-3">{prop.default}</td>
                    <td className="px-4 py-2.5 text-xs text-ink-2">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
