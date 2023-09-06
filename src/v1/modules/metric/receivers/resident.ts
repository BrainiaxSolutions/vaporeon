import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';

@Injectable()
export class Resident implements Receiver {
  constructor(private readonly residentRepository: Model<ResidentEntity>) {}

  public async findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<ResidentEntity[]> {
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

    return residents;
  }
}
