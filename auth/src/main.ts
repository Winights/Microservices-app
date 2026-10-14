import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix(
    config.get<string>('HTTP_PREFIX') ?? 'api',
  );

  await app.listen(
    Number(config.get<string>('HTTP_PORT')) || 3000,
  );
}

bootstrap();