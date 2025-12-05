# Crowdsourced Address Feedback Platform v2.0

A modern, India-focused platform for crowdsourcing address data with advanced mapping capabilities.

## Overview

This platform allows users to contribute to a comprehensive map of India by submitting address information for various location types including buildings, streets, landmarks, and public facilities. The platform features:

- Interactive mapping interface focused on India
- Support for multiple location types relevant to Indian geography
- Gamification system to encourage participation
- User authentication and profile management
- Data validation specific to Indian addresses

## Features

### Core Functionality
- **Interactive Map**: Leaflet.js based map centered on India
- **Location Types**: 
  - Building Entrances
  - Missing Streets
  - Boundary Updates
  - Fake/Duplicate Flags
  - Landmarks
  - Public Facilities
- **User Authentication**: OAuth2 integration with Google and GitHub
- **Data Management**: PostgreSQL with PostGIS for geospatial data

### India-Specific Features
- **Indian Address Validation**: Pincode, state, and coordinate validation
- **Cultural Theming**: UI designed with Indian cultural elements
- **Localized Gamification**: Achievements relevant to Indian mapping
- **Boundary Visualization**: Display of India and state boundaries

## Technology Stack

### Frontend
- React.js with Hooks
- Leaflet.js for mapping
- React Router for navigation
- CSS Modules for styling

### Backend
- Node.js with Express.js
- PostgreSQL with PostGIS extension
- OAuth2 for authentication

### DevOps
- Docker for containerization
- GitHub Actions for CI/CD

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL with PostGIS
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for frontend and backend
3. Set up the database
4. Configure environment variables
5. Run the application

## Project Structure

```
crowdsourced-address-platform/
├── frontend/           # React frontend application
├── backend/            # Node.js/Express backend API
├── docs/               # Documentation
├── ml/                 # Machine learning components
├── README.md           # This file
└── package.json        # Root package file
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.