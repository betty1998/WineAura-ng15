import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {User} from "../model/User";
import {DataResponse} from "../httpResponse/dataResponse";
import {environment} from "../../../environments/environment.development";
import {UserInfo} from "../model/UserInfo";
import {AdminData} from "../../admin/administrator/add-admin-dialog/add-admin-dialog.component";


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

  addAdmin(newAdmin:AdminData) {
    return this.http.post<DataResponse<UserInfo>>(`${environment.api}/users/addAdmin`,newAdmin);

  }

  deleteAdmin(userId: number | undefined) {
    return this.http.delete<DataResponse<UserInfo>>(`${environment.api}/users/deleteAdmin/${userId}`);
  }

  checkUnactivatedUsername(username:string) {
    return this.http.get<DataResponse<User>>(`${environment.api}/users/checkUnactivatedUsername/${username}`);

  }

  updateUser(id:number|undefined,status:string){
    return this.http.put<DataResponse<User>>(`${environment.api}/users/${id}/updateStatus/${status}`, null);
  }

  updateRole(id: number, role: string) {
    return this.http.put<DataResponse<User>>(`${environment.api}/users/${id}/updateRole/${role}`, null);

  }

  deleteUser(userId: number) {
    return this.http.delete<DataResponse<User>>(`${environment.api}/users/${userId}`);
  }
}
