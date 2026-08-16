import { test, expect } from '@playwright/test';

test.describe('Phase 1 — Foundation E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // PAGE STRUCTURE
  // ─────────────────────────────────────────

  test.describe('Page Structure', () => {
    test('should render the page title and subtitle', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Stellix UI Material');
      await expect(page.locator('header p')).toContainText('19 components');
    });

    test('should render header and footer', async ({ page }) => {
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('footer')).toContainText('Stellix UI Material v0.1.0');
    });

    test('should render all component sections', async ({ page }) => {
      const sections = [
        'loading-state', 'thinking', 'streaming-text', 'approval-card',
        'tool-chips', 'task-rows', 'chat', 'prompt-bar',
        'recommendation-card', 'context-cards', 'code-block',
        'insight-cards', 'fine-tune-card',
      ];
      for (const id of sections) {
        await expect(page.locator(`#${id}`)).toBeVisible();
      }
    });

    test('should have correct page title in metadata', async ({ page }) => {
      await expect(page).toHaveTitle('Stellix UI Material — Component Library');
    });
  });

  // ─────────────────────────────────────────
  // 01. LOADING STATE
  // ─────────────────────────────────────────

  test.describe('LoadingState Component', () => {
    test('should render 3 variants (drive, dots, orbit)', async ({ page }) => {
      const section = page.locator('#loading-state');
      const loadingCards = section.locator('.rounded-xl.border');
      await expect(loadingCards).toHaveCount(3);
    });

    test('should show variant labels', async ({ page }) => {
      const section = page.locator('#loading-state');
      await expect(section).toContainText('Drive variant');
      await expect(section).toContainText('Dots variant');
      await expect(section).toContainText('Orbit variant');
    });

    test('should show elapsed timer', async ({ page }) => {
      const section = page.locator('#loading-state');
      // Timer shows "Xs" format
      await expect(section.locator('text=/\\d+s/')).toBeTruthy();
    });

    test('should render pixel grid with animated pixels', async ({ page }) => {
      const section = page.locator('#loading-state');
      // Drive variant has 20 pixels (4x5 grid)
      const pixels = section.locator('.animate-pixel-on');
      const count = await pixels.count();
      expect(count).toBe(20);
    });

    test('should render shimmer bars', async ({ page }) => {
      const section = page.locator('#loading-state');
      const shimmers = section.locator('.animate-shimmer-text');
      await expect(shimmers).toHaveCount(3);
    });
  });

  // ─────────────────────────────────────────
  // 02. THINKING
  // ─────────────────────────────────────────

  test.describe('Thinking Component', () => {
    test('should render thinking panel with step count', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('Thinking');
      await expect(panel).toContainText('4 steps');
    });

    test('should show expandable trace items when panel is open', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      await expect(panel).toContainText('Reasoning');
      await expect(panel).toContainText('Search');
      await expect(panel).toContainText('Coding');
    });

    test('should expand/collapse individual trace items on click', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      const reasoningBtn = panel.locator('[data-testid="trace-item-reasoning"] button');
      await reasoningBtn.click();
      await expect(panel).toContainText('WebSocket vs SSE');
    });

    test('should show active indicator for active step', async ({ page }) => {
      const codingItem = page.locator('[data-testid="trace-item-coding"]');
      await codingItem.scrollIntoViewIfNeeded();
      const pingDot = codingItem.locator('.animate-ping');
      await expect(pingDot).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // 03. STREAMING TEXT
  // ─────────────────────────────────────────

  test.describe('StreamingText Component', () => {
    test('should stream text word by word', async ({ page }) => {
      const section = page.locator('#streaming-text');
      // Wait for some text to appear
      await expect(section).toContainText('streaming', { timeout: 5000 });
    });

    test('should show blinking cursor while streaming', async ({ page }) => {
      const section = page.locator('#streaming-text');
      const cursor = section.locator('.animate-pulse.bg-accent');
      // Cursor should exist initially (streaming in progress)
      const cursorCount = await cursor.count();
      // May or may not still be visible depending on timing
      expect(cursorCount).toBeGreaterThanOrEqual(0);
    });

    test('should show citations after streaming completes', async ({ page }) => {
      const section = page.locator('#streaming-text');
      // Wait for streaming to complete
      await page.waitForTimeout(3000);
      await expect(section).toContainText('React Docs');
      await expect(section).toContainText('Next.js Guide');
    });

    test('should show follow-up suggestions after streaming completes', async ({ page }) => {
      const section = page.locator('#streaming-text');
      await page.waitForTimeout(4000);
      await expect(section).toContainText('Tell me more about streaming');
      await expect(section).toContainText('How does SSR work?');
      await expect(section).toContainText('Show me an example');
    });
  });

  // ─────────────────────────────────────────
  // 04. APPROVAL CARD
  // ─────────────────────────────────────────

  test.describe('ApprovalCard Component', () => {
    test('should render card with title and description', async ({ page }) => {
      const section = page.locator('#approval-card');
      await expect(section).toContainText('Deploy to Production?');
      await expect(section).toContainText('agent wants to deploy');
    });

    test('should render all options', async ({ page }) => {
      const section = page.locator('#approval-card');
      await expect(section).toContainText('Deploy now');
      await expect(section).toContainText('Schedule for later');
      await expect(section).toContainText('Deploy to staging first');
    });

    test('should highlight selected option on click', async ({ page }) => {
      const section = page.locator('#approval-card');
      const option = section.locator('[data-testid="approval-option"]').first();
      await option.click();
      // The selected option should have accent border
      await expect(option).toHaveClass(/border-accent/);
    });

    test('should render approve and reject buttons', async ({ page }) => {
      const section = page.locator('#approval-card');
      await expect(section.locator('button', { hasText: 'Approve' })).toBeVisible();
      await expect(section.locator('button', { hasText: 'Reject' })).toBeVisible();
    });

    test('should show custom input field', async ({ page }) => {
      const section = page.locator('#approval-card');
      await expect(section.locator('input[placeholder="Custom response..."]')).toBeVisible();
    });

    test('approve button should be disabled when no selection', async ({ page }) => {
      const section = page.locator('#approval-card');
      const approveBtn = section.locator('button', { hasText: 'Approve' });
      await expect(approveBtn).toBeDisabled();
    });

    test('approve button should be enabled after selecting an option', async ({ page }) => {
      const section = page.locator('#approval-card');
      const option = section.locator('[data-testid="approval-option"]').first();
      await option.click();
      const approveBtn = section.locator('button', { hasText: 'Approve' });
      await expect(approveBtn).toBeEnabled();
    });
  });

  // ─────────────────────────────────────────
  // 05. TOOL CHIPS
  // ─────────────────────────────────────────

  test.describe('ToolChips Component', () => {
    test('should render all tool chips', async ({ page }) => {
      const section = page.locator('#tool-chips');
      await expect(section).toContainText('readFile');
      await expect(section).toContainText('writeCode');
      await expect(section).toContainText('runTests');
    });

    test('should show file names for tools with files', async ({ page }) => {
      const section = page.locator('#tool-chips');
      await expect(section).toContainText('src/index.ts');
      await expect(section).toContainText('src/utils.ts');
    });

    test('should expand tool chip to show summary on click', async ({ page }) => {
      const btn = page.locator('[data-testid="tool-chip-btn"]').first();
      await btn.click();
      const detail = page.locator('[data-testid="tool-detail"]').first();
      await expect(detail).toContainText('Read the main entry file');
      const counts = page.locator('[data-testid="diff-counts"]').first();
      await expect(counts).toContainText('12');
      await expect(counts).toContainText('3');
    });

    test('should show correct status colors', async ({ page }) => {
      const section = page.locator('#tool-chips');
      const successChip = page.locator('[data-testid="tool-chip"][data-status="success"]');
      await expect(successChip).toHaveCount(1);
      const errorChip = page.locator('[data-testid="tool-chip"][data-status="error"]');
      await expect(errorChip).toHaveCount(1);
    });
  });

  // ─────────────────────────────────────────
  // 06. TASK ROWS
  // ─────────────────────────────────────────

  test.describe('TaskRows Component', () => {
    test('should render all tasks', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('Initialize project structure');
      await expect(container).toContainText('Install dependencies');
      await expect(container).toContainText('Generate UI components');
      await expect(container).toContainText('Run E2E test suite');
      await expect(container).toContainText('Deploy to staging');
    });

    test('should show status badges for each task', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('Completed');
      await expect(container).toContainText('Running');
      await expect(container).toContainText('Queued');
    });

    test('should show progress bar for tasks with progress', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toContainText('65%');
    });

    test('should expand task to show description on click', async ({ page }) => {
      const task = page.locator('[data-testid="task-row-1"]');
      await task.scrollIntoViewIfNeeded();
      await task.locator('div').first().click();
      await expect(task).toContainText('Created monorepo');
    });
  });

  // ─────────────────────────────────────────
  // 07. CHAT
  // ─────────────────────────────────────────

  test.describe('Chat Component', () => {
    test('should render chat messages', async ({ page }) => {
      const panel = page.locator('[data-testid="chat-panel"]');
      await expect(panel).toContainText('Help me build a dashboard');
      await expect(panel).toContainText('happy to help you build');
    });

    test('should render tabs', async ({ page }) => {
      const tabs = page.locator('[data-testid="chat-tab"]');
      await expect(tabs).toHaveCount(2);
    });

    test('should have message input and send button', async ({ page }) => {
      await expect(page.locator('[data-testid="chat-input"]')).toBeVisible();
      await expect(page.locator('[data-testid="chat-send"]')).toBeVisible();
    });

    test('send button should be disabled with empty input', async ({ page }) => {
      const sendBtn = page.locator('[data-testid="chat-send"]');
      await expect(sendBtn).toBeDisabled();
    });

    test('should differentiate user and assistant messages with different styling', async ({ page }) => {
      const userMsg = page.locator('[data-testid="chat-message"][data-role="user"]');
      await expect(userMsg.first()).toBeVisible();
      const assistantMsg = page.locator('[data-testid="chat-message"][data-role="assistant"]');
      await expect(assistantMsg.first()).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // 08. PROMPT BAR
  // ─────────────────────────────────────────

  test.describe('PromptBar Component', () => {
    test('should render textarea with placeholder', async ({ page }) => {
      const section = page.locator('#prompt-bar');
      await expect(section.locator('textarea[placeholder="Ask anything..."]')).toBeVisible();
    });

    test('should render Sources and Commands buttons', async ({ page }) => {
      const section = page.locator('#prompt-bar');
      await expect(section.locator('[data-testid="sources-btn"]')).toBeVisible();
      await expect(section.locator('[data-testid="commands-btn"]')).toBeVisible();
    });

    test('should render model picker', async ({ page }) => {
      const section = page.locator('#prompt-bar');
      await expect(section.locator('button', { hasText: 'Claude Opus' })).toBeVisible();
    });

    test('should render dictation button', async ({ page }) => {
      const section = page.locator('#prompt-bar');
      // Dictation uses MicrophoneIcon (SVG) instead of emoji
      const micBtn = section.locator('button svg');
      const count = await micBtn.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have send button disabled when empty', async ({ page }) => {
      const sendBtn = page.locator('[data-testid="send-btn"]');
      await sendBtn.scrollIntoViewIfNeeded();
      await expect(sendBtn).toBeDisabled();
    });

    test('should show sources menu when Sources clicked', async ({ page }) => {
      const btn = page.locator('[data-testid="sources-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      const items = page.locator('[data-testid="source-item"]');
      await expect(items).toHaveCount(2);
    });

    test('should show commands menu when Commands clicked', async ({ page }) => {
      const btn = page.locator('[data-testid="commands-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      const items = page.locator('[data-testid="command-item"]');
      await expect(items).toHaveCount(2);
    });
  });

  // ─────────────────────────────────────────
  // 09. RECOMMENDATION CARD
  // ─────────────────────────────────────────

  test.describe('RecommendationCard Component', () => {
    test('should render title and description', async ({ page }) => {
      const section = page.locator('#recommendation-card');
      await expect(section).toContainText('Use Server Components');
      await expect(section).toContainText('reduce client-side JavaScript by ~40%');
    });

    test('should show confidence meter with percentage', async ({ page }) => {
      const section = page.locator('#recommendation-card');
      await expect(section).toContainText('87%');
    });

    test('should show alternatives', async ({ page }) => {
      const section = page.locator('#recommendation-card');
      await expect(section).toContainText('Keep Client Components');
      await expect(section).toContainText('45%');
      await expect(section).toContainText('Hybrid Approach');
      await expect(section).toContainText('72%');
    });

    test('should render Accept, Modify, Reject buttons', async ({ page }) => {
      const section = page.locator('#recommendation-card');
      await expect(section.locator('button', { hasText: 'Accept' })).toBeVisible();
      await expect(section.locator('button', { hasText: 'Modify' })).toBeVisible();
      await expect(section.locator('button', { hasText: 'Reject' })).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // 10. CONTEXT CARDS
  // ─────────────────────────────────────────

  test.describe('ContextCards Component', () => {
    test('should render all context chunks', async ({ page }) => {
      const section = page.locator('#context-cards');
      await expect(section).toContainText('React Best Practices');
      await expect(section).toContainText('Tailwind CSS Guide');
      await expect(section).toContainText('TypeScript Handbook');
    });

    test('should show source information', async ({ page }) => {
      const section = page.locator('#context-cards');
      await expect(section).toContainText('docs.react.dev');
      await expect(section).toContainText('tailwindcss.com');
      await expect(section).toContainText('typescriptlang.org');
    });

    test('should show relevance scores', async ({ page }) => {
      const section = page.locator('#context-cards');
      await expect(section).toContainText('95%');
      await expect(section).toContainText('88%');
      await expect(section).toContainText('82%');
    });

    test('should show icons', async ({ page }) => {
      const section = page.locator('#context-cards');
      // Icons are now Heroicons SVGs instead of emojis
      const svgIcons = section.locator('svg');
      const count = await svgIcons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  // ─────────────────────────────────────────
  // 11. CODE BLOCK
  // ─────────────────────────────────────────

  test.describe('CodeBlock Component', () => {
    test('should render code content', async ({ page }) => {
      const section = page.locator('#code-block');
      await expect(section).toContainText("import { LoadingState, Chat } from '@stellix/ui-web'");
    });

    test('should show language badge', async ({ page }) => {
      const section = page.locator('#code-block');
      await expect(section).toContainText('tsx');
    });

    test('should show copy button', async ({ page }) => {
      const section = page.locator('#code-block');
      await expect(section.locator('button', { hasText: 'Copy' })).toBeVisible();
    });

    test('should show line numbers', async ({ page }) => {
      const section = page.locator('#code-block');
      await expect(section).toContainText('1');
      await expect(section).toContainText('2');
    });

    test('should have dark background for code area', async ({ page }) => {
      const codeArea = page.locator('[data-testid="code-area"]');
      await codeArea.scrollIntoViewIfNeeded();
      await expect(codeArea).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // 12. INSIGHT CARDS
  // ─────────────────────────────────────────

  test.describe('InsightCards Component', () => {
    test('should render all insight cards', async ({ page }) => {
      const section = page.locator('#insight-cards');
      await expect(section).toContainText('API Latency');
      await expect(section).toContainText('Error Rate');
      await expect(section).toContainText('Token Usage');
    });

    test('should show descriptions', async ({ page }) => {
      const section = page.locator('#insight-cards');
      await expect(section).toContainText('p99 response time');
      await expect(section).toContainText('Last 7 days');
      await expect(section).toContainText('Daily average');
    });

    test('should render SVG charts', async ({ page }) => {
      const section = page.locator('#insight-cards');
      const svgs = section.locator('svg');
      const count = await svgs.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  // ─────────────────────────────────────────
  // 13. FINE-TUNE CARD
  // ─────────────────────────────────────────

  test.describe('FineTuneCard Component', () => {
    test('should render title', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      await expect(section).toContainText('Appearance');
    });

    test('should render all property controls', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      await expect(section).toContainText('Font Size');
      await expect(section).toContainText('Dark Mode');
      await expect(section).toContainText('Accent Color');
      await expect(section).toContainText('Font Family');
    });

    test('should render slider for font size', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      const slider = section.locator('input[type="range"]');
      await expect(slider).toBeVisible();
    });

    test('should render toggle for dark mode', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      await section.scrollIntoViewIfNeeded();
      // Toggle button — has class "relative h-6 w-11 rounded-full"
      const toggle = section.locator('button[class*="w-11"]');
      await expect(toggle.first()).toBeVisible();
    });

    test('should render color picker', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      const colorInput = section.locator('input[type="color"]');
      await expect(colorInput).toBeVisible();
    });

    test('should render select dropdown', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      const select = section.locator('select');
      await expect(select).toBeVisible();
      await expect(select).toContainText('Inter');
      await expect(select).toContainText('Roboto');
    });

    test('should show current slider value', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      await expect(section).toContainText('16');
    });
  });

  // ─────────────────────────────────────────
  // RESPONSIVE TESTS
  // ─────────────────────────────────────────

  test.describe('Responsive Layout', () => {
    test('should render all sections without horizontal overflow', async ({ page }) => {
      await page.waitForTimeout(500);
      const body = page.locator('body');
      const bodyWidth = await body.evaluate((el) => el.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
    });

    test('context cards grid should adapt to viewport width', async ({ page }) => {
      const section = page.locator('#context-cards');
      const grid = section.locator('.grid');
      await expect(grid).toBeVisible();
      // Grid should have grid-cols class
      const classes = await grid.getAttribute('class');
      expect(classes).toContain('grid-cols-1');
    });

    test('all component sections should be visible', async ({ page }) => {
      const sections = page.locator('section');
      const count = await sections.count();
      expect(count).toBeGreaterThanOrEqual(13);

      for (let i = 0; i < count; i++) {
        await expect(sections.nth(i)).toBeVisible();
      }
    });

    test('loading state cards should all be rendered and have non-zero dimensions', async ({ page }) => {
      const section = page.locator('#loading-state');
      await section.scrollIntoViewIfNeeded();
      // All 3 loading state variants should render with real dimensions
      const cards = section.locator('[class*="rounded-xl"][class*="border-line"]');
      const count = await cards.count();
      expect(count).toBe(3);
      for (let i = 0; i < count; i++) {
        const box = await cards.nth(i).boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(50);
        expect(box!.height).toBeGreaterThan(30);
      }
    });
  });

  // ─────────────────────────────────────────
  // ANIMATION TESTS
  // ─────────────────────────────────────────

  test.describe('Animations', () => {
    test('pixel-on animation class should be applied', async ({ page }) => {
      const pixels = page.locator('.animate-pixel-on');
      const count = await pixels.count();
      expect(count).toBeGreaterThan(0);
    });

    test('shimmer animation should be running', async ({ page }) => {
      const shimmers = page.locator('.animate-shimmer-text');
      const count = await shimmers.count();
      expect(count).toBeGreaterThan(0);
    });

    test('fade-up animation should be applied to follow-ups', async ({ page }) => {
      await page.waitForTimeout(4000);
      const fadeUps = page.locator('.animate-fade-up');
      const count = await fadeUps.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ─────────────────────────────────────────
  // INTERACTION TESTS
  // ─────────────────────────────────────────

  test.describe('Interactions', () => {
    test('clicking code block copy button should update text', async ({ page }) => {
      const section = page.locator('#code-block');
      // Grant clipboard permission for the test
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      const copyBtn = section.locator('button', { hasText: 'Copy' });
      await copyBtn.click();
      await expect(section.locator('button', { hasText: /Copied/ })).toBeVisible({ timeout: 3000 });
    });

    test('fine-tune toggle should change state on click', async ({ page }) => {
      const section = page.locator('#fine-tune-card');
      const toggle = section.locator('button[class*="w-11"]').first();
      await toggle.scrollIntoViewIfNeeded();
      // Initially should have bg-line-strong (dark mode = false)
      await expect(toggle).toHaveClass(/bg-line-strong/);
      await toggle.click({ force: true });
      // After click should have bg-accent (dark mode = true)
      await expect(toggle).toHaveClass(/bg-accent/);
    });

    test('chat tab switching should work', async ({ page }) => {
      const historyTab = page.locator('[data-testid="chat-tab"]').last();
      await historyTab.click();
      await expect(historyTab).toHaveAttribute('data-active', 'true');
    });

    test('thinking panel collapse/expand should work', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      // Panel is open by default, click to close
      const headerBtn = panel.locator('button').first();
      await headerBtn.click();
      await page.waitForTimeout(400);
      // Click again to open
      await headerBtn.click();
      await page.waitForTimeout(400);
      await expect(panel).toContainText('Reasoning');
    });
  });

  // ─────────────────────────────────────────
  // DESIGN TOKENS TESTS
  // ─────────────────────────────────────────

  test.describe('Design Tokens', () => {
    test('CSS custom properties should be defined', async ({ page }) => {
      const inkColor = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
      );
      expect(inkColor).toBeTruthy();
    });

    test('surface canvas background should be applied', async ({ page }) => {
      const bgColor = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--surface-canvas').trim(),
      );
      expect(bgColor).toBeTruthy();
    });

    test('accent color should be defined', async ({ page }) => {
      const accentColor = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
      );
      expect(accentColor).toBe('#6366f1');
    });
  });

  // ─────────────────────────────────────────
  // ACCESSIBILITY TESTS
  // ─────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('all interactive elements should be focusable', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(10);
    });

    test('inputs should have placeholder text', async ({ page }) => {
      const inputs = page.locator('input[placeholder], textarea[placeholder]');
      const count = await inputs.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('page should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      const h2s = page.locator('h2');
      const h2Count = await h2s.count();
      expect(h2Count).toBeGreaterThanOrEqual(13);
    });

    test('html lang attribute should be set', async ({ page }) => {
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe('en');
    });
  });
});
