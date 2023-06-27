import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OrderDialogComponent} from "./order-dialog/order-dialog.component";
import {OrderService} from "../../shared/service/order.service";
import {AuthService} from "../../shared/service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Order} from "../../shared/model/Order";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit{
  id:number|undefined;
  orderList!: Order[];
  selectedMonth = "3";
  selectedSort=  "Most Recent";

  constructor(private dialog: MatDialog,
              public orderService:OrderService,
              private auth:AuthService,
              private route:ActivatedRoute) {
    console.log("id:",this.route.parent?.snapshot.paramMap.get('id'))
    // if orderList in orderService is undefined
    // then send request to get orderList
    if(!orderService.orderList){
      route.parent?.paramMap.pipe(switchMap(params=>{
        this.id = Number(params.get("id"));
        // console.log(params);
        return orderService.getOrderByUserId(this.id);
      })).subscribe(res=>{
        if (res.success) {
          this.orderList = res.data;
          this.orderList.forEach(order => this.calculate(order));
          console.log(res);
        } else {
          console.log(res);
        }
      })
    }
  }

  ngOnInit(): void {



  }

  openOrder(order: Order) {
    this.dialog.open(OrderDialogComponent, {
      data:order,
    });
  }

  calculateSubTotal(order:Order) {
    order.subTotal = order.purchases.reduce((acc, purchase) =>
                acc + purchase.qty * purchase.product.price, 0);
    return order.subTotal
  }

  calculate(order: Order) {
    order.itemAmount = order.purchases.reduce((acc, purchase) =>
      acc + purchase.qty, 0);
    order.subTotal = order.purchases.reduce((acc, purchase) =>
      acc + purchase.qty * purchase.product.price, 0);
    order.tax = +(order.subTotal * this.orderService.taxRate).toFixed(2);
    if (order.subTotal < this.orderService.freeDelivery) {
      order.shipping = 8;
    }else {
      order.shipping = 0;
    }
    order.total = +(order.subTotal + order.shipping + order.tax).toFixed(2);
  }


}
