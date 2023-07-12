import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../shared/model/UserInfo";
import {UserInfoService} from "../../shared/service/user-info.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/model/User";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../shared/service/auth.service";
import {ProfileEditDialogComponent} from "../../user/account/profile/profile-edit-dialog/profile-edit-dialog.component";
import {
  UpdatePasswordDialogComponent
} from "../../user/account/profile/update-password-dialog/update-password-dialog.component";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit{
  userInfo$ = new BehaviorSubject<UserInfo|undefined>(undefined);
  user!:User;

  constructor(private infoService:UserInfoService,
              private auth:AuthService,
              private dialog:MatDialog,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.infoService.adminInfo$.subscribe(res=>{
        this.userInfo$.next(res);
      }
    )
    // this.userInfoId = this.route.snapshot.params['id'];
    // this.infoService.getUserInfoById(this.userInfoId).subscribe(res=>{
    //   if(res.success){
    //     this.userInfo$.next(res.data);
    //   }else {
    //     console.log(res);
    //     alert(res.message);
    //   }
    // });
  }


  edit(user: User|undefined) {
    this.dialog.open(ProfileEditDialogComponent,{
      data:{
        user:user,
        userInfo:this.userInfo$.value}
    })

  }

  changePassword(user: User|undefined) {
    this.dialog.open(UpdatePasswordDialogComponent,{
      data:user
    });
  }
}
