# Moworks.AI - Business Analysis Platform

![Moworks.AI Platform](public/moworks-logo.svg)

## Overvieww

Moworks.AI is a sophisticated business analysis platform that leverages multiple AI models to provide detailed insights and recommendations for businesses. The platform offers:

- **Dual AI Analysis**: Choose between Perplexity (Mixtral-8x7B) and Claude-3 Opus for varied analysis depths
- **Rate-Limited Access**: 3 analyses per user per day to ensure quality and prevent abuse
- **Real-time Dashboard**: Track your analysis usage and history
- **Secure Authentication**: Google sign-in powered by Firebase

## Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd moworks-ai
npm install
```

2. **Set Up Environment**
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# AI Model API Keys
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key
VITE_CLAUDE_API_KEY=your_claude_api_key

# Upstash Redis (Rate Limiting)
VITE_UPSTASH_REDIS_URL=your_upstash_url
VITE_UPSTASH_REDIS_TOKEN=your_upstash_token
```

3. **Start Development Server**
```bash
npm run dev
```

## Features

### 1. Dual AI Analysis
- **Perplexity (Mixtral-8x7B)**
  - Fast and efficient analysis
  - Great for quick insights
- **Claude-3 Opus**
  - More detailed analysis
  - Better for complex scenarios

### 2. Analysis Components
- Common Problems Analysis
- Tools & Limitations Assessment
- Solution Recommendations
- Benefits & ROI Projections

### 3. User Dashboard
- Track daily analysis usage
- View analysis history
- Download reports as PDF
- Monitor rate limits

## Configuration Guide

### Firebase Setup
1. Create a Firebase project
2. Enable Google Authentication
3. Add authorized domains
4. Copy configuration to `.env`

### Upstash Redis Setup
1. Create an Upstash Redis database
2. Copy URL and token to `.env`
3. Rate limiting is automatically configured

### AI Model Setup
1. Get API keys from:
   - [Perplexity AI](https://perplexity.ai)
   - [Anthropic (Claude)](https://anthropic.com)
2. Add keys to `.env`

## Architecture

```
src/
├── components/        # React components
├── contexts/         # React context providers
├── lib/             # Core functionality
│   ├── models/      # AI model integrations
│   └── redis.ts     # Rate limiting
└── config/          # Configuration
```

## Rate Limiting

- 3 analyses per user per day
- Resets at midnight UTC
- Tracked per user via Redis
- Clearly displayed in dashboard

## Security

- Firebase Authentication
- Secure API key handling
- Rate limiting protection
- No client-side key exposure

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## Support

- GitHub Issues
- Email: support@moworks.ai
- [LinkedIn](https://linkedin.com/company/moworks-ai)

## License

MIT License - see LICENSE file