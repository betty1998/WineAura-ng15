import {User} from "./User";
import {Product} from "./Product";

export interface Review {
  id?: number;
  user: User;
  rating: number;
  comment: string;
  reviewDate: Date;
}
