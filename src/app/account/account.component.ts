import { Component } from '@angular/core';
import {User} from "../shared/model/User";
import {AuthService} from "../shared/service/auth.service";
import {UserInfoService} from "../shared/service/user-info.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user!: User;
  constructor(public auth:AuthService,
              public userInfoService:UserInfoService) {
  }
}
