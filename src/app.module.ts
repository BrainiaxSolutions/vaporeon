import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { V1AlertModule } from './v1/modules/alert/alert.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { HealthModule } from './v1/modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          uri: config.db.url,
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    V1AlertModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
