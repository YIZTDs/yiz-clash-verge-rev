# Project Structure

## High-Level Directory Organization

```
yiz-clash-verge-rev/
├── src/                      # React frontend (TypeScript)
│   ├── components/          # Reusable React components
│   │   ├── base/           # Basic UI components (dialogs, inputs, switches)
│   │   ├── home/           # Home page widgets (traffic graph, mode cards)
│   │   ├── layout/         # Layout components (header, sidebar, traffic)
│   │   ├── proxy/          # Proxy selection and management UI
│   │   ├── profile/        # Profile management and editors
│   │   ├── setting/        # Settings dialogs and forms
│   │   ├── connection/     # Connection monitoring table
│   │   ├── log/            # Log viewer
│   │   └── rule/           # Rule display
│   ├── pages/              # Page-level route components
│   │   ├── _layout.tsx     # Main app layout with navigation
│   │   ├── _routers.tsx    # Route definitions
│   │   ├── _theme.tsx      # Theme configuration
│   │   ├── home.tsx        # Dashboard page
│   │   ├── proxies.tsx     # Proxy groups page
│   │   ├── profiles.tsx    # Profile management
│   │   ├── rules.tsx       # Rules page
│   │   ├── connections.tsx # Active connections
│   │   ├── logs.tsx        # Logs page
│   │   ├── settings.tsx    # Settings page
│   │   ├── test.tsx        # Connection testing
│   │   └── unlock.tsx      # Media unlock checker
│   ├── services/           # Business logic and API layer
│   │   ├── cmds.ts         # Tauri command wrappers (IPC bridge)
│   │   ├── api.ts          # External HTTP API calls
│   │   ├── config.ts       # Config management
│   │   ├── states.ts       # Global state atoms
│   │   ├── i18n.ts         # Internationalization setup
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets (images, fonts, styles)
│   ├── locales/            # i18n translation files
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Root React component
│
├── src-tauri/               # Rust backend (Tauri app)
│   ├── src/
│   │   ├── cmd/            # Tauri command handlers (IPC endpoints)
│   │   │   ├── mod.rs      # Command module exports
│   │   │   ├── profile.rs  # Profile CRUD operations
│   │   │   ├── proxy.rs    # Proxy management
│   │   │   ├── clash.rs    # Clash core control
│   │   │   ├── verge.rs    # Verge app settings
│   │   │   ├── system.rs   # System proxy, network info
│   │   │   ├── service.rs  # Windows service management
│   │   │   ├── backup.rs   # Backup operations
│   │   │   ├── webdav.rs   # WebDAV sync
│   │   │   ├── media_unlock_checker/  # Media service checks
│   │   │   └── ...
│   │   ├── config/         # Configuration management
│   │   │   ├── mod.rs      # Config module exports
│   │   │   ├── profiles.rs # Profile configuration
│   │   │   ├── clash.rs    # Clash config structures
│   │   │   ├── verge.rs    # Verge settings
│   │   │   ├── prfitem.rs  # Profile item definitions
│   │   │   └── encrypt.rs  # Config encryption
│   │   ├── core/           # Core application logic
│   │   │   ├── mod.rs      # Core module exports
│   │   │   ├── manager/    # CoreManager (app state management)
│   │   │   ├── service.rs  # Clash service lifecycle
│   │   │   ├── backup.rs   # Backup management
│   │   │   ├── hotkey.rs   # Global hotkey handling
│   │   │   ├── logger.rs   # Logging configuration
│   │   │   ├── tray/       # System tray menu
│   │   │   ├── sysopt.rs   # System proxy settings
│   │   │   ├── timer.rs    # Scheduled tasks
│   │   │   └── ...
│   │   ├── enhance/        # Config enhancement features
│   │   │   ├── merge.rs    # Config merging
│   │   │   ├── script.rs   # JavaScript execution (Boa)
│   │   │   ├── chain.rs    # Proxy chain handling
│   │   │   └── builtin/    # Built-in enhancement scripts
│   │   ├── utils/          # Utility functions
│   │   ├── constants.rs    # Application constants
│   │   ├── lib.rs          # Library entry point
│   │   └── main.rs         # Binary entry point
│   ├── capabilities/       # Tauri security capabilities
│   ├── icons/              # App and tray icons
│   ├── packages/           # Platform-specific packaging
│   ├── Cargo.toml          # Rust dependencies
│   ├── tauri.conf.json     # Tauri configuration
│   └── build.rs            # Build script
│
├── scripts/                 # Build and release automation
├── docs/                    # Documentation
├── dist/                    # Vite build output (generated)
├── node_modules/            # Node dependencies (generated)
├── package.json             # Node dependencies and scripts
├── pnpm-lock.yaml          # Locked dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.mts         # Vite bundler configuration
├── eslint.config.ts        # ESLint configuration
├── .prettierrc             # Prettier formatting rules
├── .editorconfig           # Editor configuration
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md               # Project readme
```

## Key Architectural Concepts

### Frontend Architecture

- **Component-Based**: React components organized by feature/page
- **Service Layer**: `services/cmds.ts` abstracts Tauri IPC calls
- **State Management**: Global atoms in `services/states.ts`
- **Routing**: React Router with route definitions in `_routers.tsx`
- **Theme**: Material-UI theming with custom color schemes

### Backend Architecture

- **Command Pattern**: IPC handlers in `cmd/` modules
- **Config Layering**: Base config → Profiles → Enhancements → Runtime
- **CoreManager**: Centralized state management for Clash service
- **Service Lifecycle**: Start/stop/restart Clash core subprocess
- **Enhancement Pipeline**: Merge → Script → Chain processing

### IPC Communication Flow

1. Frontend calls function in `services/cmds.ts`
2. Function invokes Tauri command via `invoke()`
3. Rust handler in `cmd/` processes request
4. CoreManager updates state if needed
5. Response returned to frontend
6. Events broadcast for reactive updates
