import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaOptionsFactory = (): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: (process.env.KAFKA_CLIENT_BROKERS ?? 'localhost:29092').split(','),
    },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID ?? 'user-service-consumer',
    },
  },
});