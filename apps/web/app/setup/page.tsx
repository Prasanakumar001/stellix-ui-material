'use client';

import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

function CopyBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-line overflow-hidden">
      {title && (
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">{title}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="inline-flex items-center gap-1 text-xs text-ink-3 hover:text-ink"
          >
            {copied ? <CheckIcon className="h-3.5 w-3.5 text-green" /> : <ClipboardIcon className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed"><code className="text-[#d4d4d4]">{code}</code></pre>
    </div>
  );
}

export default function SetupPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Setup Guide</h1>
        <p className="mt-2 text-sm text-ink-2">Get Stellix UI Material running in your project in under 2 minutes.</p>
      </div>

      {/* Step 1 */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">1</span>
          Install
        </h2>
        <CopyBlock code="npm install @stellix/ui-web" title="Terminal" />
        <p className="text-xs text-ink-3">This automatically installs @stellix/ui-core and @stellix/ui-tokens as dependencies.</p>
      </div>

      {/* Step 2 */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">2</span>
          Configure Next.js
        </h2>
        <CopyBlock title="next.config.ts" code={`import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@stellix/ui-web',
    '@stellix/ui-core',
    '@stellix/ui-tokens',
  ],
};

export default nextConfig;`} />
      </div>

      {/* Step 3 */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">3</span>
          Add Tailwind CSS Theme
        </h2>
        <CopyBlock title="app/globals.css" code={`@import 'tailwindcss';
@source "node_modules/@stellix/ui-web/dist/**/*.mjs";

@theme {
  --color-ink: #1a1a1a;
  --color-ink-2: #6b6b6b;
  --color-ink-3: #9a9a9a;
  --color-surface: #ffffff;
  --color-surface-field: #f5f5f5;
  --color-surface-canvas: #fafafa;
  --color-line: #e5e5e5;
  --color-line-strong: #d1d1d1;
  --color-accent: #6366f1;
  --color-green: #22c55e;
  --color-red: #ef4444;
  --color-orange: #f97316;
  --color-blue: #3b82f6;
  --color-purple: #a855f7;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-raised: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-btn: 0 1px 2px rgba(0,0,0,0.05);
  --breakpoint-sm: 640px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1440px;
}`} />
      </div>

      {/* Step 4 */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">4</span>
          Use Components
        </h2>
        <CopyBlock title="app/page.tsx" code={`import { LoadingState, Chat, CodeBlock } from '@stellix/ui-web';

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <LoadingState variant="orbit" label="Processing..." />
      <CodeBlock code="console.log('hello')" language="ts" streaming />
      <Chat
        messages={[
          { id: '1', role: 'user', content: 'Hello!', timestamp: Date.now() },
        ]}
        tabs={['Chat']}
      />
    </div>
  );
}`} />
      </div>

      {/* React Native */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-ink">React Native Setup</h2>
        <CopyBlock code="npm install @stellix/ui-native react-native-reanimated react-native-gesture-handler react-native-svg nativewind" title="Terminal" />
        <CopyBlock title="App.tsx" code={`import { LoadingState, Chat, TaskRows } from '@stellix/ui-native';

export default function Screen() {
  return <LoadingState variant="dots" label="Loading..." />;
}`} />
      </div>
    </div>
  );
}
