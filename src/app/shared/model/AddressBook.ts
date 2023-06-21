import {UserInfo} from "./UserInfo";

export interface AddressBook {
  id: number;
  userInfo: UserInfo;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}
