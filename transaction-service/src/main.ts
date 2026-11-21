import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { kafkaOptionsFactory } from './config/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.HTTP_PREFIX ?? 'api/transaction');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.connectMicroservice(kafkaOptionsFactory());

  await app.startAllMicroservices();
  await app.listen(process.env.HTTP_PORT ?? 9002);
}

bootstrap();