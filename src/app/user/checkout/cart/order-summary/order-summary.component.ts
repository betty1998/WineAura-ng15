import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CartProduct} from "../../../../shared/model/CartProduct";
import {Order} from "../../../../shared/model/Order";
import {OrderService} from "../../../../shared/service/order.service";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnChanges {
  @Input()
  cart!: CartProduct[]|undefined;
  subTotal!: number;
  tax!: number;
  shipping = 0.00;
  total!: number;

  @Output()
  checkout: EventEmitter<any> = new EventEmitter<any>();

  constructor(private er:ElementRef,
              private orderService:OrderService) {
  }

  ngOnChanges(): void {
    console.log("ngOnChange: ", this.cart);
    this.subTotal = (this.cart || []).reduce((acc, cp) =>
      acc + cp.qty * cp.product.price, 0);
    this.tax = +(this.subTotal * this.orderService.taxRate).toFixed(2);
    if (this.subTotal < this.orderService.freeDelivery) {
      this.shipping = 8;
    }else {
      this.shipping = 0;
    }
    this.total = +(this.subTotal + this.shipping + this.tax).toFixed(2);
  }

  onCheckout(event: Event) {
    this.er.nativeElement.querySelector("button").style.display = "none";
    this.checkout.emit();
  }


}

