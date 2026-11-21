import { BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionType, TransactionStatus, EventNameEnum, EventBalanceChangedData,} from './transaction.types';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { InternalAccountService } from '../internal-account/internal-account.service';
import { KafkaService } from '../../config/kafka/kafka.service';

@Injectable()
export class TransactionService {
  constructor(
  private readonly transactionRepository: TransactionRepository,
  private readonly dataSource: DataSource,
  private readonly internalAccountService: InternalAccountService,
  private readonly kafkaService: KafkaService,
) {}

  async createTransaction(
  dto: CreateTransactionDto,
): Promise<TransactionEntity | TransactionEntity[]> {
  if (dto.transactionType === TransactionType.TRANSFER) {
    return this.createTransferTransaction(dto);
  }

  const transactionType =
    dto.transactionType ?? TransactionType.DEPOSIT;

  const transaction = await this.transactionRepository.createTransaction({
    userId: dto.userId,
    amount: dto.amount,
    type: transactionType,
    status: TransactionStatus.IN_PROGRESS,
  });

  await this.kafkaService.produce(
    EventNameEnum.TransactionSaved,
    {
      userId: dto.userId,
      amount: dto.amount,
      transactionId: transaction.id,
      transactionType,
    },
  );

  return transaction;
}

  async createTransferTransaction(
    dto: CreateTransactionDto,
  ): Promise<TransactionEntity[]> {
    if (!dto.recipient) {
      throw new BadRequestException(
        'Для перевода необходимо указать получателя',
      );
    }

    if (dto.userId === dto.recipient) {
      throw new BadRequestException(
        'Нельзя выполнить перевод самому себе',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Получаем репозиторий внутри текущей транзакции
      const repository =
        queryRunner.manager.getRepository(TransactionEntity);

      // Создаём две записи о переводе
      const transactions = await repository.save([
        repository.create({
          userId: dto.userId,
          amount: dto.amount,
          type: TransactionType.WITHDRAWL,
        }),
        repository.create({
          userId: dto.recipient,
          amount: dto.amount,
          type: TransactionType.DEPOSIT,
        }),
      ]);

      // Списываем деньги у отправителя
      await this.internalAccountService.changeBalance({
        userId: dto.userId,
        amount: dto.amount,
        transactionType: TransactionType.WITHDRAWL,
      });

      // Зачисляем деньги получателю
      await this.internalAccountService.changeBalance({
        userId: dto.recipient,
        amount: dto.amount,
        transactionType: TransactionType.DEPOSIT,
      });

      await queryRunner.commitTransaction();

      return transactions;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTransaction(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Транзакция не найдена');
    }

    return transaction;
  }

  async getTransactions(
    params: FindTransactionDto,
  ): Promise<[TransactionEntity[], number]> {
    return this.transactionRepository.findByParams(params);
  }

  async updateStatus(
    data: EventBalanceChangedData,
  ): Promise<void> {
    await this.transactionRepository.updateStatus(
      data.transactionId,
      data.status,
    );
  }
}