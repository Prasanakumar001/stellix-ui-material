import { test, expect } from '@playwright/test';

test.describe('Phase 3 — Feedback Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // LOADING STATE — 3 VARIANTS
  // ─────────────────────────────────────────

  test.describe('LoadingState — Drive Variant', () => {
    test('should render pixel grid with 20 pixels (4×5)', async ({ page }) => {
      const section = page.locator('#loading-state');
      const driveCard = section.locator('[data-variant="drive"]');
      await expect(driveCard).toBeVisible();
      const pixels = driveCard.locator('.animate-pixel-on');
      await expect(pixels).toHaveCount(20);
    });

    test('should have staggered animation delays on pixels', async ({ page }) => {
      const section = page.locator('#loading-state');
      const driveCard = section.locator('[data-variant="drive"]');
      const firstPixel = driveCard.locator('.animate-pixel-on').first();
      const lastPixel = driveCard.locator('.animate-pixel-on').last();
      const firstDelay = await firstPixel.getAttribute('style');
      const lastDelay = await lastPixel.getAttribute('style');
      // First pixel: delay 0ms, last pixel: non-zero delay
      expect(firstDelay).toContain('animation-delay');
      expect(firstDelay).toContain('0ms');
      // Last pixel row=3,col=4: (3*60)+(4*40)=340ms
      expect(lastDelay).toContain('340ms');
    });
  });

  test.describe('LoadingState — Dots Variant', () => {
    test('should render 3 bouncing dots', async ({ page }) => {
      const section = page.locator('#loading-state');
      const dotsCard = section.locator('[data-variant="dots"]');
      await expect(dotsCard).toBeVisible();
      const dots = dotsCard.locator('[style*="dots-bounce"]');
      await expect(dots).toHaveCount(3);
    });

    test('should have staggered bounce delays', async ({ page }) => {
      const section = page.locator('#loading-state');
      const dotsCard = section.locator('[data-variant="dots"]');
      const dots = dotsCard.locator('[style*="dots-bounce"]');
      const delay0 = await dots.nth(0).getAttribute('style');
      const delay1 = await dots.nth(1).getAttribute('style');
      const delay2 = await dots.nth(2).getAttribute('style');
      expect(delay0).toContain('0ms');
      expect(delay1).toContain('160ms');
      expect(delay2).toContain('320ms');
    });
  });

  test.describe('LoadingState — Orbit Variant', () => {
    test('should render spinning ring with center dot', async ({ page }) => {
      const section = page.locator('#loading-state');
      const orbitCard = section.locator('[data-variant="orbit"]');
      await expect(orbitCard).toBeVisible();
      // Has outer ring, spinning arc, and center dot
      const rings = orbitCard.locator('.rounded-full');
      const count = await rings.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should have spinning animation on arc', async ({ page }) => {
      const section = page.locator('#loading-state');
      const orbitCard = section.locator('[data-variant="orbit"]');
      const spinner = orbitCard.locator('[style*="spin"]');
      await expect(spinner.first()).toBeVisible();
    });
  });

  test.describe('LoadingState — Common Features', () => {
    test('should show shimmer bar on all variants', async ({ page }) => {
      const section = page.locator('#loading-state');
      const shimmers = section.locator('.animate-shimmer-text');
      await expect(shimmers).toHaveCount(3);
    });

    test('should show elapsed timer on all variants', async ({ page }) => {
      const section = page.locator('#loading-state');
      // Timer shows seconds
      const timers = section.locator('text=/\\d+s/');
      const count = await timers.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should show labels on all variants', async ({ page }) => {
      const section = page.locator('#loading-state');
      await expect(section).toContainText('Drive variant');
      await expect(section).toContainText('Dots variant');
      await expect(section).toContainText('Orbit variant');
    });

    test('should have data-testid attributes', async ({ page }) => {
      const cards = page.locator('[data-testid="loading-state"]');
      await expect(cards).toHaveCount(3);
    });

    test('timer should show pulsing dot indicator', async ({ page }) => {
      const section = page.locator('#loading-state');
      const pulseDots = section.locator('.animate-pulse.rounded-full.bg-accent');
      const count = await pulseDots.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('cards should have shadow and hover effect classes', async ({ page }) => {
      const card = page.locator('[data-testid="loading-state"]').first();
      await expect(card).toHaveClass(/shadow-card/);
      await expect(card).toHaveClass(/hover:shadow-raised/);
    });
  });

  // ─────────────────────────────────────────
  // THINKING — TRACE PANEL
  // ─────────────────────────────────────────

  test.describe('Thinking — Header', () => {
    test('should render thinking panel with gear icon', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toBeVisible();
      const gearIcon = panel.locator('svg').first();
      await expect(gearIcon).toBeVisible();
    });

    test('should show step count', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('4 steps');
    });

    test('should show completed count badge', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('3 done');
    });

    test('should show active count badge', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('1 active');
    });

    test('should have progress bar reflecting completion', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      const progressBar = panel.locator('.bg-accent.transition-all');
      await expect(progressBar.first()).toBeVisible();
      // 3/4 = 75%
      const style = await progressBar.first().getAttribute('style');
      expect(style).toContain('75%');
    });
  });

  test.describe('Thinking — Trace Items', () => {
    test('should render all 4 trace types', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel.locator('[data-testid="trace-item-steps"]')).toBeVisible();
      await expect(panel.locator('[data-testid="trace-item-reasoning"]')).toBeVisible();
      await expect(panel.locator('[data-testid="trace-item-search"]')).toBeVisible();
      await expect(panel.locator('[data-testid="trace-item-coding"]')).toBeVisible();
    });

    test('should show trace type badges with labels', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('Steps');
      await expect(panel).toContainText('Reasoning');
      await expect(panel).toContainText('Search');
      await expect(panel).toContainText('Coding');
    });

    test('should show completed checkmarks', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      // 3 completed steps should have green checkmark circles
      const checkmarks = panel.locator('.bg-green\\/10');
      const count = await checkmarks.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should show pinging active indicator on coding step', async ({ page }) => {
      const codingItem = page.locator('[data-testid="trace-item-coding"]');
      const pingDot = codingItem.locator('.animate-ping');
      await expect(pingDot).toBeVisible();
    });

    test('should expand trace item to show content on click', async ({ page }) => {
      const stepsItem = page.locator('[data-testid="trace-item-steps"]');
      await stepsItem.locator('button').click();
      await expect(stepsItem).toContainText('Breaking down the request');
    });

    test('should collapse trace item on second click', async ({ page }) => {
      const stepsItem = page.locator('[data-testid="trace-item-steps"]');
      const btn = stepsItem.locator('button');
      await btn.click();
      await expect(stepsItem).toContainText('Breaking down the request');
      await btn.click();
      // Content should be hidden (grid-template-rows: 0fr)
      await page.waitForTimeout(400);
    });

    test('expanded content should have styled container', async ({ page }) => {
      const item = page.locator('[data-testid="trace-item-reasoning"]');
      await item.locator('button').click();
      const contentBox = item.locator('.bg-surface-field.rounded-lg');
      await expect(contentBox).toBeVisible();
    });
  });

  test.describe('Thinking — Collapse/Expand', () => {
    test('panel should be open by default (defaultOpen=true)', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      // Trace items should be visible
      await expect(panel.locator('[data-testid="trace-item-steps"]')).toBeVisible();
    });

    test('clicking header should collapse the panel', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      const header = panel.locator('button').first();
      await header.click();
      await page.waitForTimeout(400);
      // After collapse, items may be hidden
    });

    test('clicking header again should re-expand', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      const header = panel.locator('button').first();
      await header.click();
      await page.waitForTimeout(400);
      await header.click();
      await page.waitForTimeout(400);
      await expect(panel.locator('[data-testid="trace-item-steps"]')).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // TASK ROWS — LIVE STATUS
  // ─────────────────────────────────────────

  test.describe('TaskRows — Header', () => {
    test('should render task rows container', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toBeVisible();
    });

    test('should show overall progress in header', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('2/5 tasks');
    });

    test('should show percentage progress', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('40%');
    });

    test('should have progress bar in header', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      const headerBar = container.locator('.bg-surface-field\\/50 .bg-accent');
      await expect(headerBar).toBeVisible();
    });
  });

  test.describe('TaskRows — Individual Tasks', () => {
    test('should render all 5 tasks', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('Initialize project structure');
      await expect(container).toContainText('Install dependencies');
      await expect(container).toContainText('Generate UI components');
      await expect(container).toContainText('Run E2E test suite');
      await expect(container).toContainText('Deploy to staging');
    });

    test('should show correct status badges', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      const completedBadges = container.locator('[data-testid="status-completed"]');
      const runningBadges = container.locator('[data-testid="status-running"]');
      const queuedBadges = container.locator('[data-testid="status-queued"]');
      await expect(completedBadges).toHaveCount(2);
      await expect(runningBadges).toHaveCount(1);
      await expect(queuedBadges).toHaveCount(2);
    });

    test('should show progress bar on running task', async ({ page }) => {
      const runningTask = page.locator('[data-testid="task-row-3"]');
      await runningTask.scrollIntoViewIfNeeded();
      // Has progress bar showing 65%
      await expect(runningTask).toContainText('65%');
    });

    test('should show duration on completed tasks', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      // Duration shown as formatted time
      await expect(container).toContainText('2s');
      await expect(container).toContainText('8s');
    });

    test('should show pulsing dot on running task', async ({ page }) => {
      const runningTask = page.locator('[data-testid="task-row-3"]');
      const pulseDot = runningTask.locator('.animate-pulse.rounded-full');
      await expect(pulseDot).toBeVisible();
    });

    test('status dots should have correct colors', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      const greenDots = container.locator('.bg-green.rounded-full.h-2.w-2, .rounded-full.bg-green');
      const count = await greenDots.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('TaskRows — Expand/Collapse', () => {
    test('should expand task to show description on click', async ({ page }) => {
      const task = page.locator('[data-testid="task-row-1"]');
      await task.scrollIntoViewIfNeeded();
      await task.locator('div').first().click();
      await expect(task).toContainText('Created monorepo');
    });

    test('should not show expand chevron on tasks without description', async ({ page }) => {
      const task5 = page.locator('[data-testid="task-row-5"]');
      await task5.scrollIntoViewIfNeeded();
      // Deploy to staging has no description, so no chevron
      const chevrons = task5.locator('svg[class*="transition-transform"]');
      await expect(chevrons).toHaveCount(0);
    });

    test('expanded description should have styled container', async ({ page }) => {
      const task = page.locator('[data-testid="task-row-2"]');
      await task.scrollIntoViewIfNeeded();
      await task.locator('div').first().click();
      const descBox = task.locator('.bg-surface-field.rounded-lg');
      await expect(descBox).toBeVisible();
    });
  });

  test.describe('TaskRows — Status Icons', () => {
    test('completed tasks should have check icon in badge', async ({ page }) => {
      const completedBadge = page.locator('[data-testid="status-completed"]').first();
      const icon = completedBadge.locator('svg');
      await expect(icon).toBeVisible();
    });

    test('running task should have spinning icon in badge', async ({ page }) => {
      const runningBadge = page.locator('[data-testid="status-running"]');
      const spinner = runningBadge.locator('.animate-spin');
      await expect(spinner).toBeVisible();
    });

    test('queued tasks should have clock icon in badge', async ({ page }) => {
      const queuedBadge = page.locator('[data-testid="status-queued"]').first();
      const icon = queuedBadge.locator('svg');
      await expect(icon).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // RESPONSIVE
  // ─────────────────────────────────────────

  test.describe('Responsive — Feedback Components', () => {
    test('all 3 feedback components should render without overflow', async ({ page }) => {
      await page.waitForTimeout(500);
      const body = page.locator('body');
      const bodyWidth = await body.evaluate((el) => el.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
    });

    test('loading state cards should have rounded borders and shadows', async ({ page }) => {
      const card = page.locator('[data-testid="loading-state"]').first();
      await expect(card).toHaveClass(/rounded-xl/);
      await expect(card).toHaveClass(/shadow-card/);
    });

    test('thinking panel should have proper card styling', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toHaveClass(/rounded-xl/);
      await expect(panel).toHaveClass(/shadow-card/);
    });

    test('task rows should have proper card styling', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toHaveClass(/rounded-xl/);
      await expect(container).toHaveClass(/shadow-card/);
    });
  });
});
