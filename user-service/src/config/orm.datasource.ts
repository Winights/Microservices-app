import 'dotenv/config';

import { DataSource } from 'typeorm';

import migrations from '../module/database/migrations';
import { UserEntity } from '../module/user/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  logging: process.env.DB_LOGGING === 'true',

  synchronize: false,

  entities: [UserEntity],

  migrations,

  migrationsRun:
    process.env.DB_MIGRATIONS_RUN === 'true',

  migrationsTableName:
    process.env.DB_MIGRATIONS_TABLE_NAME ??
    'typeorm_migrations',
});

export default dataSource;