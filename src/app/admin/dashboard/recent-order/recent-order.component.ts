import {Component, Input} from '@angular/core';
import {Order} from "../../../shared/model/Order";
import {OrderService} from "../../../shared/service/order.service";

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss']
})
export class RecentOrderComponent {
  @Input()
  recentOrders!: Order[]|null;
  recentOrdersColumns=["id","customer","purchaseDate","status","item","amount"];


}
