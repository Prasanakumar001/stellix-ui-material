'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  ServerStackIcon,
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const STEPS = [
  { label: 'Welcome', description: 'Get started with Stellix', icon: RocketLaunchIcon },
  { label: 'Preferences', description: 'Choose your setup', icon: Cog6ToothIcon },
  { label: 'Confirm', description: 'Review and finish', icon: ClipboardDocumentCheckIcon },
];

const PLAN_OPTIONS = [
  {
    id: 'developer',
    label: 'Developer',
    description: 'API access, 1M tokens/month, 3 seats',
    icon: CpuChipIcon,
    badge: 'Free',
  },
  {
    id: 'team',
    label: 'Team',
    description: 'Priority inference, 10M tokens/month, 20 seats',
    icon: ServerStackIcon,
    badge: 'Popular',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    description: 'Unlimited tokens, dedicated cluster, SSO',
    icon: ShieldCheckIcon,
    badge: 'Custom',
  },
];

const FEATURES = [
  { icon: SparklesIcon, text: 'Choose your plan' },
  { icon: GlobeAltIcon, text: 'Connect your data sources' },
  { icon: BoltIcon, text: 'Send your first request' },
];

/* ── Step bar ────────────────────────────────────────── */
function WizardStepBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center" data-testid="onboarding-steps">
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        const StepIcon = step.icon;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className={cn('h-px flex-1 transition-colors duration-300', done ? 'bg-accent' : 'bg-line')} />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300',
                  done && 'bg-accent text-white shadow-btn',
                  active && 'border-2 border-accent bg-accent/10 text-accent ring-4 ring-accent/10',
                  !done && !active && 'border border-line bg-surface-field text-ink-3',
                )}
              >
                {done ? <CheckIcon className="h-4 w-4 stroke-[2.5]" /> : <StepIcon className="h-4 w-4" />}
              </div>
              <div className="text-center">
                <p className={cn('text-xs font-semibold', active ? 'text-accent' : done ? 'text-ink' : 'text-ink-3')}>
                  {step.label}
                </p>
                <p className="text-[10px] text-ink-3 hidden sm:block">{step.description}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Step content ────────────────────────────────────── */
function StepContent({ step, selected, onSelect }: {
  step: number;
  selected: string;
  onSelect: (id: string) => void;
}) {
  if (step === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-6 text-center" data-testid="onboarding-step-welcome">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-purple/10 to-blue/20">
          <RocketLaunchIcon className="h-8 w-8 text-accent" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-ink">Welcome to Stellix</h2>
          <p className="max-w-sm text-sm text-ink-2 leading-relaxed">
            Enterprise AI platform built for teams that need fast, reliable, and private
            inference at any scale. Setup takes less than a minute.
          </p>
        </div>
        <div className="mt-2 grid w-full max-w-xs gap-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface-field/50 px-4 py-3 text-left transition-colors hover:bg-surface-field"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <f.icon className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-ink">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-4 py-4" data-testid="onboarding-step-preferences">
        <div>
          <h2 className="text-base font-semibold text-ink">Select a plan</h2>
          <p className="mt-1 text-sm text-ink-3">You can change this at any time from your account settings.</p>
        </div>
        <div className="grid gap-3">
          {PLAN_OPTIONS.map((opt) => {
            const isActive = selected === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                className={cn(
                  'group flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all',
                  isActive
                    ? 'border-accent bg-accent/5 shadow-btn ring-1 ring-accent/20'
                    : 'border-line bg-surface hover:border-ink-3 hover:bg-surface-field',
                )}
                data-testid="onboarding-plan-option"
                data-plan={opt.id}
              >
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                  isActive ? 'bg-accent text-white' : 'bg-surface-field text-ink-3 group-hover:text-ink-2',
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-semibold', isActive ? 'text-accent' : 'text-ink')}>
                      {opt.label}
                    </span>
                    <span className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      isActive ? 'bg-accent/10 text-accent' : 'bg-surface-field text-ink-3',
                    )}>
                      {opt.badge}
                    </span>
                  </div>
                  <span className="text-xs text-ink-3">{opt.description}</span>
                </div>
                <div className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isActive ? 'border-accent bg-accent' : 'border-line',
                )}>
                  {isActive && <CheckIcon className="h-3 w-3 text-white stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const plan = PLAN_OPTIONS.find((o) => o.id === selected);
  const PlanIcon = plan?.icon ?? CpuChipIcon;
  return (
    <div className="flex flex-col gap-5 py-6" data-testid="onboarding-step-confirm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <ClipboardDocumentCheckIcon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-ink">Review your setup</h2>
          <p className="text-xs text-ink-3">Everything looks good? Click Finish to get started.</p>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface-field/50 divide-y divide-line overflow-hidden">
        {[
          { label: 'Plan', value: plan?.label ?? 'Developer', icon: PlanIcon },
          { label: 'Region', value: 'Asia-South-1', icon: GlobeAltIcon },
          { label: 'Default model', value: 'Stellix-3', icon: CpuChipIcon },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3 px-4 py-3">
            <row.icon className="h-4 w-4 shrink-0 text-ink-3" />
            <span className="flex-1 text-sm text-ink-3">{row.label}</span>
            <span className="text-sm font-medium text-ink">{row.value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink-3">
        By clicking Finish you agree to the Stellix Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

/* ── Main wizard ────────────────────────────────────── */
export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('developer');

  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div
      className="mx-auto flex max-w-lg flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
      data-testid="onboarding-wizard"
    >
      {/* Progress bar */}
      <div className="h-1 w-full bg-surface-field">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col gap-6 p-8">
        {/* Step indicator */}
        <WizardStepBar currentStep={currentStep} />

        {/* Step content */}
        <div className="min-h-[300px]" data-testid="onboarding-content">
          <StepContent step={currentStep} selected={selectedPlan} onSelect={setSelectedPlan} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-line pt-4" data-testid="onboarding-nav">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={isFirst}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors',
              'hover:bg-surface-field disabled:pointer-events-none disabled:opacity-30',
            )}
            data-testid="onboarding-prev"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </button>

          <div className="text-xs tabular-nums text-ink-3">
            {currentStep + 1} / {STEPS.length}
          </div>

          <button
            onClick={() => isLast ? undefined : setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all',
              isLast
                ? 'bg-green hover:bg-green/90'
                : 'bg-accent hover:bg-accent/90',
            )}
            data-testid="onboarding-next"
          >
            {isLast ? 'Finish' : 'Next'}
            {isLast ? <CheckIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
