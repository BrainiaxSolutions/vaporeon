import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { config } from 'src/config';

@Injectable()
export class Resident implements Receiver {
  constructor(
    private readonly residentRepository: Model<ResidentEntity>,
    private readonly shelterRepository: Model<ShelterEntity>,
  ) {}

  public async formatMessageReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
    alert: AlertObject,
  ): Promise<sendNotificationPidgeyObject[]> {
    const residents = await this.residentRepository
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], metersAway / 6371],
          },
        },
      })
      .lean()
      .exec();

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

    const listShelters = shelters.map((shelter) => {
      return {
        name: shelter.name,
        address: shelter.address,
        addressNumber: shelter.addressNumber,
        urlMap: config.providers.maps.url,
        latitude: shelter.location.coordinates[1],
        longitude: shelter.location.coordinates[0],
      };
    });

    return residents.map((resident) => {
      return {
        recipient: { email: resident.email, phone: resident.phone },
        content: {
          name: resident.name,
          listShelters,
        },
        typeNotification: alert.typeAlert,
        templateId: alert.templateId,
      };
    });
  }
}
