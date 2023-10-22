import { Pluviometer } from 'src/v1/modules/alert/devices/pluviometer';

export const DeviceEnums = [
  { name: 'pluviometer', instance: new Pluviometer() },
];

export enum DeviceNameEnum {
  PLUVIOMETER = 'pluviometer',
}

export const getInstanceDevice = (name: string) => {
  return DeviceEnums.find((deviceEnum) => {
    return deviceEnum.name === name;
  }).instance;
};
