import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { KAFKA_SERVICE } from './kafka.constant';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  constructor(
    @Inject(KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async produce<T>(topic: string, data: T): Promise<void> {
    await lastValueFrom(this.kafkaClient.emit(topic, data));
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }
}