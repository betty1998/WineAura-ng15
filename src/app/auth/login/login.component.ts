import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfoService} from "../../shared/service/user-info.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private auth:AuthService,
              private userInfoService: UserInfoService,
              private router: Router) {
  }
  /*TODO
  * redirect to previous page after login successfully
  * */
  // login({value}:  NgForm) {
  //   console.log("user:",value);
  //   this.auth.login(value)
  //     .subscribe(res =>{
  //       console.log("login response: ",res);
  //       if(res.success){
  //         this.auth.user = res.user;
  //         localStorage.setItem("token", res.token); // store token in local storage
  //         this.router.navigate(["/products"]).catch();
  //       }
  //       }
  //     )
  // }

  login({value}: NgForm) {
    console.log("user:", value);
    this.auth.login(value).pipe(
      switchMap(res => {
        console.log("login response: ", res);
        if (res.success) {
          this.auth.user = res.user;
          localStorage.setItem("token", res.token); // store token in local storage

          // If login is successful, getUserInfo will be called
          return this.userInfoService.getUserInfo(this.auth.user.id);
        } else {
          // If login is not successful, an empty observable is returned
          return of(null);
        }
      })
    ).subscribe(res => {
      if (res && res.success) {
        console.log("user info: ", res.data);
        this.userInfoService.userInfo = res.data;

        // navigate to products after getting user info
        this.router.navigate(["/products"]).catch();
      }
    });
  }
}
