import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GetUsersByFiltersParams, GetUsersResponse, VerificationParams,} from './account.types';

@Injectable()
export class InternalAccountService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async verification(params: VerificationParams) {
    const url = `${this.config.get('ACCOUNT_URL')}/api/user/user/verification`;

    const res =
      await this.httpService.axiosRef.post(url, params);

    return res.data;
  }

  async getUsersByFilters(
    params: GetUsersByFiltersParams,
  ): Promise<GetUsersResponse> {
    const url = `${this.config.get('ACCOUNT_URL')}/api/user/user`;

    const res =
      await this.httpService.axiosRef.get<GetUsersResponse>(
        url,
        {
          params,
        },
      );

    return res.data;
  }
}