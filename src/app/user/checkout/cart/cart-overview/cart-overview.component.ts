import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from "../../../../shared/model/CartProduct";
import {Product} from "../../../../shared/model/Product";
import {ConfirmDialogComponent} from "../../../../shared/dialog/confirm-dialog.component";
import {UserInfoService} from "../../../../shared/service/user-info.service";
import {ProductService} from "../../../../shared/service/product.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../shared/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {UserInfo} from "../../../../shared/model/UserInfo";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit{

  cart$= new BehaviorSubject<CartProduct[]>([]);
  userInfo!: UserInfo | undefined;

  constructor(public userInfoService:UserInfoService,
              private productService:ProductService,
              private route:ActivatedRoute,
              private auth: AuthService,
              private dialog: MatDialog){
  }

  ngOnInit() {
    this.userInfoService.userInfo$.subscribe(res=>{
      if(res){
        this.userInfo = res;
        this.cart$.next(this.userInfo?.cart||[]);
      }
    });
  }


  // ngOnChange on cartProduct.qty
  checkStock(cartProduct: CartProduct) {
    console.log("checkStock");
    if (cartProduct.qty <=0){
      cartProduct.qty = 1;
      this.updateCart();
      return;
    }
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
    return this.userInfo?.favorites.some(p => p.id === product.id);
  }

  addToFavorite(product: Product, event: Event) {
    event.stopPropagation();
    this.userInfoService.addToFavorite(this.userInfo?.id, product?.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
        this.userInfoService.userInfo$.next(res.data);
        this.cart$.next(this.userInfo.cart);
      } else {
        console.log(res);
      }
    });
  }

  removeFromFavorite(product: Product, event: Event) {
    event.stopPropagation();
    this.userInfoService.removeFromFavorite(this.userInfo?.id, product?.id).subscribe(res=>{
      if (res.success) {
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
        this.userInfoService.userInfo$.next(res.data);
        this.cart$.next(this.userInfo.cart);
      } else {
        console.log(res);
      }
    });
  }

  delete(cartProduct: CartProduct, event: Event) {
    event.stopPropagation();
    // TODO: open a dialog to confirm deletion
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this product from your cart?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userInfoService.deleteCartProduct(this.userInfo?.id, cartProduct.id).subscribe(res=>{
          if (res.success) {
            this.userInfo = res.data;
            this.userInfoService.userInfo = res.data;
            this.userInfoService.userInfo$.next(res.data);
            this.cart$.next(this.userInfo.cart);
          } else {
            console.log(res);
          }
        });
      }
    });

  }

  updateCart(): void {
    console.log("updateCart")
    this.userInfoService.updateCart(this.userInfo?.id,this.userInfo?.cart).subscribe(res =>{
      if(res.success){
        this.userInfo = res.data;
        this.userInfoService.userInfo = res.data;
        this.userInfoService.userInfo$.next(res.data);
        this.cart$.next(this.userInfo.cart);
        console.log(res.data);
      }else {
        console.log(res);
      }
    });
  }

}
