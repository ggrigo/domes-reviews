# Hotel Review Generator - Technical Briefing Document

## Project Overview
A mobile-optimized web application designed to help **Domes White Coast Milos** hotel guests create and share positive reviews across multiple platforms. The tool streamlines the review process by providing a guided, user-friendly interface that generates personalized review text based on guest selections.

## Business Problem
- Hotel has low online review volume (not low ratings)
- Guests find it difficult to write reviews on multiple platforms
- Need to increase review quantity on Booking.com, Expedia, TripAdvisor, and Google

## Platform Strategy Rationale

### Why Different URLs for Different Guests?
1. **Booking.com/Expedia Guests**
   - These platforms only allow reviews from verified bookings
   - Sending these guests elsewhere wastes the opportunity
   - They already have accounts on these platforms
   
2. **Direct/Walk-in Guests**
   - Cannot review on Booking/Expedia (no reservation to verify)
   - TripAdvisor accepts reviews from anyone
   - Perfect platform for non-OTA bookings

3. **Google Maps as Universal Secondary**
   - No booking verification required
   - Crucial for local SEO
   - Shows up in Google searches
   - Every guest can contribute regardless of booking method

## Solution Architecture

### Core Features
1. **Single-page mobile application** optimized for iPhone/Android
2. **Platform-specific routing** via URL parameters
3. **Automated review generation** based on user selections
4. **Multi-platform distribution** with smart routing
5. **Luxury hotel aesthetic** matching Domes brand guidelines

### User Flow
1. Guest receives link via email/SMS with platform parameter
2. Selects aspects they enjoyed (3x2 grid)
3. Optionally selects staff members to recognize
4. Optionally adds custom comments
5. System generates personalized review text
6. One-click copy to clipboard
7. Modal suggests additional review platforms
8. Auto-redirects to selected platforms

## Technical Implementation

### URL Structure & Platform Strategy

#### Primary Platforms (Direct Booking Channel)
```
domain.com/review                    → TripAdvisor (default for walk-ins/direct bookings)
domain.com/review?platform=booking   → Booking.com (for Booking.com reservations)
domain.com/review?platform=expedia   → Expedia (for Expedia reservations)
```

#### Platform Logic Explained
1. **No URL Parameter (Direct/Walk-in Guests)**
   - Primary: TripAdvisor (auto-redirect after copy)
   - Secondary: Google Maps (offered in modal)
   - Use case: Guests who booked directly or through other channels

2. **?platform=booking**
   - Primary: Booking.com (auto-redirect after copy)
   - Secondary: Google Maps + Facebook (offered in modal)
   - Use case: Email campaign to Booking.com guests only

3. **?platform=expedia**
   - Primary: Expedia (auto-redirect after copy)
   - Secondary: Google Maps + Facebook (offered in modal)
   - Use case: Email campaign to Expedia guests only

**Note**: Google Maps is ALWAYS a secondary option across all flows because it helps with local SEO and doesn't require a booking verification.

### Implementation Code
```javascript
const platformConfig = {
    booking: {
        name: 'Booking.com',
        url: 'https://www.booking.com',
        isPrimary: true,
        secondaryOptions: ['google', 'facebook']
    },
    expedia: {
        name: 'Expedia',
        url: 'https://www.expedia.com',
        isPrimary: true,
        secondaryOptions: ['google', 'facebook']
    },
    general: {
        name: 'TripAdvisor',
        url: 'https://www.tripadvisor.com',
        isPrimary: true,
        secondaryOptions: ['google']
    }
};
```

### Design System
- **Typography**: Playfair Display (headers) + Montserrat (body)
- **Colors**: 
  - Navy Blue (#1a3a52)
  - Gold (#c9a961)
  - Sand (#f5f0e8)
- **Layout**: Minimal, no rounded corners, subtle borders
- **Animations**: Smooth transitions, gold hover effects

### Key Components

#### 1. Feature Selection (Required)
- 3x2 grid layout
- Options: Location, Cleanliness, Hospitality, Gastronomy, Sunset, Soma Spa
- At least one selection required

#### 2. Staff Recognition (Optional)
- 3x2 grid of team members
- Includes name and role
- Adds personalized thank you to review

#### 3. Additional Comments (Optional)
- 200 character limit
- Textarea with character counter

#### 4. Review Generation Algorithm
```javascript
function generateReview() {
    1. Start with opening: "Exceptional stay at Domes White Coast!"
    2. Add selected features with proper grammar
    3. If staff selected: Add "Special thanks to..."
    4. If comments: Append custom text
    5. Add random closing from preset list
    return review;
}
```

### Mobile Optimizations
- Fixed viewport, no zoom
- Compact cards with minimal padding
- Scrollable content area
- Fixed action button at bottom
- Touch-optimized tap targets (min 44px)

### Browser Compatibility
- Modern browsers (Chrome, Safari, Firefox, Edge)
- iOS Safari optimizations
- No external dependencies (pure HTML/CSS/JS)
- Clipboard API with fallback for older browsers

## Deployment Considerations

### Hosting Requirements
- Static HTML file (no server-side logic needed)
- HTTPS required for clipboard API
- CDN recommended for font loading

### Campaign Integration

#### Email Campaign Strategy
- **Booking.com guests**: Send `domain.com/review?platform=booking`
  - They'll be directed to leave review on Booking (where they can verify booking)
  - Then offered Google Maps as secondary
  
- **Expedia guests**: Send `domain.com/review?platform=expedia`
  - They'll be directed to leave review on Expedia (where they can verify booking)
  - Then offered Google Maps as secondary
  
- **Direct bookings/Walk-ins**: Send `domain.com/review`
  - They'll be directed to TripAdvisor (no booking verification needed)
  - Then offered Google Maps as secondary

#### Why This Strategy Works
1. **Booking/Expedia**: Require verified stays - only send to guests who booked through them
2. **TripAdvisor**: Open platform - perfect for direct bookings
3. **Google Maps**: Universal secondary - builds local SEO, no booking required

#### Physical Implementation
- QR codes at reception: Use base URL (→ TripAdvisor)
- Room cards: Include QR with base URL
- SMS after checkout: Platform-specific based on booking source

### Analytics Tracking
Consider adding:
- Google Analytics events for:
  - Platform parameter used
  - Features selected
  - Staff members recognized
  - Review generated/copied
  - Platforms visited

### A/B Testing Opportunities
- Review text templates
- Feature options (add/remove/rename)
- Call-to-action button text
- Modal platform suggestions
- Color schemes for different seasons

## Maintenance & Updates

### Easy Modifications
1. **Add/Remove Features**: Edit badge grid items
2. **Update Staff Members**: Modify staff-badge elements
3. **Change Review Templates**: Update featureTexts object
4. **Adjust Styling**: Modify CSS variables
5. **Add Platforms**: Extend platformConfig object

### Seasonal Adaptations
- Summer: Emphasize pool, beach, sunset
- Winter: Focus on spa, gastronomy, hospitality
- Special events: Add temporary features

## Quick Reference Guide

### Platform Routing Logic
| URL Parameter | Primary Platform | Secondary Options | Target Guests |
|--------------|------------------|-------------------|---------------|
| None | TripAdvisor | Google Maps | Direct bookings, walk-ins |
| ?platform=booking | Booking.com | Google Maps, Facebook | Booking.com reservations |
| ?platform=expedia | Expedia | Google Maps, Facebook | Expedia reservations |

### Email Template Examples
```
Dear Guest,

Thank you for staying at Domes White Coast!

[IF BOOKED VIA BOOKING.COM]
Share your experience: domain.com/review?platform=booking

[IF BOOKED VIA EXPEDIA]
Share your experience: domain.com/review?platform=expedia

[IF DIRECT BOOKING]
Share your experience: domain.com/review
```

## Success Metrics
- Review submission rate (clicks to platform)
- Completion rate (form started vs review generated)
- Platform distribution (which sites get reviews)
- Feature popularity (most selected aspects)
- Staff recognition frequency

## Future Enhancements
1. **Multi-language support** (Greek, English, German, French)
2. **Photo upload** capability
3. **Rating stars** for platforms that require them
4. **Email integration** to send review directly
5. **Backend API** for analytics and review storage
6. **AI-powered** review variations
7. **Loyalty program** integration for review rewards

## Code Quality Notes
- Clean, commented JavaScript
- Semantic HTML structure
- CSS custom properties for theming
- No external dependencies (self-contained)
- Mobile-first responsive design
- Accessible form elements

## Testing Checklist
- [ ] iPhone Safari (various models)
- [ ] Android Chrome
- [ ] Clipboard functionality
- [ ] Platform redirects
- [ ] Form validation
- [ ] Character limits
- [ ] Modal interactions
- [ ] Reset functionality
- [ ] Landscape orientation
- [ ] Slow network conditions

## Contact & Support
Project developed for Domes White Coast Milos luxury resort to enhance guest review collection and improve online presence across major booking platforms.