import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
} from '@nestjs/terminus';
import { AppHealthIndicator } from './app.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private appHealthIndicator: AppHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.appHealthIndicator.checkAppHealth(),
    ]);
  }
}
