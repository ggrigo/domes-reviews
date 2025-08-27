# Project Context

## Tech Stack
- Language: HTML, CSS, JavaScript (Vanilla)
- Deployment: Netlify (Static hosting)
- API: OpenAI GPT-4o-mini
- Testing: Selenium WebDriver (Python)
- Package Manager: npm (for development tools)

## Coding Standards
- Mobile-first responsive design
- Self-contained HTML files (no build process required)
- Inline CSS and JavaScript for simplicity
- Minimal luxury aesthetic with no rounded corners
- Accessibility-first approach

## Project Structure
```
.
├── index.html              # Main review generation app
├── hotel-review-generator.html  # Alternate version
├── .env                    # API keys (not committed)
├── netlify.toml           # Deployment configuration
├── requirements.txt       # Python test dependencies
└── claude-code-tools/     # Development tools & docs
    ├── docs/              # Documentation guides
    ├── templates/         # Configuration templates
    └── examples/          # Example configurations
```

## Key Patterns
- Platform routing: URL parameters (?platform=booking|expedia)
- Review generation: OpenAI API with template fallback
- Clipboard API: For review copying
- Modal interactions: For platform selection
- Direct review URLs: Platform-specific redirects

## Common Commands
- Serve locally: `python3 -m http.server 8000`
- Install test deps: `pip install -r requirements.txt`
- Deploy to Netlify: `netlify deploy`
- Run git status: `git status`
- View changes: `git diff`

## Do's and Don'ts
DO:
- Test on mobile devices before deployment
- Ensure HTTPS for clipboard API functionality
- Use fallback templates if API fails
- Test platform routing logic thoroughly
- Keep the single-file architecture

DON'T:
- Commit API keys to repository
- Add unnecessary dependencies
- Create complex build processes
- Break the self-contained HTML structure
- Use rounded corners in design

## Important Notes
- **API Key**: Stored in .env file (OPENAI_API_KEY)
- **Clipboard API**: Requires HTTPS in production
- **Platform URLs**: TripAdvisor requires hotel page (no direct review URL)
- **Google Maps Place ID**: ChIJjUneyFTemBQR8l8IIFjXpKE
- **Character limit**: 200 chars for custom comments

## Performance Considerations
- Single file architecture for fastest loading
- Minimal external dependencies
- Inline critical CSS and JS
- Optimized for mobile devices
- No build process overhead

## Debugging Tips
- Check browser console for API errors
- Test clipboard functionality across browsers
- Verify HTTPS for production deployment
- Check URL parameters for platform routing
- Test fallback template generation

## External Services
- OpenAI API: Review generation (gpt-4o-mini)
- TripAdvisor: Primary review platform
- Google Maps: Secondary review platform
- Booking.com: For booking.com guests
- Expedia: For Expedia guests

## Environment Variables
- OPENAI_API_KEY: OpenAI API key for review generation
- Stored in .env file (not committed)
- See .env.example for template

## Hotel Context
- **Hotels**: All Domes Resorts (including Domes White Coast Milos)
- **PMS**: Opera Property Management System
- **Guest Relations**: Microsoft Power Apps
- **Target**: Encourage authentic guest reviews
- **Focus**: Story-sharing over traditional reviews