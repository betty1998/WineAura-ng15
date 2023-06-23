import {User} from "./User";
import {Store} from "./Store";

export interface StoreManager {
  id: number;
  user?: User;
  store?: Store;
  managerCode?: string;
}
