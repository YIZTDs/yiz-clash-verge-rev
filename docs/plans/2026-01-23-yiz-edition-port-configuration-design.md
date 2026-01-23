# YIZ Edition Port Configuration Design

**Date:** 2026-01-23
**Status:** Approved
**Author:** Design Session

## Overview

This design document outlines the implementation of YIZ Enterprise Edition's custom default port configuration using conditional compilation. The solution enables maintaining compatibility with upstream Clash updates while providing fixed enterprise ports.

## Requirements

### Primary Goals
- Change default ports from `789x` to `786x` range for YIZ Enterprise Edition
- Maintain compatibility with upstream Clash Verge Rev updates
- Prevent enterprise users from modifying ports (hard enforcement)
- Support parallel development and building of both OSS and Enterprise editions

### Target Ports
- `mixed-port`: 7867 (was 7897)
- `socks-port`: 7868 (was 7898)
- `http-port`: 7869 (was 7899)

### Constraints
- Must not hardcode values (to facilitate merging upstream changes)
- Enterprise users must use fixed ports (no configuration option)
- Minimal code changes to reduce merge conflicts

## Design Solution

### Approach: Conditional Compilation with Feature Flags

We use Rust's conditional compilation (`#[cfg]`) with a custom feature flag to define edition-specific constants at compile time.

**Advantages:**
- ✅ Minimal merge conflicts with upstream
- ✅ Enforces fixed ports for enterprise edition
- ✅ Clean separation between editions
- ✅ No runtime overhead
- ✅ Easy to maintain

**Trade-offs:**
- Requires separate build commands for each edition
- Cannot switch editions without recompilation

## Implementation Details

### 1. Cargo Feature Flag

**File:** `src-tauri/Cargo.toml`

Add feature flag definition:

```toml
[features]
default = []
yiz-edition = []  # YIZ Enterprise Edition marker
```

### 2. Conditional Port Constants

**File:** `src-tauri/src/constants.rs`

Modify the `network::ports` module:

```rust
pub mod network {
    pub mod ports {
        // Mixed port (HTTP + SOCKS5)
        #[cfg(feature = "yiz-edition")]
        pub const DEFAULT_MIXED: u16 = 7867;
        #[cfg(not(feature = "yiz-edition"))]
        pub const DEFAULT_MIXED: u16 = 7897;

        // SOCKS5 port
        #[cfg(feature = "yiz-edition")]
        pub const DEFAULT_SOCKS: u16 = 7868;
        #[cfg(not(feature = "yiz-edition"))]
        pub const DEFAULT_SOCKS: u16 = 7898;

        // HTTP port
        #[cfg(feature = "yiz-edition")]
        pub const DEFAULT_HTTP: u16 = 7869;
        #[cfg(not(feature = "yiz-edition"))]
        pub const DEFAULT_HTTP: u16 = 7899;
    }
}
```

### 3. Build Scripts

**File:** `package.json`

Add YIZ edition build commands:

```json
{
  "scripts": {
    "dev:yiz": "cross-env RUST_BACKTRACE=full tauri dev -f verge-dev -- --features yiz-edition",
    "build:fast_yiz": "cross-env NODE_OPTIONS='--max-old-space-size=4096' tauri build -- --profile fast-release --features yiz-edition",
    "build:yiz": "cross-env NODE_OPTIONS='--max-old-space-size=4096' tauri build -- --profile release --features yiz-edition"
  }
}
```

## Build Commands Reference

| Purpose | Open Source Edition | YIZ Enterprise Edition |
|---------|-------------------|----------------------|
| Development | `pnpm dev` | `pnpm dev:yiz` |
| Fast Build (testing) | `pnpm build:fast` | `pnpm build:fast_yiz` |
| Production Build | `pnpm build` | `pnpm build:yiz` |
| Port Range | 789x | 786x |

## Testing Strategy

### Development Testing
```bash
# Start YIZ dev server
pnpm dev:yiz

# Verify ports in use:
# - Check app logs for port binding
# - Confirm 7867, 7868, 7869 are in use
# - Ensure OSS ports (789x) are not used
```

### Build Verification
```bash
# Fast build for testing
pnpm build:fast_yiz

# Run built executable
# Verify ports via system proxy settings or netstat
```

### Upstream Merge Testing
1. Merge upstream changes
2. Build both editions
3. Verify port constants remain separated
4. Confirm no port-related conflicts

## Future Considerations

### Potential Enhancements
- Additional YIZ-specific features could use the same `yiz-edition` flag
- Consider adding build-time version string differentiation
- May add UI indicators for enterprise edition

### Maintenance Notes
- Keep `constants.rs` changes minimal to reduce merge conflicts
- Document any new YIZ-specific features using the same feature flag
- Regularly test builds of both editions after upstream merges

## Migration Impact

### For Existing YIZ Users
- First-time users will automatically use new ports
- No migration needed as this is a new feature

### For Developers
- Learn new build commands (`pnpm dev:yiz`, `pnpm build:yiz`)
- Use YIZ commands for all enterprise development

## Rollout Plan

1. **Phase 1: Implementation**
   - Modify `Cargo.toml` and `constants.rs`
   - Add `package.json` scripts
   - Test both editions locally

2. **Phase 2: Validation**
   - Build both editions
   - Verify port configurations
   - Test upstream merge compatibility

3. **Phase 3: Documentation**
   - Update internal build documentation
   - Document YIZ-specific build process
   - Create developer onboarding guide

## Sign-off

This design has been validated through collaborative brainstorming and addresses all stated requirements for YIZ Enterprise Edition port configuration.