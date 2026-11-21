import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InternalAccountService } from './internal-account.service';

@Module({
  imports: [HttpModule],
  providers: [InternalAccountService],
  exports: [InternalAccountService],
})
export class InternalAccountModule {}