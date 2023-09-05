import { Injectable } from '@nestjs/common';
import { Receiver } from './receiver';
import { Model } from 'mongoose';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';

@Injectable()
export class Shelter implements Receiver {
  constructor(private readonly shelterRepository: Model<ShelterEntity>) {}

  public async findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<ShelterEntity[]> {
    const shelters = await this.shelterRepository.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], metersAway / 6371],
        },
      },
    });

    return shelters;
  }
}
