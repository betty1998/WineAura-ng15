import {Purchase} from "./Purchase";
import {Store} from "./Store";

export interface Order {
  id?: number;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  paymentMethod: string;
  paymentCardNumber: string;
  purchases: Purchase[];
  purchaseDate?: string;
  status: string;
  trackingNumber?: string;
  store?: Store;
}
