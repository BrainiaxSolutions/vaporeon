type shelterMessageDataObject = {
  amoutResidents: number;
};

type ShelterReceiverObject = {
  name: string;
  email: string;
  cnpj: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  addressNumber: string;
  complement: string;
  phone: string;
  messageData: shelterMessageDataObject;
};
