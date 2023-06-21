import { Injectable } from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {CartProduct} from "../model/CartProduct";
import {Observable} from "rxjs";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfo!:UserInfo;
  cart: CartProduct[]|undefined;


  constructor(private httpClient:HttpClient) {

  }


  public getUserInfo(userId: number):Observable<DataResponse<UserInfo>> {
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
    return this.httpClient.delete<DataResponse<UserInfo>>(
      `${environment.api}/userinfos/deleteCartProduct/${userInfoId}/${cartProductId}`);
  }
}
