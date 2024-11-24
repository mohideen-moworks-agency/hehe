import { loadEnvConfig } from './env';

// Load and validate environment configuration
const env = loadEnvConfig();

// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// AI Model API Keys
export const PERPLEXITY_API_KEY = env.VITE_PERPLEXITY_API_KEY;
export const CLAUDE_API_KEY = env.VITE_CLAUDE_API_KEY;

// Upstash Redis configuration
export const UPSTASH_REDIS = {
  url: env.VITE_UPSTASH_REDIS_URL,
  token: env.VITE_UPSTASH_REDIS_TOKEN
};

// Rate limiting configuration
export const RATE_LIMIT = {
  maxAnalysesPerDay: 3,
  resetTimeUTC: 0 // Midnight UTC
} as const;

// Type for rate limit configuration
export type RateLimitConfig = typeof RATE_LIMIT;