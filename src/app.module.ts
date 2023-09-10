import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { V1MetricModule } from './v1/modules/metric/metric.module';
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
    V1MetricModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
