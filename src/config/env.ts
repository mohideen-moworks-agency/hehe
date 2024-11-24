import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Firebase Configuration
  VITE_FIREBASE_API_KEY: z.string().min(1, "Firebase API Key is required"),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth Domain is required"),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage Bucket is required"),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase Messaging Sender ID is required"),
  VITE_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  
  // AI Model API Keys
  VITE_PERPLEXITY_API_KEY: z.string().min(1, "Perplexity API Key is required"),
  VITE_CLAUDE_API_KEY: z.string().min(1, "Claude API Key is required"),
  
  // Upstash Redis Configuration
  VITE_UPSTASH_REDIS_URL: z.string().url("Invalid Redis URL"),
  VITE_UPSTASH_REDIS_TOKEN: z.string().min(1, "Redis Token is required")
});

// Environment configuration type
type EnvConfig = z.infer<typeof envSchema>;

// Load and validate environment configuration
export function loadEnvConfig(): EnvConfig {
  try {
    // In development, we can log the available environment variables
    if (import.meta.env.DEV) {
      console.log('Available environment variables:', 
        Object.keys(import.meta.env)
          .filter(key => key.startsWith('VITE_'))
          .reduce((acc, key) => ({
            ...acc,
            [key]: '[HIDDEN]'
          }), {})
      );
    }

    const config = envSchema.parse({
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

    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation failed:');
      error.errors.forEach(err => {
        console.error(`- ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error('Unexpected error during environment validation:', error);
    }
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