import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import migrations from './migrations';

export const databaseOptions = (
  config: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',

  host: config.get<string>('DB_HOST'),
  port: Number(config.get<string>('DB_PORT')),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_DATABASE'),

  logging: config.get<string>('DB_LOGGING') === 'true',

  synchronize: false,

  migrationsRun:
    config.get<string>('DB_MIGRATIONS_RUN') === 'true',

  migrationsTableName:
    config.get<string>('DB_MIGRATIONS_TABLE_NAME') ??
    'typeorm_migrations',

  migrations,
});