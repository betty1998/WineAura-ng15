import { Injectable } from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {CartProduct} from "../model/CartProduct";
import {BehaviorSubject, Observable} from "rxjs";
import {Data} from "@angular/router";
import {Product} from "../model/Product";
import {AddressBook} from "../model/AddressBook";
import {OrderService} from "./order.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfo$ = new BehaviorSubject<UserInfo|undefined>(undefined);
  userInfo!:UserInfo|undefined;
  adminInfo$ = new BehaviorSubject<UserInfo|undefined>(undefined);
  adminInfo!:UserInfo|undefined;
  cart: CartProduct[]|undefined;

  constructor(private httpClient:HttpClient) {
  }

  public updateUserInfo(userId: number | undefined, module:string="user"){
    this.getUserInfo(userId,module).subscribe(res=>{
      if (res.success) {
        if (res.data.user.role.type == "Customer") {
          this.userInfo = res.data;
          this.userInfo$.next(res.data);
        }else {
          this.adminInfo = res.data;
          this.adminInfo$.next(res.data);
        }
      } else {
        console.log(res);
      }
    })
  }

  public getUserInfo(userId: number|undefined, module:string="user"):Observable<DataResponse<UserInfo>> {
    return this.httpClient.get<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/${userId}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }
  public getAdminUserInfo(adminId: number | undefined, module:string="user") {
    return this.httpClient.get<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/${adminId}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  public getUserInfoById(id:number, module:string="user"):Observable<DataResponse<UserInfo>> {
    return this.httpClient.get<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/${id}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  public getCart(userInfoId:number, module:string="user"):Observable<DataResponse<CartProduct[]>>{
    return this.httpClient.get<DataResponse<CartProduct[]>>(
      `${environment.api}/userinfos/cart/${userInfoId}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  public addToCart(userInfoId:number|undefined,cartProduct:CartProduct, module:string="user"):Observable<DataResponse<UserInfo>>{
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addToCart/${userInfoId}`,cartProduct,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  public updateCart(userInfoId:number, cart:CartProduct[], module:string="user"):Observable<DataResponse<UserInfo>>{
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/updateCart/${userInfoId}`,cart,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  deleteCartProduct(userInfoId: number, cartProductId: number | undefined, module:string="user"):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/deleteCartProduct/${userInfoId}/cartProduct/${cartProductId}`,null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addToFavorite(userInfoId: number | undefined, productId: number | undefined, module: string = "user"):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addToFavorite/${userInfoId}/product/${productId}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  removeFromFavorite(userInfoId: number | undefined, productId: number | undefined, module: string = "user"):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/removeFromFavorite/${userInfoId}/product/${productId}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addAddress(userInfoId: number, address: AddressBook, module:string="user"):Observable<DataResponse<UserInfo>>  {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addAddress/${userInfoId}`, address,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  editAddress(userInfoId: number, address: AddressBook, module:string="user") {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/editAddress/${userInfoId}`, address,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  deleteAddress(userInfoId: number, address:AddressBook, module:string="user") {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/deleteAddress/${userInfoId}`, address,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  updateProfile(userInfoId: number, userInfo: UserInfo, module:string="user") {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/updateProfile/${userInfoId}`, userInfo,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  createProfile(userId: number | undefined, userInfo: UserInfo, module:string="user") {
    return this.httpClient.post<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/createProfile/${userId}`, userInfo,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getUserInfos(module:string="user") {
    return this.httpClient.get<DataResponse<UserInfo[]>>(
      `${environment.api}/userinfos`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getAdmins(module:string="user") {
    return this.httpClient.get<DataResponse<UserInfo[]>>(
      `${environment.api}/userinfos/admins`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getCustomers(module:string="user") {
    return this.httpClient.get<DataResponse<UserInfo[]>>(
      `${environment.api}/userinfos/customers`,
      { headers: new HttpHeaders({ 'module': module }) });
  }


  updateAdminProfile(userId:number|undefined, userInfo: UserInfo, module:string="user") {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/updateAdminProfile/${userId}`, userInfo,
      { headers: new HttpHeaders({ 'module': module }) });
  }
}
