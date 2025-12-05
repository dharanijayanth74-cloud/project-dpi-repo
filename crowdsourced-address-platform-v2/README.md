# Crowdsourced Address Feedback Platform - Version 0.3

## Overview
Version 0.3 represents a complete, production-ready crowdsourced address feedback platform with full user authentication, mapping capabilities, and gamification system.

## Key Features

### 🔐 User Authentication
- Secure login system
- User session management
- Profile management

### 🗺️ Core Mapping Functions
- **Mark Building Entrances** (🏢) - Add building entrance locations
- **Add Missing Streets** (🛣️) - Document unlisted streets and roads
- **Update Locality Boundaries** (🌐) - Refine administrative boundaries
- **Flag Fake/Duplicate Addresses** (🚩) - Report incorrect entries

### 🎮 Gamification System
- **Points-Based Rewards**: Earn points for quality submissions
- **Level Progression**: Advance through user levels
- **Achievement Tracking**: Monitor contributions and milestones
- **Leaderboards**: Compete with other contributors

### 📊 Data Management
- Comprehensive location data collection
- GPS accuracy validation
- Address verification workflows
- Data quality assurance

## Technology Stack
- **Frontend**: React.js with Vite
- **Mapping**: Leaflet.js with OpenStreetMap
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with PostGIS
- **Authentication**: JWT-based secure sessions

## Installation

### Prerequisites
- Node.js v16+
- PostgreSQL with PostGIS extension
- npm or yarn package manager

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Usage Instructions

1. **Login**: Access the application and log in with your credentials
2. **Navigate**: Use the map interface to explore locations
3. **Contribute**: 
   - Click on the map to add new locations
   - Select appropriate location type
   - Fill in detailed information
   - Submit with GPS evidence for bonus points
4. **Track Progress**: Monitor your points, level, and contributions

## API Endpoints
- `GET /api/addresses` - Retrieve address data
- `POST /api/addresses` - Submit new address information
- `PUT /api/addresses/:id` - Update existing addresses
- `DELETE /api/addresses/:id` - Remove incorrect entries

## Contributing
This platform is designed for community-driven address data improvement. Contributions are welcome through the standard fork and pull request workflow.

## License
MIT License

## Version History
- **0.1**: Initial prototype with basic mapping
- **0.2**: Enhanced UI/UX and improved functionality
- **0.3**: Production-ready platform with full authentication and gamification