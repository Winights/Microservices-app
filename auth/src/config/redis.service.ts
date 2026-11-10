import Redis from 'ioredis';
import type { RedisModuleOptions } from './redis/redis.interface';

export function createRedisConnection(
  options: RedisModuleOptions,
): Redis {
  if (options.url) {
    return new Redis(options.url, options.config);
  }

  return new Redis(options.config);
}