import { Component } from '@angular/core';
import {User} from "../../shared/model/User";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfoService} from "../../shared/service/user-info.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent {
  user!: User;
  constructor(public auth:AuthService,
              public userInfoService:UserInfoService,
              private route:ActivatedRoute) {
  }

}
