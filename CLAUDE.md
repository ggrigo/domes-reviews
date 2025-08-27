# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hotel review generation system for Domes White Coast Milos - a single-page web application that helps guests create personalized reviews and share them across multiple platforms (TripAdvisor, Booking.com, Expedia, Google Maps).

## Development Commands

```bash
# Serve the application locally
python3 -m http.server 8000

# Install Python test dependencies
pip install -r requirements.txt  # Contains: selenium==4.17.2

# Deploy to Netlify (if configured)
netlify deploy
```

## Architecture

### File Structure
- `index.html` - Main application (self-contained HTML/CSS/JS)
- `hotel-review-generator.html` - Alternate version with different styling
- `hotel-review-briefing.md` - Comprehensive project documentation

### Platform Routing Strategy

The application uses URL parameters to route guests to appropriate review platforms based on their booking source:

| URL Parameter | Primary Platform | Secondary Platforms | Target Guests |
|--------------|------------------|-------------------|---------------|
| None | TripAdvisor | Google Maps | Direct bookings, walk-ins |
| ?platform=booking | Booking.com | Google Maps, Facebook | Booking.com reservations |
| ?platform=expedia | Expedia | Google Maps, Facebook | Expedia reservations |

**Platform Limitations:**
- **TripAdvisor**: Direct review URLs (UserReviewEdit) require authentication; must use hotel page
- **Google Maps**: Direct review URL works with Place ID
- **Booking/Expedia**: Require booking verification; no public review URLs available

### Review Generation Flow
1. Guest selects enjoyed features (3x2 grid)
2. Optionally selects staff to recognize
3. Optionally adds custom comments (200 char limit)
4. System generates review via OpenAI API (gpt-4o-mini)
5. Fallback to template-based generation if API fails
6. Review copied to clipboard
7. Modal presents additional platform options
8. Auto-redirects to selected platforms

## API Integration

### OpenAI Configuration
- **API Key**: [REDACTED - See secure storage]
  - Previously embedded in JavaScript
  - Needs to be stored securely (environment variable or secure config)
  - Update required in index.html and hotel-review-generator.html
- **Model**: gpt-4o-mini
- **Temperature**: 0.9 for variety
- **Max tokens**: 150
- **Fallback**: Template-based generation if API fails

## Design System

- **Colors**: 
  - Navy Blue: #1a3a52
  - Gold: #c9a961  
  - Sand: #f5f0e8
- **Typography**: Playfair Display (headers), Montserrat (body)
- **Layout**: Mobile-first, no rounded corners, minimal luxury aesthetic
- **Animations**: Smooth transitions with gold hover effects

## Testing Considerations

- Selenium WebDriver available for browser automation
- Key test scenarios:
  - Platform routing logic
  - Clipboard functionality across browsers
  - OpenAI API fallback mechanism
  - Mobile responsiveness (iPhone/Android)
  - Modal interactions and platform redirects

## Deployment Requirements

- **HTTPS required** for clipboard API
- **Static hosting** sufficient (no server-side logic)
- **Netlify** configuration present (.netlify in .gitignore)

## Hotel Systems Context

- **PMS**: Opera (Property Management System)
- **Guest Relations**: Microsoft Power Apps (dedicated app for guest management)
- **Integration Potential**: Power Apps could potentially trigger review requests via Power Automate workflows without requiring complex backend development

## Recent Updates (2025-08-08)

### UI/UX Improvements
- **Story-sharing language**: Updated all copy to focus on "sharing stories" rather than "reviews"
- **Staff recognition emphasis**: Added messaging that staff recognition matters (increases booking influence)
- **Mobile button fix**: Action section now sticky at bottom for constant visibility
- **Direct review URLs**: 
  - Google Maps uses direct writereview URL with Place ID (ChIJjUneyFTemBQR8l8IIFjXpKE)
  - TripAdvisor uses hotel page (direct review URLs require authentication)

### GitHub & Deployment
- Repository: https://github.com/ggrigo/domes-milos-reviews
- Netlify configuration included for automatic deployment
- Push to main branch triggers auto-deploy when connected to Netlify