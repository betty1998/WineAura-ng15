import {UserInfo} from "./UserInfo";
import {Product} from "./Product";

export interface CartProduct {
  id?: number;
  userInfo?: UserInfo;
  product: Product;
  qty: number;
}
