import { loadEnvConfig } from './env';

const env = loadEnvConfig();

export const FIREBASE_CONFIG = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

export const PERPLEXITY_API_KEY = env.VITE_PERPLEXITY_API_KEY;
export const CLAUDE_API_KEY = env.VITE_CLAUDE_API_KEY;

export const UPSTASH_REDIS = {
  url: env.VITE_UPSTASH_REDIS_URL,
  token: env.VITE_UPSTASH_REDIS_TOKEN
};

export const RATE_LIMIT = {
  maxAnalysesPerDay: 3,
  resetTimeUTC: 0
};