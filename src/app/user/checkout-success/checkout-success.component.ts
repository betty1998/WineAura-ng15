import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../shared/model/Order";
import {OrderService} from "../../shared/service/order.service";
import {BehaviorSubject, switchMap} from "rxjs";
import {UserInfoService} from "../../shared/service/user-info.service";

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit{
  order$ = new BehaviorSubject<Order | null>(null);
  id!: number;

  constructor(private orderService:OrderService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params =>{
      this.id = Number(params.get("orderId"));
      return this.orderService.getOrder(this.id);
    })).subscribe(res=>{
      if (res.success) {
        this.order$.next(res.data);
      } else {
        console.log(res);
      }
    })

  }



}
