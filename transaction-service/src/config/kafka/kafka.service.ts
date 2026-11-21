import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { KAFKA_SERVICE } from './kafka.constant';
import { KafkaEvent } from './kafka.interface';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  constructor(
    @Inject(KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async produce<T>(topic: string, data: T): Promise<void> {
    await lastValueFrom(
      this.kafkaClient.emit(topic, data),
    );
  }

  async send<T, R>(topic: string, event: KafkaEvent<T>): Promise<R> {
    return lastValueFrom(
      this.kafkaClient.send<R, KafkaEvent<T>>(topic, event),
    );
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }
}