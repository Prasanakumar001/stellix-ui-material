'use client';

import React, { useState } from 'react';
import { ShieldCheckIcon, CommandLineIcon } from '@heroicons/react/24/outline';

const ariaAttributes = [
  { attribute: 'aria-label', components: 'Button, Avatar, Spinner, Toggle, Switch, Input, Textarea, Select, Checkbox, Radio', purpose: 'Provides an accessible name when visible text is absent.' },
  { attribute: 'aria-labelledby', components: 'Modal, Drawer, Alert, Toast', purpose: 'Associates a heading element as the accessible name of the region.' },
  { attribute: 'aria-describedby', components: 'Input, Textarea, Select, Checkbox, Radio', purpose: 'Points to helper text or error messages that describe the field.' },
  { attribute: 'aria-live', components: 'Toast, Alert, LoadingState, NumberTicker', purpose: 'Announces dynamic content changes to screen readers.' },
  { attribute: 'aria-expanded', components: 'Accordion, Dropdown, Drawer, Sidebar', purpose: 'Indicates whether a collapsible region is open or closed.' },
  { attribute: 'aria-haspopup', components: 'Dropdown, Tooltip, Modal', purpose: 'Signals that activating the element opens a popup layer.' },
  { attribute: 'aria-selected', components: 'Tabs, Select, Radio', purpose: 'Marks the currently selected item in a set of options.' },
  { attribute: 'aria-checked', components: 'Checkbox, Switch, Toggle, Radio', purpose: 'Reports the checked state of form controls.' },
  { attribute: 'aria-disabled', components: 'Button, Input, Select, Toggle', purpose: 'Communicates that an element is present but not interactive.' },
  { attribute: 'aria-busy', components: 'Spinner, ProgressBar, LoadingState', purpose: 'Tells assistive technology that content is still loading.' },
  { attribute: 'aria-valuenow', components: 'ProgressBar, ProgressRing, Slider', purpose: 'Gives the current numeric value of a range widget.' },
  { attribute: 'aria-valuemin', components: 'ProgressBar, ProgressRing, Slider', purpose: 'Sets the minimum allowed value for a range widget.' },
  { attribute: 'aria-valuemax', components: 'ProgressBar, ProgressRing, Slider', purpose: 'Sets the maximum allowed value for a range widget.' },
  { attribute: 'aria-modal', components: 'Modal, Drawer', purpose: 'Restricts screen reader navigation to the modal region while open.' },
  { attribute: 'aria-current', components: 'Breadcrumb, Pagination, SidebarNav', purpose: 'Identifies the active item in a navigation sequence.' },
  { attribute: 'role="status"', components: 'Spinner, Toast (info/success)', purpose: 'Live region that announces non-critical updates politely.' },
  { attribute: 'role="alert"', components: 'Toast (error/warning), Alert', purpose: 'Live region that announces critical updates immediately.' },
  { attribute: 'role="dialog"', components: 'Modal, Drawer', purpose: 'Marks the container as a dialog requiring user interaction.' },
  { attribute: 'role="progressbar"', components: 'ProgressBar, ProgressRing', purpose: 'Exposes progress to assistive technology with ARIA value attributes.' },
  { attribute: 'role="tab"', components: 'Tabs', purpose: 'Marks a tab button within a tablist.' },
];

const keyboardShortcuts = [
  { key: 'Tab', action: 'Move focus forward through interactive elements' },
  { key: 'Shift + Tab', action: 'Move focus backward through interactive elements' },
  { key: 'Enter', action: 'Activate buttons, links, and selected option in dropdowns' },
  { key: 'Space', action: 'Toggle checkboxes, switches, and radio buttons; open dropdowns' },
  { key: 'Escape', action: 'Close modals, drawers, dropdowns, tooltips, and toasts' },
  { key: 'Arrow Up / Down', action: 'Navigate options in dropdowns, selects, and accordion items' },
  { key: 'Arrow Left / Right', action: 'Switch between tabs; navigate pagination' },
  { key: 'Home', action: 'Move to the first item in a list or select' },
  { key: 'End', action: 'Move to the last item in a list or select' },
  { key: 'Page Up / Down', action: 'Scroll long lists or modal content by large steps' },
];

export default function AccessibilityPage() {
  const [focusDemo, setFocusDemo] = useState(false);

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Accessibility</h1>
        </div>
        <p className="mt-2 text-sm text-ink-2 max-w-2xl">
          Stellix UI Material is built to WCAG 2.1 AA standards. Every component ships with
          correct ARIA attributes, full keyboard navigation, focus-visible rings, and
          reduced-motion support out of the box.
        </p>
      </div>

      {/* WCAG compliance summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">WCAG 2.1 AA Compliance</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { criterion: '1.4.3 Contrast (Minimum)', status: 'pass', note: '4.5:1 for normal text, 3:1 for large text in both light and dark themes.' },
            { criterion: '1.4.4 Resize Text', status: 'pass', note: 'All text remains readable at 200% zoom without horizontal scrolling.' },
            { criterion: '1.4.11 Non-text Contrast', status: 'pass', note: 'UI components and focus indicators meet 3:1 contrast ratio.' },
            { criterion: '2.1.1 Keyboard', status: 'pass', note: 'All functionality is operable from a keyboard without requiring specific timings.' },
            { criterion: '2.4.7 Focus Visible', status: 'pass', note: 'Focus ring is clearly visible on all interactive elements via focus-visible.' },
            { criterion: '4.1.2 Name, Role, Value', status: 'pass', note: 'All components expose name, role, and value to assistive technologies via ARIA.' },
            { criterion: '1.3.1 Info and Relationships', status: 'pass', note: 'Semantic HTML elements and ARIA roles communicate structure to screen readers.' },
            { criterion: '2.4.3 Focus Order', status: 'pass', note: 'Tab order follows the visual reading order within all components.' },
            { criterion: '1.4.13 Content on Hover', status: 'pass', note: 'Tooltip content persists when the pointer moves to it and is dismissible via Escape.' },
          ].map(({ criterion, status, note }) => (
            <div key={criterion} className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-ink leading-tight">{criterion}</span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                  status === 'pass' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'
                }`}>
                  {status}
                </span>
              </div>
              <p className="text-xs text-ink-3 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARIA attributes table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">ARIA Attributes Reference</h2>
        <p className="text-sm text-ink-2">
          All ARIA attributes are applied automatically by the component. You do not need to add them manually.
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-ink-3">Attribute / Role</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-ink-3">Used in</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-ink-3">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {ariaAttributes.map(({ attribute, components, purpose }) => (
                <tr key={attribute} className="border-b border-line last:border-b-0 hover:bg-surface-field/50">
                  <td className="px-4 py-2.5 font-mono text-xs text-accent whitespace-nowrap">{attribute}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-2">{components}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-3 leading-relaxed">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard navigation */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <CommandLineIcon className="h-5 w-5 text-accent" />
          Keyboard Navigation
        </h2>
        <p className="text-sm text-ink-2">
          Every interactive component is fully navigable using the standard keyboard conventions below.
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-field">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-ink-3">Key</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-ink-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {keyboardShortcuts.map(({ key, action }) => (
                <tr key={key} className="border-b border-line last:border-b-0 hover:bg-surface-field/50">
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <kbd className="inline-flex items-center rounded-md border border-line bg-surface-field px-2 py-0.5 font-mono text-xs text-ink shadow-btn">
                      {key}
                    </kbd>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-ink-2">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reduced motion */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">Reduced Motion Support</h2>
        <div className="rounded-xl border border-line bg-surface p-5 shadow-card space-y-3">
          <p className="text-sm text-ink-2 leading-relaxed">
            All animated components in Stellix UI Material respect the operating system preference
            for reduced motion. When a user enables the
            {' '}<span className="font-medium text-ink">Reduce Motion</span>{' '}
            setting (on macOS, Windows, iOS, or Android), all transitions and keyframe animations
            are automatically disabled or reduced to simple opacity fades.
          </p>
          <p className="text-sm text-ink-2 leading-relaxed">
            This is implemented via the{' '}
            <code className="rounded bg-surface-field px-1.5 py-0.5 font-mono text-xs text-accent">
              @media (prefers-reduced-motion: reduce)
            </code>{' '}
            CSS media query applied globally in the Tailwind theme configuration and in individual
            component animation keyframes. Components affected include: GlimmEffect, GlidingHighlight,
            MorphTransition, ConfettiEffect, TypewriterEffect, NumberTicker, ProgressRing, RippleEffect,
            ShakeAnimation, SlideReveal, Spinner, ProgressBar (indeterminate), SkeletonBlock, and LoadingState.
          </p>
          <div className="rounded-lg border border-line bg-[#1e1e1e] p-4 font-mono text-xs text-[#d4d4d4] overflow-x-auto">
            <span className="text-[#569cd6]">@media</span>{' '}
            <span className="text-[#9cdcfe]">(prefers-reduced-motion: reduce)</span>{' '}
            {'{'}<br />
            {'  '}<span className="text-[#9cdcfe]">*, *::before, *::after</span>{' '}{'{'}<br />
            {'    '}<span className="text-[#9cdcfe]">animation-duration</span>
            {': '}<span className="text-[#b5cea8]">0.01ms</span>{' !important;'}<br />
            {'    '}<span className="text-[#9cdcfe]">animation-iteration-count</span>
            {': '}<span className="text-[#b5cea8]">1</span>{' !important;'}<br />
            {'    '}<span className="text-[#9cdcfe]">transition-duration</span>
            {': '}<span className="text-[#b5cea8]">0.01ms</span>{' !important;'}<br />
            {'  '}{'}'}<br />
            {'}'}
          </div>
        </div>
      </section>

      {/* Focus-visible demo */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">Focus-Visible Ring Demo</h2>
        <p className="text-sm text-ink-2">
          Tab into the buttons below to see the focus ring in action. The ring only appears for
          keyboard navigation and is suppressed for mouse/touch interactions using the
          {' '}<code className="rounded bg-surface-field px-1.5 py-0.5 font-mono text-xs text-accent">:focus-visible</code>{' '}
          CSS pseudo-class.
        </p>
        <div className="flex flex-wrap gap-3 rounded-xl border border-line bg-surface-canvas p-8">
          {['Primary action', 'Secondary', 'Ghost button', 'Outline'].map((label, i) => (
            <button
              key={label}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                ${i === 0 ? 'bg-accent text-white hover:bg-accent/90' :
                  i === 1 ? 'bg-surface-field text-ink hover:bg-surface-field/70' :
                  i === 2 ? 'bg-transparent text-ink hover:bg-surface-field' :
                  'border border-line bg-transparent text-ink hover:bg-surface-field'}`}
            >
              {label}
            </button>
          ))}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={focusDemo}
              onChange={(e) => setFocusDemo(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-accent
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
            <span className="text-sm text-ink-2">Checkbox example</span>
          </label>
        </div>
        <p className="text-xs text-ink-3">
          Click anywhere to dismiss focus, then press Tab to cycle through the controls above.
          Focus rings use a 2px solid accent-colour ring with a 2px transparent offset for clarity.
        </p>
      </section>
    </div>
  );
}
