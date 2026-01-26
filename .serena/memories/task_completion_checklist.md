# Task Completion Checklist

Before marking any task as complete, ensure ALL of the following are satisfied:

## Code Quality

### Frontend Changes

- [ ] **Type Checking**: Run `pnpm typecheck` - must pass with no errors
- [ ] **Linting**: Run `pnpm lint` - must pass with 0 warnings
- [ ] **Formatting**: Run `pnpm format:check` - all files properly formatted
- [ ] **Unused Imports**: No unused imports remain (auto-fixed by lint)
- [ ] **Console Logs**: Remove debug `console.log()` statements (keep only `console.debug()` or `console.trace()` which are stripped in production)

### Backend Changes

- [ ] **Rust Formatting**: Run `cargo fmt` - code formatted
- [ ] **Rust Linting**: Run `cargo clippy-all` - all clippy warnings addressed
- [ ] **Compilation**: Code compiles without errors or warnings

### i18n Changes (if applicable)

- [ ] **Type Generation**: Run `pnpm i18n:types` after adding new keys
- [ ] **Unused Keys**: Run `pnpm i18n:check` to verify no unused keys
- [ ] **All Languages**: Add translations to all supported language files, or mark TODOs

## Testing

### Functional Testing

- [ ] **Manual Testing**: Feature works as expected in dev mode
- [ ] **Edge Cases**: Tested error cases and boundary conditions
- [ ] **Cross-Platform**: If platform-specific, tested on target OS (Windows/Linux/macOS)
- [ ] **Regression**: Existing functionality still works

### Build Testing

- [ ] **Dev Build**: `pnpm dev` starts without errors
- [ ] **Production Build**: `pnpm build` completes successfully (for major changes)

## Documentation

- [ ] **Code Comments**: Complex logic has explanatory comments
- [ ] **Type Definitions**: New interfaces/types properly defined
- [ ] **CLAUDE.md**: Updated if architecture or commands changed
- [ ] **Changelog**: Consider if change should be noted for release

## Git

- [ ] **Commit Message**: Clear, descriptive commit message
- [ ] **Commit Signing**: Commit is GPG signed (`git commit -S`)
- [ ] **Branch**: Work done on appropriate feature branch
- [ ] **No Secrets**: No API keys, tokens, or sensitive data committed

## Pre-Commit Automation

The following will be automatically checked by husky pre-commit hooks:

- ESLint on staged `.ts`, `.tsx`, `.js`, `.jsx` files
- Prettier formatting on staged files
- If hooks fail, fix issues before committing

## Final Validation Command

```bash
# Run full validation suite
pnpm typecheck && pnpm lint && pnpm format:check && cargo fmt && cargo clippy-all
```

If all checks pass ✅, the task is complete.
