import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../shared/model/User";
import {RegisterComponent} from "../../../../auth/register/register.component";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent implements OnInit{
  passwordForm!: FormGroup;
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])[a-z0-9]{6,20}$';
  successMessage: string="";

  constructor(private auth:AuthService,
              private fb:FormBuilder,
              public dialogRef:MatDialogRef<UpdatePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private user:User) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword:["", Validators.required],
      passwordGroup: this.fb.group({
        newPassword: ["",[Validators.required, Validators.pattern(this.passwordPattern)]],
        confirmPassword: ""
      }, {validators:[this.passwordValidator]})

    })
  }

  passwordValidator({value: {newPassword, confirmPassword}}: FormGroup):null|{passwordNotMatch: string} {
    return newPassword === confirmPassword ? null
      : {passwordNotMatch:"Password and confirm password must be the same"};
  }

  save() {
    //TODO: update password
    const module = this.user.role.type==="admin"?"admin":"user";
    const user = this.user;
    user.password = this.passwordForm.get("oldPassword")?.value;
    // check old password
    let loginSubscription:Observable<any> = new Observable<any>();
    if (module=="user"){
      loginSubscription = this.auth.login(user);
    }else if(module=="admin"){
      loginSubscription = this.auth.adminLogin(user);
    }

    loginSubscription.pipe(switchMap(res=>{
      if(res.success){
        console.log("old password correct");

        user.password = this.passwordForm.get("passwordGroup.newPassword")?.value;
        return this.auth.updatePassword(user,module);
      }else{
        this.passwordForm.get("oldPassword")?.setErrors({incorrect:true});
        throw new Error("old password incorrect");
      }
    })).subscribe(res=>{
      if (res.success){
        this.successMessage = "Password updated successfully";
        setTimeout(()=>{this.dialogRef.close(res.data)}, 1500);
      }else{
        console.log(res);
      }
    })
  }
}
