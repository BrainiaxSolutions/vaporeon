import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { AppHealthIndicator } from './app.health';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [AppHealthIndicator],
})
export class HealthModule {}
