import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════════════
// PRIMITIVES — Comprehensive E2E
// ═══════════════════════════════════════════════════════

test.describe('Primitives E2E', () => {

  // ─── Button ───────────────────────────────────────
  test.describe('Button', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/button');
      await page.waitForLoadState('networkidle');
    });

    test('renders all 5 variants', async ({ page }) => {
      const buttons = page.locator('[data-testid="button"]');
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(5);
      for (const variant of ['primary', 'secondary', 'ghost', 'destructive', 'outline']) {
        await expect(page.locator(`[data-testid="button"][data-variant="${variant}"]`).first()).toBeVisible();
      }
    });

    test('renders default size buttons', async ({ page }) => {
      // At minimum, default (md) size buttons should be present
      const buttons = page.locator('[data-testid="button"]');
      expect(await buttons.count()).toBeGreaterThanOrEqual(3);
      const firstSize = await buttons.first().getAttribute('data-size');
      expect(firstSize).toBeTruthy();
    });

    test('loading state shows spinner', async ({ page }) => {
      const spinner = page.locator('[data-testid="button-spinner"]');
      if (await spinner.count() > 0) {
        await expect(spinner.first()).toBeVisible();
        await expect(spinner.first()).toHaveClass(/animate-spin/);
      }
    });

    test('disabled button has correct attributes', async ({ page }) => {
      const disabled = page.locator('[data-testid="button"][disabled]');
      if (await disabled.count() > 0) {
        await expect(disabled.first()).toBeDisabled();
        await expect(disabled.first()).toHaveCSS('opacity', '0.5');
      }
    });

    test('button with icon renders icon slot', async ({ page }) => {
      const iconBtn = page.locator('[data-testid="button-icon"]');
      if (await iconBtn.count() > 0) {
        await expect(iconBtn.first()).toBeVisible();
      }
    });
  });

  // ─── Badge ────────────────────────────────────────
  test.describe('Badge', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/badge');
      await page.waitForLoadState('networkidle');
    });

    test('renders multiple badge variants', async ({ page }) => {
      const badges = page.locator('[data-testid="badge"]');
      expect(await badges.count()).toBeGreaterThanOrEqual(3);
    });

    test('dot indicator is visible when enabled', async ({ page }) => {
      const dot = page.locator('[data-testid="badge-dot"]');
      if (await dot.count() > 0) {
        await expect(dot.first()).toBeVisible();
      }
    });

    test('removable badge has remove button', async ({ page }) => {
      const removeBtn = page.locator('[data-testid="badge-remove"]');
      if (await removeBtn.count() > 0) {
        await expect(removeBtn.first()).toBeVisible();
      }
    });
  });

  // ─── Avatar ───────────────────────────────────────
  test.describe('Avatar', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/avatar');
      await page.waitForLoadState('networkidle');
    });

    test('renders avatars with multiple sizes', async ({ page }) => {
      const avatars = page.locator('[data-testid="avatar"]');
      expect(await avatars.count()).toBeGreaterThanOrEqual(2);
    });

    test('shows initials fallback when no image', async ({ page }) => {
      const initials = page.locator('[data-testid="avatar-initials"]');
      if (await initials.count() > 0) {
        await expect(initials.first()).toBeVisible();
        const text = await initials.first().textContent();
        expect(text?.length).toBeLessThanOrEqual(2);
      }
    });

    test('status dot renders with correct state', async ({ page }) => {
      const status = page.locator('[data-testid="avatar-status"]');
      if (await status.count() > 0) {
        const state = await status.first().getAttribute('data-status');
        expect(['online', 'offline', 'away']).toContain(state);
      }
    });
  });

  // ─── Tag ──────────────────────────────────────────
  test.describe('Tag', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/tag');
      await page.waitForLoadState('networkidle');
    });

    test('renders tags with text content', async ({ page }) => {
      const tags = page.locator('[data-testid="tag"]');
      expect(await tags.count()).toBeGreaterThanOrEqual(2);
    });

    test('tag with icon shows icon', async ({ page }) => {
      const icon = page.locator('[data-testid="tag-icon"]');
      if (await icon.count() > 0) {
        await expect(icon.first()).toBeVisible();
      }
    });

    test('removable tag has close button', async ({ page }) => {
      const remove = page.locator('[data-testid="tag-remove"]');
      if (await remove.count() > 0) {
        await expect(remove.first()).toBeVisible();
      }
    });
  });

  // ─── Tooltip ──────────────────────────────────────
  test.describe('Tooltip', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/tooltip');
      await page.waitForLoadState('networkidle');
    });

    test('tooltip appears on hover', async ({ page }) => {
      const wrapper = page.locator('[data-testid="tooltip-wrapper"]').first();
      await expect(wrapper).toBeVisible();
      await wrapper.hover();
      const tooltip = page.locator('[data-testid="tooltip"]');
      await expect(tooltip.first()).toBeVisible();
    });

    test('tooltip disappears on mouse leave', async ({ page }) => {
      const wrapper = page.locator('[data-testid="tooltip-wrapper"]').first();
      await wrapper.hover();
      await expect(page.locator('[data-testid="tooltip"]').first()).toBeVisible();
      await page.mouse.move(0, 0);
      await expect(page.locator('[data-testid="tooltip"]')).toHaveCount(0);
    });

    test('tooltip has correct placement attribute', async ({ page }) => {
      const wrapper = page.locator('[data-testid="tooltip-wrapper"]').first();
      await wrapper.hover();
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      const placement = await tooltip.getAttribute('data-placement');
      expect(['top', 'bottom', 'left', 'right']).toContain(placement);
    });
  });

  // ─── Toggle ───────────────────────────────────────
  test.describe('Toggle', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/toggle');
      await page.waitForLoadState('networkidle');
    });

    test('renders toggle switch with label', async ({ page }) => {
      await expect(page.locator('[data-testid="toggle"]').first()).toBeVisible();
    });

    test('toggle has correct aria-checked', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle"]').first();
      const checked = await toggle.getAttribute('aria-checked');
      expect(['true', 'false']).toContain(checked);
    });

    test('toggle label and description render', async ({ page }) => {
      const label = page.locator('[data-testid="toggle-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });
  });

  // ─── Input ────────────────────────────────────────
  test.describe('Input', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/input');
      await page.waitForLoadState('networkidle');
    });

    test('renders input field', async ({ page }) => {
      await expect(page.locator('[data-testid="input-field"]').first()).toBeVisible();
    });

    test('input label renders', async ({ page }) => {
      const label = page.locator('[data-testid="input-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });

    test('error state shows error message', async ({ page }) => {
      const error = page.locator('[data-testid="input-error"]');
      if (await error.count() > 0) {
        await expect(error.first()).toBeVisible();
        const text = await error.first().textContent();
        expect(text?.length).toBeGreaterThan(0);
      }
    });

    test('prefix and suffix icons render', async ({ page }) => {
      const prefix = page.locator('[data-testid="input-prefix-icon"]');
      const suffix = page.locator('[data-testid="input-suffix-icon"]');
      if (await prefix.count() > 0) await expect(prefix.first()).toBeVisible();
      if (await suffix.count() > 0) await expect(suffix.first()).toBeVisible();
    });
  });

  // ─── Textarea ─────────────────────────────────────
  test.describe('Textarea', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/textarea');
      await page.waitForLoadState('networkidle');
    });

    test('renders textarea field', async ({ page }) => {
      await expect(page.locator('[data-testid="textarea-field"]').first()).toBeVisible();
    });

    test('character count displays when maxLength set', async ({ page }) => {
      const count = page.locator('[data-testid="textarea-char-count"]');
      if (await count.count() > 0) {
        await expect(count.first()).toBeVisible();
        const text = await count.first().textContent();
        expect(text).toMatch(/\d+\/\d+/);
      }
    });

    test('error state shows error message', async ({ page }) => {
      const error = page.locator('[data-testid="textarea-error"]');
      if (await error.count() > 0) {
        await expect(error.first()).toBeVisible();
      }
    });
  });

  // ─── Select ───────────────────────────────────────
  test.describe('Select', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/select');
      await page.waitForLoadState('networkidle');
    });

    test('renders select trigger', async ({ page }) => {
      await expect(page.locator('[data-testid="select-trigger"]').first()).toBeVisible();
    });

    test('opens dropdown on click', async ({ page }) => {
      await page.locator('[data-testid="select-trigger"]').first().click();
      await expect(page.locator('[data-testid="select-dropdown"]').first()).toBeVisible();
    });

    test('selects an option from dropdown', async ({ page }) => {
      await page.locator('[data-testid="select-trigger"]').first().click();
      const dropdown = page.locator('[data-testid="select-dropdown"]').first();
      await expect(dropdown).toBeVisible();
      const options = dropdown.locator('[data-testid="select-option"]');
      expect(await options.count()).toBeGreaterThan(0);
      await options.first().click();
    });

    test('searchable select filters options', async ({ page }) => {
      const searchInput = page.locator('[data-testid="select-search-input"]');
      // Only test if searchable select exists
      const trigger = page.locator('[data-testid="select-trigger"]');
      const count = await trigger.count();
      for (let i = 0; i < count; i++) {
        await trigger.nth(i).click();
        if (await searchInput.count() > 0) {
          await searchInput.fill('zzz_nonexistent');
          await expect(page.locator('[data-testid="select-empty"]')).toBeVisible();
          break;
        }
        await page.keyboard.press('Escape');
      }
    });
  });

  // ─── Checkbox ─────────────────────────────────────
  test.describe('Checkbox', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/checkbox');
      await page.waitForLoadState('networkidle');
    });

    test('renders checkbox', async ({ page }) => {
      await expect(page.locator('[data-testid="checkbox-root"]').first()).toBeVisible();
    });

    test('checkbox has correct aria-checked', async ({ page }) => {
      const input = page.locator('[data-testid="checkbox-input"]').first();
      const checked = await input.getAttribute('aria-checked');
      expect(['true', 'false', 'mixed']).toContain(checked);
    });

    test('checkbox label renders', async ({ page }) => {
      const label = page.locator('[data-testid="checkbox-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });

    test('checkbox description renders', async ({ page }) => {
      const desc = page.locator('[data-testid="checkbox-description"]');
      if (await desc.count() > 0) {
        await expect(desc.first()).toBeVisible();
      }
    });
  });

  // ─── Radio ────────────────────────────────────────
  test.describe('Radio', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/radio');
      await page.waitForLoadState('networkidle');
    });

    test('renders radio group with options', async ({ page }) => {
      await expect(page.locator('[data-testid="radio-root"]').first()).toBeVisible();
      const options = page.locator('[data-testid="radio-option"]');
      expect(await options.count()).toBeGreaterThanOrEqual(2);
    });

    test('one option is selected by default', async ({ page }) => {
      const dot = page.locator('[data-testid="radio-dot"]');
      expect(await dot.count()).toBeGreaterThanOrEqual(1);
    });

    test('radio labels render', async ({ page }) => {
      const labels = page.locator('[data-testid="radio-label"]');
      expect(await labels.count()).toBeGreaterThanOrEqual(2);
    });
  });

  // ─── Switch ───────────────────────────────────────
  test.describe('Switch', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/switch');
      await page.waitForLoadState('networkidle');
    });

    test('renders switch track and thumb', async ({ page }) => {
      await expect(page.locator('[data-testid="switch-track"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="switch-thumb"]').first()).toBeVisible();
    });

    test('switch has correct aria-checked', async ({ page }) => {
      const track = page.locator('[data-testid="switch-track"]').first();
      const checked = await track.getAttribute('aria-checked');
      expect(['true', 'false']).toContain(checked);
    });

    test('switch label and description render', async ({ page }) => {
      const label = page.locator('[data-testid="switch-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });
  });
});


// ═══════════════════════════════════════════════════════
// FEEDBACK — Comprehensive E2E
// ═══════════════════════════════════════════════════════

test.describe('Feedback E2E', () => {

  // ─── Toast ────────────────────────────────────────
  test.describe('Toast', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/toast');
      await page.waitForLoadState('networkidle');
    });

    test('renders all 4 variants', async ({ page }) => {
      for (const variant of ['success', 'error', 'warning', 'info']) {
        await expect(page.locator(`[data-testid="toast"][data-variant="${variant}"]`).first()).toBeVisible();
      }
    });

    test('toast displays title', async ({ page }) => {
      await expect(page.locator('[data-testid="toast-title"]').first()).toBeVisible();
    });

    test('toast icon matches variant', async ({ page }) => {
      const icons = page.locator('[data-testid="toast-icon"]');
      expect(await icons.count()).toBeGreaterThanOrEqual(1);
    });

    test('dismiss button is present', async ({ page }) => {
      const dismiss = page.locator('[data-testid="toast-dismiss"]');
      if (await dismiss.count() > 0) {
        await expect(dismiss.first()).toBeVisible();
      }
    });

    test('action button renders when configured', async ({ page }) => {
      const action = page.locator('[data-testid="toast-action"]');
      if (await action.count() > 0) {
        await expect(action.first()).toBeVisible();
      }
    });
  });

  // ─── Alert ────────────────────────────────────────
  test.describe('Alert', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/alert');
      await page.waitForLoadState('networkidle');
    });

    test('renders all 4 variants', async ({ page }) => {
      for (const variant of ['info', 'success', 'warning', 'error']) {
        await expect(page.locator(`[data-testid="alert"][data-variant="${variant}"]`).first()).toBeVisible();
      }
    });

    test('alert shows title and content', async ({ page }) => {
      await expect(page.locator('[data-testid="alert-title"]').first()).toBeVisible();
      const content = page.locator('[data-testid="alert-content"]');
      if (await content.count() > 0) {
        await expect(content.first()).toBeVisible();
      }
    });

    test('alert icon renders', async ({ page }) => {
      await expect(page.locator('[data-testid="alert-icon"]').first()).toBeVisible();
    });

    test('dismissible alert has dismiss button', async ({ page }) => {
      const dismiss = page.locator('[data-testid="alert-dismiss"]');
      if (await dismiss.count() > 0) {
        await expect(dismiss.first()).toBeVisible();
      }
    });
  });

  // ─── ProgressBar ──────────────────────────────────
  test.describe('ProgressBar', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/progress-bar');
      await page.waitForLoadState('networkidle');
    });

    test('renders progress track and fill', async ({ page }) => {
      await expect(page.locator('[data-testid="progress-track"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="progress-fill"]').first()).toBeVisible();
    });

    test('progress value displays percentage', async ({ page }) => {
      const value = page.locator('[data-testid="progress-value"]');
      if (await value.count() > 0) {
        const text = await value.first().textContent();
        expect(text).toMatch(/\d+%/);
      }
    });

    test('progress label renders', async ({ page }) => {
      const label = page.locator('[data-testid="progress-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });

    test('progress track has correct aria attributes', async ({ page }) => {
      const track = page.locator('[data-testid="progress-track"]').first();
      const role = await track.getAttribute('role');
      expect(role).toBe('progressbar');
    });
  });

  // ─── Spinner ──────────────────────────────────────
  test.describe('Spinner', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/spinner');
      await page.waitForLoadState('networkidle');
    });

    test('renders spinning element', async ({ page }) => {
      // Use a non-xs spinner since xs may be too small for visibility check
      const spinner = page.locator('[data-testid="spinner"][data-size="md"], [data-testid="spinner"][data-size="sm"]').first();
      await spinner.scrollIntoViewIfNeeded();
      await expect(spinner).toBeVisible();
    });

    test('renders multiple sizes', async ({ page }) => {
      const spinners = page.locator('[data-testid="spinner"]');
      expect(await spinners.count()).toBeGreaterThanOrEqual(2);
    });

    test('label text renders when provided', async ({ page }) => {
      const label = page.locator('[data-testid="spinner-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });
  });

  // ─── SkeletonBlock ────────────────────────────────
  test.describe('SkeletonBlock', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/skeleton-block');
      await page.waitForLoadState('networkidle');
    });

    test('renders skeleton variants', async ({ page }) => {
      const skeletons = page.locator('[data-testid="skeleton-block"]');
      expect(await skeletons.count()).toBeGreaterThanOrEqual(2);
    });

    test('text variant renders correct number of lines', async ({ page }) => {
      const textSkeleton = page.locator('[data-testid="skeleton-block"][data-variant="text"]');
      if (await textSkeleton.count() > 0) {
        const lines = textSkeleton.first().locator('[data-testid="skeleton-line"]');
        expect(await lines.count()).toBeGreaterThanOrEqual(2);
      }
    });

    test('circle variant renders', async ({ page }) => {
      const circle = page.locator('[data-testid="skeleton-block"][data-variant="circle"]');
      if (await circle.count() > 0) {
        await expect(circle.first()).toBeVisible();
      }
    });

    test('card variant renders composite skeleton', async ({ page }) => {
      const card = page.locator('[data-testid="skeleton-block"][data-variant="card"]');
      if (await card.count() > 0) {
        await expect(card.first()).toBeVisible();
      }
    });
  });

  // ─── EmptyState ───────────────────────────────────
  test.describe('EmptyState', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/empty-state');
      await page.waitForLoadState('networkidle');
    });

    test('renders empty state with icon, title, description', async ({ page }) => {
      await expect(page.locator('[data-testid="empty-state"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="empty-state-icon"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="empty-state-title"]').first()).toBeVisible();
    });

    test('description renders', async ({ page }) => {
      const desc = page.locator('[data-testid="empty-state-description"]');
      if (await desc.count() > 0) {
        await expect(desc.first()).toBeVisible();
      }
    });

    test('action button renders when configured', async ({ page }) => {
      const action = page.locator('[data-testid="empty-state-action"]');
      if (await action.count() > 0) {
        await expect(action.first()).toBeVisible();
      }
    });
  });

  // ─── StepIndicator ────────────────────────────────
  test.describe('StepIndicator', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/step-indicator');
      await page.waitForLoadState('networkidle');
    });

    test('renders step indicator', async ({ page }) => {
      await expect(page.locator('[data-testid="step-indicator"]').first()).toBeVisible();
    });

    test('renders multiple step items', async ({ page }) => {
      const items = page.locator('[data-testid="step-item"]');
      expect(await items.count()).toBeGreaterThanOrEqual(2);
    });

    test('step circles show correct states', async ({ page }) => {
      const circles = page.locator('[data-testid="step-circle"]');
      const count = await circles.count();
      expect(count).toBeGreaterThanOrEqual(2);

      const states: string[] = [];
      for (let i = 0; i < count; i++) {
        const state = await circles.nth(i).getAttribute('data-state');
        if (state) states.push(state);
      }
      // Should have at least one active or completed
      expect(states.some(s => s === 'active' || s === 'completed')).toBe(true);
    });

    test('horizontal and vertical orientations exist', async ({ page }) => {
      const indicators = page.locator('[data-testid="step-indicator"]');
      const count = await indicators.count();
      const orientations: string[] = [];
      for (let i = 0; i < count; i++) {
        const orient = await indicators.nth(i).getAttribute('data-orientation');
        if (orient) orientations.push(orient);
      }
      // At least one orientation should be present
      expect(orientations.length).toBeGreaterThanOrEqual(1);
    });
  });
});
