import { DataSource } from 'typeorm';
import { migrations } from '../module/database/migrations';
import * as dotenv from 'dotenv';
import { TransactionEntity } from '../module/transaction/entities/transaction.entity';

const ENV_FILE = `.env`;
dotenv.config({ path: ENV_FILE });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'transaction-db',
  port: Number(process.env.DB_PORT) || 5432,
  synchronize: false,
  entities: [TransactionEntity],
  migrations,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrationsTableName: process.env.DB_MIGRATIONS_TABLE_NAME || 'typeorm_migrations',
});