# Stellix UI Material — Deployment & Publishing Guide

## Package Summary

| Package | npm Name | Size (gzipped) | Contents |
|---|---|---|---|
| `packages/tokens` | `@stellix/ui-tokens` | 3.4 KB | Design tokens (colors, shadows, spacing, breakpoints, typography, animations) |
| `packages/core` | `@stellix/ui-core` | 9.2 KB | 11 headless hooks + TypeScript types + utilities |
| `packages/web` | `@stellix/ui-web` | 51.0 KB | 19 web components (Tailwind CSS + Heroicons) |
| `packages/native` | `@stellix/ui-native` | 22.1 KB | 19 React Native components (NativeWind) |

---

## 1. Prerequisites

```bash
# Node.js 20+
node --version  # v20.x or higher

# pnpm
pnpm --version  # 10.x or higher

# npm account with @stellix org
npm whoami  # should show your npm username
```

## 2. npm Organization Setup (One-Time)

### Create the @stellix org on npm:

```bash
# 1. Log in to npm
npm login

# 2. Create the org (if not created yet)
# Go to https://www.npmjs.com/org/create and create "stellix"
# Or use the CLI:
npm org create stellix

# 3. Verify you're a member
npm org ls stellix
```

### Alternative: Use a different scope

If `@stellix` is taken, change the package names in all 4 `package.json` files:
```bash
# Find and replace @stellix with @your-scope
grep -rl "@stellix/" packages/ | xargs sed -i '' 's/@stellix\//@your-scope\//g'
```

## 3. Build All Packages

```bash
# Build only the 4 library packages (not the demo apps)
pnpm build:libs

# Verify dist/ output exists
ls packages/tokens/dist/   # index.js, index.mjs, index.d.ts, index.d.mts
ls packages/core/dist/     # index.js, index.mjs, index.d.ts, index.d.mts
ls packages/web/dist/      # index.js, index.mjs, index.d.ts, index.d.mts
ls packages/native/dist/   # index.js, index.mjs
```

## 4. Publish

### Dry Run (Verify First)

```bash
# See exactly what would be published without actually publishing
pnpm publish:dry
```

This shows:
- Tarball contents and size for each package
- Which files are included
- The registry URL

### Publish for Real

```bash
# Publish all 4 packages to npm
pnpm publish:release
```

**Publish order** (automatic via pnpm):
1. `@stellix/ui-tokens` (no dependencies)
2. `@stellix/ui-core` (depends on tokens)
3. `@stellix/ui-web` (depends on core + tokens)
4. `@stellix/ui-native` (depends on core + tokens)

### Versioning

```bash
# Bump patch version (0.1.0 → 0.1.1)
pnpm version:patch

# Bump minor version (0.1.0 → 0.2.0)
pnpm version:minor

# Bump major version (0.1.0 → 1.0.0)
pnpm version:major

# Then publish
pnpm publish:release
```

## 5. Consumer Installation

### Web (Next.js) Project

```bash
# Install the web package (automatically installs core + tokens)
pnpm add @stellix/ui-web

# Or with npm
npm install @stellix/ui-web
```

**Setup in Next.js:**

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ['@stellix/ui-web', '@stellix/ui-core', '@stellix/ui-tokens'],
};
export default nextConfig;
```

```css
/* app/globals.css */
@import 'tailwindcss';
@source "node_modules/@stellix/ui-web/dist/**/*.mjs";

@theme {
  --color-ink: #1a1a1a;
  --color-ink-2: #6b6b6b;
  --color-ink-3: #9a9a9a;
  --color-surface: #ffffff;
  --color-surface-field: #f5f5f5;
  --color-surface-canvas: #fafafa;
  --color-line: #e5e5e5;
  --color-line-strong: #d1d1d1;
  --color-accent: #6366f1;
  --color-green: #22c55e;
  --color-red: #ef4444;
  --color-orange: #f97316;
  --color-blue: #3b82f6;
  --color-purple: #a855f7;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-raised: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-btn: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-overlay: 0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.12);
  --shadow-hairline: 0 0 0 1px rgba(0,0,0,0.05);
  --breakpoint-sm: 640px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1440px;
}
```

```tsx
// app/page.tsx
import { LoadingState, Chat, CodeBlock, StreamingText } from '@stellix/ui-web';

export default function Page() {
  return (
    <div>
      <LoadingState variant="orbit" label="Processing..." />
      <CodeBlock code="console.log('hello')" language="ts" />
    </div>
  );
}
```

### React Native (Expo) Project

```bash
# Install the native package
pnpm add @stellix/ui-native

# Install peer dependencies
pnpm add react-native-reanimated react-native-gesture-handler react-native-svg nativewind
```

```tsx
// app/index.tsx
import { LoadingState, Chat, TaskRows } from '@stellix/ui-native';

export default function Screen() {
  return <LoadingState variant="dots" label="Loading..." />;
}
```

### Headless Hooks Only

```bash
# Install just the hooks (no UI components, no CSS)
pnpm add @stellix/ui-core
```

```tsx
import { useTimer, useStreamingText, useSearch } from '@stellix/ui-core';

function MyComponent() {
  const { elapsed, formatted } = useTimer(true);
  return <span>{formatted}</span>;
}
```

### Design Tokens Only

```bash
# Install just the tokens (colors, spacing, shadows)
pnpm add @stellix/ui-tokens
```

```ts
import { colors, shadows, breakpoints } from '@stellix/ui-tokens';
console.log(colors.accent); // '#6366f1'
```

## 6. CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @stellix/ui-core test
      - run: pnpm build:libs
      - run: pnpm -r --filter='./packages/*' publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Publish Workflow (Manual)

```bash
# 1. Make sure all tests pass
pnpm test
pnpm test:e2e

# 2. Bump version
pnpm version:patch    # or version:minor or version:major

# 3. Build
pnpm build:libs

# 4. Dry run
pnpm publish:dry

# 5. Publish
pnpm publish:release

# 6. Git tag and push
git add -A
git commit -m "release: v$(node -p "require('./packages/core/package.json').version")"
git tag "v$(node -p "require('./packages/core/package.json').version")"
git push && git push --tags
```

## 7. Private Registry (Optional)

If you want to publish to a private npm registry instead of public npm:

```bash
# Set registry in .npmrc
echo "@stellix:registry=https://your-private-registry.com/" > .npmrc
echo "//your-private-registry.com/:_authToken=${NPM_TOKEN}" >> .npmrc
```

Or update each package's `publishConfig`:
```json
{
  "publishConfig": {
    "access": "restricted",
    "registry": "https://your-private-registry.com/"
  }
}
```

## 8. Package Contents

### What Gets Published

Each package ships with only `dist/` and `README.md` (via the `files` field in `package.json`):

```
@stellix/ui-tokens (3.4 KB)
├── dist/index.js        (CJS)
├── dist/index.mjs       (ESM)
├── dist/index.d.ts      (CJS types)
└── dist/index.d.mts     (ESM types)

@stellix/ui-core (9.2 KB)
├── dist/index.js        (CJS)
├── dist/index.mjs       (ESM)
├── dist/index.d.ts      (CJS types)
└── dist/index.d.mts     (ESM types)

@stellix/ui-web (51.0 KB)
├── dist/index.js        (CJS — 147 KB unpacked)
├── dist/index.mjs       (ESM — 127 KB unpacked)
├── dist/index.d.ts      (CJS types)
└── dist/index.d.mts     (ESM types)

@stellix/ui-native (22.1 KB)
├── dist/index.js        (CJS — 71 KB unpacked)
└── dist/index.mjs       (ESM — 59 KB unpacked)
```

### What Does NOT Get Published

- Source TypeScript files (`src/`)
- Tests (`__tests__/`)
- Demo apps (`apps/`)
- Build config (`tsup.config.ts`, `vitest.config.ts`)
- E2E tests (`e2e/`)
- Dev dependencies

## 9. Tree-Shaking

All packages are tree-shakeable. Consumers only bundle the components they import:

```tsx
// Only bundles LoadingState + its dependencies (~5 KB)
import { LoadingState } from '@stellix/ui-web';

// Only bundles useTimer (~1 KB)
import { useTimer } from '@stellix/ui-core';
```

## 10. Quick Reference

| Command | Description |
|---|---|
| `pnpm build:libs` | Build all 4 library packages |
| `pnpm publish:dry` | Dry-run publish (preview what gets published) |
| `pnpm publish:release` | Publish all packages to npm |
| `pnpm version:patch` | Bump patch version (0.1.0 → 0.1.1) |
| `pnpm version:minor` | Bump minor version (0.1.0 → 0.2.0) |
| `pnpm version:major` | Bump major version (0.1.0 → 1.0.0) |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm dev` | Start dev mode (all packages) |
| `pnpm clean` | Clean all dist/ folders |
