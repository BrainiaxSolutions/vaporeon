import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import * as awsLambdaFastify from '@fastify/aws-lambda';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { HttpExceptionFilter } from './config/error/http-exception.filter';
import { useContainer } from 'class-validator';

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedNestApp: NestApp;

async function bootstrapServer(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api/vaporeon');

  await app.init();
  return { app, instance };
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  cachedNestApp = await bootstrapServer();
  const proxy = awsLambdaFastify(cachedNestApp.instance);
  return proxy(event, context);
};
