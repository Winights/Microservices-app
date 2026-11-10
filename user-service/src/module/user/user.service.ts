import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { ConflictException, Injectable, NotFoundException, Inject, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { GetUserFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto'
import { SignInDto } from './dto/sign-in.dto';
import Redis from 'ioredis';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(REDIS_TOKEN)
    private readonly redis: Redis,
  ) {}

  async create(user: CreateUserDto) {
  const userExist =
    await this.userRepository.checkExistUser({
      phone: user.phone,
      login: user.login,
    });

  if (userExist) {
    throw new ConflictException(
      'User already exist',
    );
  }

  const salt = crypto.randomBytes(32);

  const hash = await argon.hash(user.password, {
    salt,
  });

  return this.userRepository.save({
    passwordHash: hash,
    passwordSalt: salt.toString('hex'),
    ...user,
  });
}

async verification(
  login: string,
  password: SignInDto,
): Promise<boolean> {
  const user = await this.userRepository.findByLogin(login);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return argon.verify(
    user.passwordHash,
    password.password,
  );
}

  async findAll(getUserFilterDto: GetUserFilterDto) {
  const [items, total] =
    await this.userRepository.findAndCount(
      getUserFilterDto,
    );

  return {
    items: items.map((item) => new UserDto(item)),
    total,
  };
}

  async findOne(id: string) {
  return this.userRepository.findById(id);
}

  async update( id: string, updateUserDto: UpdateUserDto,) {
  return this.userRepository.updateUser(
    id,
    updateUserDto,
  );
}

  async remove(id: string) {
  const user = await this.userRepository.findById(id);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  await this.redis.del(user.login);

  return this.userRepository.deleteUser(id);
}
}