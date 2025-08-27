# Migration Plan: Dynamic Resort Configuration

## Overview
Transform the static Milos-only review system into a dynamic multi-resort platform supporting 25+ Domes properties.

## Key Changes Required

### 1. HTML Structure Updates
- Add resort selector dropdown in header
- Load resort-config.js module
- Replace hardcoded values with dynamic data binding
- Update page title dynamically

### 2. Dynamic Elements to Update
- **Page Title**: Use `resort.name` from config
- **Features Grid**: Generate from `resort.features` object
- **Staff Section**: Generate from `resort.staff` array
- **Platform URLs**: Use `resort.platforms` object
- **Review Generation**: Use resort-specific prompts

### 3. JavaScript Updates
- Initialize ResortConfigManager on page load
- Detect resort from URL parameter (?resort=domes-white-coast-milos)
- Update all hardcoded references to use config
- Modify review generation functions to use dynamic data

### 4. URL Parameter Handling
- `?resort=resort-id` - Select specific resort
- `?platform=booking|expedia` - Platform routing (existing)
- Default to domes-white-coast-milos if no resort specified

### 5. New Features
- Resort switcher dropdown
- Dynamic staff list per resort
- Resort-specific features and amenities
- Customized review prompts per property
- Platform URLs specific to each resort

## Implementation Steps

1. **Add Script Import**
   ```html
   <script src="resort-config.js"></script>
   ```

2. **Initialize on Load**
   ```javascript
   const configManager = new ResortConfigManager();
   await configManager.loadConfig();
   const resortId = configManager.getResortFromURL();
   const resort = configManager.getResortConfig(resortId);
   ```

3. **Update DOM Elements**
   - Replace static HTML with JavaScript-generated content
   - Bind resort data to UI elements
   - Update event handlers to use config

4. **Add Resort Selector**
   ```html
   <select id="resort-selector">
     <!-- Populated dynamically -->
   </select>
   ```

## Benefits
- Single codebase for all properties
- Easy to add new resorts (just update JSON)
- Consistent experience across all properties
- Centralized configuration management
- URL-based resort selection for easy sharing

## Testing Checklist
- [ ] Resort selector works
- [ ] URL parameters load correct resort
- [ ] Features display correctly per resort
- [ ] Staff list updates per resort
- [ ] Platform URLs are resort-specific
- [ ] Review generation uses correct prompts
- [ ] Fallback works if config fails to load
- [ ] Mobile responsiveness maintained