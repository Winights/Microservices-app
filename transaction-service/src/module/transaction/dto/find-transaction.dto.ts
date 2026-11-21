
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type, Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  TransactionStatus,
  TransactionType,
} from '../transaction.types';

export class FindTransactionDto {
  @ApiPropertyOptional({ type: [String] })
  @Transform(({ value }) =>
    value === undefined
      ? undefined
      : Array.isArray(value)
        ? value
        : [value],
  )
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  userIds?: string[];

  @ApiPropertyOptional({ type: [String] })
  @Transform(({ value }) =>
    value === undefined
      ? undefined
      : Array.isArray(value)
        ? value
        : [value],
  )
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  ids?: string[];

  @ApiPropertyOptional({ enum: TransactionType })
  @IsOptional()
  @IsEnum(TransactionType)
  @Expose()
  type?: TransactionType;

  @ApiPropertyOptional({ type: [String] })
  @Transform(({ value }) =>
    value === undefined
      ? undefined
      : Array.isArray(value)
        ? value
        : [value],
  )
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  amounts?: string[];

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Expose()
  take?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Expose()
  skip?: number;

  @ApiPropertyOptional({ enum: TransactionStatus })
  @IsOptional()
  @IsEnum(TransactionStatus)
  @Expose()
  status?: TransactionStatus;
}
