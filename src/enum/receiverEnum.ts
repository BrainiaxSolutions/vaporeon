import { Shelter } from 'src/v1/modules/metric/receivers/shelter';
import { Resident } from 'src/v1/modules/metric/receivers/resident';
import { Model } from 'mongoose';
import { ShelterEntity } from 'src/v1/database/models/shelter.entity';
import { ResidentEntity } from 'src/v1/database/models/resident.entity';

export const getInstanceReceiver = (
  receiverName: string,
  shelterRepository: Model<ShelterEntity>,
  residentRepository: Model<ResidentEntity>,
) => {
  const ReceiverEnums = [
    { name: 'shelters', instance: new Shelter(shelterRepository) },
    { name: 'residents', instance: new Resident(residentRepository) },
  ];

  return ReceiverEnums.find((receiverEnum) => {
    return receiverEnum.name === receiverName;
  }).instance;
};
