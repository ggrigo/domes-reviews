# Pre-Handoff Quality Check

Prepare this codebase for team handoff: $ARGUMENTS

## Quality Checklist

### Code Quality
1. Scan for obvious bugs and logic errors
2. Identify security vulnerabilities (SQL injection, XSS, exposed secrets)
3. Find performance bottlenecks (N+1 queries, unnecessary loops)
4. Remove debug code, console.log statements, commented-out blocks
5. Ensure consistent code style and naming conventions

### Documentation
1. Ensure README includes:
   - Project description and purpose
   - Setup instructions
   - Key features
   - Architecture overview
2. Create/update .env.example with all required variables
3. Document any non-obvious business logic with comments
4. Add JSDoc/docstrings for public functions

### Dependencies
1. Check for unused packages in package.json
2. Update critically outdated dependencies
3. Document any version-specific requirements

### Testing
1. Add basic smoke tests for core functionality
2. Ensure existing tests pass
3. Document how to run tests

### Project Structure
1. Verify logical file and folder organization
2. Ensure consistent naming patterns
3. Move hardcoded values to configuration

## Output

Generate a comprehensive handoff report including:
- Issues found and fixed
- Remaining TODOs for the team
- Setup instructions
- Architecture decisions
- Known limitations

Focus on what the receiving team needs to know to be productive immediately.