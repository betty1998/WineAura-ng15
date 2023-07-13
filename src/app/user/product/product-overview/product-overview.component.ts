import {Component, Input} from '@angular/core';
import {Product} from "../../../shared/model/Product";
import {CartProduct} from "../../../shared/model/CartProduct";
import {AuthService} from "../../../shared/service/auth.service";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";


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
      this.userInfoService.addToCart(this.userInfoService.userInfo?.id,cartProduct).subscribe(res =>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
          this.userInfoService.userInfo$.next(res.data);
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

}
