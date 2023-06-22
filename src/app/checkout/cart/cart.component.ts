import {Component, OnInit} from '@angular/core';
import {CartProduct} from "../../shared/model/CartProduct";
import {UserInfoService} from "../../shared/service/user-info.service";
import {UserInfo} from "../../shared/model/UserInfo";

import {ActivatedRoute,Router} from "@angular/router";
import {ProductService} from "../../shared/service/product.service";
import {CartService} from "../../shared/service/cart.service";
import {switchMap} from "rxjs";
import {Product} from "../../shared/model/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  userInfo!: UserInfo;
  userId: number | null | undefined;
  showCart= true;

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
      }else {
        console.log(res);
      }
    });
  }

  // ngOnChange on cartProduct.qty
  checkStock(cartProduct: CartProduct) {
    console.log("checkStock");
    this.productService.checkStock(cartProduct.product.id).subscribe(res=>{
      if (res.success) {
        console.log("onchange: ", res.data);
        cartProduct.product.stockQty = res.data;
        cartProduct.qty = Math.min(cartProduct.qty, cartProduct.product.stockQty);
        this.updateCart();
      } else {
        console.log(res);
      }
    });
  }

  updateCart(): void {
    this.userInfoService.updateCart(this.userInfo.id,this.userInfo.cart).subscribe(res =>{
      if(res.success){
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
        console.log(res.data);
      }else {
        console.log(res);
      }
    });
  }

  addOne(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    cartProduct.qty ++;
    this.checkStock(cartProduct);
  }

  minusOne(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    if (cartProduct.qty>1){
      cartProduct.qty --;
      this.checkStock(cartProduct);
    }
  }

  // check if the product is in the favorite set of userInfo
  ifLike(product:Product) {
    return this.userInfo.favorites.some(p => p.id === product.id);
  }

  addToFavorite(product: Product, event: Event) {
    event.stopPropagation();
    this.userInfoService.addToFavorite(this.userInfo.id, product.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }

  removeFromFavorite(product: Product, event: Event) {
    event.stopPropagation();
    this.userInfoService.removeFromFavorite(this.userInfo.id, product.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }

  delete(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    // TODO: open a dialog to confirm deletion
    this.userInfoService.deleteCartProduct(this.userInfo.id, cartProduct.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }

  placeOrder(event: Event) {

  }
}
