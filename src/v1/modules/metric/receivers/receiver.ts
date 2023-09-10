export interface Receiver {
  findReceivers(
    longitude: number,
    latitude: number,
    metersAway: number,
  ): Promise<(ShelterReceiverObject | ResidentReceiverObject)[]>;
}
