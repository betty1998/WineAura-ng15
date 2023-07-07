import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {User} from "../model/User";
import {DataResponse} from "../httpResponse/dataResponse";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id: number) {
    return this.http.get<DataResponse<User>>(`${environment.api}/users/${id}`);
  }

  getUsers() {
    return this.http.get<DataResponse<User[]>>(`${environment.api}/users`);
  }
}
