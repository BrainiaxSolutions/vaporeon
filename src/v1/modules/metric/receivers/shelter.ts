import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';

@Injectable()
export class Shelter implements Receiver {
  constructor(
    private readonly shelterRepository: Model<ShelterEntity>,
    private readonly residentRepository: Model<ResidentEntity>,
  ) {}

  public async findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<ShelterReceiverObject[]> {
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
      return { ...shelter, messageData: { amoutResidents } };
    });
  }
}
