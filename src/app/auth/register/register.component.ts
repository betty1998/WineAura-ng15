import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/model/User";
import {AuthRequest} from "../../shared/model/AuthRequest";
import {ActivatedRoute, Router} from "@angular/router";

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
    private router: Router) {
  }
  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      //default value    //validator
      username: ["", [Validators.required]],
      passwordGroup: this.fb.group({
        password: ["",[Validators.required, Validators.pattern(this.passwordPattern)]],
        confirmPassword: ""
      }, {validators:[RegisterComponent.passwordValidator]})

    });
  }
  static passwordValidator({value: {password, confirmPassword}}: FormGroup):null|{passwordNotMatch: string} {
    return password === confirmPassword ? null
      : {passwordNotMatch:"Password and confirm password must be the same"};
  }

  register() {
    console.log(this.registerFormGroup.value);
    const formValue = this.registerFormGroup.value;
    const user:{username:string,password:string} = {
      username:formValue.username,
      password:formValue.passwordGroup.password}
    this.auth.register(user).subscribe(res=>{
      console.log(res);
      if (res.success) {
        this.showMessage = true;
      }
    });
  }
}
