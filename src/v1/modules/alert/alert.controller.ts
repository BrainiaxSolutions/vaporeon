import { Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { ExceptionDto } from 'src/config/error/exception.dto';
import { AlertService } from './alert.service';

@Controller('v1/alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post(':id')
  async alert(@Param('id') id: string, @Query('metric') metric: number) {
    try {
      return await this.alertService.alert(id, metric);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Patch('reset/:id')
  async resetRemainingNotifications(@Param('id') id: string) {
    try {
      return await this.alertService.resetRemainingNotifications(id);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }
}
