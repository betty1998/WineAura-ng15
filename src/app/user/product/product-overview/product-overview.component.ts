import {Component, Input} from '@angular/core';
import {Product} from "../../../shared/model/Product";
import {CartProduct} from "../../../shared/model/CartProduct";
import {AuthService} from "../../../shared/service/auth.service";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";


@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {
  @Input()
  product!:Product;
  cart: CartProduct[] | undefined;
  qty= 1;
  @Input()
  amount!: number;

  constructor(private authService:AuthService,
              private userInfoService:UserInfoService,
              private router:Router,
              public dialog:MatDialog) {
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    // check user first
    // if login
    if (this.authService.user){
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

}
