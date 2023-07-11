import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  constructor(private httpClient:HttpClient,
              private router: Router,
              private userInfoService:UserInfoService) {
    // everytime refresh the page will call checklogin()
    console.log("user:", this.user);
    console.log("admin:", this.admin);
    !this.user && this.checkLogin().subscribe(res => {
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
    !this.admin && this.adminCheckLogin().subscribe(res => {
      if(res.success){
        this.admin = res.data;
        this.admin$.next(res.data);
        console.log("admin checklogin response: ", res);
        this.userInfoService.updateUserInfo(res.data.id);
      }else {
        console.log(res);
        // alert(res.message);
      }
    } );


    // !this.user && !this.admin && this.checkLogin().pipe(
    //   switchMap(res => {
    //     if(res.success){
    //       if (res.data.role.type === "Admin") {
    //         this.user = res.data;
    //         this.user$.next(res.data);
    //         console.log("admin checklogin response: ", res);
    //         return this.userInfoService.getAdminUserInfo(res.data.id);
    //       } else {
    //         this.admin = res.data;
    //         this.admin$.next(res.data);
    //         console.log("customer checklogin response: ", res);
    //         return this.userInfoService.getUserInfo(res.data.id);
    //       }
    //
    //       // If checkLogin is successful, getUserInfo will be called
    //     } else {
    //       console.log(res);
    //       // If checkLogin is not successful, an empty observable is returned
    //       return of(null);
    //     }
    //   })
    // ).subscribe(res => {
    //   if (res && res.success){
    //     console.log("user info: ", res.data);
    //     this.userInfoService.userInfo = res.data;
    //     this.userInfoService.userInfo$.next(res.data);
    //   }
    // });

  }

  login(user: User):Observable<LoginResponse> {
    console.log("login user: ", user);
    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/login`,user);
  }
  adminLogin(user: User):Observable<LoginResponse> {
    console.log("login admin: ", user);
    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/admin/login`,user);
  }

  register(user: any):Observable<DataResponse<User>> {
    return this.httpClient.post<DataResponse<User>>(`${environment.api}/auth/register`,user);
  }

  checkLogin():Observable<DataResponse<User>> {
    return this.httpClient.get<DataResponse<User>>(`${environment.api}/auth/checklogin`);
  }
  adminCheckLogin():Observable<DataResponse<User>> {
    return this.httpClient.get<DataResponse<User>>(`${environment.api}/auth/admin/checklogin`);
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
    this.user$.next(null);
    this.userInfoService.userInfo = undefined;
    this.userInfoService.userInfo$.next(undefined);
  }

  updatePassword(user:User):Observable<DataResponse<User>>  {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/updatePassword`, user);
  }

  updateUsername(user: User) {
    return this.httpClient.put<LoginResponse>(`${environment.api}/auth/updateUsername`, user);
  }

  updateUser(id:number|undefined,status:string){
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/${id}/updateStatus/${status}`, null);
  }

  updateRole(id: number, role: string) {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/${id}/updateRole/${role}`, null);

  }

  deleteUser(userId: number) {
    return this.httpClient.delete<DataResponse<User>>(`${environment.api}/auth/${userId}`);
  }


  adminRegister(user: User) {
    return this.httpClient.put<DataResponse<User>>(`${environment.api}/auth/adminRegister`, user);
  }
}
