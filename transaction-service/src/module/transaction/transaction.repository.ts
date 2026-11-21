import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder,} from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { FindTransactionParams, TransactionStatus,} from './transaction.types';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(
    entity: DeepPartial<TransactionEntity>,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(entity);
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    return this.transactionRepository.findOneBy({ id });
  }

  qb(
    params: FindTransactionParams = {},
    alias = 'transaction',
  ): SelectQueryBuilder<TransactionEntity> {
    const { userIds, ids, amounts, type, status, take, skip } = params;

    const query = this.transactionRepository.createQueryBuilder(alias);

    if (userIds?.length) {
      query.andWhere(`${alias}.userId IN (:...userIds)`, { userIds });
    }

    if (ids?.length) {
      query.andWhere(`${alias}.id IN (:...ids)`, { ids });
    }

    if (amounts?.length) {
      query.andWhere(`${alias}.amount IN (:...amounts)`, { amounts });
    }

    if (type) {
      query.andWhere(`${alias}.type = :type`, { type });
    }

    if (status) {
      query.andWhere(`${alias}.status = :status`, { status });
    }

    // Пагинация
    if (take !== undefined) {
      query.take(take);
    }

    if (skip !== undefined) {
      query.skip(skip);
    }

    return query;
  }
  
  async findByParams(
    params: FindTransactionParams = {},
  ): Promise<[TransactionEntity[], number]> {
    return this.qb(params).getManyAndCount();
  }

  async updateStatus(
    id: string,
    status: TransactionStatus,
  ): Promise<void> {
    await this.transactionRepository.update(id, { status });
  }
}
