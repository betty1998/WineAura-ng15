import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";
import {Order} from "../../../shared/model/Order";
import {AuthService} from "../../../shared/service/auth.service";
import {Purchase} from "../../../shared/model/Purchase";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  checkoutForm!: FormGroup;
  step = 0;
  userInfo!: UserInfo;
  order!:Order

  constructor(private fb:FormBuilder,
              private userInfoService: UserInfoService,
              private auth:AuthService) {
  }
  ngOnInit(): void {
    this.userInfo = this.userInfoService.userInfo;
    console.log(this.userInfo);
    this.buildForm();
  }

  buildForm(){
    this.checkoutForm = this.fb.group({
      shippingDetails: this.fb.group({
        userInfo: this.fb.group({
          firstName: [this.userInfo.firstName, Validators.required],
          lastName: [this.userInfo.lastName, Validators.required],
          email:[this.userInfo.email,[Validators.required,Validators.email]],
          phone: [this.userInfo.phone, [Validators.required,
            // Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]]
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
        }),
        shippingAddress: this.fb.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        })
      }),
      paymentDetails: this.fb.group({
        paymentMethod: ['', Validators.required],
        paymentCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cardHolderName: ['', Validators.required],
        expirationDate: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
        billingAddress: this.fb.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
        })
      }),
      orderReview: this.fb.group({
        // Insert the form controls for the order review here
      })
    })
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  // TODO: split shippingDetails form group to name, address and info
  copyShippingAddress(event: MatCheckboxChange) {
    if (event.checked) {
      const shippingAddress = this.checkoutForm.get('shippingDetails.shippingAddress')?.value;
      this.checkoutForm.get('paymentDetails.billingAddress')?.setValue(shippingAddress);
    }
  }

  placeOrder(event: Event) {
    this.order = this.checkoutForm.get('shippingDetails.shippingAddress')?.value;
    this.order.userId = this.auth.user?.id;
    this.order.paymentMethod = this.checkoutForm.get('paymentDetails.paymentMethod')?.value;
    this.order.paymentCardNumber = this.checkoutForm.get('paymentDetails.paymentCardNumber')?.value;
    const purchases: Purchase[] = this.userInfo.cart.map(cartProduct => {
      return {
        product: cartProduct.product,
        qty: cartProduct.qty
      };
    });
    // purchase date should be generated in backend
    this.order.purchases = purchases;
    this.order.status = "Pending";
    const store = {name:"store1",manager:{managerCode:"first"}}
    this.order.store = store;
    console.log(this.order)


  }


}
