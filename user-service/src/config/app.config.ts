import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Environment } from './types/configurations.enums';

export class ApplicationConfig {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  SERVICE_NAME: string;

  @IsNumber()
  HTTP_PORT: number;

  @IsString()
  HTTP_HOST: string;

  @IsString()
  HTTP_PREFIX: string;

  @IsNumber()
  HTTP_VERSION: number;
}