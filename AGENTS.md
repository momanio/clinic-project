# Repository Guidelines

## Project Structure & Module Organization

This repository is a React application built with TypeScript and Vite.
- `src/main.tsx` mounts the application; `src/App.tsx` contains the starter interface.
- `src/App.css` holds component styles; `src/index.css` defines global styles and theme variables.
- `src/assets/` contains imported images and SVGs. `public/` holds static files served directly, such as `/icons.svg`.
- Root configuration includes `vite.config.ts`, `eslint.config.js`, and separate TypeScript settings for application and build configuration code.
- Production output goes to `dist/`. Keep generated files and `node_modules/` out of commits.

## Build, Test, and Development Commands

Run commands from the repository root:
- `npm ci`: install dependencies using `package-lock.json`.
- `npm run dev`: start Vite with hot module replacement.
- `npm run build`: run TypeScript project checks and produce the production bundle.
- `npm run lint`: check TypeScript and TSX files with ESLint.
- `npm run preview`: serve the production build locally after building.

## Coding Style & Naming Conventions

Follow the existing two-space indentation, single quotes in TypeScript, and omitted JavaScript semicolons. Use double quotes for JSX attributes and semicolons for CSS declarations. Prefer function components and hooks. Name components and their files in PascalCase, such as `App.tsx`; use camelCase for functions and variables and `use` prefixes for custom hooks. Keep related styles alongside components.

ESLint enforces recommended JavaScript, TypeScript, React Hooks, and React Refresh rules. No dedicated formatter is configured. Remove unused variables and imports to satisfy TypeScript checks.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is configured. Before submitting code changes, run `npm run lint` and `npm run build`, then verify affected interactions, responsive layouts, and light/dark themes in the browser. If adding automated tests, document the runner and command; use descriptive filenames such as `App.test.tsx` alongside the component.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so no established commit convention can be verified. Use concise, imperative subjects, such as `Add keyboard navigation`. Keep commits focused. Pull requests should describe the change, link relevant issues, list validation performed, and include screenshots for visible UI changes. Commit `package-lock.json` with dependency updates.
