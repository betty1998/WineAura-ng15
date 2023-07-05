import {Product} from "./Product";

export interface ProductSold {
  id?: number;
  product: Product;
  sold: number;
}
