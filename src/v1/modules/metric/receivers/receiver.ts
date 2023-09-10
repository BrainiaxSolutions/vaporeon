import { DeviceEntity } from 'src/v1/database/models/device.entity';

export interface Receiver {
  formatMessageReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
    alert: AlertObject,
    deviceEntity?: DeviceEntity,
  ): Promise<(ShelterReceiverMessageObject | ResidentReceiverMessageObject)[]>;
}
