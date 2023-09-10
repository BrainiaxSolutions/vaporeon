type residentMessageDataObject = {
  shelters: ShelterEntity[];
};

type ResidentReceiverObject = {
  name: string;
  email: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  addressNumber: string;
  phone: string;
  messageData: residentMessageDataObject;
};
