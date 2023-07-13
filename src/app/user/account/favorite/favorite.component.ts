import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/model/Product";
import {UserInfo} from "../../../shared/model/UserInfo";
import {CartProduct} from "../../../shared/model/CartProduct";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  userInfo!: UserInfo | undefined;

  constructor(public infoService:UserInfoService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.infoService.userInfo$.subscribe(res =>{
      this.userInfo = res;
    });
  }
//TODO: add to cart and remove
  addToCart(product: Product) {
    const cartProduct:CartProduct = {
      product: product,
      qty: 1,
      userInfo:this.userInfo};
    this.infoService.addToCart(this.userInfo?.id,cartProduct).subscribe(res =>{
      if (res.success) {
        this.infoService.userInfo = res.data;
        this.infoService.userInfo$.next(res.data);
      } else {
        console.log(res);
      }
    });

  }

  remove(product: Product) {
    this.infoService.removeFromFavorite(this.userInfo?.id, product?.id).subscribe(res=>{
      if (res.success) {
        this.infoService.userInfo = res.data;
        this.infoService.userInfo$.next(res.data);
      } else {
        console.log(res);
      }
    });
  }
}
