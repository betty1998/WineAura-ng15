import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/model/User";
import {AuthRequest} from "../../shared/model/AuthRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap, throwError} from "rxjs";
import {UserInfoService} from "../../shared/service/user-info.service";
import {UserInfo} from "../../shared/model/UserInfo";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerFormGroup!: FormGroup;
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])[a-z0-9]{6,20}$';
  showMessage= false;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private infoService:UserInfoService) {
  }
  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      //default value    //validator
      username: ["", [Validators.required]],
      passwordGroup: this.fb.group({
        password: ["",[Validators.required, Validators.pattern(this.passwordPattern)]],
        confirmPassword: ""
      }, {validators:[RegisterComponent.passwordValidator]}),
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
    const user: { username: string, password: string; } = {
      username: formValue.username,
      password: formValue.passwordGroup.password
    };
    const userInfo:UserInfo = this.registerFormGroup.get("infoGroup")?.value;
    console.log(userInfo);
    this.auth.register(user).pipe(switchMap(res=>{
      if (res.success) {
        this.showMessage = true;
        console.log(res);
        this.auth.user = res.data;
        return this.infoService.createProfile(res.data.id, userInfo);
      } else {
        console.log(res);
        return throwError(res.message);
      }
    })).subscribe(res=>{
      if (res.success) {
        console.log(res);
        this.infoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }
}
