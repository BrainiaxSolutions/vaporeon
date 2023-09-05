import { DeviceEntity } from 'src/v1/database/models/device.entity';

export interface Device {
  alertsToBeFired(device: DeviceEntity, metric: number): AlertObject[];
}
