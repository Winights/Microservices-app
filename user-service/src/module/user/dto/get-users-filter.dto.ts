import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserFilterDto {

  @ApiProperty({
    description: 'Идентификаторы пользователей',
    type: [String],
    required: false,
    example: ['51bf7913-36b8-4c0a-c0f1-c742e251acdf'],
  })
  @IsOptional()
  @IsString({ each: true })
  readonly userIds?: string[];

  @ApiProperty({
    description: 'Номера телефонов пользователей',
    type: [String],
    required: false,
    example: ['79001110102', '79001110103'],
  })
  @IsOptional()
  @IsString({ each: true })
  readonly phones?: string[];

  @ApiProperty({
    description: 'Логин пользователя',
    type: String,
    required: false,
    example: 'test_user',
  })
  @IsOptional()
  @IsString()
  readonly login?: string;

  @ApiProperty({
    description: 'Количество записей',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: 'Количество пропускаемых записей',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}