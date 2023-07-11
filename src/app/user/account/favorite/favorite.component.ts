import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/model/Product";
import {UserInfo} from "../../../shared/model/UserInfo";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  userInfo!: UserInfo;

  constructor(public infoService:UserInfoService,
              private route:ActivatedRoute) {
    infoService.userInfo && route.parent?.paramMap.pipe(switchMap(params =>{
      const id = Number(params.get("id"));
      return infoService.getUserInfo(id);
    })).subscribe(res =>{
      if (res.success) {
        infoService.userInfo = res.data;
        this.userInfo = res.data;
      } else {
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
    if (this.infoService.userInfo) {
      this.userInfo = this.infoService.userInfo;
    }
  }
//TODO: add to cart and remove
  addToCart(product: Product) {

  }

  remove(product: Product) {

  }
}
