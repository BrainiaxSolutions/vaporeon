import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppClusterConfig } from './app-cluster.config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/error/http-exception.filter';
import { config } from './config';

function swaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('API Vaporeon')
    .setDescription(
      'Lambda responsável pelo gerenciamento de alertas do sistema Pluvial.',
    )
    .setVersion('1.0')
    .addSecurity('TokenAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('TokenAuth')
    .build();

  return config;
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/vaporeon');
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (config.app.environment.toUpperCase() !== 'PRD') {
    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup('api/vaporeon/docs', app, document);
  }

  await app.listen(config.app.port);
}

AppClusterConfig.clusterize(bootstrap);
