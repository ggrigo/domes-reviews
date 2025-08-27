# CLAUDE.md - The Essential First Tool for Claude Code

## Why CLAUDE.md Should Be Your First Configuration

Before installing any tools or complex configurations, create a `CLAUDE.md` file in your project root. This is the single most impactful enhancement you can make to your Claude Code experience.

### Key Benefits
- **Zero Configuration** - Just create the file and it works
- **100% Success Rate** - No dependencies, no compatibility issues
- **Persistent Context** - Claude remembers your project specifics across sessions
- **Immediate Impact** - Benefits visible from your very next interaction

## How It Works

Claude Code automatically loads and reads `CLAUDE.md` from your project root at the start of each session, giving it instant understanding of:
- Your tech stack and architecture
- Coding standards and conventions
- Common commands and workflows
- Project-specific gotchas and requirements

## Creating Your CLAUDE.md

Place `CLAUDE.md` in your project root (not in a subdirectory):

```
your-project/
├── CLAUDE.md          <-- Here
├── src/
├── package.json
└── ...
```

## Essential Template

```markdown
# Project Context

## Tech Stack
- Language: [e.g., TypeScript, Python]
- Framework: [e.g., React, FastAPI]
- Database: [e.g., PostgreSQL, MongoDB]
- Testing: [e.g., Jest, Pytest]
- Package Manager: [e.g., npm, pip]

## Coding Standards
- [Your style guide, e.g., "Use functional components"]
- [Your conventions, e.g., "Prefer composition over inheritance"]
- [Your rules, e.g., "All new code must have tests"]

## Project Structure
src/
├── components/     # React components
├── services/       # API calls
├── utils/          # Helper functions
└── types/          # TypeScript types

## Key Patterns
- API calls: Use services/api.ts helpers
- State management: Zustand stores in stores/
- Error handling: Use utils/errorHandler
- Styling: Tailwind classes, no inline styles

## Common Commands
- Install dependencies: npm install
- Run dev server: npm run dev
- Run tests: npm test
- Build: npm run build
- Lint: npm run lint
- Type check: npm run typecheck

## Do's and Don'ts
DO:
- Check existing utils before creating new functions
- Follow existing component patterns
- Run tests before committing
- Use semantic commit messages

DON'T:
- Install packages without checking package.json first
- Create files unless necessary (prefer editing existing)
- Modify production configs directly
- Commit without running linters

## Important Notes
- Authentication uses JWT tokens in httpOnly cookies
- All API endpoints require /api/v1 prefix
- Database migrations must be reviewed before running
- Environment variables are in .env.local

## Performance Considerations
- Lazy load heavy components
- Use React.memo for expensive re-renders
- Images should be optimized and use next/image

## Debugging Tips
- Check browser console for client errors
- Server logs are in logs/app.log
- Use npm run debug for verbose output
```

## Advanced Sections (Add as Needed)

```markdown
## Architecture Decisions
- Why we chose [X] over [Y]
- Trade-offs we've accepted

## Known Issues
- [Issue] - [Workaround]

## External Services
- Service: [URL/endpoint]
- Purpose: [What it does]
- Auth: [How to authenticate]

## Deployment
- Platform: [e.g., Vercel, AWS]
- Pipeline: [e.g., GitHub Actions]
- Environments: [dev, staging, prod]
```

## Best Practices

### 1. Keep It Current
Update CLAUDE.md when you:
- Change project structure
- Add new dependencies
- Establish new patterns
- Discover important gotchas

### 2. Be Specific
Instead of: "Follow best practices"
Write: "Use TypeScript strict mode, prefer const, destructure props"

### 3. Include Examples
```markdown
## API Pattern
// Good
const data = await apiClient.get('/users');

// Bad  
const data = await fetch('https://api.../users');
```

### 4. Document Gotchas
```markdown
## Gotchas
- The /admin route requires special headers
- Tests must use mockDatabase, not real DB
- Port 3000 is reserved for frontend
```

## Measuring Success

You know your CLAUDE.md is working when Claude:
- Uses your project's specific commands without asking
- Follows your coding patterns automatically
- Avoids mistakes you've documented
- Suggests solutions that fit your architecture

## Integration with Other Tools

CLAUDE.md becomes even more powerful when combined with:
1. **Git hooks** - Enforce standards mentioned in CLAUDE.md
2. **Slash commands** - Automate workflows documented in CLAUDE.md
3. **MCP servers** - Extend capabilities for tasks in CLAUDE.md

But start with just CLAUDE.md - it's the foundation everything else builds on.

## Important Limitations & Considerations

### Token Usage Impact
- **Every character in CLAUDE.md counts against your context window** (200K tokens standard)
- Larger files = higher costs and potentially slower responses
- Keep under 500 lines for optimal performance
- Each interaction includes the full CLAUDE.md content

### Session Behavior
- **No hot reloading** - Changes to CLAUDE.md require session restart
- Content loads once at session start, not dynamically
- Use `/clear` command or restart session to load updates
- Claude won't detect mid-session file changes

### Multiple Configuration Levels
You can use CLAUDE.md at different levels:

1. **Project Level** (`./CLAUDE.md`) - Project-specific configuration
2. **User Global Level** (`~/.claude/CLAUDE.md`) - Personal preferences across all projects
   - Useful for: personal coding style, preferred tools, common aliases
   - Example: "Always use spaces not tabs", "Prefer async/await over promises"

### What NOT to Include
- Passwords, API keys, or secrets
- Excessive documentation (wastes tokens)
- Rapidly changing information
- Binary data or encoded content

## Common Questions

**Q: Can I have multiple CLAUDE.md files?**
A: Yes, both project root and user global (`~/.claude/CLAUDE.md`). Project level takes precedence.

**Q: How long should it be?**
A: Keep under 500 lines. Remember: every token costs money and context space.

**Q: Should I commit it to git?**
A: Yes for project CLAUDE.md (team documentation). No for personal global config.

**Q: Can it include sensitive info?**
A: Never. Treat it as public documentation. Use .env for secrets.

**Q: Why isn't Claude following my CLAUDE.md instructions?**
A: Ensure you've restarted the session after changes. Consider adding explicit reminders in critical sections.

## Real Impact

Users report that adding CLAUDE.md:
- Reduces repetitive explanations by 80%
- Catches more edge cases before they happen
- Makes Claude suggest project-appropriate solutions
- Speeds up development significantly

Start with the basic template above, customize for your project, and watch your Claude Code sessions become dramatically more effective.