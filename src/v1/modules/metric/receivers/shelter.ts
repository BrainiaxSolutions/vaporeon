import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';
import { DeviceEntity } from 'src/v1/database/models/device.entity';

@Injectable()
export class Shelter implements Receiver {
  constructor(
    private readonly shelterRepository: Model<ShelterEntity>,
    private readonly residentRepository: Model<ResidentEntity>,
  ) {}

  public async formatMessageReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
    alert: AlertObject,
    deviceEntity: DeviceEntity,
  ): Promise<sendNotificationPidgeyObject[]> {
    const shelters = await this.shelterRepository
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], metersAway / 6371],
          },
        },
      })
      .lean()
      .exec();

    const amoutResidents = await this.residentRepository
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], metersAway / 6371],
          },
        },
      })
      .count();

    return shelters.map((shelter) => {
      return {
        recipient: { email: shelter.email, phone: shelter.phone },
        content: {
          name: shelter.name,
          street: deviceEntity.street,
          amoutResidents,
        },
        typeNotification: alert.typeAlert,
        templateId: alert.templateId,
      };
    });
  }
}
