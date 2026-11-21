import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './module/transaction/entities/transaction.entity';
import { TransactionModule } from './module/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './config/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'transaction-db',
      entities: [TransactionEntity],
      synchronize: false,
    }),
    KafkaModule,
    TransactionModule,
  ],
})
export class AppModule {}