import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceEntity } from 'src/v1/database/models/device.entity';
import { getInstanceDevice } from 'src/enum/deviceEnum';
import { getInstanceReceiver } from 'src/enum/receiverEnum';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';
import { differenceBetweenDates } from 'src/helpers/utils';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(DeviceEntity.name)
    private deviceRepository: Model<DeviceEntity>,
    @InjectModel(ShelterEntity.name)
    private shelterRepository: Model<ShelterEntity>,
    @InjectModel(ResidentEntity.name)
    private residentRepository: Model<ResidentEntity>,
  ) {}

  private async updateRemainingNotifications(
    deviceEntity: DeviceEntity,
    alertsToBeFired: AlertObject[],
  ): Promise<void> {
    const alertsToUpdateRemainingNotifications = alertsToBeFired.map(
      (alert) => {
        return alert.alertId;
      },
    );

    deviceEntity.alerts.map((alert) => {
      if (alertsToUpdateRemainingNotifications.includes(alert.alertId)) {
        alert.remainingNotifications--;
        alert.lastNotificationSent = new Date();
      }
      return alert;
    });

    await this.deviceRepository.updateOne(
      { _id: deviceEntity._id },
      deviceEntity,
      {
        new: true,
      },
    );
  }

  private async alertsToBeFired(
    deviceEntity: DeviceEntity,
    metric: number,
  ): Promise<AlertObject[]> {
    const deviceInstance = getInstanceDevice(deviceEntity.deviceName);

    return deviceInstance
      .alertsToBeFired(deviceEntity, metric)
      .filter((alert) => {
        const timeRange = differenceBetweenDates(
          new Date(),
          alert.lastNotificationSent,
          'minutes',
        );

        return (
          alert.remainingNotifications > 0 && timeRange > alert.sleepMinutes
        );
      });
  }

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

    const alertsToBeFired: AlertObject[] = await this.alertsToBeFired(
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
        // TODO: mover isso para cada strategy do receiver, então cada receiver retorna seu estilo de envio de mensagem
        return receivers.map((receiver) => {
          return {
            recipient: { email: receiver.email, phone: receiver.phone },
            content: {
              receiver: { name: receiver.name },
              street: deviceEntity.street,
            },
            typeAlert: alert.typeAlert,
            templateId: alert.templateId,
          };
        });
      }),
    );

    // envia notificações aqui

    await this.updateRemainingNotifications(deviceEntity, alertsToBeFired);

    return receivers;
  }

  async resetRemainingNotifications(id: string) {
    const deviceEntity: DeviceEntity = (
      await this.deviceRepository.findOne({ _id: id })
    ).toObject();

    deviceEntity.alerts.map((alert) => {
      alert.remainingNotifications = alert.maxNotifications;
      return alert;
    });

    await this.deviceRepository.updateOne(
      { _id: deviceEntity._id },
      deviceEntity,
      {
        new: true,
      },
    );

    return { message: 'Metrics reset successfully.' };
  }
}
