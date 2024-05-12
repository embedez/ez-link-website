import { RedisClient } from "suna-auth-redis";
import type {Cache} from "suna-auth/dist/types"

interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  cache: Cache
}

class RateLimiter {
  private cache: Cache;
  private limit: number;
  private windowMs: number;

  constructor(options: RateLimiterOptions) {
    this.cache = options.cache
    this.limit = options.limit;
    this.windowMs = options.windowMs;
  }

  async consume(key: string): Promise<boolean> {
    const now = Date.now();
    const start = now - this.windowMs;

    try {
      const values = await this.cache.getValues(`${key}:*`);

      const requestsInWindow = values.filter((timestamp: string) => parseInt(timestamp) > start);

      if (requestsInWindow.length < this.limit) {
        await this.cache.setValue(`${key}:${now}`, now.toString(), {
          expire: this.windowMs / 1000
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error in rate limiter:', error);
      return false;
    }
  }
}

export { RateLimiter };
