import { Component } from '@angular/core';
import {UserInfoService} from "../../shared/service/user-info.service";
import {AuthService} from "../../shared/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileEditDialogComponent} from "./profile-edit-dialog/profile-edit-dialog.component";
import {UpdatePasswordDialogComponent} from "./update-password-dialog/update-password-dialog.component";
import {User} from "../../shared/model/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public infoService:UserInfoService,
              public auth:AuthService,
              private dialog:MatDialog) {
  }

  edit(user: User|null) {
    this.dialog.open(ProfileEditDialogComponent,{
      data:{
        user:user,
        userInfo:this.infoService.userInfo}
    })

  }

  changePassword(user: User|null) {
    this.dialog.open(UpdatePasswordDialogComponent,{
      data:user
    });
  }
}
