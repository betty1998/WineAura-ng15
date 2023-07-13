import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../shared/model/UserInfo";
import {UserInfoService} from "../../shared/service/user-info.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/model/User";
import {BehaviorSubject, switchMap, throwError} from "rxjs";
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
    this.auth.admin$.subscribe(res=>{
      if(res){
        this.user = res;
        console.log(this.user)
      }
      }
    )
    this.infoService.adminInfo$.subscribe(res=>{
      if(res) {
        this.userInfo$.next(res);
        console.log(res)
      }
    })
  }


  edit(user: User|undefined) {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent,{
      data: {
        user: user,
        userInfo: this.userInfo$.value
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.save(res.user,res.userInfo);
      }
    });
  }

  save(user:User,userInfo:UserInfo){
    this.auth.updateUsername(user,"admin").pipe(switchMap(res =>{
      if (res.success) {
        this.auth.admin = res.user;
        this.auth.admin$.next(res.user);
        this.user = res.user;
        localStorage.setItem("token", res.token);
        return this.infoService.updateProfile(userInfo.id, userInfo,"admin");
      }else {
        console.log(res);
        return throwError("Update Username failed");
      }
    }))
      .subscribe(res=>{
        if (res.success) {
          this.infoService.adminInfo = res.data;
          this.infoService.adminInfo$.next(res.data);
          this.userInfo$.next(res.data);
        } else {
          console.log(res);
        }
      });
  }



  changePassword(user: User|undefined) {
    this.dialog.open(UpdatePasswordDialogComponent,{
      data:user
    });
  }
}
