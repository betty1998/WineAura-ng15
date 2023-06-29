import {User} from "./User";
import {Product} from "./Product";

export interface Review {
  id?: number;
  user: User|null;
  product: Product|any;
  nickname: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate?: Date;
}

