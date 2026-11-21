import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { EventNameEnum } from './user.types';

import type { EventTransactionSavedData } from './user.types';

@Controller()
export class UserKafkaController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @EventPattern(EventNameEnum.TransactionSaved)
  async handleTransactionSaved(
    @Payload() message: EventTransactionSavedData,
  ): Promise<void> {
    await this.userService.processTransaction(message);
  }
}