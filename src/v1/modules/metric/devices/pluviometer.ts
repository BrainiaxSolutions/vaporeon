import { Injectable } from '@nestjs/common';
import { ruleOfThree } from 'src/utils/utils';
import { DeviceEntity } from 'src/v1/database/models/device.entity';
import { Device } from './device';
import * as mqtt from 'mqtt';
import { InjectModel } from '@nestjs/mongoose';
import { TemplateMessageEntity } from 'src/v1/database/models/templateMessage.entity';
import { Model } from 'mongoose';

@Injectable()
export class Pluviometer implements Device {
  alertsToBeFired(device: DeviceEntity, metric: number): AlertObject[] {
    return device.alerts.filter((alert) => {
      const percent = ruleOfThree(device.maximumLimit, metric, 100);
      return percent >= alert.percent;
    });
  }
}
