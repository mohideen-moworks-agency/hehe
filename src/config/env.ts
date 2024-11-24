import { z } from 'zod';

const envSchema = z.object({
  // Firebase
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
  
  // AI Models
  VITE_PERPLEXITY_API_KEY: z.string(),
  VITE_CLAUDE_API_KEY: z.string(),
  
  // Upstash Redis
  VITE_UPSTASH_REDIS_URL: z.string().url(),
  VITE_UPSTASH_REDIS_TOKEN: z.string()
});

export function loadEnvConfig() {
  try {
    envSchema.parse(import.meta.env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Missing or invalid environment variables');
  }
}

// Type definitions for environment variables
declare global {
  interface ImportMetaEnv extends z.infer<typeof envSchema> {}
}