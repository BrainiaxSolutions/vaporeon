import { Injectable } from '@nestjs/common';
import { ruleOfThree } from 'src/utils/utils';
import { DeviceEntity } from 'src/v1/database/models/device.entity';
import { Device } from './device';

@Injectable()
export class Pluviometer implements Device {
  alertsToBeFired(device: DeviceEntity, metric: number): AlertObject[] {
    return device.alerts.filter((alert) => {
      const percent = ruleOfThree(device.maximumLimit, metric, 100);
      return percent >= alert.percent;
    });
  }
}
