import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/Order";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order!:Order;
  orderList!: Order[];
  taxRate = 0.08;
  freeDelivery= 99;

  constructor(private http:HttpClient,
              private auth:AuthService) {
    // if user is not undefined, get orderList data
    if(auth.user){
      this.getOrderByUserId(auth.user?.id).subscribe(res=>{
        if (res.success) {
          this.orderList = res.data;
        } else {
          console.log(res);
        }
      });
    }
  }

  placeOrder(order:Order):Observable<DataResponse<Order>>{
    return this.http.post<DataResponse<Order>>(`${environment.api}/orders`, order);
  }

  getOrder(id: number) {
    return this.http.get<DataResponse<Order>>(`${environment.api}/orders/${id}`);
  }

  getOrderByUserId(userId: number | undefined) {
    return this.http.get<DataResponse<Order[]>>(`${environment.api}/orders/user/${userId}`);
  }
}
