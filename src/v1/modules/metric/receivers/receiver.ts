import { Model } from 'mongoose';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';

export interface Receiver {
  findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<(ShelterEntity | ResidentEntity)[]>;
}
