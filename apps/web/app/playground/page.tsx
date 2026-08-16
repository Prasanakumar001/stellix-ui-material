'use client';

import React, { useState } from 'react';
import {
  Button,
  Badge,
  Avatar,
  Alert,
  Toast,
  Spinner,
  ProgressRing,
  NumberTicker,
} from '@stellix/ui-web';

type ComponentName = 'Button' | 'Badge' | 'Avatar' | 'Alert' | 'Toast' | 'Spinner' | 'ProgressRing' | 'NumberTicker';

const COMPONENT_NAMES: ComponentName[] = [
  'Button', 'Badge', 'Avatar', 'Alert', 'Toast', 'Spinner', 'ProgressRing', 'NumberTicker',
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
      className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-field transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium text-ink-2 w-24 shrink-0">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function ButtonPlayground() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Click me');

  const code = `<Button\n  variant="${variant}"\n  size="${size}"${disabled ? '\n  disabled' : ''}${loading ? '\n  loading' : ''}\n>\n  ${label}\n</Button>`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <Button variant={variant} size={size} disabled={disabled} loading={loading}>
          {label}
        </Button>
      </div>
      <div className="space-y-3">
        <ControlRow label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Variant">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['primary', 'secondary', 'ghost', 'destructive', 'outline'] as const).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Size">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof size)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Disabled">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-accent"
            />
            <span className="text-sm text-ink-2">Disabled</span>
          </label>
        </ControlRow>
        <ControlRow label="Loading">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-accent"
            />
            <span className="text-sm text-ink-2">Loading</span>
          </label>
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function BadgePlayground() {
  const [variant, setVariant] = useState<'success' | 'warning' | 'error' | 'info' | 'neutral'>('success');
  const [dot, setDot] = useState(false);
  const [label, setLabel] = useState('Active');

  const code = `<Badge variant="${variant}"${dot ? ' dot' : ''}>\n  ${label}\n</Badge>`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <Badge variant={variant} dot={dot}>{label}</Badge>
      </div>
      <div className="space-y-3">
        <ControlRow label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Variant">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['success', 'warning', 'error', 'info', 'neutral'] as const).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Dot">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dot}
              onChange={(e) => setDot(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-accent"
            />
            <span className="text-sm text-ink-2">Show dot</span>
          </label>
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function AvatarPlayground() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [initials, setInitials] = useState('SX');
  const [status, setStatus] = useState<'online' | 'offline' | 'away' | ''>('online');

  const code = `<Avatar\n  initials="${initials}"\n  size="${size}"${status ? `\n  status="${status}"` : ''}\n/>`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <Avatar initials={initials} size={size} status={status || undefined} />
      </div>
      <div className="space-y-3">
        <ControlRow label="Initials">
          <input
            type="text"
            value={initials}
            maxLength={2}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Size">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof size)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">None</option>
            {(['online', 'offline', 'away'] as const).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function AlertPlayground() {
  const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [title, setTitle] = useState('Heads up');
  const [message, setMessage] = useState('This is an alert message.');
  const [dismissible, setDismissible] = useState(false);

  const code = `<Alert\n  variant="${variant}"\n  title="${title}"${dismissible ? '\n  dismissible' : ''}\n>\n  ${message}\n</Alert>`;

  return (
    <div className="space-y-6">
      <div className="min-h-[120px] rounded-xl border border-line bg-surface-canvas p-8">
        <Alert variant={variant} title={title} dismissible={dismissible}>{message}</Alert>
      </div>
      <div className="space-y-3">
        <ControlRow label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Message">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Variant">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['info', 'success', 'warning', 'error'] as const).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Dismissible">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dismissible}
              onChange={(e) => setDismissible(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-accent"
            />
            <span className="text-sm text-ink-2">Show dismiss button</span>
          </label>
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function ToastPlayground() {
  const [variant, setVariant] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [title, setTitle] = useState('Saved');
  const [message, setMessage] = useState('Your changes have been saved.');

  const code = `<Toast\n  variant="${variant}"\n  title="${title}"\n  message="${message}"\n/>`;

  return (
    <div className="space-y-6">
      <div className="min-h-[120px] rounded-xl border border-line bg-surface-canvas p-8">
        <Toast variant={variant} title={title} message={message} />
      </div>
      <div className="space-y-3">
        <ControlRow label="Variant">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['success', 'error', 'warning', 'info'] as const).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Message">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function SpinnerPlayground() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [label, setLabel] = useState('Loading...');

  const code = `<Spinner size="${size}"${label ? ` label="${label}"` : ''} />`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <Spinner size={size} label={label || undefined} />
      </div>
      <div className="space-y-3">
        <ControlRow label="Size">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof size)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </ControlRow>
        <ControlRow label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function ProgressRingPlayground() {
  const [value, setValue] = useState(65);
  const [size, setSize] = useState(80);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [label, setLabel] = useState('65%');

  const code = `<ProgressRing\n  value={${value}}\n  size={${size}}\n  strokeWidth={${strokeWidth}}${label ? `\n  label="${label}"` : ''}\n/>`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <ProgressRing value={value} size={size} strokeWidth={strokeWidth} label={label || undefined} />
      </div>
      <div className="space-y-3">
        <ControlRow label="Value">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-8 text-right text-sm text-ink-2">{value}</span>
          </div>
        </ControlRow>
        <ControlRow label="Size">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={40}
              max={160}
              step={8}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-8 text-right text-sm text-ink-2">{size}</span>
          </div>
        </ControlRow>
        <ControlRow label="Stroke">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={2}
              max={16}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-8 text-right text-sm text-ink-2">{strokeWidth}</span>
          </div>
        </ControlRow>
        <ControlRow label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function NumberTickerPlayground() {
  const [value, setValue] = useState(12345);
  const [prefix, setPrefix] = useState('$');
  const [suffix, setSuffix] = useState('');
  const [decimals, setDecimals] = useState(0);
  const [duration, setDuration] = useState(1000);
  const [key, setKey] = useState(0);

  const code = `<NumberTicker\n  value={${value}}\n  prefix="${prefix}"\n  suffix="${suffix}"\n  decimals={${decimals}}\n  duration={${duration}}\n/>`;

  return (
    <div className="space-y-6">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-line bg-surface-canvas p-8">
        <NumberTicker key={key} value={value} prefix={prefix} suffix={suffix} decimals={decimals} duration={duration} className="text-3xl font-bold text-accent" />
      </div>
      <div className="space-y-3">
        <ControlRow label="Value">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Prefix">
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Suffix">
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </ControlRow>
        <ControlRow label="Decimals">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={4}
              value={decimals}
              onChange={(e) => setDecimals(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-4 text-right text-sm text-ink-2">{decimals}</span>
          </div>
        </ControlRow>
        <ControlRow label="Duration">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={200}
              max={3000}
              step={200}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-12 text-right text-sm text-ink-2">{duration}ms</span>
          </div>
        </ControlRow>
        <ControlRow label="">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-field transition-colors"
          >
            Replay animation
          </button>
        </ControlRow>
      </div>
      <div className="rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-field/50 px-4 py-2">
          <span className="text-xs font-medium text-ink-3">Generated Code</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed">
          <code className="text-[#d4d4d4]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

const playgrounds: Record<ComponentName, React.FC> = {
  Button: ButtonPlayground,
  Badge: BadgePlayground,
  Avatar: AvatarPlayground,
  Alert: AlertPlayground,
  Toast: ToastPlayground,
  Spinner: SpinnerPlayground,
  ProgressRing: ProgressRingPlayground,
  NumberTicker: NumberTickerPlayground,
};

export default function PlaygroundPage() {
  const [selected, setSelected] = useState<ComponentName>('Button');
  const ActivePlayground = playgrounds[selected];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Playground</h1>
        <p className="mt-2 text-sm text-ink-2">
          Try components live. Adjust controls to see real-time changes and copy the generated code.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMPONENT_NAMES.map((name) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              selected === name
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-line bg-surface text-ink-2 hover:border-ink-3 hover:bg-surface-field'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-6 text-base font-semibold text-ink">{selected}</h2>
        <ActivePlayground />
      </div>
    </div>
  );
}
