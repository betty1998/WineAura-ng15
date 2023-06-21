import {Product} from "./Product";
import {AddressBook} from "./AddressBook";
import {CartProduct} from "./CartProduct";
import {User} from "./User";

export interface UserInfo {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membership: boolean;
  addresses: AddressBook[];
  favorites: Product[];
  cart: CartProduct[];
}
