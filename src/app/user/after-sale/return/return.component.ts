import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../shared/service/order.service";
import {Order} from "../../../shared/model/Order";
import {Purchase} from "../../../shared/model/Purchase";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {PurchaseService} from "../../../shared/service/purchase.service";
import {AuthService} from "../../../shared/service/auth.service";
import {Return} from "../../../shared/model/Return";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../../../shared/dialog/info-dialog.component";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  order!: Order;
  orderId!: number;
  returnForm!: FormGroup;
  returnList: Return[]=[];

  constructor(private orderService: OrderService,
              public ps:PurchaseService,
              private fb: FormBuilder,
              private route:ActivatedRoute,
              private auth:AuthService,
              private location:Location,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.returnForm = this.fb.group({
      order: this.orderId,
      returnArray: this.fb.array([])
    });
    this.route.paramMap.pipe(switchMap(params => {
      this.orderId = Number(params.get("orderId"));
      return this.orderService.getOrder(this.orderId);
    })).subscribe(res => {
      if (res.success) {
        this.order = res.data;
        this.order.purchases.forEach(p => this.returnArray.push(this.newReturn(p)));
      } else {
        console.log(res);
        alert(res.message);
      }
    });

  }

  get returnArray(): FormArray {
    return this.returnForm.get('returnArray') as FormArray;
  }

  newReturn(purchase:Purchase): FormGroup {
    let returnGroup =  this.fb.group({
      purchase:purchase,
      return: [false],
      reason: [''],
      comment: ['']
    });
    returnGroup.get('return')?.valueChanges.subscribe(returnValue => {
      if (returnValue) {
        returnGroup.get('reason')?.setValidators(Validators.required);
      } else {
        returnGroup.get('reason')?.clearValidators();
      }
      returnGroup.get('reason')?.updateValueAndValidity();
    });
    return returnGroup;
  }

//TODO
//at least one checkbox is selected
  onSubmit(): void {
    let form = this.returnForm.get("returnArray")?.value;
    form = form.filter((re: { reason: any; })=>re.reason);
    form.forEach((val: { purchase: any; reason: any; comment: any; })=>this.returnList.push({purchase:val.purchase, reason:val.reason, comment: val.comment}))
    console.log(this.returnList);
    if (this.returnList.length === 0) {
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: "Error",
          content: "Please select at least one item to return."
        }
      });
      return;
    }
    this.orderService.returnItems(this.orderId, this.returnList).subscribe(res=>{
      if (res.success) {
        this.order = res.data;
        this.orderService.updateOrder(this.auth.user?.id);
      } else {
        console.log(res);
        alert(res.message);
      }
    });
    this.location.back();
  }

  cancel(event: Event) {
    event.stopPropagation();
    this.location.back();
  }
}




