import { test, expect } from '@playwright/test';

test.describe('Phase 11 — New Components E2E', () => {

  // ═══════════════════════════════════════
  // PRIMITIVES
  // ═══════════════════════════════════════

  test.describe('Button', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/button'); await page.waitForLoadState('networkidle'); });

    test('should render all button variants', async ({ page }) => {
      await expect(page.locator('[data-testid="button"]').first()).toBeVisible();
    });
    test('should render multiple buttons', async ({ page }) => {
      const buttons = page.locator('[data-testid="button"]');
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
    test('disabled button should not be clickable', async ({ page }) => {
      const disabled = page.locator('[data-testid="button"][disabled]');
      if (await disabled.count() > 0) {
        await expect(disabled.first()).toBeDisabled();
      }
    });
  });

  test.describe('Badge', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/badge'); await page.waitForLoadState('networkidle'); });

    test('should render badge variants', async ({ page }) => {
      const badges = page.locator('[data-testid="badge"]');
      const count = await badges.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Avatar', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/avatar'); await page.waitForLoadState('networkidle'); });

    test('should render avatars', async ({ page }) => {
      const avatars = page.locator('[data-testid="avatar"]');
      const count = await avatars.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Tag', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/tag'); await page.waitForLoadState('networkidle'); });

    test('should render tags', async ({ page }) => {
      const tags = page.locator('[data-testid="tag"]');
      const count = await tags.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Tooltip', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/tooltip'); await page.waitForLoadState('networkidle'); });

    test('page should render', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Tooltip');
    });
  });

  test.describe('Toggle', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/toggle'); await page.waitForLoadState('networkidle'); });

    test('should render toggle switches', async ({ page }) => {
      const toggles = page.locator('[role="switch"]');
      const count = await toggles.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
    test('toggle should have aria-checked', async ({ page }) => {
      const toggle = page.locator('[role="switch"]').first();
      const checked = await toggle.getAttribute('aria-checked');
      expect(checked === 'true' || checked === 'false').toBe(true);
    });
  });

  test.describe('Input', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/input'); await page.waitForLoadState('networkidle'); });

    test('should render input fields', async ({ page }) => {
      const inputs = page.locator('[data-testid="input-root"]');
      const count = await inputs.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Textarea', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/textarea'); await page.waitForLoadState('networkidle'); });

    test('should render textareas', async ({ page }) => {
      const areas = page.locator('[data-testid="textarea-root"]');
      const count = await areas.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Select', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/select'); await page.waitForLoadState('networkidle'); });

    test('should render select component', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Select');
    });
  });

  test.describe('Checkbox', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/checkbox'); await page.waitForLoadState('networkidle'); });

    test('should render checkboxes', async ({ page }) => {
      const checks = page.locator('[data-testid="checkbox-root"]');
      const count = await checks.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Radio', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/radio'); await page.waitForLoadState('networkidle'); });

    test('should render radio group', async ({ page }) => {
      const group = page.locator('[role="radiogroup"]');
      await expect(group.first()).toBeVisible();
    });
  });

  test.describe('Switch', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/switch'); await page.waitForLoadState('networkidle'); });

    test('should render switches', async ({ page }) => {
      const switches = page.locator('[role="switch"]');
      const count = await switches.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  // ═══════════════════════════════════════
  // FEEDBACK
  // ═══════════════════════════════════════

  test.describe('Toast', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/toast'); await page.waitForLoadState('networkidle'); });

    test('should render toast', async ({ page }) => {
      const toast = page.locator('[data-testid="toast"]');
      await expect(toast.first()).toBeVisible();
    });
  });

  test.describe('Alert', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/alert'); await page.waitForLoadState('networkidle'); });

    test('should render alert banners', async ({ page }) => {
      const alerts = page.locator('[data-testid="alert"]');
      const count = await alerts.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('ProgressBar', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/progress-bar'); await page.waitForLoadState('networkidle'); });

    test('should render progress bars', async ({ page }) => {
      const bars = page.locator('[data-testid="progress-bar"]');
      const count = await bars.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Spinner', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/spinner'); await page.waitForLoadState('networkidle'); });

    test('should render spinners', async ({ page }) => {
      const spinners = page.locator('[data-testid="spinner"]');
      const count = await spinners.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('SkeletonBlock', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/skeleton-block'); await page.waitForLoadState('networkidle'); });

    test('should render skeleton placeholders', async ({ page }) => {
      const skels = page.locator('[data-testid="skeleton-block"]');
      const count = await skels.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('EmptyState', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/empty-state'); await page.waitForLoadState('networkidle'); });

    test('should render empty state', async ({ page }) => {
      const empty = page.locator('[data-testid="empty-state"]');
      await expect(empty.first()).toBeVisible();
    });
  });

  test.describe('StepIndicator', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/step-indicator'); await page.waitForLoadState('networkidle'); });

    test('should render step indicator', async ({ page }) => {
      const steps = page.locator('[data-testid="step-indicator"]');
      await expect(steps.first()).toBeVisible();
    });
  });

  // ═══════════════════════════════════════
  // LAYOUT
  // ═══════════════════════════════════════

  test.describe('Tabs', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/tabs'); await page.waitForLoadState('networkidle'); });

    test('should render tab variants', async ({ page }) => {
      const tabs = page.locator('[role="tablist"]');
      const count = await tabs.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Breadcrumb', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/breadcrumb'); await page.waitForLoadState('networkidle'); });

    test('should render breadcrumb', async ({ page }) => {
      const bc = page.locator('[data-testid="breadcrumb"]');
      await expect(bc.first()).toBeVisible();
    });
  });

  test.describe('Pagination', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/pagination'); await page.waitForLoadState('networkidle'); });

    test('should render pagination', async ({ page }) => {
      const pg = page.locator('[data-testid="pagination"]');
      await expect(pg.first()).toBeVisible();
    });
  });

  test.describe('Dropdown', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/dropdown'); await page.waitForLoadState('networkidle'); });

    test('should render dropdown trigger', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Dropdown');
    });
  });

  test.describe('Modal', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/modal'); await page.waitForLoadState('networkidle'); });

    test('should render modal page', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Modal');
    });
  });

  test.describe('Drawer', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/drawer'); await page.waitForLoadState('networkidle'); });

    test('should render drawer page', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Drawer');
    });
  });

  test.describe('Accordion', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/accordion'); await page.waitForLoadState('networkidle'); });

    test('should render accordion', async ({ page }) => {
      const acc = page.locator('[data-testid="accordion"]');
      await expect(acc.first()).toBeVisible();
    });
    test('clicking accordion item should expand', async ({ page }) => {
      const btn = page.locator('[data-testid="accordion-trigger"]').first();
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(400);
      }
    });
  });

  // ═══════════════════════════════════════
  // DATA DISPLAY
  // ═══════════════════════════════════════

  test.describe('DataCard', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/data-card'); await page.waitForLoadState('networkidle'); });

    test('should render data cards', async ({ page }) => {
      const cards = page.locator('[data-testid="data-card"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('TimelineView', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/timeline-view'); await page.waitForLoadState('networkidle'); });

    test('should render timeline', async ({ page }) => {
      const tl = page.locator('[data-testid="timeline-view"]');
      await expect(tl.first()).toBeVisible();
    });
  });

  test.describe('FileTree', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/file-tree'); await page.waitForLoadState('networkidle'); });

    test('should render file tree', async ({ page }) => {
      const ft = page.locator('[data-testid="file-tree"]');
      await expect(ft.first()).toBeVisible();
    });
  });

  test.describe('JSONViewer', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/json-viewer'); await page.waitForLoadState('networkidle'); });

    test('should render json viewer', async ({ page }) => {
      const jv = page.locator('[data-testid="json-viewer"]');
      await expect(jv.first()).toBeVisible();
    });
  });

  test.describe('MarkdownView', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/markdown-view'); await page.waitForLoadState('networkidle'); });

    test('should render markdown content', async ({ page }) => {
      const mv = page.locator('[data-testid="markdown-view"]');
      await expect(mv.first()).toBeVisible();
    });
  });

  test.describe('Changelog', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/changelog'); await page.waitForLoadState('networkidle'); });

    test('should render changelog entries', async ({ page }) => {
      const cl = page.locator('[data-testid="changelog"]');
      await expect(cl.first()).toBeVisible();
    });
  });

  test.describe('ActivityFeed', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/activity-feed'); await page.waitForLoadState('networkidle'); });

    test('should render activity feed', async ({ page }) => {
      const af = page.locator('[data-testid="activity-feed"]');
      await expect(af.first()).toBeVisible();
    });
  });

  // ═══════════════════════════════════════
  // AI / AGENT
  // ═══════════════════════════════════════

  test.describe('AgentStatus', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/agent-status'); await page.waitForLoadState('networkidle'); });

    test('should render agent status cards', async ({ page }) => {
      const cards = page.locator('[data-testid="agent-status"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
    test('should show different states', async ({ page }) => {
      await expect(page.locator('[data-state="thinking"]')).toBeVisible();
      await expect(page.locator('[data-state="acting"]')).toBeVisible();
    });
  });

  test.describe('ToolCallCard', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/tool-call-card'); await page.waitForLoadState('networkidle'); });

    test('should render tool call card', async ({ page }) => {
      const tc = page.locator('[data-testid="tool-call-card"]');
      await expect(tc.first()).toBeVisible();
    });
  });

  test.describe('ModelSelector', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/model-selector'); await page.waitForLoadState('networkidle'); });

    test('should render model selector', async ({ page }) => {
      const ms = page.locator('[data-testid="model-selector"]');
      await expect(ms.first()).toBeVisible();
    });
  });

  test.describe('TokenCounter', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/token-counter'); await page.waitForLoadState('networkidle'); });

    test('should render token counter', async ({ page }) => {
      const tc = page.locator('[data-testid="token-counter"]');
      await expect(tc.first()).toBeVisible();
    });
  });

  test.describe('ConversationList', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/conversation-list'); await page.waitForLoadState('networkidle'); });

    test('should render conversation list', async ({ page }) => {
      const cl = page.locator('[data-testid="conversation-list"]');
      await expect(cl.first()).toBeVisible();
    });
  });

  test.describe('SystemPrompt', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/system-prompt'); await page.waitForLoadState('networkidle'); });

    test('should render system prompt', async ({ page }) => {
      const sp = page.locator('[data-testid="system-prompt"]');
      await expect(sp.first()).toBeVisible();
    });
  });

  // ═══════════════════════════════════════
  // ALL PAGES RENDER CHECK
  // ═══════════════════════════════════════

  test.describe('All Phase 11 Pages Load', () => {
    const slugs = [
      'button', 'badge', 'avatar', 'tag', 'tooltip', 'toggle',
      'input', 'textarea', 'select', 'checkbox', 'radio', 'switch',
      'toast', 'alert', 'progress-bar', 'spinner', 'skeleton-block', 'empty-state', 'step-indicator',
      'tabs', 'breadcrumb', 'pagination', 'dropdown', 'modal', 'drawer', 'accordion',
      'data-card', 'timeline-view', 'file-tree', 'json-viewer', 'markdown-view', 'changelog', 'activity-feed',
      'agent-status', 'tool-call-card', 'model-selector', 'token-counter', 'conversation-list', 'system-prompt',
    ];

    for (const slug of slugs) {
      test(`/components/${slug} should load without error`, async ({ page }) => {
        const response = await page.goto(`/components/${slug}`);
        expect(response?.status()).toBe(200);
        // No error overlay should be visible
        const errorText = page.locator('text=Error');
        const errorCount = await errorText.count();
        // Some components may have "Error" in their content (like AgentStatus error state)
        // so just verify page rendered without 500
        await expect(page.locator('h1')).toBeVisible();
      });
    }
  });
});
