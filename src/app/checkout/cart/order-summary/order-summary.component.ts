import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CartProduct} from "../../../shared/model/CartProduct";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnChanges {
  @Input()
  cart!: CartProduct[];
  subTotal!: number;
  taxRate = 0.08;
  tax!: number;
  shipping = 0.00;
  freeDelivery= 99;
  total!: number;

  @Output()
  checkout: EventEmitter<any> = new EventEmitter<any>();

  constructor(private er:ElementRef) {
  }

  ngOnChanges(): void {
    console.log("ngOnChange: ", this.cart);
    this.subTotal = this.cart.reduce((acc, cp) =>
      acc + cp.qty * cp.product.price, 0);
    this.tax = +(this.subTotal * this.taxRate).toFixed(2);
    if (this.subTotal < this.freeDelivery) {
      this.shipping = 8;
    }
    this.total = +(this.subTotal + this.shipping + this.tax).toFixed(2);
  }

  onCheckout(event: Event) {
    this.er.nativeElement.querySelector("button").style.display = "none";
    this.checkout.emit();
  }


}

