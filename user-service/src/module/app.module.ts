import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from '../config/redis/redis.module';
import { KafkaModule } from '../config/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    RedisModule,
    KafkaModule,
  ],
})
export class AppModule {}