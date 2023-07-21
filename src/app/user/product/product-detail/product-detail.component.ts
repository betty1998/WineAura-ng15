import {Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/model/Product";
import {ProductService} from "../../../shared/service/product.service";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {BehaviorSubject, switchMap} from "rxjs";
import {CartProduct} from "../../../shared/model/CartProduct";
import {AuthService} from "../../../shared/service/auth.service";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  product$ = new BehaviorSubject<Product | undefined>(undefined);
  id: number | null | undefined;
  qty=1;
  showError=false;
  constructor(private productService: ProductService,
              private auth:AuthService,
              private userInfoService:UserInfoService,
              private route:ActivatedRoute,
              private router:Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params=>{
        this.id = Number(params.get("id"));
        return this.productService.getProduct(this.id);
      }))
      .subscribe(res =>{
        if (res.success){
          console.log(res.data);
          this.product = res.data;
          this.product$.next(res.data);
        }else{
          console.log(res);
        }
      })
  }

  checkStock(productId:number|undefined) {
    console.log("checkStock");
    this.productService.checkStock(productId).subscribe(res=>{
      if (res.success) {
        console.log("onchange: ", res.data);
        this.showError = this.qty>res.data?true:false;
        this.qty = Math.min(this.qty, res.data);
      } else {
        console.log(res);
      }
    });
  }


  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    if (this.auth.user){
      const cartProduct:CartProduct = {
        product: product,
        qty: this.qty,
        userInfo:this.userInfoService.userInfo};
      this.userInfoService.addToCart(this.userInfoService.userInfo?.id,cartProduct).subscribe(res =>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
        } else {
          console.log(res);
        }
      });
    }else{
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        data:{
          title:"Please login first",
          message:"You need to login to add to cart. Do you want to login now?"
        }
      });
      dialogRef.afterClosed().subscribe(res =>{
        if (res) {
          this.router.navigate(["/login"]).catch();
        }
      });
    }
  }

  addToFavorite(product: Product | undefined, event: Event) {
    event.stopPropagation();
    if (this.auth.user){
      this.userInfoService.addToFavorite(this.userInfoService.userInfo?.id, product?.id).subscribe(res=>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
          this.userInfoService.userInfo$.next(res.data);
          this.ngOnInit();
          // this.cart$.next(this.userInfo.cart);
        } else {
          console.log(res);
        }
      });
    }else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        data:{
          title:"Please login first",
          message:"You need to login to add to favorite. Do you want to login now?"
        }
      });
      dialogRef.afterClosed().subscribe(res =>{
        if (res) {
          this.router.navigate(["/login"]).catch();
        }
      });
    }

  }

  ifLike(product: Product | undefined | null) {
    // console.log(this.userInfoService.userInfo?.favorites);
    return this.userInfoService.userInfo?.favorites
      .some(p => p.id === product?.id);
  }

  removeFromFavorite(product: Product | undefined, event: Event) {
    event.stopPropagation();
    if (this.auth.user){
      this.userInfoService.removeFromFavorite(this.userInfoService.userInfo?.id, product?.id).subscribe(res=>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
          this.userInfoService.userInfo$.next(res.data);
          this.ngOnInit();
          // this.cart$.next(this.userInfo.cart);
        } else {
          console.log(res);
        }  });
          // this.cart$.next(this.userInfo.cart);
    }

  }


  thumbUp(id: number | undefined) {

  }

  thumbDown(id: number | undefined) {

  }


}
