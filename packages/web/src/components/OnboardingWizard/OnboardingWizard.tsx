'use client';

import React, { useState } from 'react';
import { cn } from '@stellix/ui-core';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { StepIndicator } from '../StepIndicator';

const STEPS = [
  { label: 'Welcome', description: 'Get started with Stellix' },
  { label: 'Preferences', description: 'Choose your setup' },
  { label: 'Confirm', description: 'Review and finish' },
];

const PLAN_OPTIONS = [
  { id: 'developer', label: 'Developer', description: 'API access, 1M tokens/month, 3 seats' },
  { id: 'team', label: 'Team', description: 'Priority inference, 10M tokens/month, 20 seats' },
  { id: 'enterprise', label: 'Enterprise', description: 'Unlimited tokens, dedicated cluster, SSO' },
];

function StepContent({ step, selected, onSelect }: {
  step: number;
  selected: string;
  onSelect: (id: string) => void;
}) {
  if (step === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center" data-testid="onboarding-step-welcome">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <CheckCircleIcon className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-ink">Welcome to Stellix</h2>
        <p className="max-w-sm text-sm text-ink-2 leading-relaxed">
          Stellix is an enterprise AI platform built for teams that need fast, reliable, and private
          inference at any scale. This wizard takes less than a minute to complete.
        </p>
        <ul className="mt-2 space-y-2 text-left text-sm text-ink-2">
          <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 shrink-0 text-accent" /> Choose your plan</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 shrink-0 text-accent" /> Connect your data sources</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 shrink-0 text-accent" /> Send your first request</li>
        </ul>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-3 py-4" data-testid="onboarding-step-preferences">
        <h2 className="text-base font-semibold text-ink">Select a plan</h2>
        <p className="text-sm text-ink-3">You can change this at any time from your account settings.</p>
        {PLAN_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              'flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-colors',
              selected === opt.id
                ? 'border-accent bg-accent/5 shadow-btn'
                : 'border-line bg-surface hover:bg-surface-field',
            )}
            data-testid="onboarding-plan-option"
            data-plan={opt.id}
          >
            <span className={cn('text-sm font-semibold', selected === opt.id ? 'text-accent' : 'text-ink')}>
              {opt.label}
            </span>
            <span className="text-xs text-ink-3">{opt.description}</span>
          </button>
        ))}
      </div>
    );
  }

  const plan = PLAN_OPTIONS.find((o) => o.id === selected);
  return (
    <div className="flex flex-col gap-4 py-6" data-testid="onboarding-step-confirm">
      <h2 className="text-base font-semibold text-ink">Review your setup</h2>
      <div className="rounded-xl border border-line bg-surface-field p-4 text-sm text-ink-2 space-y-2">
        <div className="flex justify-between">
          <span className="text-ink-3">Plan</span>
          <span className="font-medium text-ink">{plan?.label ?? 'Developer'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-3">Region</span>
          <span className="font-medium text-ink">Asia-South-1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-3">Default model</span>
          <span className="font-medium text-ink">Stellix-3</span>
        </div>
      </div>
      <p className="text-xs text-ink-3">
        By clicking Finish you agree to the Stellix Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('developer');

  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div
      className="mx-auto flex max-w-lg flex-col gap-6 rounded-2xl border border-line bg-surface p-8 shadow-card"
      data-testid="onboarding-wizard"
    >
      {/* Step indicator */}
      <div data-testid="onboarding-steps">
        <StepIndicator steps={STEPS} currentStep={currentStep} orientation="horizontal" />
      </div>

      {/* Step content */}
      <div className="min-h-[280px]" data-testid="onboarding-content">
        <StepContent step={currentStep} selected={selectedPlan} onSelect={setSelectedPlan} />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-line pt-4" data-testid="onboarding-nav">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors',
            'hover:bg-surface-field disabled:pointer-events-none disabled:opacity-40',
          )}
          data-testid="onboarding-prev"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={() => isLast ? undefined : setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-colors',
            'hover:bg-accent/90',
          )}
          data-testid="onboarding-next"
        >
          {isLast ? 'Finish' : 'Next'}
          {!isLast && <ChevronRightIcon className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
