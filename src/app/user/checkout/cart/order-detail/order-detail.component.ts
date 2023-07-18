import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserInfoService} from "../../../../shared/service/user-info.service";
import {UserInfo} from "../../../../shared/model/UserInfo";
import {Order} from "../../../../shared/model/Order";
import {AuthService} from "../../../../shared/service/auth.service";
import {Purchase} from "../../../../shared/model/Purchase";
import {OrderService} from "../../../../shared/service/order.service";
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
  userInfo!: UserInfo|undefined;
  order!:Order

  constructor(private fb:FormBuilder,
              private userInfoService: UserInfoService,
              private auth:AuthService,
              private orderService:OrderService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.buildForm();
    this.userInfoService.userInfo$.subscribe(res=>{
      this.userInfo = res;
      this.fillForm(this.userInfo);
    });
    console.log(this.userInfo);
  }

  buildForm(){
    this.checkoutForm = this.fb.group({
      shippingDetails: this.fb.group({
        shippingAddress: this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['',Validators.required],
          address1: ['', Validators.required],
          address2: '',
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
          zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        }),
        contactInfo: this.fb.group({
          email:['',[Validators.required,Validators.email]],
          phone: ['', [Validators.required,
            // Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]]
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
        }),
      }),
      paymentDetails: this.fb.group({
        paymentMethod: ['', Validators.required],
        paymentCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cardHolderName: ['', Validators.required],
        expirationDate: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
        billingAddress: this.fb.group({
          address1: ['', Validators.required],
          address2: '',
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
          zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
        })
      })
    })
  }

  fillForm(userInfo: UserInfo | undefined){
    this.checkoutForm.patchValue({
      shippingDetails: {
        shippingAddress: {
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          address1: '1234 Main St.',
          address2: '',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          zipcode: '94123'
        },
        contactInfo: {
          email: userInfo?.email,
          phone: userInfo?.phone
        }
      },
      paymentDetails: {
        paymentMethod: 'Credit Card',
        paymentCardNumber: '1111111122222233',
        cardHolderName: 'Beibei Zhang',
        expirationDate: '05/28',
        cvv: '253',
      }
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
    const purchases: Purchase[]|undefined = this.userInfo?.cart.map(cartProduct => {
      return {
        product: cartProduct.product,
        qty: cartProduct.qty,
        status:"Pending"
      };
    });
    // purchase date should be generated in backend
    this.order.purchases = purchases||[];
    this.order.status = "Pending";
    this.order.subTotal = this.orderService.subTotal;
    this.order.itemAmount = purchases?.reduce((acc, purchase) =>
      acc + purchase.qty, 0)||0;
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
        this.orderService.updateOrder(this.auth.user?.id);
        console.log('before navigate', this.order);
        this.router.navigate(['checkout-success', this.order.id]).catch();
      }
    });


  }


  cancel() {
    this.router.navigate(['checkout',this.userInfo?.id,'cart']).catch();
  }
}
