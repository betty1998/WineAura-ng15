import {Component, HostListener, OnInit} from '@angular/core';
import {CartProduct} from "../shared/model/CartProduct";
import {UserInfoService} from "../shared/service/user-info.service";
import {UserInfo} from "../shared/model/UserInfo";
import {AuthService} from "../shared/service/auth.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {ProductService} from "../shared/service/product.service";
import {Product} from "../shared/model/Product";
import {CartService} from "../shared/service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  userInfo!: UserInfo;
  userId: number | null | undefined;
  cart!: CartProduct[];

  constructor(public userInfoService:UserInfoService,
              private productService:ProductService,
              private cartService: CartService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params =>{
      this.userId = Number(params.get("id"));
      return this.userInfoService.getUserInfo(this.userId);
    } )).subscribe(res =>{
      if (res.success) {
        this.userInfo = res.data;
        this.cart = this.userInfo.cart;
      }else {
        console.log(res);
      }
    });
  }

  // ngOnChange on cartProduct.qty
  checkStock(cartProduct: CartProduct) {
    this.productService.checkStock(cartProduct.product.id).subscribe(res=>{
      if (res.success) {
        cartProduct.product.stockQty = res.data;
        cartProduct.qty = Math.min(cartProduct.qty, cartProduct.product.stockQty);
        this.updateCart();
      } else {
        console.log(res);
      }
    });
  }

  addOne(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    cartProduct.qty ++;
  }

  minusOne(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    if (cartProduct.qty>1){
      cartProduct.qty --;
    }
  }

  addToFavorite(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();

  }

  delete(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    // TODO: open a dialog to confirm deletion
    this.userInfoService.deleteCartProduct(this.userInfo.id, cartProduct.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.cart = this.userInfo.cart;
        this.userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });

  }

  updateCart(): void {
    this.userInfoService.updateCart(this.userInfo.id,this.cart).subscribe(res =>{
      if(res.success){
        this.userInfo = res.data;
        this.cart = this.userInfo.cart;
        this.userInfoService.userInfo = res.data;
        console.log(res.data);
      }else {
        console.log(res);
      }
    });
    console.log('Leaving the page...');
  }




}
