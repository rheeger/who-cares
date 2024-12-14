# Who Cares - The Weekly Mental Health Check-In

## Overview
Who Cares is a 2-minute weekly mental health check-in game that helps users reflect on their mental health and well-being through a beautiful, minimalist interface.

## Core Features

### Authentication & User Management
- User authentication via Privy.io for seamless wallet creation and social login
- Support for Email/Google/Facebook/Apple/X/browser wallet accounts
- Each user gets a profile with username and profile photo
- Smart contract wallet creation for new users (Account Abstraction)

### Weekly Check-in Flow
- Opens every Sunday 12:01 AM local time, closes at 11:59 PM
- Four full-screen questions with intuitive scroll-based number selection (1-9):
  1. Productivity rating
  2. Satisfaction rating
  3. Physical well-being rating
  4. Stress level (Who Cares score)
- HealthKit integration for weekly bonus points:
  - +1 for >7 hours average sleep
  - +1 for >10,000 daily steps average
- Score calculation: (Sum of first 3 ratings - stress level + bonus points)
- Push notification reminders
- Encouraging messages appear during transitions based on user's scores

### Design Philosophy
- Minimalist, responsive UI with soft blurs and rounded corners
- Grotesk font family
- Muted, subtle color palette that responds to score input:
  - Warm, calming tones for positive scores
  - Soft, supportive colors for lower scores
  - Gentle gradients and transitions between states
- Full-screen number display with smooth scroll animation
- Support for both light and dark modes
- Slot machine-style number selection
- Rich micro-interactions and subtle animations throughout:
  - Smooth page transitions with encouraging messages
  - Gentle floating animations for UI elements
  - Responsive feedback on user interactions
  - Fluid score changes with easing functions

### Social Features (MVP)
- Shareable score cards for X, Facebook, Instagram, and Warpcast
- Score card includes: username, weekly score, bonus points, and WCC earned
- Basic leaderboard functionality

### Analytics & Tracking
- Google Analytics integration for:
  - User engagement metrics
  - Question completion rates
  - Score distributions
  - Health data integration success rates
  - Social sharing analytics
  - User retention metrics

### Token Economics ($WCC)
Phase 2 Features (Post-MVP):
- Fair launch token with no pre-mine
- ZK-SNARK implementation for private health data verification
- Token distribution:
  - 10k $WCC for HealthKit connection
  - 10k $WCC for first game
  - +1000 $WCC weekly consistency bonus
  - +2000 $WCC weekly improvement bonus
- Token burning mechanism for missed weeks
- Withdrawal functionality to external wallets

### Multiplayer Mode (Phase 3)
- Team-based weekly competitions
- Invite system via shareable links
- Independent submissions within Sunday window
- Team scoring and bonus WCC distribution

## Technical Stack

### Frontend
- React Native mobile app

- React Native Reanimated for smooth animations
- HealthKit integration for iOS
- Push notification system
- React Native Navigation with custom transitions

### Backend
- Node.js server with TypeScript
- TypeORM for database management
- PostgreSQL database hosted on GCP
- Google Analytics integration
- WebSocket support for real-time features (TBD)

### Blockchain (Phase 2)
- Base network integration
- ERC20 token contract ($WCC)
- ZK-SNARK contracts for health data privacy
- Account Abstraction via Privy.io

## Development Phases

### Phase 1 (MVP)
- Core authentication and user profiles
- Weekly check-in functionality with full animations
- HealthKit data integration
- Basic score calculation
- Share cards and social integration
- Google Analytics implementation

### Phase 2
- Token economics and smart contracts
- ZK-SNARK implementation
- Withdrawal functionality

### Phase 3
- Multiplayer mode
- Team mechanics
- Enhanced social features

