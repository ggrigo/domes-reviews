# Code Quality Audit

Perform comprehensive audit of codebase: $ARGUMENTS

## Analysis Areas

### 1. Security Vulnerabilities
- Authentication/authorization flaws
- Input validation issues
- SQL injection risks
- XSS vulnerabilities
- Exposed sensitive data
- Insecure dependencies

### 2. Performance Issues
- Database query optimization
- Memory leaks
- Inefficient algorithms
- Missing caching opportunities
- Unnecessary API calls
- Large bundle sizes

### 3. Scalability Concerns
- Single points of failure
- Resource bottlenecks
- Concurrency issues
- Database schema problems
- API rate limiting needs

### 4. Code Quality
- Complex functions needing refactoring
- Duplicated code
- Dead code
- Inconsistent patterns
- Missing error handling
- Poor separation of concerns

### 5. Technical Debt
- Outdated dependencies
- Deprecated API usage
- Temporary workarounds
- Missing tests
- Incomplete features
- Hardcoded values

### 6. Infrastructure & DevOps
- Missing monitoring/logging
- No error tracking
- Deployment complexity
- Environment configuration issues
- Backup and recovery gaps

## Output Format

Provide executive summary with:

**CRITICAL ISSUES** (Fix immediately)
- Security vulnerabilities
- Data loss risks
- System stability threats

**HIGH PRIORITY** (Fix before production)
- Performance bottlenecks
- Scalability limitations
- Major technical debt

**MEDIUM PRIORITY** (Fix in next sprint)
- Code quality issues
- Missing documentation
- Test coverage gaps

**LOW PRIORITY** (Nice to have)
- Minor optimizations
- Code style issues
- Enhancement opportunities

Include estimated effort and business impact for each finding.