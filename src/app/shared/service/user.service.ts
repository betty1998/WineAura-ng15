import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  getUser(id: number,module:string="user") {
    return this.http.get<DataResponse<User>>(`${environment.api}/users/${id}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getUsers(module:string="user") {
    return this.http.get<DataResponse<User[]>>(`${environment.api}/users`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addAdmin(newAdmin:AdminData,module:string="user") {
    return this.http.post<DataResponse<UserInfo>>(`${environment.api}/users/addAdmin`,newAdmin,
      { headers: new HttpHeaders({ 'module': module }) });

  }

  deleteAdmin(userId: number | undefined,module:string="user") {
    return this.http.delete<DataResponse<UserInfo>>(`${environment.api}/users/deleteAdmin/${userId}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  checkUnactivatedUsername(username:string,module:string="user") {
    return this.http.get<DataResponse<User>>(`${environment.api}/users/checkUnactivatedUsername/${username}`,
      { headers: new HttpHeaders({ 'module': module }) });

  }

  updateUser(id:number|undefined,status:string, module:string="user"){
    return this.http.put<DataResponse<User>>(`${environment.api}/users/${id}/updateStatus/${status}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  updateRole(id: number, role: string, module:string="user") {
    return this.http.put<DataResponse<User>>(`${environment.api}/users/${id}/updateRole/${role}`, null,
      { headers: new HttpHeaders({ 'module': module }) });

  }

  deleteUser(userId: number,module:string="user") {
    return this.http.delete<DataResponse<User>>(`${environment.api}/users/${userId}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }
}
