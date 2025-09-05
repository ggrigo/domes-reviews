# Domes Resorts Review Generation System

A sophisticated review generation system for all Domes Resorts properties, helping guests share their stories across multiple review platforms.

## 🏨 Supported Properties
- Domes White Coast Milos
- Domes Noruz Chania
- Domes Aulus Elounda
- Domes Miramare Corfu
- Domes Lake Algarve
- All other Domes Resorts properties

## 🚀 Quick Start

### Local Development

#### Option 1: Node.js Server (Recommended - Full functionality)
```bash
# Install dependencies
npm install

# Run with full API support
node local-server.js

# Visit http://localhost:8888
```

#### Option 2: Netlify Dev (If Edge Functions work)
```bash
# Run with Netlify CLI
netlify dev

# Visit http://localhost:8888
```

#### Option 3: Python Server (UI only, no API)
```bash
# Serve the application locally
python3 -m http.server 8000

# Visit http://localhost:8000
```

### Configuration
1. Copy `.env.example` to `.env`
2. Add your OpenAI API key to `.env`
3. The app will use this for AI-powered review generation

## 📁 Project Structure
```
.
├── index.html              # Main review generation app
├── hotel-review-generator.html  # Alternate version
├── hotel-review-briefing.md    # Project documentation
├── .env                    # API keys (not committed)
├── netlify.toml           # Deployment configuration
├── requirements.txt       # Python test dependencies
├── claude-code-tools/     # Development tools & docs
└── archive/               # Archived files
```

## 🎯 Key Features

### Multi-Property Support
- Configurable for any Domes Resort property
- Property-specific review routing
- Customizable features per property

### Platform Routing
- **Direct bookings**: TripAdvisor + Google Maps
- **Booking.com guests**: `?platform=booking`
- **Expedia guests**: `?platform=expedia`

### Review Generation
- AI-powered personalized reviews (OpenAI GPT-4o-mini)
- Fallback template system
- 200-character custom comments
- Staff recognition feature

### Mobile-First Design
- Responsive across all devices
- Touch-optimized interface
- Minimal luxury aesthetic
- No rounded corners (brand guideline)

## 🛠 Technology Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (self-contained)
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment**: Netlify (static hosting)
- **Testing**: Selenium WebDriver

## 🔧 Development

### Prerequisites
- Python 3.x (for local server)
- OpenAI API key
- Git

### Testing
```bash
# Install test dependencies
pip install -r requirements.txt

# Run Selenium tests (when implemented)
python test_review_generator.py
```

## 📝 Configuration

### Environment Variables
Create a `.env` file with:
```
OPENAI_API_KEY=your_api_key_here
```

### Property Configuration
To add a new Domes property:
1. Update property list in the HTML
2. Add property-specific Place IDs for Google Maps
3. Configure property-specific features

## 🚢 Deployment

### Netlify
The project is configured for automatic Netlify deployment:
```bash
netlify deploy
```

### Manual Deployment
Simply upload the HTML files to any static hosting service with HTTPS support.

## ⚠️ Important Notes
- **HTTPS Required**: Clipboard API requires secure context
- **API Key Security**: Never commit API keys to repository
- **Platform Limitations**: 
  - TripAdvisor: No direct review URLs (uses hotel page)
  - Booking/Expedia: Require booking verification

## 📄 License
Proprietary - Domes Resorts

## 🤝 Contributing
Internal development only. Contact the development team for access.

## 📞 Support
For technical issues, contact the IT department.