
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString, Matches } from 'class-validator';
import { TransactionType } from '../user.types';

export class ChangeBalanceDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Сумма',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  @Matches(/^\d+(\.\d+)?$/, {
    message: 'Amount must be a positive numeric string',
  })
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: true,
    enum: TransactionType,
  })
  @Expose()
  @IsEnum(TransactionType)
  transactionType: TransactionType;
}