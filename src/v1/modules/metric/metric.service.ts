import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceEntity } from 'src/v1/database/models/device.entity';
import { TemplateMessageEntity } from 'src/v1/database/models/templateMessage.entity';
import { getInstanceDevice } from 'src/enum/deviceEnum';
import { getInstanceReceiver } from 'src/enum/receiverEnum';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(DeviceEntity.name)
    private deviceRepository: Model<DeviceEntity>,
    @InjectModel(ShelterEntity.name)
    private shelterRepository: Model<ShelterEntity>,
    @InjectModel(ResidentEntity.name)
    private residentRepository: Model<ResidentEntity>,
    @InjectModel(TemplateMessageEntity.name)
    private templateMessageRepository: Model<TemplateMessageEntity>,
  ) {}

  async alert(id: string, metric: number) {
    const deviceEntity: DeviceEntity = (
      await this.deviceRepository.findOne({ _id: id })
    ).toObject();

    if (!deviceEntity) {
      throw new HttpException(
        'This device id not exists in database.',
        HttpStatus.NOT_FOUND,
      );
    }

    const deviceInstance = getInstanceDevice(deviceEntity.deviceName);
    const alertsToBeFired: AlertObject[] = deviceInstance.alertsToBeFired(
      deviceEntity,
      metric,
    );

    const receivers = await Promise.all(
      alertsToBeFired.map(async (alert) => {
        const receiverInstance = getInstanceReceiver(
          alert.receiver,
          this.shelterRepository,
          this.residentRepository,
        );
        const receivers = await receiverInstance.findReceivers(
          deviceEntity.location.coordinates[0],
          deviceEntity.location.coordinates[1],
          5,
        );

        return receivers;
      }),
    );

    return receivers;
  }
}
