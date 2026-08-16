import { test, expect } from '@playwright/test';

const allSlugs = [
  'loading-state', 'thinking', 'task-rows', 'streaming-text', 'code-block',
  'context-cards', 'approval-card', 'prompt-bar', 'selection-actions',
  'diff-table', 'records-table', 'filter-table', 'chat', 'search',
  'sidebar-nav', 'recommendation-card', 'insight-cards', 'tool-chips', 'fine-tune-card',
  'button', 'badge', 'avatar', 'tag', 'tooltip', 'toggle',
  'input', 'textarea', 'select', 'checkbox', 'radio', 'switch',
  'toast', 'alert', 'progress-bar', 'spinner', 'skeleton-block', 'empty-state', 'step-indicator',
  'tabs', 'breadcrumb', 'pagination', 'dropdown', 'modal', 'drawer', 'accordion',
  'data-card', 'timeline-view', 'file-tree', 'json-viewer', 'markdown-view', 'changelog', 'activity-feed',
  'agent-status', 'tool-call-card', 'model-selector', 'token-counter', 'conversation-list', 'system-prompt',
  'ai-chat-layout', 'dashboard-layout', 'agent-workbench', 'code-review', 'data-explorer', 'onboarding-wizard',
  'glimm-effect', 'gliding-highlight', 'morph-transition', 'confetti-effect',
  'typewriter-effect', 'number-ticker', 'progress-ring', 'ripple-effect', 'shake-animation', 'slide-reveal',
  'theme-switcher', 'theme-builder',
];

test.describe('Runtime Error Scan — All Component Pages', () => {
  for (const slug of allSlugs) {
    test(`/components/${slug} — no crash`, async ({ page }) => {
      const crashes: string[] = [];

      // Only catch actual uncaught exceptions (not hydration warnings)
      page.on('pageerror', (err) => {
        // Skip hydration mismatches - harmless in dev, absent in production
        if (err.message.includes('Hydration')) return;
        if (err.message.includes('Minified React error')) return;
        crashes.push(`${err.name}: ${err.message}`);
      });

      const response = await page.goto(`/components/${slug}`, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);

      // Wait for render
      await page.waitForTimeout(2000);

      // h1 should be visible (page rendered successfully)
      await expect(page.locator('h1')).toBeVisible();

      // Check for Next.js error overlay (red error box)
      const overlay = page.locator('#nextjs__container_errors_label');
      const overlayVisible = await overlay.isVisible().catch(() => false);

      if (crashes.length > 0) {
        console.log(`CRASH [${slug}]:`, crashes);
      }

      // Fail only on actual thrown errors or Next.js error overlay
      expect(crashes).toEqual([]);
      expect(overlayVisible).toBe(false);
    });
  }
});
