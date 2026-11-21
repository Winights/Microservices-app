import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './module/app.module';
import { DocumentBuilder, SwaggerModule, } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaOptionsFactory } from './config/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
  kafkaOptionsFactory(),
  );

  const config = app.get(ConfigService);

  app.setGlobalPrefix(
    config.get<string>('HTTP_PREFIX') ?? 'api',
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(
      `${config.get<string>('SERVICE_NAME')} API`,
    )
    .setDescription('API Documentation')
    .addServer(
      `http://${config.get<string>('HTTP_HOST')}:${config.get<string>('HTTP_PORT')}${config.get<string>('HTTP_PREFIX')}`,
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();

  await app.listen(
    Number(config.get<string>('HTTP_PORT')) || 3000,
  );
}

bootstrap();
