import { Injectable } from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {CartProduct} from "../model/CartProduct";
import {Observable} from "rxjs";
import {Data} from "@angular/router";
import {Product} from "../model/Product";
import {AddressBook} from "../model/AddressBook";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfo!:UserInfo;
  cart: CartProduct[]|undefined;

  constructor(private httpClient:HttpClient) {
  }

  public getUserInfo(userId: number|undefined):Observable<DataResponse<UserInfo>> {
    return this.httpClient.get<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/${userId}`);
  }

  public getCart(userInfoId:number):Observable<DataResponse<CartProduct[]>>{
    return this.httpClient.get<DataResponse<CartProduct[]>>(
      `${environment.api}/userinfos/cart/${userInfoId}`);
  }

  public addToCart(userInfoId:number,cartProduct:CartProduct):Observable<DataResponse<UserInfo>>{
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addToCart/${userInfoId}`,cartProduct);
  }

  public updateCart(userInfoId:number, cart:CartProduct[]):Observable<DataResponse<UserInfo>>{
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/updateCart/${userInfoId}`,cart);
  }

  deleteCartProduct(userInfoId: number, cartProductId: number | undefined):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/deleteCartProduct/${userInfoId}/cartProduct/${cartProductId}`,null);
  }

  addToFavorite(userInfoId: number, productId: number):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addToFavorite/${userInfoId}/product/${productId}`, null);
  }

  removeFromFavorite(userInfoId: number, productId: number):Observable<DataResponse<UserInfo>> {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/removeFromFavorite/${userInfoId}/product/${productId}`, null);
  }

  addAddress(userInfoId: number, address: AddressBook):Observable<DataResponse<UserInfo>>  {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/addAddress/${userInfoId}`, address);
  }

  editAddress(userInfoId: number, address: AddressBook) {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/editAddress/${userInfoId}`, address);
  }

  deleteAddress(userInfoId: number, address:AddressBook) {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/deleteAddress/${userInfoId}`, address);
  }

  updateProfile(userInfoId: number, userInfo: UserInfo) {
    return this.httpClient.put<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/updateProfile/${userInfoId}`, userInfo);
  }

  /*TODO: post method not found*/
  createProfile(userId: number | undefined, userInfo: UserInfo) {
    return this.httpClient.post<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/createProfile/${userId}`, userInfo);
  }
}
