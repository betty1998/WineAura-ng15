import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";
import {Order} from "../../../shared/model/Order";
import {AuthService} from "../../../shared/service/auth.service";
import {Purchase} from "../../../shared/model/Purchase";
import {OrderService} from "../../../shared/service/order.service";
import {Router} from "@angular/router";
import {mergeMap, throwError} from "rxjs";

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
              private auth:AuthService,
              private orderService:OrderService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.userInfo = this.userInfoService.userInfo;
    console.log(this.userInfo);
    this.buildForm();
  }

  buildForm(){
    this.checkoutForm = this.fb.group({
      shippingDetails: this.fb.group({
        shippingAddress: this.fb.group({
          firstName: [this.userInfo.firstName, Validators.required],
          lastName: [this.userInfo.lastName, Validators.required],
          address1: ['', Validators.required],
          address2: '',
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
          zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        }),
        contactInfo: this.fb.group({
          email:[this.userInfo.email,[Validators.required,Validators.email]],
          phone: [this.userInfo.phone, [Validators.required,
            // Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]]
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
        }),
      }),
      paymentDetails: this.fb.group({
        paymentMethod: ['', Validators.required],
        paymentCardNumber: ['1111111122222233', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cardHolderName: ['Beibei', Validators.required],
        expirationDate: ['05/28', Validators.required],
        cvv: ['253', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
        billingAddress: this.fb.group({
          address1: ['', Validators.required],
          address2: '',
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
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

  copyShippingAddress(event: MatCheckboxChange) {
    if (event.checked) {
      const shippingAddress = this.checkoutForm.get('shippingDetails.shippingAddress')?.value;
      this.checkoutForm.get('paymentDetails.billingAddress.address1')?.setValue(shippingAddress.address1);
      this.checkoutForm.get('paymentDetails.billingAddress.address2')?.setValue(shippingAddress.address2);
      this.checkoutForm.get('paymentDetails.billingAddress.city')?.setValue(shippingAddress.city);
      this.checkoutForm.get('paymentDetails.billingAddress.state')?.setValue(shippingAddress.state);
      this.checkoutForm.get('paymentDetails.billingAddress.country')?.setValue(shippingAddress.country);
      this.checkoutForm.get('paymentDetails.billingAddress.zipcode')?.setValue(shippingAddress.zipcode);

    }
  }

  placeOrder(event: Event) {
    this.order = {...this.checkoutForm.get('shippingDetails.contactInfo')?.value,
                  ...this.checkoutForm.get('shippingDetails.shippingAddress')?.value}
    this.order.userId = this.auth.user?.id;
    this.order.paymentMethod = this.checkoutForm.get('paymentDetails.paymentMethod')?.value;
    this.order.paymentCardNumber = this.checkoutForm.get('paymentDetails.paymentCardNumber')?.value;
    const purchases: Purchase[] = this.userInfo.cart.map(cartProduct => {
      return {
        product: cartProduct.product,
        qty: cartProduct.qty,
        status:"Pending"
      };
    });
    // purchase date should be generated in backend
    this.order.purchases = purchases;
    this.order.status = "Pending";
    const store = {id:1,manager:{id:1}}
    this.order.store = store;
    console.log(this.order);
    this.orderService.placeOrder(this.order).pipe(
      mergeMap((res) => {
        console.log('place order...');
        if (res.success) {
          this.order = res.data;
          this.orderService.order = res.data;
          console.log(res);
          return this.userInfoService.getUserInfo(this.auth.user?.id);
        } else {
          console.log(res);
          return throwError('Failed to place order');
        }
      })
    ).subscribe((res) => {
      if (res.success) {
        this.userInfoService.userInfo = res.data;
        console.log('before navigate', this.order);
        this.router.navigate(['checkout-success', this.order.id]).catch();
      }
    });


  }


}
