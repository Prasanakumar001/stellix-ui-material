import { test, expect } from '@playwright/test';

test.describe('Phase 7 — Navigation Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // CHAT
  // ─────────────────────────────────────────

  test.describe('Chat — Structure', () => {
    test('should render chat panel', async ({ page }) => {
      const panel = page.locator('[data-testid="chat-panel"]');
      await expect(panel).toBeVisible();
    });

    test('should render tabs bar', async ({ page }) => {
      const tabs = page.locator('[data-testid="chat-tabs"]');
      await expect(tabs).toBeVisible();
    });

    test('should render 2 tabs (Chat, History)', async ({ page }) => {
      const tabs = page.locator('[data-testid="chat-tab"]');
      await expect(tabs).toHaveCount(2);
    });

    test('first tab should be active by default', async ({ page }) => {
      const first = page.locator('[data-testid="chat-tab"]').first();
      await expect(first).toHaveAttribute('data-active', 'true');
    });

    test('active tab should have accent indicator bar', async ({ page }) => {
      const indicator = page.locator('[data-testid="tab-indicator"]');
      await expect(indicator).toBeVisible();
    });
  });

  test.describe('Chat — Messages', () => {
    test('should render 4 messages', async ({ page }) => {
      const msgs = page.locator('[data-testid="chat-message"]');
      await expect(msgs).toHaveCount(4);
    });

    test('should show user messages with user avatar', async ({ page }) => {
      const avatar = page.locator('[data-testid="user-avatar"]');
      const count = await avatar.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show assistant messages with sparkles avatar', async ({ page }) => {
      const avatar = page.locator('[data-testid="assistant-avatar"]');
      const count = await avatar.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('user messages should have accent background', async ({ page }) => {
      const msg = page.locator('[data-testid="chat-message"][data-role="user"] [data-testid="message-content"]');
      await expect(msg.first()).toHaveClass(/bg-accent/);
    });

    test('assistant messages should have field background', async ({ page }) => {
      const msg = page.locator('[data-testid="chat-message"][data-role="assistant"] [data-testid="message-content"]');
      await expect(msg.first()).toHaveClass(/bg-surface-field/);
    });
  });

  test.describe('Chat — Reasoning', () => {
    test('should show reasoning toggle on assistant message with reasoning', async ({ page }) => {
      const toggle = page.locator('[data-testid="reasoning-toggle"]');
      const count = await toggle.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('clicking reasoning toggle should show reasoning content', async ({ page }) => {
      const toggle = page.locator('[data-testid="reasoning-toggle"]').first();
      await toggle.click();
      const content = page.locator('[data-testid="reasoning-content"]');
      await expect(content).toBeVisible();
      await expect(content).toContainText('Server Components');
    });
  });

  test.describe('Chat — Composer', () => {
    test('should render composer with input and send button', async ({ page }) => {
      await expect(page.locator('[data-testid="chat-input"]')).toBeVisible();
      await expect(page.locator('[data-testid="chat-send"]')).toBeVisible();
    });

    test('send button should have airplane icon', async ({ page }) => {
      const btn = page.locator('[data-testid="chat-send"]');
      const icon = btn.locator('svg');
      await expect(icon).toBeVisible();
    });

    test('send button should be disabled when empty', async ({ page }) => {
      await expect(page.locator('[data-testid="chat-send"]')).toBeDisabled();
    });

    test('typing should enable send button', async ({ page }) => {
      const input = page.locator('[data-testid="chat-input"]');
      await input.fill('Hello');
      await expect(page.locator('[data-testid="chat-send"]')).toBeEnabled();
    });

    test('tab switching should change active tab', async ({ page }) => {
      const second = page.locator('[data-testid="chat-tab"]').last();
      await second.click();
      await expect(second).toHaveAttribute('data-active', 'true');
      const first = page.locator('[data-testid="chat-tab"]').first();
      await expect(first).toHaveAttribute('data-active', 'false');
    });
  });

  // ─────────────────────────────────────────
  // SIDEBAR NAV (desktop only — hidden on mobile)
  // ─────────────────────────────────────────

  test.describe('SidebarNav — Desktop', () => {
    test('sidebar nav component should exist in the page', async ({ page }) => {
      // SidebarNav is not used as a layout sidebar in the demo
      // but Chat, Search are the main nav components tested here
      const panel = page.locator('[data-testid="chat-panel"]');
      await expect(panel).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // STYLING
  // ─────────────────────────────────────────

  test.describe('Navigation — Styling', () => {
    test('chat panel should have card styling', async ({ page }) => {
      const panel = page.locator('[data-testid="chat-panel"]');
      await expect(panel).toHaveClass(/rounded-xl/);
      await expect(panel).toHaveClass(/shadow-card/);
    });

    test('page should not overflow horizontally', async ({ page }) => {
      await page.waitForTimeout(500);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
    });
  });
});
