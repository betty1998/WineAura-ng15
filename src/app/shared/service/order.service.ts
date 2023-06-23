import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/Order";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order!:Order;

  constructor(private http:HttpClient) { }

  placeOrder(order:Order):Observable<DataResponse<Order>>{
    return this.http.post<DataResponse<Order>>(`${environment.api}/orders`, order);
  }

  getOrder(id: number) {
    return this.http.get<DataResponse<Order>>(`${environment.api}/orders/${id}`);
  }

  getOrderByUserId(userId: number) {
    return this.http.get<DataResponse<Order[]>>(`${environment.api}/orders/user/${userId}`);
  }
}
