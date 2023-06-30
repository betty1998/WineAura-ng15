import {Purchase} from "./Purchase";

export interface Return {
  id?: number;
  purchase: Purchase;
  reason: string;
  comment: string;
}
