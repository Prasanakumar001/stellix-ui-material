import { test, expect } from '@playwright/test';

test.describe('Phase 12 — Composition Patterns E2E', () => {

  test.describe('AIChatLayout', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/ai-chat-layout'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('AIChatLayout');
    });
    test('renders chat sidebar', async ({ page }) => {
      const cl = page.locator('[data-testid="chat-sidebar"]');
      await expect(cl).toBeVisible();
    });
    test('renders chat main area', async ({ page }) => {
      const msgs = page.locator('[data-testid="chat-main"]');
      await expect(msgs).toBeVisible();
    });
    test('renders prompt bar', async ({ page }) => {
      const pb = page.locator('[data-testid="chat-promptbar"]');
      await expect(pb).toBeVisible();
    });
  });

  test.describe('DashboardLayout', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/dashboard-layout'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('DashboardLayout');
    });
    test('renders data cards', async ({ page }) => {
      const cards = page.locator('[data-testid="data-card"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
    test('renders insight charts', async ({ page }) => {
      const charts = page.locator('[data-testid="insight-card"]');
      const count = await charts.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('AgentWorkbench', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/agent-workbench'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('AgentWorkbench');
    });
    test('renders agent status', async ({ page }) => {
      const status = page.locator('[data-testid="agent-status"]');
      await expect(status.first()).toBeVisible();
    });
    test('renders thinking panel', async ({ page }) => {
      const thinking = page.locator('[data-testid="thinking-panel"]');
      await expect(thinking).toBeVisible();
    });
  });

  test.describe('CodeReview', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/code-review'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('CodeReview');
    });
    test('renders diff table', async ({ page }) => {
      const diff = page.locator('[data-testid="diff-table"]');
      await expect(diff).toBeVisible();
    });
  });

  test.describe('DataExplorer', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/data-explorer'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('DataExplorer');
    });
    test('renders filter chips', async ({ page }) => {
      const chips = page.locator('[data-testid="filter-chip"]');
      const count = await chips.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
    test('renders records table', async ({ page }) => {
      const table = page.locator('[data-testid="records-table"]');
      await expect(table).toBeVisible();
    });
  });

  test.describe('OnboardingWizard', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/onboarding-wizard'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('OnboardingWizard');
    });
    test('renders step indicator', async ({ page }) => {
      const steps = page.locator('[data-testid="step-indicator"]');
      await expect(steps).toBeVisible();
    });
  });

  test.describe('All Composition Pages Load', () => {
    const slugs = ['ai-chat-layout', 'dashboard-layout', 'agent-workbench', 'code-review', 'data-explorer', 'onboarding-wizard'];
    for (const slug of slugs) {
      test(`/components/${slug} renders 200`, async ({ page }) => {
        const res = await page.goto(`/components/${slug}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator('h1')).toBeVisible();
      });
    }
  });
});
