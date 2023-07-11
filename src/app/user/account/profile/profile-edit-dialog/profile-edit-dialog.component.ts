import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "../../../../shared/service/user-info.service";
import {UserInfo} from "../../../../shared/model/UserInfo";
import {AuthService} from "../../../../shared/service/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../shared/model/User";
import {mergeMap, switchMap, throwError} from "rxjs";

@Component({
  selector: 'app-profile-edit-dialog',
  templateUrl: './profile-edit-dialog.component.html',
  styleUrls: ['./profile-edit-dialog.component.scss']
})
export class ProfileEditDialogComponent implements OnInit{
  profileForm!: FormGroup;
  userInfo!: UserInfo;
  user!: User;

  constructor(private infoService:UserInfoService,
              private auth:AuthService,
              private fb:FormBuilder,
              public dialogRef:MatDialogRef<ProfileEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.user = data.user;
    this.userInfo = data.userInfo;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [this.auth.user?.username, Validators.required],
      userInfoForm: this.fb.group({
        firstName: [this.userInfo.firstName, Validators.required],
        lastName: [this.userInfo.lastName, Validators.required],
        email:[this.userInfo.email,[Validators.required,Validators.email]],
        phone: [this.userInfo.phone, [Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
        })
      })
  }


  save() {
    this.user.username = this.profileForm.value.username;
    this.userInfo = {...this.userInfo, ...this.profileForm.get("userInfoForm")?.value};
    console.log(this.userInfo);
    this.auth.updateUsername(this.user).pipe(switchMap(res =>{
      if (res.success) {
        this.auth.user = res.user;
        localStorage.setItem("token", res.token);
        return this.infoService.updateProfile(this.userInfo.id, this.userInfo);
      }else {
        console.log(res);
        return throwError("Update Username failed");
      }
    }))
      .subscribe(res=>{
        if (res.success) {
          this.infoService.userInfo = res.data;
        } else {
          console.log(res);
        }
        this.dialogRef.close();
      });

  }
}
