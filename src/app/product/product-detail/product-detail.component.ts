import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/model/Product";
import {ProductService} from "../../shared/service/product.service";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {BehaviorSubject, switchMap} from "rxjs";
import {CartProduct} from "../../shared/model/CartProduct";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfoService} from "../../shared/service/user-info.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  product$ = new BehaviorSubject<Product | undefined>(undefined);
  id: number | null | undefined;
  qty: number | undefined;
  stars = [1, 2, 3, 4, 5];
  Math = Math;
  constructor(private productService: ProductService,
              private auth:AuthService,
              private userInfoService:UserInfoService,
              private route:ActivatedRoute,
              private router:Router) {
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


  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    if (this.auth.user){
      const cartProduct:CartProduct = {
        product: product,
        qty: 1,
        userInfo:this.userInfoService.userInfo};
      this.userInfoService.addToCart(this.userInfoService.userInfo.id,cartProduct).subscribe(res =>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
        } else {
          console.log(res);
        }
      });
    }else{
      // if not login
      // TODO: open a dialog
      // navigate to login page
      this.router.navigate(["/login"]).catch();
    }
  }


  thumbUp(id: number | undefined) {

  }

  thumbDown(id: number | undefined) {

  }


}
