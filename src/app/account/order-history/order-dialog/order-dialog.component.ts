import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../shared/model/Order";
import {OrderService} from "../../../shared/service/order.service";

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
}
