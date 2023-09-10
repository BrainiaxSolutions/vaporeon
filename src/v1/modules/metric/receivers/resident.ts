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

  public async findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<ResidentReceiverObject[]> {
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

    return residents.map((residents) => {
      return { ...residents, messageData: { shelters } };
    });
  }
}
