interface AddressData {
  street: string;
  city: string;
}

export interface UserRecord {
  _id: string;
  name: string;
  contactNo: string;
  address: AddressData;
  email: string;
  isSubscribed: boolean;
  success?: boolean;
}
