import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from './kafka.constant';
import { kafkaOptionsFactory } from './kafka.config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        ...kafkaOptionsFactory(),
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}