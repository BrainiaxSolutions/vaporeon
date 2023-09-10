import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionDto } from 'src/config/error/exception.dto';
import { MetricService } from './metric.service';

@Controller('v1/metric')
@ApiTags('Metric')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('metric') metric: number) {
    try {
      return await this.metricService.alert(id, metric);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Get('reset/:id')
  async resetRemainingNotifications(@Param('id') id: string) {
    try {
      return await this.metricService.resetRemainingNotifications(id);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }
}
