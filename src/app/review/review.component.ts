import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/model/Product";
import {ProductService} from "../shared/service/product.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, switchMap} from "rxjs";
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../shared/model/Review";
import {ReviewService} from "../shared/service/review.service";
import {Location} from "@angular/common";
import {PurchaseService} from "../shared/service/purchase.service";
import {UserInfoService} from "../shared/service/user-info.service";
import {OrderService} from "../shared/service/order.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  productId!: number;
  product = new BehaviorSubject<Product | null>(null);
  user: User|null = null;
  reviewForm!: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  review!: Review;
  purchaseId!: number;

  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private auth:AuthService,
              private fb:FormBuilder,
              private reviewService:ReviewService,
              private purchaseService:PurchaseService,
              private orderService:OrderService,
              private location:Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params =>{
      this.productId = Number(params.get("productId"));
      this.purchaseId = Number(params.get("purchaseId"));
      return this.productService.getProduct(this.productId);
    })).subscribe(res =>{
      if (res.success) {
        this.product.next(res.data);
      } else {
        console.log(res);
      }
    });
    this.reviewForm = this.fb.group({
      nickname: ['', Validators.required],
      title: ['', Validators.required],
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });
    this.auth.user$.subscribe(value => {
      if (value) {
        this.user = value;
        console.log(this.user);
        this.reviewForm.get("nickname")?.setValue(this.user.username);
      }
    });

  }

  OnReview() {
    this.review = this.reviewForm.value;
    this.review.user = this.user;
    console.log(this.review);
    this.reviewService.addReview(this.review, this.product.value?.id).subscribe(res=>{
      if (res.success) {
        console.log(res);
      } else {
        console.log(res);
        alert(res.message);
      }
    });
    this.purchaseService.updatePurchaseStatus(this.purchaseId,"Reviewed").subscribe(res=>{
      if (res.success) {
        console.log(res);
        this.orderService.updateOrder(this.user?.id);
        this.location.back();
      } else {
        alert(res.message);
      }
    })

  }
}
