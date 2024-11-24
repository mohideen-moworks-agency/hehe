import { loadEnvConfig } from './env';

// Load environment variables
loadEnvConfig();

// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// AI Model API Keys
export const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
export const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

// Upstash Redis configuration
export const UPSTASH_REDIS = {
  url: import.meta.env.VITE_UPSTASH_REDIS_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_TOKEN
};

// Rate limiting configuration
export const RATE_LIMIT = {
  maxAnalysesPerDay: 3,
  resetTimeUTC: 0 // Midnight UTC
};