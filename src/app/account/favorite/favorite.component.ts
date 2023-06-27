import { Component } from '@angular/core';
import {UserInfoService} from "../../shared/service/user-info.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../shared/model/Product";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  constructor(public infoService:UserInfoService,
              private route:ActivatedRoute) {
    infoService.userInfo && route.parent?.paramMap.pipe(switchMap(params =>{
      const id = Number(params.get("id"));
      return infoService.getUserInfo(id);
    })).subscribe(res =>{
      if (res.success) {
        infoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    })
  }

  addToCart(product: Product) {

  }

  remove(product: Product) {

  }
}
