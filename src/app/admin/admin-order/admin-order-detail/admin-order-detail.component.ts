import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";
import {Order} from "../../../shared/model/Order";
import {ActivatedRoute} from "@angular/router";
import {UserInfo} from "../../../shared/model/UserInfo";
import {BehaviorSubject, switchMap} from "rxjs";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {MatTableDataSource} from "@angular/material/table";
import {Purchase} from "../../../shared/model/Purchase";
import {DialogRef} from "@angular/cdk/dialog";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TrackingNumberDialogComponent} from "../tracking-number-dialog/tracking-number-dialog.component";
import {OrderStatus} from "../../../shared/model/OrderStatus";

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit{
  title="Order Detail";
  order$ = new BehaviorSubject<Order|null>(null);
  userInfo$ = new BehaviorSubject<UserInfo|null>(null);
  displayedColumns: string[] = ["action","product","price","quantity","subtotal"];
  datasource!: MatTableDataSource<Purchase>;
  constructor(public orderService:OrderService,
              private infoService:UserInfoService,
              private route:ActivatedRoute,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.orderService.getOrder(id,"admin").pipe(switchMap(res=>{
      if (res.success) {
        this.order$.next(this.calculateTotal(res.data));
        res.data.purchases.forEach(purchase=>purchase['isEdit']=false);
        this.datasource = new MatTableDataSource<Purchase>(res.data.purchases);
        return this.infoService.getUserInfo(res.data.userId);
      } else {
        alert(res.message);
        throw new Error(res.message);
      }
    })).subscribe(res=>{
      if (res.success) {
        this.userInfo$.next(res.data);
      } else {
        alert(res.message);
      }
    });
  }

  ship(order: Order | null) {
    // open dialog to add tracking number
    const dialogRef = this.dialog.open(TrackingNumberDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result && order) {
        order.trackingNumber = result;
        order.status = OrderStatus.SHIPPED;
        this.orderService.updateStatus(order.id, order,"admin").subscribe(res => {
          if (res.success) {
            this.order$.next(this.calculateTotal(res.data));
          } else {
            console.log(res);
            alert(res.message);
          }
        });
      }
    });
  }

  updateStatus(order: Order|null, status: string) {
    // convert string to OrderStatus
    if(!order) return;
    order.status = status as OrderStatus;
    if(status === OrderStatus.PENDING) {
      order.trackingNumber = undefined;
    }
    if(status === OrderStatus.REFUNDED) {
      order.purchases.forEach(purchase => {
        if (purchase.status === OrderStatus.RETURNED) {
          purchase.status = OrderStatus.REFUNDED;
        }
      });
    }
    console.log(order);
    this.orderService.updateStatus(order.id, order,"admin").subscribe(res => {
      if (res.success) {
        this.order$.next(this.calculateTotal(res.data));
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }


  calculateTotal(order:Order) {
    const subTotal = order.subTotal;
    order.shipping = subTotal>this.orderService.freeDelivery? 0:8;
    order.tax = subTotal*this.orderService.taxRate;
    order.total = subTotal+order.shipping+order.tax;
    return order;
  }


  edit(purchase: Purchase) {
    purchase.isEdit = true;
  }


  save(orderId: number | undefined, purchase:Purchase) {
    console.log(purchase);
    purchase.isEdit = false;
    // calculate subtotal and itemAmount

    this.orderService.updatePurchase(orderId, purchase.id, purchase,"admin").subscribe(res => {
      if (res.success) {
        this.order$.next(this.calculateTotal(res.data));
        res.data.purchases.forEach(purchase => purchase['isEdit'] = false);
        this.datasource = new MatTableDataSource<Purchase>(res.data.purchases);
      } else {
        alert(res.message);
      }
    });

  }

  delete(orderId: number | undefined, purchase: Purchase) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this order?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deletePurchase(orderId, purchase.id, purchase,"admin").subscribe(res => {
          if (res.success) {
            this.order$.next(this.calculateTotal(res.data));
            res.data.purchases.forEach(purchase => purchase['isEdit'] = false);
            this.datasource = new MatTableDataSource<Purchase>(res.data.purchases);
          } else {
            alert(res.message);
          }
        });
      }
    });
  }

}
