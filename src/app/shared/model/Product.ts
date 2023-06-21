import {ProductStatus} from "./ProductStatus";
import {Review} from "./Review";

export interface Product{
  id?: number;
  name: string;
  description: string;
  capacity: string;
  price: number;
  category: string;
  brand: string;
  region: string;
  image: string;
  stockQty: number;
  discount: number;
  productStatus: ProductStatus;
  reviews: Review[];
}


