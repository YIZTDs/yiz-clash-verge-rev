# Code Style and Conventions

## TypeScript/JavaScript

### Formatting (Prettier)

- **Print Width**: 80 characters
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Required
- **Quotes**: Double quotes (single quotes NOT allowed)
- **Trailing Commas**: Always (es5 style)
- **Arrow Functions**: Always use parentheses around parameters
- **Bracket Spacing**: Yes
- **JSX**: Double quotes, bracket on new line

### TypeScript Configuration

- **Strict Mode**: Enabled (all strict checks on)
- **Target**: ESNext
- **Module**: ESNext with Bundler resolution
- **JSX**: react-jsx (automatic runtime)
- **Path Aliases**:
  - `@/*` → `src/*`
  - `@root/*` → project root
- **No Emit**: True (types only, Vite handles build)
- **Force Consistent Casing**: Enabled

### ESLint Rules

- **Max Warnings**: 0 (all warnings must be fixed)
- **Plugins**:
  - react-compiler
  - react-hooks (enforced)
  - unused-imports (auto-removed)
  - import-x (import order)
  - prettier (integrated)
- **Recommended Configs**:
  - ESLint recommended
  - TypeScript ESLint recommended
  - React recommended (TypeScript variant)

### Naming Conventions

- **Functions**: camelCase (async functions exported)
- **Components**: PascalCase (React components)
- **Files**: kebab-case or PascalCase for components
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase with `I` prefix for interfaces (e.g., `IProfileItem`)

### Import Organization

- External imports first (react, libraries)
- Tauri/plugin imports
- Internal imports with `@/` alias
- Types should be imported separately when needed

## Rust

### Formatting

- Standard `rustfmt` configuration
- Run `cargo fmt` before committing

### Linting

- Use `cargo clippy-all` for linting
- All clippy warnings should be addressed

### Conventions

- Edition 2024
- Module structure: public modules in `mod.rs`, implementations in separate files
- Error handling: Use `anyhow::Result` for most operations
- Async: Tokio runtime
- Logging: Use `log` crate with flexi_logger
- Serialization: serde with derive macros

### Code Organization

- Commands (IPC endpoints) in `src-tauri/src/cmd/`
- Configuration structures in `src-tauri/src/config/`
- Core logic in `src-tauri/src/core/`
- Each module should have clear responsibility

## Git Commit Guidelines

- **Commit Signing**: Required (GPG signatures)
- **Message Format**: Clear, descriptive messages
- **Branch Naming**: Feature branches for new work
- **PR Requirements**:
  - All linting must pass
  - All formatting must pass
  - Commits must be signed

## File Organization

- Place components in appropriate directories (`src/components/`)
- Group related functionality (pages, services, hooks)
- Keep utility functions in `src/utils/`
- Types in `.d.ts` files or inline when appropriate
