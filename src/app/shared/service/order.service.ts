import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/Order";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Purchase} from "../model/Purchase";
import {Return} from "../model/Return";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order!:Order;
  orderList!: Order[];
  taxRate = 0.08;
  freeDelivery= 99;
  statusMap: Map<string, number> = new Map([
    ["Pending",0],["Shipped",1],["Delivered",2],["Returned",3],["Refunded",4],["Reviewed",5],["Complete",6]]);
  statusColors = {
    Pending: '#f1d245',     // Yellow
    Shipped: '#4CAF50',     // Green
    Delivered: '#03A9F4',   // Blue
    Returned: 'rgba(238,59,44,0.85)',    // Red
    Refunded: 'rgba(175,44,199,0.81)',    // Purple
    Reviewed: 'rgba(234,111,152,0.84)',    // Pink
    Complete: '#6f4d41'     // Brown
  };
  subTotal: number = 0;
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

  public updateOrder(userId: number | undefined){
    this.getOrderByUserId(userId).subscribe(res=>{
      if (res.success) {
        this.orderList = res.data;
      } else {
        console.log(res);
      }
    })
  }

  placeOrder(order:Order):Observable<DataResponse<Order>>{
    return this.http.post<DataResponse<Order>>(`${environment.api}/orders`, order);
  }

  getOrder(id: number) {
    return this.http.get<DataResponse<Order>>(`${environment.api}/orders/${id}`);
  }

  getOrders() {
    return this.http.get<DataResponse<Order[]>>(`${environment.api}/orders`);
  }

  getOrderByUserId(userId: number | undefined) {
    return this.http.get<DataResponse<Order[]>>(`${environment.api}/orders/user/${userId}`);
  }

  returnItems(orderId: number, returnList: Return[]) {
    return this.http.put<DataResponse<Order>>(`${environment.api}/orders/returnItems/${orderId}`, returnList);
  }

  getOrderByPeriod(period: string) {
    return this.http.get<DataResponse<{[key:string]:Order[]}>>(`${environment.api}/orders/period/${period}`);
  }

  getRecentOrders(amount: number) {
    return this.http.get<DataResponse<Order[]>>(`${environment.api}/orders/recent/${amount}`);
  }

  getTotalOrders() {
    return this.http.get<DataResponse<number>>(`${environment.api}/orders/total`);
  }

  deleteOrder(id: number) {
    return this.http.delete<DataResponse<Order>>(`${environment.api}/orders/${id}`);
  }

  deletePurchase(orderId: number | undefined, purchaseId: number | undefined, purchase: Purchase) {
    return this.http.put<DataResponse<Order>>(`${environment.api}/orders/${orderId}/deletePurchase/${purchaseId}`,purchase);
  }

  updateStatus(id: number | undefined, order:Order) {
    return this.http.put<DataResponse<Order>>(`${environment.api}/orders/updateStatus/${id}`,order);
  }
}
