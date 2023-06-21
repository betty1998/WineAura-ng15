import {User} from "../model/User";

export interface LoginResponse{
  success: boolean
  message: string;
  user: User
  token: string;
}
