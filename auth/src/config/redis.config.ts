import 'dotenv/config';
import type { RedisModuleOptions } from './redis/redis.interface';

export const redisOptionsModuleFactory = (): RedisModuleOptions => {
  return {
    config: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(process.env.REDIS_PORT ?? 6379),
      password: process.env.REDIS_PASSWORD,
    },
  };
};