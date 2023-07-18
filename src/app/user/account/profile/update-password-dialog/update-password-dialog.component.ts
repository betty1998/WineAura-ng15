import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../shared/model/User";
import {RegisterComponent} from "../../../../auth/register/register.component";

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent implements OnInit{
  passwordForm!: FormGroup;
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])[a-z0-9]{6,20}$';

  constructor(private auth:AuthService,
              private fb:FormBuilder,
              public dialogRef:MatDialogRef<UpdatePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data:User) {
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

    // check old password
    if (this.passwordForm.get("oldPassword")?.value !== this.data.password){
      this.passwordForm.get("oldPassword")?.setErrors({incorrect:true});
      return;
    }
    const module = this.data.role.type==="Admin"?"Admin":"User";
    const user = this.data;
    user.password = this.passwordForm.get("passwordGroup.newPassword")?.value;
    this.auth.updatePassword(user,module).subscribe(res=>{
      if (res.success){
        this.dialogRef.close(res.data);
      }else{
        console.log(res);
      }
    })
  }
}
