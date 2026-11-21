import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisModule } from '../../config/redis/redis.module';
import { KafkaModule } from '../../config/kafka/kafka.module';
import { UserKafkaController } from './user.kafka-controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,
    KafkaModule,
  ],
  controllers: [UserController, UserKafkaController],
  providers: [UserService, UserRepository],
})
export class UserModule {}