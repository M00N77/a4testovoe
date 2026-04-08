# AGENTS.md
This repository is a small React 19 + Vite 8 frontend app built with JavaScript, JSX, and Tailwind CSS v4.
Agentic coding tools should prefer small, local edits that preserve the current promo-card-oriented UI structure.

## Project Overview
- Runtime: browser-only React app bundled by Vite.
- Language: ES modules in `.js` and `.jsx` files.
- Styling: Tailwind CSS v4 plus a small amount of global CSS in `src/index.css`.
- Entry point: `src/main.jsx`.
- App shell: `src/App.jsx`.
- Main feature composition: `src/components/PromoCard.jsx`.
- Reusable hook: `src/hooks/usePersistentTimer.js`.
- Seed/config data: `src/data/plans.js`.
- Bundled assets: `src/assets/`.
- Design reference images also exist in `src/img/`.
- Build output: `dist/`.

## Package Manager
- Use `npm`.
- Lockfile: `package-lock.json`.
- Do not add pnpm, yarn, or bun unless explicitly requested.

## Build, Lint, and Test Commands
Run commands from the repository root:

```bash
/Users/windmill312/Desktop/js-projects/4atest
```

### Install dependencies
```bash
npm install
```

### Start the dev server
```bash
npm run dev
```

### Create a production build
```bash
npm run build
```
Runs `vite build` and writes output to `dist/`.

### Lint the project
```bash
npm run lint
```
Runs `eslint .` using `eslint.config.js` and ignores `dist/`.

### Preview the production build
```bash
npm run preview
```

### Tests
The repository uses Vitest with the `jsdom` environment and Testing Library.

Default test command:

```bash
npm run test
```

Run tests once in CI/non-watch mode:

```bash
npm run test:run
```

### Running a single test
Run a single file with:

```bash
npm run test -- src/components/PromoCard.test.jsx
```

Run a single named test with:

```bash
npm run test -- -t "disables purchase until consent is given"
```

## Validation Expectations
- After JavaScript or JSX changes, run `npm run lint`.
- After behavior or state-management changes, run `npm run test:run`.
- After meaningful UI changes, run `npm run build`.

## Repository-Specific Instruction Files
Checked for additional agent rules:
- `.cursor/rules/`: not present.
- `.cursorrules`: not present.
- `.github/copilot-instructions.md`: not present.

There are currently no extra Cursor or Copilot instructions to inherit.

## Source Layout Notes
- `src/main.jsx` mounts the app with `createRoot()` and keeps `StrictMode` enabled.
- `src/App.jsx` should stay thin and currently renders `PromoCard` only.
- `src/components/` contains the promo card, pricing cards, timer, consent UI, and supporting promo blocks.
- `src/hooks/usePersistentTimer.js` owns countdown persistence and formatting.
- `src/hooks/useSelectedPlan.js` owns selected-plan state and fallback logic.
- `src/hooks/useTariffs.js` owns tariff loading, normalization, and regular-plan ordering.
- `src/index.css` is the place for global styles; prefer utilities elsewhere.

## Code Style Guidelines
### Imports
- Use ES module imports and exports only.
- Order imports as: external packages, then local modules/components, then local styles.
- Leave a blank line between external and local import groups when both exist.
- Use relative paths for local imports.
- Keep explicit local file extensions when the existing code does.
- Keep one import per line.
- Remove unused imports immediately; ESLint treats them as errors.

### Formatting
- Use 2-space indentation.
- Omit semicolons.
- Prefer single quotes.
- Keep trailing commas where the current style already uses them.
- Prefer concise function bodies and early returns.
- Break long JSX props or children onto multiple lines when readability improves.

### React Conventions
- Prefer function components.
- Use hooks only at the top level of React functions.
- Keep `App.jsx` as a thin composition layer.
- Keep state local unless multiple components truly need to share it.
- Prefer derived values over duplicated state when possible.
- Preserve the current promo-card-oriented component structure unless requirements clearly change.

### Types and Data Modeling
- This is a plain JavaScript repo, not a TypeScript repo.
- Do not introduce TypeScript syntax, config, or `.ts`/`.tsx` files unless asked.
- Prefer simple object shapes and arrays with descriptive property names.
- Keep reusable constants near the top of the file when they are file-local.
- Put shared seed or config data in dedicated modules such as `src/data/plans.js`.

### Naming and Error Handling
- Components and component filenames: PascalCase.
- Variables, functions, props, and local helpers: camelCase.
- Hooks must start with `use`.
- Constants that are true constants may use `UPPER_SNAKE_CASE`.
- Prefer explicit guards over silent failure.
- Use `try`/`catch` only when there is a real fallback or recovery path.
- Remove temporary logging before finishing unless it is intentionally part of the app.

### JSX, Accessibility, and Styling
- Prefer semantic HTML elements where practical.
- Keep buttons as real `<button>` elements.
- Provide meaningful `alt` text for informative images.
- Use empty `alt` only for decorative imagery.
- Tailwind CSS v4 is the primary styling system.
- Prefer utility classes in JSX for component-level styling.
- Use `src/index.css` only for truly global rules.
- Keep responsive behavior intentional for both mobile and desktop layouts.

### Dependencies and Architecture
- Keep the app lightweight.
- Prefer extending existing components over adding abstractions too early.
- Avoid new dependencies when React, Vite, or Tailwind already solve the problem.
- Do not edit `dist/` manually.
- Treat `src/assets/` as the default home for bundled app assets.

## Change Checklist For Agents
1. Confirm imports are clean and used.
2. Keep file names and component names aligned.
3. Run `npm run lint` after JS/JSX edits.
4. Run `npm run test:run` after logic or interaction changes.
5. Run `npm run build` after meaningful UI changes.

## Reality Checks
- This is a frontend-only repository; do not invent backend services or server conventions.
- The current app is still relatively small, so favor directness over abstraction.
- Existing UI copy includes Russian text; preserve the intended language of the surrounding component.
- If a test runner is introduced later, update this file immediately with exact test and single-test usage.
