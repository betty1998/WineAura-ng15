import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../../shared/service/auth.service";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  constructor(private auth:AuthService,
              private userInfoService: UserInfoService,
              private router: Router,
              private location:Location,
              private cdr:ChangeDetectorRef) {
  }
  errorMessage: string = "";
  login(form: NgForm) {
    const value = form.value;
    console.log("user:", value);
    this.auth.adminLogin(value).subscribe(res => {
        console.log("admin login response: ", res);
        if (res.success) {
          this.auth.admin = res.user
          this.auth.admin$.next(res.user);
          localStorage.setItem("adminToken", res.token); // store token in local storage

          // If login is successful, getUserInfo will be called
          this.userInfoService.updateUserInfo(res.user.id);
          this.location.back();
        } else {
          console.log(res);
          this.errorMessage = res.message;
          this.cdr.detectChanges();
        }
      });
  }
}
