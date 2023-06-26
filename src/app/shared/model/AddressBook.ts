import {UserInfo} from "./UserInfo";

export interface AddressBook {
  id: number;
  userInfo?: UserInfo;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}
