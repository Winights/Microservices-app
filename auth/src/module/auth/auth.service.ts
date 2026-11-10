import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InternalAccountService } from '../../internal/account/account.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto, RefreshJwtDto } from './dto/jwt.dto';
import type { StringValue } from 'ms';
import Redis from 'ioredis';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: InternalAccountService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(REDIS_TOKEN)
    private readonly redis: Redis,
  ) {}

  async login(params: SignInDto): Promise<JwtDto> {
    const isPasswordCorrect =
      await this.accountService.verification(params);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    let userId = await this.redis.get(params.login);

    if (!userId) {
      const users = await this.accountService.getUsersByFilters({
        login: params.login,
      });

      const user = users.items[0];

      if (!user) {
        throw new NotFoundException('User not found');
      }

      userId = user.userId;

      await this.redis.set(params.login, userId);
    }

    const payload = {
      login: params.login,
      userId,
    };

    const accessToken = this.jwtService.sign(
      payload,
      {
        secret: this.config.get<string>('ACCESS_SECRET'),
        algorithm: this.config.get<string>('JWT_ALG') as any,
        expiresIn: this.config.get<string>('ACCESS_EXP') as StringValue,
      },
    );

    const refreshToken = this.jwtService.sign(
      payload,
      {
        secret: this.config.get<string>('REFRESH_SECRET'),
        algorithm: this.config.get<string>('JWT_ALG') as any,
        expiresIn: this.config.get<string>('REFRESH_EXP') as StringValue,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
  params: RefreshJwtDto,): Promise<JwtDto> {
  let jwtPayload: {
    login: string;
    userId: string;
  };

  try {
    jwtPayload = this.jwtService.verify<{
      login: string;
      userId: string;
    }>(
      params.refreshToken,
      {
        secret: this.config.get<string>('REFRESH_SECRET'),
        algorithms: [
          this.config.get<string>('JWT_ALG') as any,
        ],
      },
    );
  } catch {
    throw new UnauthorizedException();
  }

  const users =
    await this.accountService.getUsersByFilters({
      userIds: [jwtPayload.userId],
    });

  if (!users.items.length) {
    throw new NotFoundException('User not found');
  }

  const payload = {
    login: users.items[0].login,
    userId: users.items[0].userId,
  };

  const accessToken = this.jwtService.sign(
    payload,
    {
      secret: this.config.get<string>('ACCESS_SECRET'),
      algorithm: this.config.get<string>('JWT_ALG') as any,
      expiresIn: this.config.get<string>('ACCESS_EXP') as StringValue,
    },
  );

  const refreshToken = this.jwtService.sign(
    payload,
    {
      secret: this.config.get<string>('REFRESH_SECRET'),
      algorithm: this.config.get<string>('JWT_ALG') as any,
      expiresIn: this.config.get<string>('REFRESH_EXP') as StringValue,
    },
  );

  return {
    accessToken,
    refreshToken,
  };
}
}