# Technology Stack

## Frontend

- **Framework**: React 19.2.3 with TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1 with @vitejs/plugin-react-swc
- **UI Framework**: Material-UI (MUI) v7.3.7 with Emotion styling
- **State Management**: ahooks 3.9.6, SWR 2.3.8
- **Routing**: React Router 7.12.0
- **Forms**: react-hook-form 7.71.1
- **Internationalization**: i18next 25.7.4 + react-i18next 16.5.3
- **HTTP Client**: axios 1.13.2 (via tauri-plugin-http)
- **Data Tables**: @tanstack/react-table 8.21.3 with virtualization
- **Drag & Drop**: @dnd-kit v6/v10
- **Code Editor**: Monaco Editor 0.55.1 with monaco-yaml
- **Markdown**: react-markdown 10.1.0

## Backend

- **Framework**: Tauri 2.9.1
- **Language**: Rust 1.91+ (edition 2024)
- **JavaScript Runtime**: Boa Engine 0.21.0 (for script execution)
- **HTTP**: reqwest 0.13.1 with rustls
- **Logging**: flexi_logger with custom clash_verge_logger
- **System Proxy**: sysproxy-rs (custom fork)
- **Service IPC**: clash_verge_service_ipc 2.1.0
- **Core Engine**: Mihomo (Clash Meta) bundled as sidecar binary

## Tauri Plugins

- tauri-plugin-mihomo (custom plugin for core interaction)
- tauri-plugin-shell, dialog, fs, process, http
- tauri-plugin-clipboard-manager
- tauri-plugin-updater, autostart, global-shortcut
- tauri-plugin-notification, window-state, deep-link

## Build & Development Tools

- **Package Manager**: pnpm 10.28.0 (required, managed via corepack)
- **Linting**: ESLint 9.39.2 with flat config
- **Formatting**: Prettier 3.8.0
- **Pre-commit**: Husky 9.1.7 + lint-staged 16.2.7
- **TypeScript Compilation**: tsc (no emit, type checking only)
- **CSS Preprocessor**: Sass 1.97.2
- **Bundler**: Rollup (via Vite) with terser minification

## Workspace Structure

Monorepo with workspace packages:

- clash-verge-draft
- clash-verge-logging
- clash-verge-signal
- clash-verge-types
- clash-verge-i18n
- tauri-plugin-clash-verge-sysinfo
- tauri-plugin-clipboard-manager
