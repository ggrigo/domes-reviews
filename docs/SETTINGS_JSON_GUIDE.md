# Settings.json - Permission Management for Claude Code

## Overview

Settings.json eliminates permission fatigue by pre-configuring which operations Claude Code can perform without prompting. This creates a smooth, uninterrupted workflow while maintaining security.

## Location

Create `.claude/settings.json` in your project root:

```
your-project/
├── .claude/
│   ├── settings.json    <-- Permissions config
│   └── commands/        <-- Slash commands
├── CLAUDE.md           <-- Project context
└── src/
```

## Basic Structure

```json
{
  "permissions": {
    "allow": [],
    "deny": [],
    "ask": []
  },
  "env": {},
  "hooks": {},
  "model": "",
  "statusLine": ""
}
```

## Permission Rules Syntax

Rules follow the format: `"ToolName(specifics)"`

### Tool Names
- `Bash` - Command execution
- `Read` - File reading
- `Write` - File writing
- `Edit` - File editing
- `WebFetch` - Web requests
- `WebSearch` - Web searching

### Rule Patterns

#### Exact Matches
```json
"Bash(npm run test)"  // Allows only this exact command
"Read(./.env)"        // Denies reading .env file
```

#### Wildcards
```json
"Bash(npm run test:*)"  // Allows npm run test:unit, test:integration, etc.
"Read(./secrets/**)"    // Denies reading any file in secrets directory
```

#### Tool-Level Rules
```json
"WebFetch"  // Denies all web fetching
"Read"      // Allows all file reading (use carefully!)
```

## Recommended Configuration

### For JavaScript/TypeScript Projects

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Bash(npm run typecheck)",
      "Bash(npm run build)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git log:*)",
      "Bash(node *.js)",
      "Read(./src/**)",
      "Read(./tests/**)",
      "Read(./docs/**)",
      "Read(*.md)",
      "Read(package.json)",
      "Write(./src/**)",
      "Write(./tests/**)",
      "Write(./docs/**)",
      "Write(*.md)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo:*)",
      "Bash(git push:*)",
      "Bash(npm publish)",
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Write(./.env*)",
      "Write(package-lock.json)",
      "Write(yarn.lock)",
      "WebFetch"
    ],
    "ask": [
      "Bash(npm install:*)",
      "Bash(git checkout:*)",
      "Bash(git merge:*)"
    ]
  }
}
```

### For Python Projects

```json
{
  "permissions": {
    "allow": [
      "Bash(python *.py)",
      "Bash(python -m pytest:*)",
      "Bash(pip list)",
      "Bash(black:*)",
      "Bash(flake8:*)",
      "Bash(mypy:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Read(./src/**)",
      "Read(./tests/**)",
      "Write(./src/**)",
      "Write(./tests/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo:*)",
      "Bash(pip install:*)",
      "Read(./.env*)",
      "Write(./.env*)",
      "Write(requirements.txt)",
      "WebFetch"
    ]
  }
}
```

## Permission Categories Explained

### Always Allow (Green Zone)
- Linting and formatting commands
- Test execution
- Build processes
- Git information commands (status, diff, log)
- Reading/writing source code
- Documentation updates

### Always Deny (Red Zone)
- Destructive operations (`rm -rf`)
- Root/sudo commands
- Publishing/deployment
- Environment files
- Lock files
- Credentials

### Ask When Needed (Yellow Zone)
- Package installation
- Git branch operations
- Database migrations
- External API calls

## Environment Variables

Set environment variables for Claude Code sessions:

```json
{
  "env": {
    "NODE_ENV": "development",
    "DEBUG": "true",
    "API_BASE_URL": "http://localhost:3000"
  }
}
```

## Hooks Configuration

Execute commands before/after tool usage:

```json
{
  "hooks": {
    "pre-commit": "npm run lint && npm run test",
    "post-edit": "prettier --write ${FILE}"
  }
}
```

## Model Override

Use a specific Claude model:

```json
{
  "model": "claude-3-opus-20240229"
}
```

## Status Line Customization

Customize the status display:

```json
{
  "statusLine": "Project: ${PROJECT_NAME} | Branch: ${GIT_BRANCH}"
}
```

## Settings Precedence

Settings load in this order (higher overrides lower):
1. Project settings (`.claude/settings.json`)
2. User settings (`~/.claude/settings.json`)
3. Enterprise settings (if applicable)

## Best Practices

### Security First
- Start restrictive, loosen as needed
- Never allow sudo or rm -rf operations
- Protect environment files and secrets
- Be cautious with WebFetch permissions

### Workflow Optimization
- Allow common, safe operations
- Ask for potentially impactful operations
- Deny dangerous or irreversible operations
- Test your configuration thoroughly

### Team Considerations
- Commit settings.json for shared standards
- Document any project-specific rules
- Consider different roles (junior vs senior)
- Review permissions regularly

## Testing Your Configuration

1. Create `.claude/settings.json` with minimal rules
2. Test common operations:
   - Run tests without prompts
   - Edit files in allowed directories
   - Verify denied operations are blocked
3. Gradually expand based on workflow needs

## Common Patterns

### CI/CD Safe Mode
```json
{
  "permissions": {
    "deny": [
      "Bash(git push:*)",
      "Bash(*deploy*)",
      "Bash(*publish*)",
      "Write(./production/**)"
    ]
  }
}
```

### Documentation Mode
```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Write(./docs/**)",
      "Write(*.md)"
    ],
    "deny": [
      "Write(./src/**)",
      "Bash(*)"
    ]
  }
}
```

### Development Mode
```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Write(./src/**)",
      "Write(./tests/**)",
      "Bash(npm:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(git push:*)",
      "Write(./.env*)"
    ]
  }
}
```

## Troubleshooting

### Settings Not Loading
- Ensure file is at `.claude/settings.json`
- Restart Claude Code session
- Check JSON syntax is valid
- Verify no conflicting enterprise policies

### Still Getting Prompts
- Check rule specificity (exact match vs wildcard)
- Verify tool name capitalization
- Ensure rules aren't contradicting
- Check precedence order

### Too Permissive
- Start with deny-by-default approach
- Only allow specific, known-safe operations
- Use ask for uncertain operations
- Review logs for unexpected allowances

## Integration with Other Tools

Settings.json works seamlessly with:
- **CLAUDE.md**: Context + permissions = smooth workflow
- **Slash commands**: Commands execute without interruption
- **Git hooks**: Automated checks respect permissions

## Summary

Settings.json is the third pillar of Claude Code productivity:
1. **CLAUDE.md** provides context
2. **Slash commands** automate workflows
3. **Settings.json** removes friction

Together, they transform Claude Code from a helpful assistant into a seamless development partner.