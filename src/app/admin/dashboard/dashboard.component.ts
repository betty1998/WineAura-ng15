import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/model/Order";
import {OrderService} from "../../shared/service/order.service";
import {BehaviorSubject} from "rxjs";
import {PurchaseService} from "../../shared/service/purchase.service";
import {ProductSold} from "../../shared/model/ProductSold";
import {MatTable} from "@angular/material/table";
import {Count} from "../../shared/model/Count";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit{
  orderMap$ = new BehaviorSubject<{[key:string]:Order[]}>({});
  orderMap!: { [key: string]: Order[]; };
  topSelling$ = new BehaviorSubject<ProductSold[]>([]);
  recentOrders$ = new BehaviorSubject<Order[]>([]);
  recentOrderNum: number = 8;
  categoryMap$ = new BehaviorSubject<Count|null>(null);

  constructor(private orderService:OrderService,
              private purchaseService:PurchaseService){
  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    this.getOrderByPeriod("week");
    this.getTopSelling();
    this.orderService.getRecentOrders(this.recentOrderNum,"admin").subscribe(res=>{
      if (res.success) {
        this.recentOrders$.next(res.data);
      } else {
        console.log(res);
        alert(res.message);
      }
    });
    this.getCategoryMap();
  }

  getOrderByPeriod(period: string) {
    this.orderService.getOrderByPeriod(period,"admin").subscribe(res=>{
      if (res.success) {
        this.orderMap$.next(res.data);
        this.orderMap = res.data;
        console.log("orderMap", this.orderMap);
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  getTopSelling() {
    this.purchaseService.getTopSellings("admin").subscribe(res=>{
      if (res.success) {
        this.topSelling$.next(res.data);
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  getCategoryMap() {
    this.purchaseService.getCategoryMap("admin").subscribe(res=>{
      if (res.success) {
        this.categoryMap$.next(res.data);
      } else {
        console.log(res);
        alert(res.message);
      }
    })
  }


}
