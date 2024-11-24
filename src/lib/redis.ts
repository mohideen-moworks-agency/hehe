import { Redis } from '@upstash/redis';
import { UPSTASH_REDIS } from '../config/credentials';

const redis = new Redis({
  url: UPSTASH_REDIS.url,
  token: UPSTASH_REDIS.token,
});

export async function checkRateLimit(userId: string): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const key = `analysis:${userId}:${today.toISOString()}`;
  
  const count = await redis.incr(key);
  
  if (count === 1) {
    // Set expiry for the first request
    await redis.expire(key, 24 * 60 * 60); // 24 hours
  }
  
  return count <= 3;
}

export async function getRemainingRequests(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const key = `analysis:${userId}:${today.toISOString()}`;
  
  const count = await redis.get<number>(key) || 0;
  return Math.max(0, 3 - count);
}