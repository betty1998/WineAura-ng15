import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/service/auth.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";
import {filter, switchMap, tap, throwError} from "rxjs";
import {UserService} from "../../../shared/service/user.service";
import {User} from "../../../shared/model/User";

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {
  registerFormGroup!: FormGroup;
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])[a-z0-9]{6,20}$';
  showMessage= false;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private infoService:UserInfoService,
    private userService:UserService) {
  }
  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      //default value    //validator
      username: ["", [Validators.required]],
      passwordGroup: this.fb.group({
        password: ["",[Validators.required, Validators.pattern(this.passwordPattern)]],
        confirmPassword: ""
      }, {validators:[AdminRegisterComponent.passwordValidator]}),
      infoGroup:this.fb.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email:["",[Validators.required,Validators.email]],
        phone: ["", [Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
      })
    });
  }
  static passwordValidator({value: {password, confirmPassword}}: FormGroup):null|{passwordNotMatch: string} {
    return password === confirmPassword ? null
      : {passwordNotMatch:"Password and confirm password must be the same"};
  }

  register() {
    console.log(this.registerFormGroup.value);
    const formValue = this.registerFormGroup.value;
    // check username
    this.userService.checkUnactivatedUsername(formValue.username).pipe(
      tap(res=>{
        if(!res.success){
          this.registerFormGroup.get("username")?.setErrors({usernameNotAvailable:true});
        }
      }),
      filter(res=>res.success),
      switchMap(res=>{
        const user = res.data;
        user.password = formValue.passwordGroup.password;
        return this.auth.adminRegister(user);
      }),
      switchMap(res=>{
        if (res.success) {
          this.showMessage = true;
          console.log(res);
          this.auth.user = res.data;
          return this.infoService.updateAdminProfile(res.data.id, formValue.infoGroup);
        } else {
          console.log(res);
          return throwError(res.message);
        }
      })).subscribe(res=>{
      if (res.success) {
        console.log(res);
        // this.router.navigate(["/admin/dashboard"]).catch();
        // this.infoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }
}
