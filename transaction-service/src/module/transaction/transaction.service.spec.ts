
import { NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { InternalAccountService } from '../internal-account/internal-account.service';
import { KafkaService } from '../../config/kafka/kafka.service';

describe('TransactionService', () => {
  let service: TransactionService;

  const transactionRepository = {
    findById: jest.fn(),
  };

  const dataSource = {};

  const internalAccountService = {};

  const kafkaService = {};

  beforeEach(() => {
    jest.clearAllMocks();

    service = new TransactionService(
      transactionRepository as unknown as TransactionRepository,
      dataSource as DataSource,
      internalAccountService as InternalAccountService,
      kafkaService as KafkaService,
    );
  });

  describe('getTransaction', () => {
    it('должен вернуть транзакцию по идентификатору', async () => {
      const transaction = {
        id: 'transaction-1',
        userId: 'user-1',
        amount: '1000',
      } as TransactionEntity;

      transactionRepository.findById.mockResolvedValue(transaction);

      const result = await service.getTransaction('transaction-1');

      expect(result).toEqual(transaction);
      expect(transactionRepository.findById).toHaveBeenCalledWith(
        'transaction-1',
      );
    });

    it('должен выбросить NotFoundException, если транзакция не найдена', async () => {
      transactionRepository.findById.mockResolvedValue(null);

      await expect(
        service.getTransaction('unknown-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
