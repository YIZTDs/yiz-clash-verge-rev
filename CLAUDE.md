# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Clash Verge Rev** is a cross-platform GUI for Clash Meta (mihomo), built with Tauri 2 (Rust backend) and React 19 (TypeScript frontend). It's a continuation of the original Clash Verge project, providing a modern interface for managing network proxy configurations.

- **Repository**: clash-verge-rev/clash-verge-rev
- **License**: GPL-3.0-only
- **Node**: pnpm@10.28.0 (required)
- **Rust**: 1.91+ (required)

## Development Quick Start

### Prerequisites

1. **Rust & Node.js**: Follow [Tauri prerequisites](https://tauri.app/start/prerequisites/)
2. **Windows ARM users**: Install [LLVM](https://github.com/llvm/llvm-project/releases) with clang
3. **Enable corepack**: `corepack enable`
4. **Install dependencies**: `pnpm install`

### Essential Commands

```bash
# Download Mihomo core binary (required before dev/build)
pnpm run prebuild

# Development
pnpm dev              # Standard dev server
pnpm dev:diff         # If instance already running
pnpm dev:tauri        # Tauri-only dev (skip web dev server)

# Building
pnpm build            # Production build
pnpm build:fast       # Fast release build for testing

# Code Quality
pnpm lint             # Check frontend code
pnpm lint:fix         # Fix frontend linting issues
pnpm format           # Format all code (Prettier)
pnpm format:check     # Check formatting without changes
pnpm typecheck        # TypeScript type checking

# Rust backend
cargo fmt             # Format Rust code
cargo clippy-all      # Lint Rust code

# Internationalization
pnpm i18n:check       # Check for unused i18n keys
pnpm i18n:format      # Align and apply i18n formatting
pnpm i18n:types       # Generate i18n type definitions
```

## Architecture

### Frontend Structure (`src/`)

**React 19 + TypeScript + Vite + Material-UI**

```
src/
├── components/        # Reusable React components
│   ├── base/         # Base UI components (dialogs, inputs, etc.)
│   ├── home/         # Home page cards and widgets
│   ├── layout/       # Layout components (header, sidebar, traffic graph)
│   ├── proxy/        # Proxy selection and management UI
│   ├── profile/      # Profile management and editing
│   ├── setting/      # Settings pages and dialogs
│   ├── connection/   # Connection monitoring table
│   ├── log/          # Log viewer components
│   └── rule/         # Rule display components
├── pages/            # Page-level routes (_layout.tsx, home.tsx, etc.)
├── services/         # API communication and business logic
│   ├── cmds.ts      # Tauri command wrappers (IPC to Rust)
│   ├── api.ts       # External HTTP API calls
│   ├── config.ts    # Config state management
│   ├── states.ts    # Global state (atoms/signals)
│   └── ...
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── assets/           # Static images, fonts, styles
└── App.tsx           # Root component
```

**Key Technology Choices**:

- **State Management**: Uses signals/atoms pattern (likely ahooks or similar)
- **Forms**: react-hook-form with Material-UI
- **I18n**: react-i18next (multilingual support)
- **HTTP Client**: axios via tauri-plugin-http
- **UI Framework**: Material-UI v7 with Emotion styling
- **Icons**: @mui/icons-material
- **Routing**: React Router v7
- **Table**: @tanstack/react-table with @tanstack/react-virtual for virtualization
- **Drag & Drop**: @dnd-kit for reordering

### Backend Structure (`src-tauri/src/`)

**Tauri 2 + Rust**

```
src-tauri/src/
├── cmd/              # Command handlers (IPC endpoints)
│   ├── profile.rs    # Profile CRUD operations
│   ├── proxy.rs      # Proxy chain and group management
│   ├── clash.rs      # Clash core control
│   ├── verge.rs      # Verge app settings
│   ├── system.rs     # System proxy, UWP, network info
│   ├── service.rs    # Windows service management
│   ├── backup.rs     # Backup and restore operations
│   ├── webdav.rs     # WebDAV sync
│   ├── validate.rs   # Config validation
│   └── media_unlock_checker/  # Media region unlock detection
├── config/           # Configuration structures
│   ├── profiles.rs   # Profile configuration
│   ├── clash.rs      # Clash config parsing
│   ├── verge.rs      # Verge settings
│   ├── prfitem.rs    # Profile item definitions
│   └── encrypt.rs    # Config encryption
├── core/             # Core functionality
│   ├── manager/      # CoreManager (central app state)
│   ├── service.rs    # Clash core service lifecycle
│   ├── backup.rs     # Backup management
│   ├── hotkey.rs     # Global hotkey handling
│   ├── logger.rs     # Logging setup
│   ├── tray/         # System tray menu
│   └── sysopt.rs     # System proxy optimization
├── enhance/          # Config enhancement
│   ├── merge.rs      # Config merging
│   ├── script.rs     # Script execution (JavaScript via Boa)
│   └── chain.rs      # Proxy chain handling
└── lib.rs            # App initialization and Tauri setup
```

**Key Concepts**:

- **IPC Bridge**: `invoke()` in frontend calls Tauri commands exported from Rust
- **CoreManager**: Central state management for the Clash service lifecycle
- **Config Layering**: Base config → Profiles → Runtime config → Enhancements
- **Service Management**: Windows service integration for system proxy

### Data Flow

1. **Frontend** → `services/cmds.ts` wraps Tauri `invoke()` calls
2. **Tauri IPC** → Routes to handlers in `src-tauri/src/cmd/*.rs`
3. **Rust Backend** → CoreManager processes request, manages Clash service
4. **State Sync** → Changes broadcast via Tauri events to update frontend
5. **Clash Core** → Mihomo binary runs as subprocess, configured via YAML

## Frontend-Backend Communication

### Key IPC Endpoints

Profile management:

- `get_profiles()` → `get_profiles`
- `createProfile()` → `create_profile`
- `patchProfile()` → `patch_profile`

Runtime control:

- `getRuntimeConfig()` → `get_runtime_config`
- `getRuntimeYaml()` → `get_runtime_yaml`

Proxy operations:

- `getProxies()` → tauri-plugin-mihomo-api (direct plugin)
- `getProxyProviders()` → tauri-plugin-mihomo-api

All commands are wrappers around `invoke<ReturnType>(command_name, params)`

See `src/services/cmds.ts` for the complete IPC contract.

## Build Process

1. **prebuild**: Downloads Mihomo core binary to `src-tauri/sidecar/`
2. **web:build**: Vite builds React → `dist/`
3. **tauri build**: Compiles Rust + bundles web assets
4. **Output**: Platform-specific installers (Windows .msi, macOS .dmg, Linux .AppImage)

## Code Quality Standards

### Linting & Formatting

Frontend (enforced pre-commit via husky):

```bash
pnpm lint --max-warnings=0  # ESLint (no warnings allowed)
pnpm format                  # Prettier
```

Backend:

```bash
cargo fmt           # Rust formatting
cargo clippy-all    # Linting
```

### ESLint Configuration

- **Config**: `eslint.config.ts` (flat config format)
- **Plugins**: react-compiler, react-hooks, unused-imports, import-x, prettier
- **Rules**: Enforces React best practices, unused import removal, proper formatting
- **Max Warnings**: 0 (all warnings must be fixed)

### Pre-commit Hooks

Configured in `package.json` lint-staged:

- Runs eslint + prettier on TypeScript/JavaScript files
- Runs prettier on CSS/SCSS/JSON/Markdown files
- Commits must be signed (GPG signing)

## Workspace Configuration

This is a **monorepo** (workspace). Check `Cargo.toml` in root for workspace packages:

- `clash-verge-draft`, `clash-verge-logging`, `clash-verge-signal`, `clash-verge-types`, `clash-verge-i18n`
- `tauri-plugin-clash-verge-sysinfo`, `tauri-plugin-clipboard-manager`
- All dependencies shared via workspace manifest

## Internationalization (i18n)

- **Framework**: react-i18next
- **Keys**: Strings extracted to JSON files in `src/locales/`
- **Supported Languages**: en, zh, es, ru, ja, ko, fa, pt, it
- **Type Generation**: `pnpm i18n:types` generates TypeScript definitions
- **Checking**: `pnpm i18n:check` reports unused/missing keys

See `docs/CONTRIBUTING_i18n.md` for translation contribution guidelines.

## Vite Configuration Notes

- **Root**: `src/` directory
- **Output**: `../dist/`
- **Dev Server**: Port 3000
- **Legacy Support**: Plugin targets Edge≥109, Safari≥13 with polyfills
- **Code Splitting**: Intelligent chunking (react-core, react-ui, mui, utils, vendors)
- **Alias**: `@/*` → `src/*`, `@root/*` → project root
- **Env Define**: `OS_PLATFORM` available at build time

## Tauri Configuration

- **Security**: Asset protocol enabled with custom capabilities
- **Updater**: Configured with public key and multiple fallback endpoints
- **Deep Linking**: Supports `clash://` and `clash-verge://` schemes
- **Build Features**: Custom protocol support, devtools in dev mode
- **Sidecar**: Bundles Mihomo core as external binary

## Important File Locations

- **Feature Flags**: `Cargo.toml` (verge-dev, tokio-trace, tracing)
- **App Config**: `src-tauri/tauri.conf.json`
- **TypeScript Config**: `tsconfig.json` (strict mode enabled)
- **Prettier Config**: Integrated in ESLint
- **Type Definitions**: `src/**/*.d.ts` (check before adding new types)

## Common Tasks

### Adding a New Page

1. Create `src/pages/newpage.tsx`
2. Export component with route in `src/pages/_routers.tsx`
3. Add link in `src/pages/_layout.tsx` navigation
4. Add i18n key for page title

### Adding Backend Command

1. Create handler in `src-tauri/src/cmd/yourmodule.rs`
2. Export from `src-tauri/src/cmd/mod.rs`
3. Register in `src-tauri/src/lib.rs` Tauri setup
4. Wrap in `src/services/cmds.ts`
5. Call via `invoke()` from components

### Debugging

Frontend:

- DevTools enabled in dev mode (F12)
- `console.debug()` and `console.trace()` stripped in production
- Check `src/utils/debug.ts` for debug utilities

Backend:

- Logs to `~/.config/clash-verge/` (platform-specific)
- Use `RUST_BACKTRACE=full` for verbose output
- `cargo clippy` for linting suggestions

### Profiling & Performance

Frontend bundle analysis:

- Check chunk sizes in build output
- Vite generates semantic chunk names for debugging
- Use browser DevTools Performance tab

Backend:

- Optional Tokio tracing: `pnpm dev:trace` (requires feature flag)
- Check issue with tokio_unstable cfg flag

## Testing & CI

- **Linting**: Required before commit (husky pre-commit hooks)
- **TypeScript**: `pnpm typecheck` must pass
- **Format Check**: `pnpm format:check`
- **GitHub Actions**: Builds for Windows/macOS/Linux on each PR
- **Release**: Automated builds on version tags

## Common Issues

### Windows ARM Build Fails

Install LLVM and clang, set `LIBCLANG_PATH` environment variable.

### Prebuild Missing

Always run `pnpm run prebuild` before `pnpm dev`. Re-download with `--force` flag if needed.

### Hot Module Reload Issues

Use `pnpm dev:diff` if a dev instance is already running, or kill existing process first.

### i18n Type Errors

Run `pnpm i18n:types` to regenerate type definitions after adding new keys.

## Contributing

- See `CONTRIBUTING.md` for setup and submission guidelines
- Sign commits (required for PR merge)
- Follow existing code patterns and conventions
- Run full linting/formatting before committing
- Keep PRs focused on single features/fixes

## Agent-Specific Notes

- Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
