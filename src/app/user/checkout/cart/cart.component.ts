import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CartProduct} from "../../../shared/model/CartProduct";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";

import {ActivatedRoute,Router} from "@angular/router";
import {ProductService} from "../../../shared/service/product.service";

import {BehaviorSubject, switchMap} from "rxjs";
import {Product} from "../../../shared/model/Product";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {AuthService} from "../../../shared/service/auth.service";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnChanges{
  userInfo!: UserInfo;
  userId: number | null | undefined;
  cart$ = new BehaviorSubject<CartProduct[]>([]);

  constructor(public userInfoService:UserInfoService,
              private productService:ProductService,
              private route:ActivatedRoute,
              private auth: AuthService,
              private dialog: MatDialog){
  }
  ngOnChanges() {
  }

  ngOnInit(): void {
    this.userInfoService.userInfo$.subscribe(res=>{
      if(res){
        this.userInfo = res;
        this.cart$.next(this.userInfo?.cart||[]);
      }
    })
    this.route.paramMap.pipe(switchMap(params =>{
      this.userId = Number(params.get("id"));
      return this.userInfoService.getUserInfo(this.userId);
    } )).subscribe(res =>{
      if (res.success) {
        this.userInfoService.userInfo = res.data;
        this.userInfoService.userInfo$.next(res.data);
        this.cart$.next(this.userInfo.cart);
      }else {
        console.log(res);
      }
    });
  }

  checkout() {

  }


}
