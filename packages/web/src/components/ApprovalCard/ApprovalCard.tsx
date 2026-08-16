'use client';

import React, { useState } from 'react';
import { cn, type ApprovalCardProps } from '@stellix/ui-core';
import { CheckIcon } from '../Icons';
import {
  ShieldExclamationIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

/* ── Risk level indicator ── */
function RiskBadge({ level }: { level?: 'low' | 'medium' | 'high' }) {
  if (!level) return null;
  const config = {
    low: { label: 'Low risk', color: 'bg-green/10 text-green border-green/20' },
    medium: { label: 'Medium risk', color: 'bg-orange/10 text-orange border-orange/20' },
    high: { label: 'High risk', color: 'bg-red/10 text-red border-red/20' },
  };
  const c = config[level];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium', c.color)} data-testid="risk-badge">
      <ShieldExclamationIcon className="h-3 w-3" />
      {c.label}
    </span>
  );
}

/* ── Option card ── */
function OptionCard({
  option,
  selected,
  type,
  onToggle,
  index,
}: {
  option: { id: string; label: string; description?: string };
  selected: boolean;
  type: 'radio' | 'checkbox';
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      onClick={onToggle}
      role={type === 'radio' ? 'radio' : 'checkbox'}
      tabIndex={0}
      aria-checked={selected}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all duration-200 animate-fade-up',
        selected
          ? 'border-accent bg-accent/5 shadow-btn'
          : 'border-line hover:border-ink-3 hover:bg-surface-field/50',
      )}
      style={{ animationDelay: `${index * 60}ms` }}
      data-testid="approval-option"
      data-selected={selected}
    >
      {/* Custom radio/checkbox indicator */}
      <div className={cn(
        'mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        type === 'checkbox' && 'rounded',
        selected ? 'border-accent bg-accent' : 'border-ink-3',
      )}>
        {selected && <CheckIcon className="h-3 w-3 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className={cn('text-sm font-medium', selected ? 'text-accent' : 'text-ink')}>
          {option.label}
        </span>
        {option.description && (
          <p className="mt-0.5 text-xs text-ink-2 leading-relaxed">{option.description}</p>
        )}
      </div>
    </div>
  );
}

/* ── Main ApprovalCard ── */
export function ApprovalCard({
  title,
  description,
  options,
  type = 'radio',
  allowCustom = false,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState('');

  const handleToggle = (id: string) => {
    if (type === 'radio') {
      setSelected([id]);
    } else {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
      );
    }
  };

  const hasSelection = selected.length > 0 || customValue.trim().length > 0;
  const selectedCount = selected.length;

  return (
    <div
      className={cn(
        'animate-pop-in rounded-xl border border-line bg-surface shadow-card',
        'p-4 sm:p-6',
      )}
      data-testid="approval-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <ShieldExclamationIcon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink sm:text-lg" data-testid="approval-title">{title}</h3>
            {description && (
              <p className="mt-0.5 text-sm text-ink-2" data-testid="approval-description">{description}</p>
            )}
          </div>
        </div>
        <RiskBadge level="medium" />
      </div>

      {/* Options */}
      <div className="mt-4 space-y-2" data-testid="approval-options" role={type === 'radio' ? 'radiogroup' : 'group'} aria-label="Approval options">
        {options.map((option, i) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected.includes(option.id)}
            type={type}
            onToggle={() => handleToggle(option.id)}
            index={i}
          />
        ))}
      </div>

      {/* Custom input */}
      {allowCustom && (
        <div className="mt-3 relative" data-testid="custom-input-wrapper">
          <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Custom response..."
            className={cn(
              'w-full rounded-lg border border-line bg-surface-field pl-9 pr-3 py-2.5',
              'text-sm text-ink placeholder:text-ink-3',
              'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
              'transition-colors',
            )}
            data-testid="custom-input"
          />
        </div>
      )}

      {/* Selection summary */}
      {selectedCount > 0 && type === 'checkbox' && (
        <p className="mt-3 text-xs text-ink-3" data-testid="selection-count">
          {selectedCount} option{selectedCount > 1 ? 's' : ''} selected
        </p>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 sm:justify-end" data-testid="approval-actions">
        <button
          onClick={onReject}
          className={cn(
            'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-4 py-2.5',
            'text-sm font-medium text-ink',
            'hover:bg-surface-field hover:border-ink-3 transition-colors',
            'sm:flex-none',
          )}
          data-testid="reject-btn"
          aria-label="Reject"
        >
          <XMarkIcon className="h-4 w-4" />
          Reject
        </button>
        <button
          onClick={() => onApprove?.(customValue ? [...selected, `custom:${customValue}`] : selected)}
          disabled={!hasSelection}
          className={cn(
            'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5',
            'text-sm font-medium text-white',
            'bg-accent hover:bg-accent/90 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'sm:flex-none',
          )}
          data-testid="approve-btn"
          aria-label="Approve"
        >
          <CheckCircleIcon className="h-4 w-4" />
          Approve
        </button>
      </div>
    </div>
  );
}
