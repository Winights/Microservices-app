
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  async createTransaction(
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(dto);
  }

  @Get(':id')
  async getTransaction(
    @Param('id') id: string,
  ) {
    return this.transactionService.getTransaction(id);
  }

  @Get()
  async getTransactions(
    @Query() params: FindTransactionDto,
  ) {
    return this.transactionService.getTransactions(params);
  }
}
