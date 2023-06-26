import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {User} from "../model/User";
import {Observable, of, switchMap} from "rxjs";
import {Response} from "../httpResponse/response";
import {DataResponse} from "../httpResponse/dataResponse";
import {LoginResponse} from "../httpResponse/loginResponse";
import {Router} from "@angular/router";
import {AuthRequest} from "../model/AuthRequest";
import {UserInfoService} from "./user-info.service";
import {UserInfo} from "../model/UserInfo";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User|null = null;

  constructor(private httpClient:HttpClient,
              private router: Router,
              private userInfoService:UserInfoService) {
    // everytime refresh the page will call checklogin()
    !this.user && this.checkLogin().pipe(
      switchMap(res => {

        if(res.success){
          this.user = res.data;
          console.log("checklogin response: ", res);
          console.log(this.user);
          // If checkLogin is successful, getUserInfo will be called
          return this.userInfoService.getUserInfo(this.user.id);
        } else {
          console.log(res);
          // If checkLogin is not successful, an empty observable is returned
          return of(null);
        }
      })
    ).subscribe(res => {
      if (res && res.success){
        console.log("user info: ", res.data);
        this.userInfoService.userInfo = res.data;
      }
    });

  }

  login(user: User):Observable<LoginResponse> {
    console.log("login user: ", user);
    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/login`,user);
  }

  register(user: any):Observable<DataResponse<User>> {
    return this.httpClient.post<DataResponse<User>>(`${environment.api}/auth/register`,user);
  }

  checkLogin():Observable<DataResponse<User>> {
    return this.httpClient.get<DataResponse<User>>(`${environment.api}/auth/checklogin`);
  }

  logout() {
    localStorage.removeItem("token");
    this.user = null;
  }

  updatePassword(user:User):Observable<DataResponse<User>>  {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/updatePassword`, user);
  }

  updateUsername(user: User) {
    return this.httpClient.put<LoginResponse>(`${environment.api}/auth/updateUsername`, user);
  }
}
