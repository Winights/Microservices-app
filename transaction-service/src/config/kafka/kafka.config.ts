import { KafkaOptions, Transport } from '@nestjs/microservices';

import {
  KAFKA_BROKER,
  KAFKA_CONSUMER_GROUP,
} from './kafka.constant';

export const kafkaOptionsFactory = (): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [KAFKA_BROKER],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUP,
    },
  },
});