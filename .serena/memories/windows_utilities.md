# Windows System Utilities

This project is being developed on **Windows**. Here are Windows-specific commands and considerations:

## Common Windows Commands (PowerShell/CMD)

### File Operations

```powershell
# List directory contents
dir                    # Or: ls (in PowerShell)
Get-ChildItem         # PowerShell alias: ls, dir

# Change directory
cd path\to\directory
Set-Location path     # PowerShell

# Find files
Get-ChildItem -Recurse -Filter "*.ts"
dir /s /b *.ts        # CMD recursive search

# Search in files (grep equivalent)
Select-String "pattern" -Path "*.ts" -Recurse
findstr /s /i "pattern" *.ts  # CMD alternative

# Copy, move, delete
Copy-Item source dest
Move-Item source dest
Remove-Item file      # Or: rm, del
```

### Process Management

```powershell
# List processes
Get-Process
tasklist             # CMD

# Kill process
Stop-Process -Name "process"
taskkill /F /IM process.exe

# Find process using port
netstat -ano | findstr :3000
Get-NetTCPConnection -LocalPort 3000  # PowerShell
```

### Git Operations

```bash
# Standard git commands work on Windows
git status
git add .
git commit -S -m "message"  # -S for GPG signing
git push
```

## Windows-Specific Development Notes

### Path Separators

- Windows uses backslash `\` for paths
- Most Node.js/Rust tools handle both `/` and `\` automatically
- In code, prefer forward slashes `/` for cross-platform compatibility

### Line Endings

- **CRLF** (`\r\n`) is Windows default
- **LF** (`\n`) is Unix/Mac default
- Prettier configured with `"endOfLine": "auto"` to handle both
- Git should be configured to handle line endings:
  ```bash
  git config --global core.autocrlf true
  ```

### Case Sensitivity

- Windows filesystem is case-insensitive (but case-preserving)
- Be careful with import paths - `import "./Foo"` vs `import "./foo"`
- TypeScript has `forceConsistentCasingInFileNames: true` to catch issues

### Required Windows Tools

#### Rust Development

```bash
# Install MSVC toolchain (required)
rustup target add x86_64-pc-windows-msvc
rustup set default-host x86_64-pc-windows-msvc

# Windows ARM users need LLVM
# Download from: https://github.com/llvm/llvm-project/releases
# Must install clang and set LIBCLANG_PATH environment variable
```

#### Node.js Package Manager

```bash
# Enable corepack for pnpm
corepack enable

# Verify pnpm
pnpm --version  # Should be 10.28.0
```

#### GNU patch Tool

- Required for some build processes
- Install via Chocolatey: `choco install patch`
- Or download GNU tools for Windows

### Environment Variables

```powershell
# View environment variable
echo $env:PATH
$env:VARIABLE_NAME

# Set temporary environment variable (current session)
$env:VARIABLE_NAME = "value"

# Set permanent (requires admin)
[System.Environment]::SetEnvironmentVariable("VAR", "value", "User")
```

### Permission Issues

- Some operations may require Administrator privileges
- Right-click PowerShell/CMD → "Run as Administrator"
- Tauri service installation requires admin rights

### Windows-Specific Features

- **Windows Service**: Service management in `src-tauri/src/cmd/service.rs`
- **UWP Loopback**: UWP app proxy in `src-tauri/src/core/win_uwp.rs`
- **System Proxy**: Windows registry manipulation for proxy settings
- **Tray Icons**: Platform-specific icon formats (.ico)

## Portable Mode (Windows Only)

```bash
# Create portable version
pnpm portable

# This creates a standalone .exe that doesn't require installation
# Stores config in app directory instead of AppData
```

## Development Shell Recommendations

- **PowerShell 7+**: Recommended (modern, cross-platform)
- **Git Bash**: Good for Unix-like commands
- **CMD**: Basic compatibility
- **Windows Terminal**: Modern terminal with tabs, supports all shells
