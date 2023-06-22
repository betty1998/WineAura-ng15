import {Product} from "./Product";
import {Order} from "./Order";

export interface Purchase {
  id?: number;
  order?: Order;
  product: Product;
  qty: number;
}
