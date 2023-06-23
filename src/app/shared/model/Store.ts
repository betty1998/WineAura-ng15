import {Order} from "./Order";
import {StoreManager} from "./StoreManager";

export interface Store {
  id: number;
  name?: string;
  address?: string;
  manager?: StoreManager;
  orders?: Order[];
}
