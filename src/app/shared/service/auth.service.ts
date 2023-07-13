import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {User} from "../model/User";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
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
  user$= new BehaviorSubject<User|null>(null);
  admin: User|null = null;
  admin$=new BehaviorSubject<User|null>(null);
  adminInfo$: any;

  constructor(private httpClient:HttpClient,
              private router: Router,
              private userInfoService:UserInfoService) {
    // everytime refresh the page will call checklogin()
    console.log("user:", this.user);
    console.log("admin:", this.admin);
    !this.user && this.checkLogin("user").subscribe(res => {
      if(res.success){
        this.user = res.data;
        this.user$.next(res.data);
        console.log("user checklogin response: ", res);
        this.userInfoService.updateUserInfo(res.data.id);
      }else {
        console.log(res);
        // alert(res.message);
      }
    });
    !this.admin && this.adminCheckLogin("admin").subscribe(res => {
      if(res.success){
        this.admin = res.data;
        this.admin$.next(res.data);
        console.log("admin checklogin response: ", res);
        this.userInfoService.updateUserInfo(res.data.id,"admin");
      }else {
        console.log(res);
        // alert(res.message);
      }
    } );
  }

// ,{ headers: new HttpHeaders({ 'module': module }) }
  login(user: User, module:string = "user"):Observable<LoginResponse> {
    console.log("login user: ", user);
    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/login`,user,
      { headers: new HttpHeaders({ 'module': module }) });
  }
  adminLogin(user: User, module:string = "user"):Observable<LoginResponse> {
    console.log("login admin: ", user);
    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/admin/login`,user,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  register(user: any, module:string = "user"):Observable<DataResponse<User>> {
    return this.httpClient.post<DataResponse<User>>(`${environment.api}/auth/register`,user);
  }

  adminRegister(user: User, module:string = "user") {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/admin/register`, user,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  checkLogin(module:string = "user"):Observable<DataResponse<User>> {
    return this.httpClient.get<DataResponse<User>>(`${environment.api}/auth/checklogin`,
      { headers: new HttpHeaders({ 'module': module }) });
  }
  adminCheckLogin(module:string = "user"):Observable<DataResponse<User>> {
    return this.httpClient.get<DataResponse<User>>(`${environment.api}/auth/admin/checklogin`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  logout() {
    localStorage.removeItem("customerToken");
    this.user = null;
    this.user$.next(null);
    this.userInfoService.userInfo = undefined;
    this.userInfoService.userInfo$.next(undefined);
  }

  adminLogout() {
    localStorage.removeItem("adminToken");
    this.admin = null;
    this.admin$.next(null);
    this.userInfoService.adminInfo = undefined;
    this.userInfoService.adminInfo$.next(undefined);
  }

  updatePassword(user:User, module:string = "user"):Observable<DataResponse<User>>  {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/updatePassword`, user,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  updateUsername(user: User, module:string = "user") {
    return this.httpClient.put<LoginResponse>(`${environment.api}/auth/updateUsername`, user,
      { headers: new HttpHeaders({ 'module': module }) });
  }





}
