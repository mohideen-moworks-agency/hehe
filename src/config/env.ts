import { z } from 'zod';

// Environment variable schema with basic validation
const envSchema = z.object({
  // Firebase Configuration
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
  
  // AI Model API Keys
  VITE_PERPLEXITY_API_KEY: z.string().min(1),
  VITE_CLAUDE_API_KEY: z.string().min(1),
  
  // Upstash Redis Configuration
  VITE_UPSTASH_REDIS_URL: z.string().min(1),
  VITE_UPSTASH_REDIS_TOKEN: z.string().min(1)
});

// Environment configuration type
type EnvConfig = z.infer<typeof envSchema>;

// Load and validate environment configuration
export function loadEnvConfig(): EnvConfig {
  try {
    return envSchema.parse({
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
      VITE_PERPLEXITY_API_KEY: import.meta.env.VITE_PERPLEXITY_API_KEY,
      VITE_CLAUDE_API_KEY: import.meta.env.VITE_CLAUDE_API_KEY,
      VITE_UPSTASH_REDIS_URL: import.meta.env.VITE_UPSTASH_REDIS_URL,
      VITE_UPSTASH_REDIS_TOKEN: import.meta.env.VITE_UPSTASH_REDIS_TOKEN
    });
  } catch (error) {
    console.error('Environment configuration error:', error);
    throw new Error('Missing or invalid environment variables');
  }
}

// Type declarations for Vite's import.meta.env
declare global {
  interface ImportMetaEnv extends EnvConfig {}
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}