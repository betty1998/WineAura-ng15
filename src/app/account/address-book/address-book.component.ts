import { Component } from '@angular/core';
import {UserInfoService} from "../../shared/service/user-info.service";
import {UserInfo} from "../../shared/model/UserInfo";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent {
  userInfo!: UserInfo;

  constructor(public userInfoService: UserInfoService,
              private route:ActivatedRoute) {
    userInfoService.userInfo && route.parent?.paramMap.pipe(switchMap(params =>{
      const id = Number(params.get("id"));
      return userInfoService.getUserInfo(id);
    })).subscribe(res =>{
      if (res.success) {
        userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    })
  }

}
