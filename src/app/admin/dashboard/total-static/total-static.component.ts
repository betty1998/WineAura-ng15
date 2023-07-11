import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";
import {PurchaseService} from "../../../shared/service/purchase.service";
import {UserService} from "../../../shared/service/user.service";
import {Order} from "../../../shared/model/Order";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-total-static',
  templateUrl: './total-static.component.html',
  styleUrls: ['./total-static.component.scss']
})
export class TotalStaticComponent implements OnInit{
  totalOrders$ = new BehaviorSubject(0);
  totalSales$ = new BehaviorSubject(0);
  totalUsers$ = new BehaviorSubject(0);
  orderMonthlyChange$ = new BehaviorSubject(0);
  salesMonthlyChange$ = new BehaviorSubject(0);

  constructor(private orderService: OrderService,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.getTotalOrders();
    this.getTotalUsers();
  }

  getTotalOrders() {
    return this.orderService.getOrders().subscribe(res=>{
      if (res.success) {
        this.totalOrders$.next(res.data.length);
        this.calculateMonthlyChange(res.data);
        let tmp =0;
        res.data.forEach(order=>{
          tmp += order.subTotal;
        });
        this.totalSales$.next(tmp);
      } else {
        console.log(res);
      }
    } );
  }

  calculateMonthlyChange(orders:Order[]) {
    // filter the orders placed in the last two months and make a comparison
    const date = new Date();
    const oneMonthAgo = new Date();
    const twoMonthAgo = new Date();
    oneMonthAgo.setMonth(date.getMonth()-1);
    twoMonthAgo.setMonth(date.getMonth()-2);
    const orderTwoMonthAgo = orders.filter(order=>{
      const purchaseDate = new Date(order.purchaseDate||"0");
      return purchaseDate.getTime()>=twoMonthAgo.getTime()&&
        purchaseDate.getTime()<oneMonthAgo.getTime();
    } );
    const orderOneMonthAgo = orders.filter(order=>{
      const purchaseDate = new Date(order.purchaseDate||"0");
      return purchaseDate.getTime()>=oneMonthAgo.getTime();
    } );
    // calculate orders monthly change rate
    if (orderTwoMonthAgo.length===0) {
      this.orderMonthlyChange$.next(1);
    } else {
      this.orderMonthlyChange$.next((orderOneMonthAgo.length-orderTwoMonthAgo.length)/orderTwoMonthAgo.length);
    }
   // calculate sales monthly change rate
    const salesOneMonthAgo = orderOneMonthAgo.reduce((acc,order)=>acc+order.subTotal,0);
    const salesTwoMonthAgo = orderTwoMonthAgo.reduce((acc,order)=>acc+order.subTotal,0);
    if (salesTwoMonthAgo === 0) {
      this.salesMonthlyChange$.next(1);
    } else {
      this.salesMonthlyChange$.next((salesOneMonthAgo-salesTwoMonthAgo)/salesTwoMonthAgo);
    }

    console.log("test:",orderOneMonthAgo,orderTwoMonthAgo,salesOneMonthAgo,salesTwoMonthAgo);
  }
  getTotalUsers() {
    this.userService.getUsers().subscribe(res=>{
      if (res.success) {
        // filter user with role of customer
        this.totalUsers$.next( res.data.filter(user=>
                        user.role.type==='Customer').length);
      } else {
        console.log(res);
        alert(res.message);
      }
    } );
  }



  // get recent two month orders

}
