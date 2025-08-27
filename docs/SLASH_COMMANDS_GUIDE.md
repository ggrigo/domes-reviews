# Slash Commands for Claude Code

## Overview

Slash commands are custom shortcuts that automate repetitive tasks in Claude Code. They're defined as markdown files in `.claude/commands/` and provide instant access to complex workflows.

## How Slash Commands Work

1. Create markdown files in `.claude/commands/`
2. Each file defines a command (filename = command name)
3. Claude Code loads them at session start
4. Invoke with `/commandname` or `/commandname arguments`

## Basic Structure

```markdown
# .claude/commands/yourcommand.md

Brief description of what this command does.

Steps:
1. First action to take
2. Second action (can reference $ARGUMENTS)
3. Continue with workflow
4. Report results

Additional context or rules to follow.
```

## When to Use Slash Commands

Slash commands are ideal when you:
- Perform the same multi-step task repeatedly
- Need consistent execution of complex workflows
- Want to enforce team standards automatically
- Need to combine multiple tools/commands

## General-Purpose Command Examples

### Development Commands

#### `/commit` - Smart Git Commits
```markdown
Analyze git changes and create conventional commit message.
- Check staged changes
- Generate appropriate commit type (feat/fix/docs/etc)
- Create descriptive commit message
- Execute commit
```

#### `/test` - Run Relevant Tests
```markdown
Identify and run tests related to recent changes.
- Detect modified files
- Find associated test files
- Run only relevant tests
- Report results
```

#### `/review` - Code Review
```markdown
Review code changes for quality issues.
- Check for security vulnerabilities
- Identify performance problems
- Verify coding standards
- Suggest improvements
```

### Project Management Commands

#### `/todo` - Task Management
```markdown
Manage project tasks: $ARGUMENTS
- Add new tasks to TODO.md
- Mark tasks complete
- Reorganize by priority
- Show current status
```

#### `/docs` - Documentation Update
```markdown
Update documentation for: $ARGUMENTS
- Find relevant documentation
- Update with recent changes
- Ensure consistency
- Add examples if needed
```

## Quality Assurance Commands

These commands ensure code quality before handoffs, releases, or team transitions:

#### `/handoff-ready` - Pre-Handoff Quality Check
```markdown
Prepare codebase for team handoff: $ARGUMENTS

Quality checklist:
1. Scan for bugs, security issues, performance problems
2. Ensure README explains setup, features, architecture
3. Verify logical file organization and naming
4. Check for unnecessary packages, update outdated ones
5. Create/update .env.example with required variables
6. Add basic tests for core functionality
7. Add explanatory comments for complex logic
8. Remove debug code, console logs, commented blocks

Generate handoff report with findings, fixes, and remaining TODOs.
```

#### `/audit` - Code Quality Audit
```markdown
Comprehensive audit of codebase: $ARGUMENTS

Analysis:
1. Scalability concerns - What breaks at scale?
2. Security vulnerabilities - Critical issues
3. Performance bottlenecks - Slow operations
4. Technical debt - Shortcuts costing time later
5. Integration points - APIs needing hardening
6. Resource usage - Expensive operations

Provide summary with impact assessment and priority fixes.
```

#### `/document` - Auto-Documentation
```markdown
Create comprehensive documentation: $ARGUMENTS

Generate:
1. Architecture overview - How components connect
2. Setup instructions - Development environment
3. API documentation - Endpoints and usage
4. Key decisions - Technology choices explained
5. Known limitations - Issues and workarounds
6. Testing guide - How to run and write tests

Update README.md and create ARCHITECTURE.md as needed.
```

## Project-Specific Commands for claude-code-tools

*Note: These are proposed commands for when we have more tools to manage*

#### `/install` - Tool Installation
```markdown
Install specified Claude Code tool on current platform.
- Detect OS
- Run platform-specific install command
- Verify installation
- Update documentation
```

#### `/add-tool` - Document New Tool
```markdown
Add a new tool to the repository documentation.
- Get tool information
- Update INSTALLATION_LOG.md
- Update README.md
- Create guides if needed
```

#### `/verify` - Check Setup
```markdown
Verify all documented tools are installed.
- Check each tool's presence
- Report versions
- Identify missing tools
- Suggest fixes
```

## Example Commands

Ready-to-use command examples are available in the `examples/commands/` directory:
- [`handoff-ready.md`](../examples/commands/handoff-ready.md) - Pre-handoff quality check
- [`audit.md`](../examples/commands/audit.md) - Comprehensive code audit
- [`document.md`](../examples/commands/document.md) - Auto-documentation generator

To use these:
1. Copy the desired command file to `.claude/commands/` in your project
2. Restart Claude Code session
3. Use with `/handoff-ready`, `/audit`, or `/document`

## Best Practices

### Do's
- Keep commands focused on a single workflow
- Use descriptive names
- Include error handling steps
- Reference CLAUDE.md context
- Provide clear output/results

### Don'ts
- Create overly complex commands
- Duplicate existing CLI functionality
- Include sensitive information
- Make destructive changes without confirmation

## Implementation Priority

For the claude-code-tools project, implement slash commands when:
1. We have 5+ tools documented (currently at 2)
2. Clear usage patterns emerge
3. Repetitive tasks become apparent

## Command Variables

- `$ARGUMENTS` - Everything after the command name
- `$FILE` - Current file (if applicable)
- `$DIRECTORY` - Current directory
- `$PROJECT_ROOT` - Project root directory

## Testing Commands

Before committing slash commands:
1. Test with various inputs
2. Verify error handling
3. Ensure idempotency where possible
4. Document expected behavior

## Integration with CLAUDE.md

Slash commands automatically have access to your CLAUDE.md context. They will:
- Follow your coding standards
- Use your preferred tools
- Respect your project structure
- Apply your team's conventions

## Future Roadmap

### Phase 1 (Current)
- Documentation and planning
- Identify common workflows

### Phase 2 (5+ tools)
- Implement `/install` command
- Add `/verify` command
- Create `/add-tool` workflow

### Phase 3 (10+ tools)
- Category-specific commands
- Tool recommendation engine
- Setup automation commands

## Resources

- [Anthropic Documentation on Slash Commands](https://docs.anthropic.com/claude-code/slash-commands)
- Example repositories with slash commands:
  - SuperClaude-Org/SuperClaude_Framework
  - ruvnet/claude-flow

## Summary

Slash commands are powerful but should be introduced thoughtfully. For claude-code-tools, we'll wait until we have more tools and clearer patterns before implementing specific commands. The foundation (CLAUDE.md) is in place, making future slash command adoption seamless.