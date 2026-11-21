
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransactionType } from '../transaction.types';

export class TransactionDto {
  @ApiProperty({ description: 'Идентификатор транзакции' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Идентификатор пользователя' })
  @Expose()
  userId: string;

  @ApiProperty({ description: 'Сумма транзакции в копейках' })
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    enum: TransactionType,
  })
  @Expose()
  type: TransactionType;

  @ApiProperty({ description: 'Дата создания транзакции' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления транзакции' })
  @Expose()
  updatedAt: Date;
}
