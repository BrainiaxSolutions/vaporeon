import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import {
  Device,
  DeviceSchema,
} from 'src/v1/database/models/device.entity';
import { TemplateMessage, TemplateMessageSchema } from 'src/v1/database/models/templateMessage.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: TemplateMessage.name, schema: TemplateMessageSchema },
    ]),
  ],
  controllers: [MetricController],
  providers: [MetricService],
})
export class V1MetricModule {}
