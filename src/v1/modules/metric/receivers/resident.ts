import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';

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
  ): Promise<ResidentReceiverMessageObject[]> {
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
      return `${shelter.name} - ${shelter.address}, ${shelter.addressNumber}`;
    });

    return residents.map((resident) => {
      return {
        recipient: { email: resident.email, phone: resident.phone },
        content: {
          name: resident.name,
          listShelters,
        },
        typeAlert: alert.typeAlert,
        templateId: alert.templateId,
      };
    });
  }
}
