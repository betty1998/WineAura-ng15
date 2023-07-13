import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {AuthService} from "../../../shared/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileEditDialogComponent} from "./profile-edit-dialog/profile-edit-dialog.component";
import {UpdatePasswordDialogComponent} from "./update-password-dialog/update-password-dialog.component";
import {User} from "../../../shared/model/User";
import {BehaviorSubject, switchMap, throwError} from "rxjs";
import {UserInfo} from "../../../shared/model/UserInfo";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userInfo$=new BehaviorSubject<UserInfo|null>(null);

  constructor(public infoService:UserInfoService,
              public auth:AuthService,
              private dialog:MatDialog,
              private route:ActivatedRoute) {
    if(infoService.userInfo) {
      this.userInfo$.next(infoService.userInfo);
    } else {
      route.parent?.paramMap.pipe(switchMap(params =>{
        const id = Number(params.get("id"));
        return infoService.getUserInfo(id);
      })).subscribe(res =>{
        if (res.success) {
          infoService.userInfo = res.data;
          this.userInfo$.next(res.data);
        } else {
          console.log(res);
        }
      });
    }
  }

  ngOnInit(): void {

  }

  edit(user: User|null) {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent,{
      data:{
        user:user,
        userInfo:this.infoService.userInfo}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.save(res.user,res.userInfo);
      }
    });
  }

  save(user:User,userInfo:UserInfo){
    this.auth.updateUsername(user).pipe(switchMap(res =>{
      if (res.success) {
        this.auth.user = res.user;
        localStorage.setItem("token", res.token);
        return this.infoService.updateProfile(userInfo.id, userInfo);
      }else {
        console.log(res);
        return throwError("Update Username failed");
      }
    }))
      .subscribe(res=>{
        if (res.success) {
          this.infoService.userInfo = res.data;
          this.userInfo$.next(res.data);
        } else {
          console.log(res);
        }
      });
  }

  changePassword(user: User|null) {
    this.dialog.open(UpdatePasswordDialogComponent,{
      data:user
    });
  }
}
