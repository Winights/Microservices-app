import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { InternalAccountModule } from '../internal-account/internal-account.module';
import { KafkaModule } from '../../config/kafka/kafka.module';
import { TransactionKafkaController } from './transaction.kafka-controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    InternalAccountModule,
    KafkaModule,
  ],
  controllers: [
  TransactionController,
  TransactionKafkaController,
  ],
  providers: [TransactionRepository, TransactionService],
  exports: [TransactionRepository, TransactionService],
})
export class TransactionModule {}