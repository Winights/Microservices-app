import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder, } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CheckExistUserParams, SearchUserParams, } from './user.types';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<T & UserEntity> {
    return this.userRepository.save(entity);
  }

  async findById(
    userId: string,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async findByLogin(
  login: string,
): Promise<UserEntity | null> {
  return this.userRepository.findOne({
    where: {
      login,
    },
  });
}

  async findAndCount(
    params: SearchUserParams,
  ): Promise<[UserEntity[], number]> {
    return this.qb(params).getManyAndCount();
  }

  async updateUser(
    userId: string,
    params: DeepPartial<UserEntity>,
  ): Promise<void> {
    await this.userRepository.update(
      {
        userId,
      },
      params,
    );
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({
      userId: id,
    });
  }

  async checkExistUser(
    params: CheckExistUserParams,
    alias = 'user',
  ): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder(alias);

    query.where(
      `${alias}.login = :login`,
      {
        login: params.login,
      },
    );

    query.orWhere(
      `${alias}.phone = :phone`,
      {
        phone: params.phone,
      },
    );

    const result = await query.getOne();

    return !!result;
  }

  qb(
    params: SearchUserParams,
    alias = 'user',
  ): SelectQueryBuilder<UserEntity> {
    const query =
      this.userRepository.createQueryBuilder(alias);

    if (params?.userIds?.length) {
      query.andWhere(
        `${alias}.user_id IN (:...userIds)`,
        {
          userIds: params.userIds,
        },
      );
    }

    if (params?.phones?.length) {
      query.andWhere(
        `${alias}.phone IN (:...phones)`,
        {
          phones: params.phones,
        },
      );
    }

    if (params?.login) {
      query.andWhere(
        `${alias}.login = :login`,
        {
          login: params.login,
        },
      );
    }

    // Paginate
    if (params.take) {
      query.take(params.take);
    }

    if (params.skip) {
      query.skip(params.skip);
    }

    return query;
  }
}