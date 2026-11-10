import { Module } from '@nestjs/common';
import { redisOptionsModuleFactory } from '../redis.config';
import { createRedisConnection } from '../redis.service';
import {
  REDIS_MODULE_OPTIONS,
  REDIS_TOKEN,
} from './redis.constant';

@Module({
  providers: [
    {
      provide: REDIS_MODULE_OPTIONS,
      useFactory: redisOptionsModuleFactory,
    },
    {
      provide: REDIS_TOKEN,
      inject: [REDIS_MODULE_OPTIONS],
      useFactory: (options: ReturnType<typeof redisOptionsModuleFactory>) =>
        createRedisConnection(options),
    },
  ],
  exports: [REDIS_TOKEN],
})
export class RedisModule {}