import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {DataResponse} from "../httpResponse/dataResponse";
import {CartProduct} from "../model/CartProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }


  // deleteById(id: number | undefined):Observable<DataResponse<CartProduct>> {
  //   return this.httpClient.delete<DataResponse<CartProduct>>(`${environment.api}/cart-products/${id}`);
  // }
}
