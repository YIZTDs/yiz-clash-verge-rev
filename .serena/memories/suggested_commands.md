# Suggested Commands

## Initial Setup

```bash
# Enable pnpm (required first time)
corepack enable

# Install dependencies
pnpm install

# Download Mihomo core binary (REQUIRED before dev/build)
pnpm run prebuild

# Force re-download if needed
pnpm run prebuild --force
```

## Development

```bash
# Standard development server (frontend + backend)
pnpm dev

# If an instance is already running
pnpm dev:diff

# Tauri-only dev mode (skip web dev server)
pnpm dev:tauri

# Development with tokio tracing (requires feature flag)
pnpm dev:trace

# Frontend only (web development without Tauri)
pnpm run web:dev
```

## Building

```bash
# Production build (full optimization)
pnpm build

# Fast release build (for testing, faster compilation)
pnpm build:fast

# Frontend build only
pnpm run web:build
```

## Code Quality

### Frontend

```bash
# Lint TypeScript/JavaScript
pnpm lint

# Lint and auto-fix issues
pnpm lint:fix

# Format all code (Prettier)
pnpm format

# Check formatting without changes
pnpm format:check

# Type checking (no build)
pnpm typecheck
```

### Backend

```bash
# Format Rust code
cargo fmt

# Lint Rust code (all workspace members)
cargo clippy-all

# Check compilation without building
cargo check
```

## Internationalization (i18n)

```bash
# Check for unused i18n keys
pnpm i18n:check

# Align and apply i18n formatting
pnpm i18n:format

# Generate TypeScript type definitions for i18n
pnpm i18n:types
```

## Testing & Validation

```bash
# Run type checking + linting together
pnpm typecheck && pnpm lint

# Full pre-commit validation
pnpm lint && pnpm format:check && pnpm typecheck
```

## Release & Publishing

```bash
# Create portable version (Windows only)
pnpm portable

# Version management
pnpm run release-version autobuild
pnpm run release-version deploytest

# Updater generation
pnpm updater
pnpm updater-fixed-webview2
```

## Tauri-Specific Commands

```bash
# Direct Tauri CLI access
pnpm tauri --help

# Build Tauri app
pnpm tauri build

# Dev mode
pnpm tauri dev
```

## Pre-Commit Workflow

**ALWAYS run before committing:**

```bash
# 1. Format code
pnpm format

# 2. Run linting
pnpm lint

# 3. Check types
pnpm typecheck

# 4. Format Rust code
cargo fmt

# 5. Lint Rust code
cargo clippy-all

# 6. Stage changes and commit (will auto-run husky hooks)
git add .
git commit -S -m "your signed commit message"
```

Note: Husky pre-commit hooks will automatically run eslint and prettier on staged files.

## Troubleshooting

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install

# Clean Rust build artifacts
cargo clean

# Re-download Mihomo core
pnpm run prebuild --force

# Check for issues
pnpm doctor
```
