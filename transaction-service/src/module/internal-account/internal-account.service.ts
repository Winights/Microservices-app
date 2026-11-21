
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ChangeBalanceParams } from './internal-account.types';
import { isAxiosError } from 'axios';

@Injectable()
export class InternalAccountService {
  private readonly accountUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.accountUrl = this.configService.getOrThrow<string>('ACCOUNT_URL');
  }

  async changeBalance(params: ChangeBalanceParams): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(`${this.accountUrl}/balance`, params),
      );
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        throw new ConflictException(
          error.response.data.message,
        );
      }

      throw error;
    }
  }
}