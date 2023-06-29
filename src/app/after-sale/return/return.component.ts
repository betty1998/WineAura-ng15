import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../shared/service/order.service";
import {Order} from "../../shared/model/Order";
import {Purchase} from "../../shared/model/Purchase";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  order!: Order;
  orderId!: number;
  returnForm!: FormGroup;

  returnReasons = [
    'Incorrect item sent',
    'Item arrived damaged',
    'Not satisfied with the product',
    'Other'
  ];

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.orderId = Number(params.get("orderId"));
      return this.orderService.getOrder(this.orderId);
    })).subscribe(res => {
      if (res.success) {
        this.order = res.data;
      } else {
        console.log(res);
        alert(res.message);
      }
    });
    this.returnForm = this.formBuilder.group({
      purchaseId: ['', Validators.required],
      return: false,
      reason: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.returnForm.valid) {
      console.log(this.returnForm.value);
    }
  }
}




