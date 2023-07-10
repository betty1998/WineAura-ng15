import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../../shared/model/Order";
import {OrderService} from "../../../../shared/service/order.service";
import {Purchase} from "../../../../shared/model/Purchase";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  userId!: number;
  order!:Order;
  statusMap!: Map<string, number>;
  constructor(
    public orderService: OrderService,
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.userId = data.userId;
    this.order = data.order;
    this.statusMap = orderService.statusMap;
  }

  close() {
    this.dialogRef.close();
  }

  checkReturn(purchases: Purchase[]) {
    return purchases.some(p=>(this.statusMap.get(p.status) || 0) == 2);
  }

  checkReview(purchase:Purchase) {
    // check if the purchase is delivered and not reviewed
    const orderStatus = this.statusMap.get(this.order.status) || 0;
    return orderStatus >=2 && orderStatus < 4 && purchase.status!=="Reviewed";
  }
}
