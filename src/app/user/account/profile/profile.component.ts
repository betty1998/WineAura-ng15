import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {AuthService} from "../../../shared/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileEditDialogComponent} from "./profile-edit-dialog/profile-edit-dialog.component";
import {UpdatePasswordDialogComponent} from "./update-password-dialog/update-password-dialog.component";
import {User} from "../../../shared/model/User";
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "../../../shared/model/UserInfo";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userInfo!:UserInfo|null;

  constructor(public infoService:UserInfoService,
              public auth:AuthService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.infoService.userInfo$.subscribe(value => this.userInfo = value || null);
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
