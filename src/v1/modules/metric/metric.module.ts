import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import {
  DeviceEntity,
  DeviceSchema,
} from 'src/v1/database/models/device.entity';
import {
  TemplateMessageEntity,
  TemplateMessageSchema,
} from 'src/v1/database/models/templateMessage.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResidentEntity,
  ResidentSchema,
} from 'src/v1/database/models/resident.entity';
import {
  ShelterEntity,
  ShelterSchema,
} from 'src/v1/database/models/shelter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceEntity.name, schema: DeviceSchema },
      { name: ResidentEntity.name, schema: ResidentSchema },
      { name: ShelterEntity.name, schema: ShelterSchema },
      { name: TemplateMessageEntity.name, schema: TemplateMessageSchema },
    ]),
  ],
  controllers: [MetricController],
  providers: [MetricService],
})
export class V1MetricModule {}
