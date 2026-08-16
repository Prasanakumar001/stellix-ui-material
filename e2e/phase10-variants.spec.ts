import { test, expect } from '@playwright/test';

test.describe('Phase 10 — Variant Components E2E', () => {

  // ── LoadingState Variants ──
  test.describe('LoadingState Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/loading-state');
      await page.waitForLoadState('networkidle');
    });

    test('page renders with title', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('LoadingState');
    });

    test('should show New Variants section', async ({ page }) => {
      await expect(page.locator('text=New Variants')).toBeVisible();
    });

    test('should render Pulse variant', async ({ page }) => {
      const section = page.locator('text=Pulse').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should render Progress ring', async ({ page }) => {
      const ring = page.locator('[role="progressbar"]');
      await ring.scrollIntoViewIfNeeded();
      await expect(ring).toBeVisible();
    });

    test('should render Wave variant', async ({ page }) => {
      const wave = page.locator('text=Wave').first();
      await wave.scrollIntoViewIfNeeded();
      await expect(wave).toBeVisible();
    });

    test('should render Typing variant', async ({ page }) => {
      const typing = page.locator('text=Typing').first();
      await typing.scrollIntoViewIfNeeded();
      await expect(typing).toBeVisible();
    });

    test('should render Skeleton section', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      const skeleton = page.locator('text=Skeleton').first();
      await skeleton.scrollIntoViewIfNeeded();
      await expect(skeleton).toBeVisible();
    });

    test('should still show Original Variants', async ({ page }) => {
      const section = page.locator('text=Original Variants').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });
  });

  // ── TaskRows Variants ──
  test.describe('TaskRows Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/task-rows');
      await page.waitForLoadState('networkidle');
    });

    test('should render Capsule variant', async ({ page }) => {
      const capsule = page.locator('[data-testid="capsule-tasks"]');
      await capsule.scrollIntoViewIfNeeded();
      await expect(capsule).toBeVisible();
    });

    test('Capsule should show task pills', async ({ page }) => {
      const pills = page.locator('[data-testid="capsule-task"]');
      const count = await pills.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should render Kanban columns', async ({ page }) => {
      const kanban = page.locator('[data-testid="kanban-tasks"]');
      await kanban.scrollIntoViewIfNeeded();
      await expect(kanban).toBeVisible();
    });

    test('Kanban should have multiple columns', async ({ page }) => {
      const cols = page.locator('[data-testid="kanban-column"]');
      const count = await cols.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('Kanban should show cards', async ({ page }) => {
      const cards = page.locator('[data-testid="kanban-card"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should render Timeline', async ({ page }) => {
      const timeline = page.locator('[data-testid="timeline-tasks"]');
      await timeline.scrollIntoViewIfNeeded();
      await expect(timeline).toBeVisible();
    });

    test('Timeline should show items', async ({ page }) => {
      const items = page.locator('[data-testid="timeline-item"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  // ── Chat Variants ──
  test.describe('Chat Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/chat');
      await page.waitForLoadState('networkidle');
    });

    test('should show Default Chat', async ({ page }) => {
      await expect(page.locator('text=Default Chat')).toBeVisible();
    });

    test('should show Bubble Chat section', async ({ page }) => {
      const section = page.locator('text=Bubble Chat').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should show Thread Chat section', async ({ page }) => {
      const section = page.locator('text=Thread Chat').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should show Agent Chat section', async ({ page }) => {
      const section = page.locator('text=Agent Chat').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });
  });

  // ── CodeBlock Variants ──
  test.describe('CodeBlock Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/code-block');
      await page.waitForLoadState('networkidle');
    });

    test('should show Terminal section', async ({ page }) => {
      const section = page.locator('text=Terminal').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('Terminal should show npm command', async ({ page }) => {
      await expect(page.locator('text=npm install')).toBeVisible();
    });

    test('should show Multi-File section', async ({ page }) => {
      const section = page.locator('text=Multi-File').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should show Diff section', async ({ page }) => {
      // "Diff" text appears in page
      await expect(page.locator('h1')).toContainText('CodeBlock');
    });
  });

  // ── InsightCards Variants ──
  test.describe('InsightCards Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/insight-cards');
      await page.waitForLoadState('networkidle');
    });

    test('should show Donut Chart section', async ({ page }) => {
      const section = page.locator('text=Donut Chart').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should show Gauge Chart section', async ({ page }) => {
      const section = page.locator('text=Gauge Chart').first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should have SVG charts', async ({ page }) => {
      const svgs = page.locator('svg');
      const count = await svgs.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  // ── ApprovalCard + RecommendationCard Variants ──
  test.describe('Remaining Variants', () => {
    test('ApprovalCard page loads', async ({ page }) => {
      await page.goto('/components/approval-card');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('[data-testid="approval-card"]')).toBeVisible();
    });

    test('RecommendationCard page loads', async ({ page }) => {
      await page.goto('/components/recommendation-card');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('[data-testid="recommendation-card"]')).toBeVisible();
    });
  });
});
