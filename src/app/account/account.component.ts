import { Component } from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/User";
import {UserInfoService} from "../shared/service/user-info.service";

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
