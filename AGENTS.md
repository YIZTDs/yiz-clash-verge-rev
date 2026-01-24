# Repository Guidelines

## Project Structure & Module Organization

- `src/`: React + TypeScript frontend.
- `src-tauri/`: Tauri (Rust) backend, configs, and icons.
- `crates/`: Rust workspace crates (tests live under `crates/*/tests`).
- `scripts/` and `scripts-workflow/`: build/release automation.
- `docs/`: documentation (including i18n guide).
- `yiz/`: YIZ edition assets/configuration.
- Assets are primarily in `src/assets/` and `src-tauri/icons/`.

## Build, Test, and Development Commands

- `pnpm install`: install JS dependencies (enable corepack if needed).
- `pnpm run prebuild`: download/update Mihomo core binaries.
- `pnpm dev` / `pnpm dev:tauri` / `pnpm dev:diff`: run the app locally.
- `pnpm build` / `pnpm build:fast`: produce release builds (fast uses `fast-release`).
- `pnpm clean`: clean build outputs.
- `pnpm portable`: Windows portable bundle.
- Rust workspace: `cargo test` (or `cargo test -p clash-verge-draft`).

## Coding Style & Naming Conventions

- `.editorconfig`: LF endings, 2-space indentation; Rust uses 4 spaces.
- Formatters: `prettier` for JS/TS (`pnpm format`), `cargo fmt` for Rust.
- Linters: `eslint` (`pnpm lint`) and `cargo clippy-all`.
- Filenames are typically kebab-case (e.g., `src/components/test/test-viewer.tsx`).

- React components use PascalCase; follow existing module and export patterns.

## Testing Guidelines

- Rust tests live in `crates/*/tests`; run with `cargo test`.

- No dedicated frontend test runner is configured; do a smoke run with `pnpm dev`
  or `pnpm dev:tauri` when changing UI or integration logic.

## Commit & Pull Request Guidelines

- Commit messages follow a Conventional Commit style seen in history:
  `feat:`, `fix:`, `chore:`, `docs:`, `build:` with optional scopes
  (e.g., `feat(yiz-edition): ...`).
- Signed commits are required (see CONTRIBUTING).
- PRs should include a clear description, linked issue (if any), and screenshots
  for UI changes. Note the platforms you tested on.
- For translation work, follow `docs/CONTRIBUTING_i18n.md`.
